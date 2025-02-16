import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

type Person = {
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
};

export const MembersTable = ({ data }: any) => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'first_name', //access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'gender', //normal accessorKey
        header: 'Gender',
        size: 150,
      },
      {
        accessorKey: 'date_of_birth',
        header: 'Date of Birth',
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    muiTablePaperProps: {
      elevation: 0, //change the mui box shadow
      //customize paper styles
      sx: {
        borderRadius: '0',
      },
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.paper,
      draggingBorderColor: theme.palette.secondary.main,
    }),
  });

  return <MaterialReactTable table={table} />;
};
