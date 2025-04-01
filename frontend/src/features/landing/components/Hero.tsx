import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

export function Hero() {
  const { palette, typography } = useTheme();
  const { t } = useTranslation('landing');
  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };
  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        backgroundColor: palette.primary.main,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 28 },
          pb: { xs: 8, sm: 12 },
          gap: { xs: 2, sm: 5 },
        }}
      >
        <Stack spacing={3} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h2"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              lineHeight: 1.25,
              fontSize: {
                xs: typography.h3.fontSize,
                md: typography.h1.fontSize,
              },
              fontWeight: {
                xs: typography.h3.fontWeight,
                md: typography.h1.fontWeight,
              },
              color: palette.background.default,
            }}
          >
            {t('landing:hero.title')}
          </Typography>
          <Typography
            textAlign="center"
            color="text.primary"
            sx={{
              alignSelf: 'center',
              width: { sm: '100%', md: '80%' },
              color: palette.secondary.main,
              lineHeight: 1.25,
              fontSize: {
                xs: typography.body1.fontSize,
                md: typography.h4.fontSize,
              },
              fontWeight: { xs: 'none', md: typography.h3.fontWeight },
            }}
          >
            {t('landing:hero.subTitle')}
          </Typography>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: { xs: 2, md: 4 },
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{
              fontSize: {
                xs: '0.625rem',
                md: typography.body1.fontSize,
              },
              color: palette.primary.main,
            }}
            disableElevation
            onClick={() => scrollToSection('family-tree')}
          >
            Start your family tree
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              fontSize: {
                xs: '0.625rem',
                md: typography.body1.fontSize,
              },
              color: palette.primary.main,
            }}
            disableElevation
            onClick={() => scrollToSection('hub')}
          >
            Search cultural hub
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              fontSize: {
                xs: '0.625rem',
                md: typography.body1.fontSize,
              },
              color: palette.primary.main,
            }}
            disableElevation
            onClick={() => scrollToSection('tracker')}
          >
            Build migration tracker
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
