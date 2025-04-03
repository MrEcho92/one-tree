import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';

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
            py: 2,
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
            py: { xs: '0', md: 2 },
            lineHeight: '1.75',
          }}
        >
          Join the world&apos;s largest online family tree for the African
          diaspora and create a lasting legacy for future generations—no matter
          where you are.
        </Typography>
      </Box>
      <Grid container alignItems="center" justifyContent="center" pb={5}>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: palette.background.default,
              mx: { xs: 2 },
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
                  md: typography.h1.fontWeight,
                },
                color: palette.text.primary,
                pt: { xs: 2, sm: 'none' },
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
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: palette.secondary.main }}>1</Avatar>
                <Typography variant="body1">
                  {t('landing:instructions.steps.stepOne')}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: palette.secondary.main }}>2</Avatar>
                <Typography variant="body1">
                  {t('landing:instructions.steps.stepTwo')}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: palette.secondary.main }}>3</Avatar>
                <Typography variant="body1">
                  {t('landing:instructions.steps.stepThree')}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: palette.secondary.main }}>4</Avatar>
                <Typography variant="body1">
                  {t('landing:instructions.steps.stepFour')}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                py: 3,
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                color="info"
                disableElevation
                onClick={() => navigate('/app')}
              >
                Start your family tree
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/sample-trees')}
              >
                View sample trees
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
