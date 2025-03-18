import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { AppConfig } from '../../../core';
import Button from '@mui/material/Button';

export default function Privacy() {
  const { palette, typography } = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: 10, sm: 12 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Helmet>
        <title>Privacy | {AppConfig.appName}</title>
        <meta name="description" content="Find out about our privacy" />
      </Helmet>
      <Container maxWidth="lg">Privacy</Container>
    </Box>
  );
}
