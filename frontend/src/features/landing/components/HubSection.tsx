import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import familyLogo from '../assets/black-family.png';

export function HubSection() {
  const { palette, typography } = useTheme();
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
  return (
    <Box
      id="hub"
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' },
        bgcolor: palette.primary.main,
      }}
    >
      <Stack
        spacing={3}
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
            lineHeight: 1.25,
            fontSize: {
              xs: typography.h4.fontSize,
              md: typography.h3.fontSize,
            },
            fontWeight: {
              xs: typography.h3.fontWeight,
              md: typography.h1.fontWeight,
            },
            color: palette.text.primary,
          }}
        >
        Search for stories in our newspaper archives 
        </Typography>
        <Typography>Millions of Historical Records</Typography>
        <Typography>We’ve gathered one of the world’s largest collections of important British genealogical records.</Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            alignSelf: 'center',
            width: 'auto',
            color: palette.primary.main,
          }}
          onClick={() => navigate('/app')}
        >
          {t('landing:sectionTwo.btnCTA')}
        </Button>
      </Stack>
    </Box>
  );
}
