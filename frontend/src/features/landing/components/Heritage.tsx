import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export function Heritage() {
  const { palette, typography } = useTheme();
  const { t } = useTranslation('landing');
  return (
    <Box id="heritage" sx={{ backgroundColor: palette.primary.main }}>
      <Container
        sx={{
          pt: { xs: 4, sm: 8 },
          pb: { xs: 8, sm: 12 },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: 'center',
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
              color: palette.primary.contrastText,
            }}
          >
            {t('landing:heritage.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: palette.background.default,
              py: { xs: 1, md: 2 },
              fontSize: {
                xs: typography.body2.fontSize,
                md: typography.body1.fontSize,
              },
            }}
          >
            {t('landing:heritage.subTitle')}
          </Typography>
          <Button variant="contained" color="secondary">
            {t('landing:heritage.btnTitle')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
