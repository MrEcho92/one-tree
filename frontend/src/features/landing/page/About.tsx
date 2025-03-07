import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function About() {
  const { palette, typography } = useTheme();
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
        We make it easy for families to connect with their family stories,
        traditions and families. Connecting with each other and visualising
        their family stories.
      </Typography>
      <Box
        id="about-section-2"
        sx={{
          width: '100%',
          py: 6,
        }}
      >
        <Container maxWidth="md" sx={{ bgcolor: palette.secondary.main, p: 5, my: 2, borderRadius: 2 }}>
          <Typography
            textAlign="center"
            sx={{
              color: palette.info.main,
              fontSize: {
                xs: typography.body1.fontSize,
                md: typography.h3.fontSize,
              },
              fontWeight: { xs: 'none', md: typography.h1.fontWeight },
              pb: 2,
            }}
          >
            Our mission
          </Typography>
          <Typography textAlign="center" variant='body1'>
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
        <Container maxWidth="sm">
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
            We are building this platform for African diaspora families all over the world, especially first- and second-generation members who
            want to explore their roots, share cultural knowledge, and stay
            connected despite geographic distance.
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
        <Container maxWidth="sm">
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
          py: 6,
        }}
      >
        <Container maxWidth="sm">
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
            Join Us
          </Typography>
          <Typography textAlign="center">
            Be part of a growing community dedicated to keeping family legacies
            alive. Start building your family&apos;s story today! 🚀
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
