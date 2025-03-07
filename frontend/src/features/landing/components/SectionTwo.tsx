import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import familyLogo from '../assets/black-family.png';

export function SectionTwo() {
  const { palette, typography } = useTheme();
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
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
          onClick={() => navigate('/app')}
        >
          {t('landing:sectionTwo.btnCTA')}
        </Button>
      </Stack>
    </Box>
  );
}
