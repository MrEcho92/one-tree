import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Header } from '../components';

export function DashboardPage() {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
          mx: 3,
          pb: 5,
          mt: { xs: 8, md: 0 },
        }}
      >
        <Header />
      </Stack>
    </Box>
  );
}
