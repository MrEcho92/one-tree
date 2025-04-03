import type { Node, Gender, RelType } from 'relatives-tree/lib/types';
import { brown, orange } from '@mui/material/colors';
import { Person } from '../types/tree';

export function transformNodeData(data: Person[]): Node[] {
  return data.map((person: Person) => ({
    id: person.id,
    gender: person.gender as Gender,
    spouses:
      person?.spouse_id?.map((spouse) => ({
        id: spouse,
        type: 'marriage' as RelType,
      })) ?? [],
    siblings:
      person?.sibling_id?.map((sibling) => ({
        id: sibling,
        type: 'blood' as RelType,
      })) ?? [],
    parents: [
      ...(person.father_id
        ? [{ id: person.father_id, type: 'blood' as RelType }]
        : []),
      ...(person.mother_id
        ? [{ id: person.mother_id, type: 'blood' as RelType }]
        : []),
    ],
    children:
      person?.children_id?.map((child) => ({
        id: child,
        type: 'blood' as RelType,
      })) ?? [],
  }));
}

export function stringAvatar(data: any) {
  let children: string = '';
  if (data?.first_name && data?.last_name) {
    const newName = `${data.first_name} ${data.last_name}`;
    children = `${newName.split(' ')[0][0]}${newName.split(' ')[1][0]}`;
  }
  return {
    sx: {
      bgcolor: data?.gender === 'male' ? brown[500] : orange[500],
      width: 100,
      height: 100,
    },
    children: children,
  };
}
