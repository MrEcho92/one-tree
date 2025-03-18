import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { AppConfig } from '../../../core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function CookiesPolicy() {
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
        <title>Cookie Policy | {AppConfig.appName}</title>
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
              fontWeight: { xs: 'none', md: typography.h3.fontWeight },
            }}
          >
            Cookie Policy
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
            Welcome to {AppConfig.appName}. This Cookie Policy explains how we
            use cookies and similar tracking technologies when you visit our
            platform. Our platform helps African diaspora families connect by
            building family trees, sharing cultural traditions, and tracking
            migration history. To provide a seamless experience, we use cookies
            to enhance functionality and improve security. By using our website,
            you agree to our use of cookies as described in this policy.
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>2. What are Cookies?</strong>
          </Typography>
          <Typography variant="subtitle1">
            Cookies are small text files stored on your device when you visit a
            website. They help websites remember user preferences, improve
            functionality, and track analytics.
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>3. How we use Cookies</strong>
          </Typography>
          <Typography variant="subtitle1">
            We use cookies for the following purposes:
          </Typography>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              3.1 Essential Cookies (Required)
            </Typography>
            <List>
              <Typography variant="subtitle1">
                These cookies are necessary for the platform to function
                properly. They help with:
              </Typography>
              <ListItem>
                User authentication (e.g., keeping you logged in).
              </ListItem>
              <ListItem>
                Security measures to prevent unauthorized access.
              </ListItem>
              <ListItem>Session management for smooth navigation.</ListItem>
            </List>
            <Typography variant="subtitle1" gutterBottom>
              3.2 Functional Cookies (Optional)
            </Typography>
            <List>
              <Typography variant="subtitle1">
                These cookies improve your experience by remembering
                preferences, such as:
              </Typography>
              <ListItem>Your selected language or region.</ListItem>
              <ListItem>
                Display settings for your family tree visualization.
              </ListItem>
            </List>
          </Box>
          <Typography variant="subtitle1" gutterBottom>
            3.3 Analytics Cookies (Optional)
          </Typography>
          <List>
            <Typography variant="subtitle1" gutterBottom>
              We use these cookies to understand how users interact with our
              platform, helping us improve features.
            </Typography>
            <ListItem>
              Track page visits and engagement with family trees and cultural
              content.
            </ListItem>
            <ListItem>Monitor site performance and fix bugs.</ListItem>
          </List>
          <Typography variant="subtitle1" gutterBottom>
            3.4 Third-Party Cookies
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            We may use trusted third-party services (e.g., Google Analytics) to
            track platform performance. These cookies collect anonymous data and
            do not store personal details.
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
            <strong>4. How to manage Cookies</strong>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            You can control or delete cookies through your browser settings:
          </Typography>
          <Typography variant="subtitle1">
            - Block or delete cookies in your browser preferences.
            <br />- Adjust settings to disable non-essential cookies.
            <br />
            - Opt out of analytics tracking (if applicable).
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Please note: Disabling essential cookies may affect platform
            functionality, including login access and collaboration features.
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>5. Updates to this Cookie Policy</strong>
          </Typography>
          <Typography variant="subtitle1">
            We may update this policy to reflect platform improvements or legal
            changes. Significant updates will be communicated to users.
          </Typography>
          <Typography variant="caption">Last updated: 18 March 2025</Typography>

          <Typography variant="h6" gutterBottom>
            <strong>6. Contact us</strong>
          </Typography>
          <Typography variant="subtitle1">
            For questions about this Cookie Policy, contact us at{' '}
            {AppConfig.appContactEmail}.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
