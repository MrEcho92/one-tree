import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function Features() {
  const { palette, typography } = useTheme();
  const { t } = useTranslation('landing');
  return (
    <Box
      id="section2"
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box
        sx={{
          flexBasis: { xs: '100%', md: '50%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 400,
          py: { xs: 2, md: 0 }
        }}
      >
        <img
          srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
          alt="Family Tree"
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Stack
        spacing={2}
        useFlexGap
        sx={{
          flexBasis: { xs: '100%', md: '50%' },
          py: { xs: 4, md: 4 },
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
            color: palette.text.primary,
          }}
        >
          {t('landing:sectionTwo.title')}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            alignSelf: 'center',
            width: 'auto',
          }}
        >
          {t('landing:sectionTwo.btnCTA')}
        </Button>
      </Stack>
    </Box>
  );
}
