import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function HubDetails() {
  return (
    <Box mt={'64px'}>
      <Container
        maxWidth="xl"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 14, gap: 4 }}
      >
        Details
      </Container>
    </Box>
  );
}
