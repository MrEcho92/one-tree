import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import mapLogo from '../assets/map-with-pin.jpg';
import Container from '@mui/material/Container';

export function TrackerSection() {
  const { palette, typography } = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      id="tracker"
      sx={{
        bgcolor: palette.background.default,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            alignItems: 'flex-start',
            gap: 6,
          }}
        >
          <Box
            sx={{
              flexBasis: '100%',
              height: '100%',
              py: { xs: 2, md: 0 },
            }}
          >
            <img
              src={mapLogo}
              alt="map with pins"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'fill',
              }}
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: 1,
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
              }}
            >
              Migration Tracking
            </Typography>
            <Typography variant="subtitle1">
              Your family&apos;s journey is part of your history. Preserve it
              for future generations.
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
              📍 Document your journey – Capture your family&apos;s migration
              story, from ancestral roots to present-day locations, and pass it
              down through generations.
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
              🗺️ Interactive map – Visualize migration routes, key milestones,
              and historical movements with an easy-to-use, dynamic map.
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
              🔗 Connect the past to the present – Understand how your
              family&apos;s journey shaped your identity and share this
              knowledge with loved ones.
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
                Build a migration timeline
              </Button>
            </div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
