import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Grid from '@mui/material/Grid2';

export function FamilyTreeSection() {
  const { palette, typography } = useTheme();
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
  return (
    <Box
      id="family-tree"
      sx={{
        width: '100%',
        bgcolor: palette.background.paper,
      }}
    >
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          p: 6,
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
          Build your tree to connect your family&apos;s history.
        </Typography>
        <Typography
          sx={{
            color: palette.text.primary,
            fontSize: {
              xs: typography.body1.fontSize,
              md: '18px',
            },
            py: { xs: 2, md: 2 },
            lineHeight: '1.75',
          }}
        >
          Join the world&apos;s largest online family tree for the African
          diaspora and create a lasting legacy for future generations—no matter
          where you are.
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="center" justifyContent="center" py={4}>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Button>Start your family tree</Button>
            <Button>View sample tree</Button>
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
