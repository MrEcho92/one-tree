import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>About us | {AppConfig.appName}</title>
        <meta name="description" content="Find out more about us" />
      </Helmet>
      <Typography
        textAlign="center"
        color="text.primary"
        sx={{
          alignSelf: 'center',
          color: palette.info.main,
          fontSize: {
            xs: typography.h4.fontSize,
            md: typography.h1.fontSize,
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
        <Typography textAlign="center" sx={{ lineHeight: { xs: 1.5, md: 2 } }}>
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
          sx={{ bgcolor: palette.secondary.main, p: 8, my: 2, borderRadius: 2 }}
        >
          <Typography
            textAlign="center"
            sx={{
              color: palette.primary.dark,
              fontSize: {
                xs: typography.h4.fontSize,
                md: typography.h3.fontSize,
              },
              fontWeight: { xs: 'none', md: typography.h1.fontWeight },
            }}
          >
            Our Mission
          </Typography>
          <Typography
            textAlign="center"
            variant="body1"
            sx={{ lineHeight: { xs: 1.5, md: 2 } }}
          >
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
                xs: typography.h4.fontSize,
                md: typography.h3.fontSize,
              },
              fontWeight: { xs: 'none', md: typography.h1.fontWeight },
              py: 2,
            }}
          >
            Our Team
          </Typography>
          <Typography
            textAlign="center"
            sx={{ lineHeight: { xs: 1.5, md: 2 } }}
          >
            Our team is made up of passionate individuals who are dedicated to
            creating a platform that empowers African diaspora families to
            preserve and celebrate their cultural heritage. We&apos;re a team of
            developers, designers, and cultural heritage experts who are
            committed to delivering a world-class platform.
          </Typography>
        </Container>
      </Box>
      <Box
        id="about-section-4"
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
                xs: typography.h4.fontSize,
                md: typography.h3.fontSize,
              },
              fontWeight: { xs: 'none', md: typography.h1.fontWeight },
              py: 2,
            }}
          >
            Join Us
          </Typography>
          <Typography
            textAlign="center"
            sx={{ lineHeight: { xs: 1.5, md: 2 } }}
          >
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
