import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import NotFoundImage from '../../assets/images/illustration-404.svg';

export function NotFoundPage() {
  return (
    <Box>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            Error 404 Not Found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <Button href="/" variant="contained" disableElevation>
            Go back to homepage
          </Button>

          <Box
            component="img"
            src={NotFoundImage}
            sx={{
              width: 320,
              height: 'auto',
              my: { xs: 5, sm: 10 },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
