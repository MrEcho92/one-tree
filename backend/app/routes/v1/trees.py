from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from google.cloud import firestore

from app.core.constants import FAMILY_TREE, PEOPLE
from app.core.database import get_db
from app.models.models import FamilyStory, FamilyTree, Person
from app.schemas.schemas import AddPersonSchema, CreateFamilyTreeSchema

router = APIRouter()


@router.get(
    "/trees/{user_id}", response_model=List[FamilyTree], status_code=status.HTTP_200_OK
)
async def get_user_trees(user_id: str, db=Depends(get_db)) -> List[FamilyTree]:
    """Get all family trees created by a user"""
    try:
        trees = db.collection(FAMILY_TREE).where("created_by", "==", user_id).stream()
        return [FamilyTree.from_dict(tree.to_dict()) for tree in trees]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get(
    "/trees/{tree_id}", response_model=FamilyTree, status_code=status.HTTP_200_OK
)
async def get_family_tree(tree_id: str, db=Depends(get_db)) -> FamilyTree:
    """Get a family tree by ID"""
    tree = db.collection(FAMILY_TREE).document(tree_id).get()
    if not tree.exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Family tree not found"
        )
    return FamilyTree.from_dict(tree.to_dict())


@router.post("/trees", response_model=FamilyTree, status_code=status.HTTP_201_CREATED)
async def create_tree_with_members(
    family_tree: CreateFamilyTreeSchema, db=Depends(get_db)
) -> FamilyTree:
    """Create a new family tree with root member, father, and mother"""
    try:
        tree = FamilyTree(
            name=family_tree.name,
            description=family_tree.description,
            is_public=family_tree.is_public,
            created_by=family_tree.created_by,
        )
        db.collection(FAMILY_TREE).document(tree.id).set(tree.to_dict())

        def add_member(member_data: dict, tree_id: str) -> str:
            """Helper function to add a member"""
            member = Person(
                **member_data, tree_id=tree_id, created_by=family_tree.created_by
            )
            db.collection(PEOPLE).document(member.id).set(member.to_dict())
            return member.id

        # Add members
        root_id = add_member(family_tree.root_member, tree.id)
        father_id = (
            add_member(family_tree.father, tree.id) if family_tree.father else None
        )
        mother_id = (
            add_member(family_tree.mother, tree.id) if family_tree.mother else None
        )

        # Update root member with parent ids
        root_ref = db.collection(PEOPLE).document(root_id)
        root_ref.update({"father_id": father_id, "mother_id": mother_id})

        # Update tree with members IDs
        tree_ref = db.collection(FAMILY_TREE).document(tree.id)
        tree_ref.update(
            {"members": firestore.ArrayUnion([root_id, father_id, mother_id])}
        )

        return tree
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post(
    "/add_member_tree",
    response_model=FamilyTree,
    status_code=status.HTTP_201_CREATED,
)
async def add_member_tree(
    member: AddPersonSchema, tree_id: str, db=Depends(get_db)
) -> FamilyTree:
    """Add a new member to a family tree"""
    try:
        tree_ref = db.collection(FAMILY_TREE).document(tree_id)
        tree = tree_ref.get()
        if not tree.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Family tree not found"
            )

        person = Person(**member.dict())
        person_ref = db.collection(PEOPLE).document(person.id)
        person_ref.set(person.to_dict())

        tree_ref.update(
            {
                "members": firestore.ArrayUnion([person_ref.id]),
            }
        )

        def update_relation(relation_id, field) -> None:
            if relation_id:
                relation_ref = db.collection(PEOPLE).document(relation_id)
                relation_doc = relation_ref.get()
                if relation_doc.exists:
                    relation_data = relation_doc.to_dict()
                    if field == "spouse_id":
                        relation_data[field] = relation_data.get(field, []) + [
                            person_ref.id
                        ]
                    else:
                        relation_data[field] = person_ref.id
                    relation_ref.set(relation_data)

        # Update relations (father, mother, spouse, children)
        update_relation(person.father_id, "children_id")
        update_relation(person.mother_id, "children_id")
        for spouse_id in person.spouse_id:
            update_relation(spouse_id, "spouse_id")

        # Update children
        if person.children_id:
            for child_id in person.children_id:
                child_ref = db.collection("people").document(child_id)
                child_doc = child_ref.get()
                if child_doc.exists:
                    child_data = child_doc.to_dict()
                    if person.gender == "Male":
                        child_data["father_id"] = person_ref.id
                    else:
                        child_data["mother_id"] = person_ref.id
                    child_ref.set(child_data)

        return Person.from_dict(person)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.delete("/trees/{tree_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_tree(tree_id: str, db=Depends(get_db)) -> None:
    """Delete a family tree"""
    try:
        tree_ref = db.collection(FAMILY_TREE).document(tree_id)
        tree = tree_ref.get()
        if not tree.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Family tree not found"
            )

        # Delete all members of the tree
        people_query = db.collection(PEOPLE).where("tree_id", "==", tree_id).stream()
        for person in people_query:
            person.reference.delete()

        # Delete the tree
        tree_ref.delete()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put(
    "/members/{person_id}",
    response_model=Person,
    status_code=status.HTTP_200_OK,
)
async def update_member(
    member: AddPersonSchema, person_id: str, db=Depends(get_db)
) -> Person:
    """Update a family member"""
    try:
        person_ref = db.collection(PEOPLE).document(person_id)
        person = person_ref.get()
        if not person.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Family member not found"
            )

        updated_data = member.dict(exclude_unset=True)
        updated_data["updated_by"] = member.updated_by
        updated_data["updated_at"] = firestore.SERVER_TIMESTAMP
        person_ref.update(updated_data)

        return Person.from_dict(person_ref)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post(
    "/add_collaborators/{tree_id}",
    response_model=FamilyTree,
    status_code=status.HTTP_200_OK,
)
async def add_collaborator(
    tree_id: str, collaborators: List[str], db=Depends(get_db)
) -> FamilyTree:
    """Add collaborators to a family tree"""
    try:
        tree_ref = db.collection(FAMILY_TREE).document(tree_id)
        tree = tree_ref.get()
        if not tree.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Family tree not found"
            )

        tree_ref.update(
            {
                "collaborators": firestore.ArrayUnion(collaborators),
            }
        )
        return FamilyTree.from_dict(tree_ref)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
