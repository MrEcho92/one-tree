import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import familyLogo from '../assets/black-family.png';
import { AppConfig } from '../../../core';

export function WhyUS() {
  const { palette, typography } = useTheme();
  const { t } = useTranslation(['common', 'landing']);
  return (
    <Box id="why-us">
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 2, sm: 4 },
          py: { xs: 3, md: 8 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: typography.h3.fontSize,
                md: typography.h2.fontSize,
              },
              fontWeight: {
                xs: typography.h3.fontWeight,
                md: typography.h1.fontWeight,
              },
              color: palette.primary.main,
            }}
          >
            Why {AppConfig.appName}?
          </Typography>
          <Typography
            sx={{
              color: palette.text.primary,
              fontSize: {
                xs: typography.body1.fontSize,
                md: '18px',
              },
              py: { xs: 2, md: 3 },
              lineHeight: '1.75',
            }}
          >
            We believe every family deserves a place to remember, celebrate, and
            pass on their story to future generations. Built for African
            diaspora families who want to stay connected to where we come from
            and who we are.
          </Typography>
        </Box>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: typography.h4.fontSize,
                    md: typography.h2.fontSize,
                  },
                  fontWeight: {
                    xs: typography.h3.fontWeight,
                    md: typography.h1.fontWeight,
                  },
                  color: palette.primary.main,
                }}
              >
                We protect your privacy.
              </Typography>
              <Typography lineHeight={1.75}>
                Your personal and family data is never sold. Information about
                living relatives stays private unless you share it or make it
                public. We protect your data with encryption, secure login, and
                regular security updates.
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ sm: 12, md: 6 }}>
            <Box
              sx={{
                flexBasis: { xs: '100%', md: '50%' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                py: { xs: 2, md: 0 },
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
                  borderRadius: '50%',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
