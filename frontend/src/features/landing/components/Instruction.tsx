import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';

export function Instructions() {
  const { palette, typography } = useTheme();
  const { t } = useTranslation(['common', 'landing']);
  return (
    <Box id="instructions">
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 2, sm: 4 },
        }}
      >
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <Typography
                sx={{
                  textAlign: 'center',
                  fontSize: {
                    xs: typography.h4.fontSize,
                    md: typography.h3.fontSize,
                  },
                  fontWeight: {
                    xs: typography.h3.fontWeight,
                    md: typography.h3.fontWeight,
                  },
                  color: palette.text.primary,
                }}
              >
                {t('landing:instructions.gettingStarted')}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  color: palette.text.secondary,
                  borderRadius: '8px',
                  p: 2,
                  backgroundColor: palette.background.paper,
                }}
              >
                <Typography component="text" variant="body1">
                  {t('landing:instructions.steps.stepOne')}
                </Typography>

                <Typography component="text" variant="body1">
                  {t('landing:instructions.steps.stepTwo')}
                </Typography>

                <Typography component="text" variant="body1">
                  {t('landing:instructions.steps.stepThree')}
                </Typography>
              </Box>
              <Button variant="text">{t('common:signUp')}</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
