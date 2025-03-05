import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Header } from '../../dashbord/components';

export default function AdminPage() {
  return (
    <Box component="main" sx={{ flexGrow: 1, overflow: 'auto', width: '100%' }}>
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
          mx: 3,
          pb: 5,
          mt: { xs: 8, md: 0 },
        }}
      >
        <Header title="Home" headerName="Admin" />
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          Admin
        </Box>
      </Stack>
    </Box>
  );
}
