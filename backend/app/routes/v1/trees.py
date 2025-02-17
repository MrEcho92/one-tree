import logging
from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from google.cloud import firestore

from app.core.constants import FAMILY_STORY, FAMILY_TREE, PEOPLE
from app.core.database import get_db
from app.models.models import FamilyStory, FamilyTree, Person
from app.schemas.schemas import (
    AddCollaboratorSchema,
    AddFamilyStorySchema,
    AddPersonSchema,
    CreateFamilyTreeSchema,
    DeleteMemberSchema,
    FamilyStoriesSchema,
    FamilyTrees,
    RelationToMemberSchema,
    RelationType,
    UpdatedFamilyStorySchema,
    UpdatePersonSchema,
    UpdateTreeSchema,
)

router = APIRouter()
logger = logging.getLogger(__name__)


def fetch_members(members_data: List[str], db: Any):
    members = []
    for member_id in members_data:
        member = db.collection(PEOPLE).document(member_id).get()
        if member.exists:
            members.append(Person.from_dict(member.to_dict()))
    return members


@router.get(
    "/trees/{user_id}/user",
    response_model=List[FamilyTrees],
    status_code=status.HTTP_200_OK,
)
async def get_user_trees(user_id: str, db=Depends(get_db)) -> List[FamilyTrees]:
    """Get all family trees created by a user"""
    try:
        trees = db.collection(FAMILY_TREE).where("created_by", "==", user_id).stream()
        return [FamilyTrees(**tree.to_dict()) for tree in trees]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get(
    "/trees/{tree_id}/tree", response_model=FamilyTree, status_code=status.HTTP_200_OK
)
async def get_family_tree(tree_id: str, db=Depends(get_db)) -> FamilyTree:
    """Get a family tree by ID"""
    try:
        tree = db.collection(FAMILY_TREE).document(tree_id).get()
        if not tree.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Family tree not found"
            )

        tree_data = tree.to_dict()

        # Fetch members details
        tree_data["members"] = fetch_members(tree_data.get("members", []), db)

        return FamilyTree.from_dict(tree_data)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


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

        # Update father and mother with root member as their child & spouse ids
        if father_id:
            father_ref = db.collection(PEOPLE).document(father_id)
            father_ref.update(
                {
                    "children_id": firestore.ArrayUnion([root_id]),
                    "spouse_id": firestore.ArrayUnion([mother_id]),
                }
            )
        if mother_id:
            mother_ref = db.collection(PEOPLE).document(mother_id)
            mother_ref.update(
                {
                    "children_id": firestore.ArrayUnion([root_id]),
                    "spouse_id": firestore.ArrayUnion([father_id]),
                }
            )

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


@router.put(
    "/add-collaborators/{tree_id}",
    response_model=FamilyTree,
    status_code=status.HTTP_200_OK,
)
async def add_collaborator(
    tree_id: str, data: AddCollaboratorSchema, db=Depends(get_db)
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
                "collaborators": firestore.ArrayUnion(data.collaborators),
            }
        )
        # Fetch updated tree members
        tree["members"] = fetch_members(tree.get("members", []), db)
        return FamilyTree.from_dict(tree_ref)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post(
    "/add-member-tree/{tree_id}",
    response_model=FamilyTree,
    status_code=status.HTTP_201_CREATED,
)
async def add_member_tree(
    tree_id: str,
    member: AddPersonSchema,
    relation: RelationToMemberSchema,
    db=Depends(get_db),
) -> FamilyTree:
    """
    Add a new member to a family tree
    - **tree_id**: Family tree ID
    - **member**: New member details
    - **relation**: Relationship of new member to the primary user
    """
    try:
        # Fetch the tree document
        tree_ref = db.collection(FAMILY_TREE).document(tree_id)
        tree = tree_ref.get()
        if not tree.exists:
            raise HTTPException(status_code=404, detail="Family tree not found")

        # Create a new person entry
        person = Person(
            **member.model_dump(),
            tree_id=tree_id,
        )
        person_ref = db.collection(PEOPLE).document(person.id)
        person_ref.set(person.to_dict())

        # Update the tree to include the new member
        tree_ref.update({"members": firestore.ArrayUnion([person_ref.id])})

        def update_relation(relation_id, field, profile_id):
            """Updates relationships bi-directionally in Firestore"""
            if relation_id:
                relation_ref = db.collection(PEOPLE).document(relation_id)
                relation_doc = relation_ref.get()

                if relation_doc.exists:
                    relation_data = relation_doc.to_dict()

                    if field in ["spouse_id", "children_id", "sibling_id"]:
                        if profile_id not in relation_data.get(
                            field, []
                        ):  # Prevent duplicates
                            relation_data[field] = relation_data.get(field, []) + [
                                profile_id
                            ]
                    else:
                        relation_data[field] = profile_id

                    relation_ref.set(relation_data)

        relation_mapping = {
            RelationType.FATHER: ("father_id", "children_id"),
            RelationType.MOTHER: ("mother_id", "children_id"),
            RelationType.SPOUSE: ("spouse_id", "spouse_id"),
            RelationType.SIBLING: (
                "sibling_id",
                "sibling_id",
            ),  # No parent-child reverse needed
            RelationType.CHILD: (
                "children_id",
                "father_id" if relation.primary_user_gender == "male" else "mother_id",
            ),
        }

        if relation.rel in relation_mapping:
            new_person_field, primary_user_field = relation_mapping[relation.rel]
            # Prevent self-referencing
            if relation.primary_user_id == person.id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="A person cannot be their own relative.",
                )
            # Update primary user's relationship with the new member
            update_relation(relation.primary_user_id, new_person_field, person.id)
            # Update new member's relationship with the primary user
            update_relation(person.id, primary_user_field, relation.primary_user_id)

        # Additional logic for SIBLINGS - Assign parents
        if relation.rel == RelationType.SIBLING:
            primary_user_ref = db.collection(PEOPLE).document(relation.primary_user_id)
            primary_user_doc = primary_user_ref.get()
            if primary_user_doc.exists:
                primary_user_data = primary_user_doc.to_dict()
                father_id = primary_user_data.get("father_id")
                mother_id = primary_user_data.get("mother_id")

                # Assign same parents to the new sibling
                update_relation(person.id, "father_id", father_id)
                update_relation(person.id, "mother_id", mother_id)
                if father_id:
                    update_relation(father_id, "children_id", person.id)
                if mother_id:
                    update_relation(mother_id, "children_id", person.id)

        # Additional logic for CHILD - Update spouse children_id field
        if relation.rel == RelationType.CHILD:
            if relation.primary_spouse_id:
                update_relation(relation.primary_spouse_id, "children_id", person.id)
                update_relation(
                    person.id,
                    "father_id"
                    if relation.primary_spouse_gender == "male"
                    else "mother_id",
                    relation.primary_spouse_id,
                )

            if relation.primary_children_id:
                for child_id in relation.primary_children_id:
                    if child_id != person.id:
                        update_relation(child_id, "sibling_id", person.id)
                        update_relation(person.id, "sibling_id", child_id)

        # Handle case where there is parent_ids in primary user
        if relation.rel in (RelationType.FATHER, RelationType.MOTHER):
            primary_user_ref = db.collection(PEOPLE).document(relation.primary_user_id)
            primary_user_doc = primary_user_ref.get()
            if primary_user_doc.exists:
                primary_user_data = primary_user_doc.to_dict()
                # parent field to look for in primary_user_data
                field_id = (
                    "mother_id" if relation.rel == RelationType.FATHER else "father_id"
                )
                spouse_id = primary_user_data.get(field_id)
                if spouse_id is not None:
                    # update spouse fields
                    update_relation(person.id, "spouse_id", spouse_id)
                    update_relation(spouse_id, "spouse_id", person.id)

        # Fetch updated tree members
        tree_data = tree_ref.get().to_dict()
        tree_data["members"] = fetch_members(tree_data.get("members", []), db)
        return FamilyTree.from_dict(tree_data)
    except Exception as e:
        logger.error(f"Unexpected error from adding a member: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put(
    "/trees/{tree_id}", response_model=FamilyTree, status_code=status.HTTP_200_OK
)
async def update_tree(
    tree_id: str, tree_data: UpdateTreeSchema, db=Depends(get_db)
) -> FamilyTree:
    """Update a family tree"""
    try:
        tree_ref = db.collection(FAMILY_TREE).document(tree_id)
        tree = tree_ref.get()
        if not tree.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Family tree not found"
            )

        updated_data = tree_data.model_dump(exclude_unset=True)
        updated_data["updated_by"] = tree_data.updated_by
        updated_data["updated_at"] = firestore.SERVER_TIMESTAMP
        tree_ref.update(updated_data)

        updated_tree = tree_ref.get().to_dict()

        # Fetch updated tree members
        updated_tree["members"] = fetch_members(updated_tree.get("members", []), db)
        return FamilyTree.from_dict(updated_tree)
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
    member: UpdatePersonSchema, person_id: str, db=Depends(get_db)
) -> Person:
    """Update a family member"""
    try:
        person_ref = db.collection(PEOPLE).document(person_id)
        person = person_ref.get()
        if not person.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Family member not found"
            )
        updated_data = member.model_dump(exclude_unset=True)
        updated_data["updated_by"] = member.updated_by
        updated_data["updated_at"] = firestore.SERVER_TIMESTAMP
        person_ref.update(updated_data)

        return Person.from_dict(person_ref.get().to_dict())
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

        # Batch delete all members of the tree
        batch = db.batch()
        people_query = db.collection(PEOPLE).where("tree_id", "==", tree_id).stream()
        for person in people_query:
            batch.delete(person.reference)
        batch.commit()

        # Delete the tree
        tree_ref.delete()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.delete("/trees/{tree_id}/member", status_code=status.HTTP_204_NO_CONTENT)
async def delete_tree_member(
    tree_id: str, item: DeleteMemberSchema, db=Depends(get_db)
):
    """
    Deletes a member from the family tree while updating relationships.

    - **tree_id**: ID of the family tree.
    - **user_id**: ID of the user to delete.
    """
    try:
        tree_ref = db.collection(FAMILY_TREE).document(tree_id)
        user_ref = db.collection(PEOPLE).document(item.delete_member_id)

        # Read necessary documents before starting the deletion
        tree = tree_ref.get()
        if not tree.exists:
            raise HTTPException(status_code=404, detail="Family tree not found")

        user_doc = user_ref.get()
        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")

        user_data = user_doc.to_dict()

        # Prevent root user deletion if they still have children
        if user_data.get("id") == item.root_id and user_data.get("children_id"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot delete root user until all children are removed.",
            )

        # Function to remove references from related users
        def update_relation(relation_id, field):
            if relation_id:
                relation_ref = db.collection(PEOPLE).document(relation_id)
                relation_doc = relation_ref.get()

                if relation_doc.exists:
                    relation_data = relation_doc.to_dict()
                    if field in ["spouse_id", "children_id", "sibling_id"]:
                        relation_data[field] = [
                            rel
                            for rel in relation_data.get(field, [])
                            if rel != item.delete_member_id
                        ]
                    else:
                        relation_data[field] = None

                    relation_ref.set(relation_data)

        # Update parents, siblings, spouses, and children
        if user_data.get("father_id"):
            update_relation(user_data.get("father_id"), "children_id")
        if user_data.get("mother_id"):
            update_relation(user_data.get("mother_id"), "children_id")

        for child in user_data.get("children_id", []):
            child_ref = db.collection(PEOPLE).document(child)
            child_doc = child_ref.get()

            if child_doc.exists:
                child_data = child_doc.to_dict()
                if child_data["father_id"] == item.delete_member_id:
                    child_data["father_id"] = None

                if child_data["mother_id"] == item.delete_member_id:
                    child_data["mother_id"] = None

                child_ref.set(child_data)

        for sibling in user_data.get("sibling_id", []):
            update_relation(sibling, "sibling_id")

        for spouse in user_data.get("spouse_id", []):
            update_relation(spouse, "spouse_id")

        # Remove user from family tree's member list
        tree_ref.update({"members": firestore.ArrayRemove([item.delete_member_id])})

        # Finally, delete the user document
        user_ref.delete()
        return {
            "message": "User deleted successfully",
            "deleted_user_id": item.delete_member_id,
        }
    except Exception as e:
        logging.error(f"Unexpected error when deleting user: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@router.get(
    "/stories/{tree_id}",
    response_model=List[FamilyStoriesSchema],
    status_code=status.HTTP_200_OK,
)
async def get_family_stories(
    tree_id: str, db=Depends(get_db)
) -> List[FamilyStoriesSchema]:
    """Get all family stories for a specific family tree"""
    try:
        stories = db.collection(FAMILY_STORY).where("tree_id", "==", tree_id).stream()
        return [FamilyStory(**story.to_dict()) for story in stories]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get(
    "/stories/{story_id}/story",
    response_model=FamilyStory,
    status_code=status.HTTP_200_OK,
)
async def get_family_tree_by_id(story_id: str, db=Depends(get_db)) -> FamilyStory:
    """Get a family story by ID"""
    try:
        story = db.collection(FAMILY_STORY).document(story_id).get()
        if not story.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Family story not found"
            )
        
        return FamilyStory.from_dict(story.to_dict())
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post(
    "/stories", response_model=FamilyStory, status_code=status.HTTP_201_CREATED
)
async def add_family_story(
    story: AddFamilyStorySchema, db=Depends(get_db)
) -> FamilyStory:
    """Add a new family story to a family tree"""
    try:
        new_story = FamilyStory(
            **story.model_dump(),
        )
        db.collection(FAMILY_STORY).document(new_story.id).set(new_story.to_dict())
        return new_story
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put(
    "/stories/{story_id}",
    response_model=FamilyStory,
    status_code=status.HTTP_200_OK,
)
async def update_family_story(
    story_id: str, updated_data: UpdatedFamilyStorySchema, db=Depends(get_db)
) -> FamilyStory:
    """Update a family story"""
    try:
        story_ref = db.collection(FAMILY_STORY).document(story_id)
        story = story_ref.get()
        if not story.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Family story not found"
            )

        updated_story_data = updated_data.model_dump(exclude_unset=True)
        updated_story_data["updated_by"] = updated_data.updated_by
        updated_story_data["updated_at"] = firestore.SERVER_TIMESTAMP
        story_ref.update(updated_story_data)

        updated_story = story_ref.get().to_dict()
        return FamilyStory.from_dict(updated_story)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.delete("/stories/{story_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_family_story(story_id: str, db=Depends(get_db)) -> None:
    """Delete a family story"""
    try:
        story_ref = db.collection(FAMILY_STORY).document(story_id)
        story = story_ref.get()
        if not story.exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Family story not found"
            )
        story_ref.delete()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
