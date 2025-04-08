import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import familyLogo from '../assets/black-family.png';

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
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          pt: { xs: 14, sm: 18 },
          pb: { xs: 8, sm: 12 },
          gap: 8,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Stack
            spacing={3}
            useFlexGap
            sx={{
              width: '100%',
              pb: 2,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                display: 'flex',
                flexDirection: 'row',
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
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              {t('landing:hero.title')}
            </Typography>
            <Typography
              color="text.primary"
              sx={{
                width: '100%',
                color: palette.secondary.main,
                lineHeight: 1.25,
                fontSize: {
                  xs: typography.body1.fontSize,
                  md: typography.h4.fontSize,
                },
                fontWeight: { xs: 'none', md: typography.h3.fontWeight },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              {t('landing:hero.subTitle')}
            </Typography>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: { xs: 'space-around', md: 'flex-start' },
              alignItems: 'center',
              gap: { xs: 1, md: 4 },
            }}
          >
            <Button
              variant="contained"
              size="small"
              color="secondary"
              sx={{
                fontSize: {
                  xs: '0.8rem',
                  sm: '0.9rem',
                  md: typography.body1.fontSize,
                },
                width: { xs: '100%', sm: 'auto' },
                color: palette.primary.main,
                whiteSpace: 'nowrap',
                textAlign: 'center',
              }}
              disableElevation
              onClick={() => scrollToSection('family-tree')}
            >
              Start your family tree
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              sx={{
                fontSize: {
                  xs: '0.8rem',
                  sm: '0.9rem',
                  md: typography.body1.fontSize,
                },
                width: { xs: '100%', sm: 'auto' },
                color: palette.primary.main,
                whiteSpace: 'nowrap',
                textAlign: 'center',
              }}
              disableElevation
              onClick={() => scrollToSection('hub')}
            >
              Search cultural hub
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              sx={{
                fontSize: {
                  xs: '0.8rem',
                  sm: '0.9rem',
                  md: typography.body1.fontSize,
                },
                width: { xs: '100%', sm: 'auto' },
                color: palette.primary.main,
                whiteSpace: 'nowrap',
                textAlign: 'center',
              }}
              disableElevation
              onClick={() => scrollToSection('tracker')}
            >
              Migration tracker
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <img
            src={familyLogo}
            alt="beautiful family smiling"
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'fill',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
