import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import recordLogo from '../assets/history-record.jpg';
import Container from '@mui/material/Container';

export function HubSection() {
  const { palette, typography } = useTheme();
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
  return (
    <Box
      id="hub"
      sx={{
        bgcolor: palette.primary.main,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              color: palette.primary.contrastText,
              gap: 2,
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
              }}
            >
              Search our cultural hub for African records
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: typography.body1.fontSize,
                  md: '18px',
                },
                py: { xs: 2, md: 3 },
                lineHeight: '1.5',
              }}
            >
              We&apos;ve gathered one of the world&apos;s largest collections of
              African records, featuring real stories on marriage, food,
              recipes, traditions, and languages.
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: typography.body1.fontSize,
                  md: '18px',
                },
                pb: { md: 3 },
              }}
            >
              Do you want to know more about Africa? Explore African culture,
              traditions, and stories passed down through generations. Discover
              recipes, languages, and customs that keep our heritage alive.
            </Typography>
            <div>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  alignSelf: 'center',
                  width: 'auto',
                  color: palette.primary.main,
                }}
                onClick={() => navigate('/hub')}
                disableElevation
              >
                Search our records
              </Button>
            </div>
          </Box>
          <Box
            sx={{
              flexBasis: '100%',
              height: '100%',
              py: { xs: 2, md: 0 },
            }}
          >
            <img
              src={recordLogo}
              alt="history records"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'fill',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
