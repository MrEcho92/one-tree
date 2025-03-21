import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';

export function Features() {
  const { palette, typography } = useTheme();
  const { t } = useTranslation('landing');
  return (
    <Box id="features">
      <Container
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 7 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
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
            {t('landing:features.title')}
          </Typography>
          <Typography
            sx={{
              color: palette.text.primary,
              fontSize: typography.body1.fontSize,
              py: { xs: 2, md: 3 },
            }}
          >
            {t('landing:features.subTitle')}
          </Typography>
        </Box>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                background: palette.primary.main,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    color: palette.primary.contrastText,
                  }}
                >
                  <Typography component="h3" variant="h6">
                    {t('landing:features.familyTree.title')}
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: palette.primary.contrastText,
                  }}
                />
                <Box
                  sx={{
                    py: 1,
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'center',
                  }}
                >
                  <CheckCircleRoundedIcon
                    sx={{
                      width: 20,
                      color: palette.secondary.main,
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: palette.primary.contrastText,
                    }}
                  >
                    {t('landing:features.familyTree.option1')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    py: 1,
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'center',
                  }}
                >
                  <CheckCircleRoundedIcon
                    sx={{
                      width: 20,
                      color: palette.secondary.main,
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: palette.primary.contrastText,
                    }}
                  >
                    {t('landing:features.familyTree.option2')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                background: palette.primary.main,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    color: palette.primary.contrastText,
                  }}
                >
                  <Typography component="h3" variant="h6">
                    {t('landing:features.culturalHeritage.title')}
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: palette.primary.contrastText,
                  }}
                />
                <Box
                  sx={{
                    py: 1,
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'center',
                  }}
                >
                  <CheckCircleRoundedIcon
                    sx={{
                      width: 20,
                      color: palette.secondary.main,
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: palette.primary.contrastText,
                    }}
                  >
                    {t('landing:features.culturalHeritage.option1')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    py: 1,
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'center',
                  }}
                >
                  <CheckCircleRoundedIcon
                    sx={{
                      width: 20,
                      color: palette.secondary.main,
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: palette.primary.contrastText,
                    }}
                  >
                    {t('landing:features.culturalHeritage.option2')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                background: palette.primary.main,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    color: palette.primary.contrastText,
                  }}
                >
                  <Typography component="h3" variant="h6">
                    {t('landing:features.migrationTracking.title')}
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: palette.primary.contrastText,
                  }}
                />
                <Box
                  sx={{
                    py: 1,
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'center',
                  }}
                >
                  <CheckCircleRoundedIcon
                    sx={{
                      width: 20,
                      color: palette.secondary.main,
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: palette.primary.contrastText,
                    }}
                  >
                    {t('landing:features.migrationTracking.option1')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    py: 1,
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'center',
                  }}
                >
                  <CheckCircleRoundedIcon
                    sx={{
                      width: 20,
                      color: palette.secondary.main,
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: palette.primary.contrastText,
                    }}
                  >
                    {t('landing:features.migrationTracking.option2')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
