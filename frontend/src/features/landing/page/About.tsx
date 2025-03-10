import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { AppConfig } from '../../../core';
import Button from '@mui/material/Button';

export default function About() {
  const { palette, typography } = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: 14, sm: 20 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Typography
        textAlign="center"
        color="text.primary"
        sx={{
          alignSelf: 'center',
          color: palette.secondary.contrastText,
          fontSize: {
            xs: typography.body1.fontSize,
            md: typography.h4.fontSize,
          },
          fontWeight: { xs: 'none', md: typography.h1.fontWeight },
          width: { xs: '80%', md: '60%' },
          pb: 4,
          mb: 2,
        }}
      >
        Preserving Heritage, Connecting Generations
      </Typography>
      <Container maxWidth="md">
        <Typography textAlign={'center'}>
          Welcome to {`${AppConfig.appName}`} – where your family&apos;s unique
          journey is honored, preserved, and celebrated.{' '}
          {`${AppConfig.appName}`} was born from a simple observation: as
          African diaspora families build lives all over the world, vital
          stories, traditions, and connections risk being lost between
          generations. Our platform serves as the bridge between your past and
          future, helping your family maintain its cultural identity while
          strengthening bonds across generations.
        </Typography>
      </Container>
      <Box
        id="about-section-2"
        sx={{
          width: '100%',
          py: 6,
        }}
      >
        <Container
          maxWidth="md"
          sx={{ bgcolor: palette.secondary.main, p: 5, my: 2, borderRadius: 2 }}
        >
          <Typography
            textAlign="center"
            sx={{
              color: palette.info.main,
              fontSize: {
                xs: typography.body1.fontSize,
                md: typography.h3.fontSize,
              },
              fontWeight: { xs: 'none', md: typography.h1.fontWeight },
              py: 2,
            }}
          >
            Our mission
          </Typography>
          <Typography textAlign="center" variant="body1">
            We believe every family has a story worth preserving. Our platform
            helps African diaspora families reconnect with their heritage,
            document traditions, and celebrate their journey across generations.
          </Typography>
        </Container>
      </Box>
      <Box
        id="about-section-3"
        sx={{
          width: '100%',
          bgcolor: palette.primary.contrastText,
          py: 6,
        }}
      >
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography
            textAlign="center"
            sx={{
              color: palette.primary.main,
              fontSize: {
                xs: typography.body1.fontSize,
                md: typography.h3.fontSize,
              },
              fontWeight: { xs: 'none', md: typography.h1.fontWeight },
              py: 2,
            }}
          >
            Who We Serve
          </Typography>
          <Typography textAlign="center">
            We are building this platform for African diaspora families all over
            the world, especially first- and second-generation members who want
            to explore their roots, share cultural knowledge, and stay connected
            despite geographic distance.
          </Typography>
        </Container>
      </Box>
      <Box
        id="about-section-4"
        sx={{
          width: '100%',
          bgcolor: palette.primary.main,
          py: 6,
        }}
      >
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography
            textAlign="center"
            sx={{
              color: palette.secondary.main,
              fontSize: {
                xs: typography.body1.fontSize,
                md: typography.h3.fontSize,
              },
              fontWeight: { xs: 'none', md: typography.h1.fontWeight },
              py: 2,
            }}
          >
            Why It Matters
          </Typography>
          <Typography
            textAlign="center"
            sx={{ color: palette.primary.contrastText }}
          >
            For many in the African diaspora, staying connected to family and
            culture can be challenging. We provide a space to preserve history,
            strengthen family bonds, and celebrate cultural identity—all in one
            place.
          </Typography>
        </Container>
      </Box>
      <Box
        id="about-section-5"
        sx={{
          width: '100%',
          bgcolor: palette.primary.contrastText,
          py: 6,
        }}
      >
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography
            textAlign="center"
            sx={{
              color: palette.primary.main,
              fontSize: {
                xs: typography.body1.fontSize,
                md: typography.h3.fontSize,
              },
              fontWeight: { xs: 'none', md: typography.h1.fontWeight },
              py: 2,
            }}
          >
            Our Team
          </Typography>
          <Typography textAlign="center">
            Our team is made up of passionate individuals who are dedicated to
            creating a platform that empowers African diaspora families to
            preserve and celebrate their cultural heritage. We&apos;re a team of
            developers, designers, and cultural heritage experts who are
            committed to delivering a world-class platform.
          </Typography>
        </Container>
      </Box>
      <Box
        id="about-section-6"
        sx={{
          width: '100%',
          py: 6,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            py: 6,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              color: palette.info.main,
              fontSize: {
                xs: typography.body1.fontSize,
                md: typography.h3.fontSize,
              },
              fontWeight: { xs: 'none', md: typography.h1.fontWeight },
              py: 2,
            }}
          >
            Join Us
          </Typography>
          <Typography>
            Be part of a growing community dedicated to keeping family legacies
            alive. Start building your family&apos;s story today! 🚀
          </Typography>
          <Button
            sx={{ mt: 2 }}
            variant="text"
            onClick={() => navigate('/auth/signup')}
          >
            START YOUR JOURNEY
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
