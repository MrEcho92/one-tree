import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';

export function Instructions() {
  const { palette, typography } = useTheme();
  const { t } = useTranslation(['common', 'landing']);
  const navigate = useNavigate();
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
                    md: typography.h2.fontSize,
                  },
                  fontWeight: {
                    xs: typography.h3.fontWeight,
                    md: typography.h1.fontWeight,
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
                  gap: 4,
                  color: palette.text.secondary,
                  borderRadius: '8px',
                  p: 4,
                  backgroundColor: palette.background.paper,
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <ChevronRightIcon color="primary" />
                  <Typography variant="body1">
                    {t('landing:instructions.steps.stepOne')}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <ChevronRightIcon color="primary" />
                  <Typography variant="body1">
                    {t('landing:instructions.steps.stepTwo')}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <ChevronRightIcon color="primary" />
                  <Typography variant="body1">
                    {t('landing:instructions.steps.stepThree')}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="info"
                onClick={() => navigate('/auth/signup')}
              >
                {t('common:signUp')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
