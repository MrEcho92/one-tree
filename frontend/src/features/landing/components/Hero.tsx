import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function Hero() {
  const { palette, typography } = useTheme();
  const { t } = useTranslation('landing');
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
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h2"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
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
              fontSize: {
                xs: typography.fontSize,
                md: typography.body1.fontSize,
              },
              fontWeight: { xs: 'none', md: typography.h3.fontWeight },
            }}
          >
            {t('landing:hero.subTitle')}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
