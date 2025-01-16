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
            textAlign: { sm: 'left', md: 'center' },
            gap: 2
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
            Your Heritage, Your Story
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: palette.background.default, py: { xs: 1, md: 2 } }}
          >
            Don’t let your family’s history fade. Join a growing community of
            families documenting and celebrating their heritage.
          </Typography>
          <Button variant="contained" color="secondary">
            Start Your Journey
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
