import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export function Feedbacks() {
  const { typography } = useTheme();
  const { t } = useTranslation('landing');
  return (
    <Box id="feedbacks">
      <Container
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            gutterBottom
            sx={{
              color: 'text.primary',
              fontSize: {
                xs: typography.h3.fontSize,
                md: typography.h2.fontSize,
              },
              fontWeight: {
                xs: typography.h3.fontWeight,
              },
            }}
          >
            {t('landing:feedbacks.title')}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'text.secondary' }}
                >
                  {t('landing:feedbacks.feedbackOne.description')}
                </Typography>
              </CardContent>
              <Typography p={2} fontStyle="italic">
                {t('landing:feedbacks.feedbackOne.givenBy')}
              </Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'text.secondary' }}
                >
                  {t('landing:feedbacks.feedbackTwo.description')}
                </Typography>
              </CardContent>
              <Typography p={2} fontStyle="italic">
                {t('landing:feedbacks.feedbackTwo.givenBy')}
              </Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'text.secondary' }}
                >
                  {t('landing:feedbacks.feedbackThree.description')}
                </Typography>
              </CardContent>
              <Typography p={2} fontStyle="italic">
                {t('landing:feedbacks.feedbackThree.givenBy')}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
