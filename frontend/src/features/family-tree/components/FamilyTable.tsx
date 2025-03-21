import { useMemo } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
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

export default function FamilyMemberTable({ data }: any) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // screen < 600px

  const columns = useMemo<MRT_ColumnDef<Person>[]>(() => {
    const baseColumns = [
      {
        accessorKey: 'first_name',
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        size: 150,
      },
      {
        accessorKey: 'date_of_birth',
        header: 'Date of Birth',
        size: 150,
      },
    ];

    return isMobile
      ? baseColumns.filter((col) =>
          ['first_name', 'last_name'].includes(col.accessorKey as string),
        )
      : baseColumns;
  }, [isMobile]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnResizing: true,
    enableGlobalFilter: true,
    layoutMode: 'grid', // optional for better responsiveness
    muiTableContainerProps: {
      sx: {
        overflowX: 'auto',
      },
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: 0,
      },
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.paper,
      draggingBorderColor: theme.palette.secondary.main,
    }),
  });

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
