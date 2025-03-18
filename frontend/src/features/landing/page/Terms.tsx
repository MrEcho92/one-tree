import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { AppConfig } from '../../../core';

export default function TermsAndConditions() {
  const { palette, typography } = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: '64px',
      }}
    >
      <Helmet>
        <title>Terms of use | {AppConfig.appName}</title>
        <meta name="description" content="Find out about our privacy" />
      </Helmet>
      <Box
        sx={{
          width: '100%',
          height: 300,
          backgroundColor: palette.primary.main,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{
              color: palette.primary.contrastText,
              lineHeight: 1.25,
              fontSize: {
                xs: typography.body1.fontSize,
                md: typography.h2.fontSize,
              },
              fontWeight: { xs: 'none', md: typography.h1.fontWeight },
            }}
          >
            Terms and Conditions
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: palette.primary.contrastText }}
          >
            Effective date: 18 March 2025
          </Typography>
        </Container>
      </Box>
      <Box sx={{ width: '100%', py: 4, bgcolor: palette.background.paper }}>
        <Container maxWidth="lg">
          <Typography variant="h6" gutterBottom>
            <strong>1. Introduction</strong>
          </Typography>
          <Typography variant="subtitle1">
            These Terms and Conditions ("Terms") govern your use of{' '}
            {AppConfig.appName}
            ("the App"). By accessing or using the App, you agree to be bound by
            these Terms.
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>2. User accounts</strong>
          </Typography>
          <Typography variant="subtitle1">
            - Users must provide accurate information when creating an account.
            <br />- Users are responsible for maintaining account security.
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>3. Acceptable use</strong>
          </Typography>
          <Typography variant="subtitle1">
            - Users must respect the privacy and rights of other family members.
            <br />
            - Users may not upload harmful, offensive, or unlawful content.
            <br />- Users must not attempt to hack or disrupt the service.
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>4. Intellectual property</strong>
          </Typography>
          <Typography variant="subtitle1">
            - Users retain ownership of content they upload but grant the App a
            license to display and distribute it within the App.
            <br />- The App&apos;s design, features, and trademarks belong to{' '}
            {AppConfig.appName}.
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>5. Limitation of liability</strong>
          </Typography>
          <Typography variant="subtitle1">
            We are not responsible for:
          </Typography>
          <Typography variant="subtitle1">
            - Data loss due to user error or third-party breaches.
            <br />
            - Inaccuracies in user-uploaded content.
            <br />- Any damages arising from the use of the App.
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>6. Termination</strong>
          </Typography>
          <Typography variant="subtitle1">
            We reserve the right to suspend or terminate accounts that violate
            these Terms.
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>7. Governing law</strong>
          </Typography>
          <Typography variant="subtitle1">
            These Terms shall be governed by the laws of the United Kingdom.
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>8. Changes to terms</strong>
          </Typography>
          <Typography variant="subtitle1">
            We may update these Terms at any time. Continued use of the App
            constitutes acceptance of the new Terms.
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>9. Contact us</strong>
          </Typography>
          <Typography variant="subtitle1">
            For inquiries about these Terms, please contact us at{' '}
            {AppConfig.appContactEmail}.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
