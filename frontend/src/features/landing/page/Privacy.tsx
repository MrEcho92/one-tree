import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { AppConfig } from '../../../core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function Privacy() {
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
        <title>Privacy | {AppConfig.appName}</title>
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
            Privacy Policy
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
            Welcome to {AppConfig.appName}. Your privacy is important to us.
            This Privacy Policy explains how we collect, use, and protect your
            personal information when you use our platform. Our platform is
            designed for African diaspora families to build and visualize their
            family trees, preserve cultural traditions, and track their
            migration history. By using our services, you agree to the terms
            outlined in this Privacy Policy.
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>2. Information we collect</strong>
          </Typography>
          <Typography variant="subtitle1">
            We collect the following types of information:
          </Typography>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              2.1 Personal information
            </Typography>
            <List>
              <ListItem>
                Name, email, and profile information when you create an account.
              </ListItem>
              <ListItem>
                Family details (e.g., names, relationships) when building your
                family tree.
              </ListItem>
              <ListItem>Migration history details shared by users.</ListItem>
            </List>
            <Typography variant="subtitle1" gutterBottom>
              2.2 User-generated content
            </Typography>
            <List>
              <ListItem>
                Stories, traditions, and recipes uploaded in the Cultural Hub.
              </ListItem>
              <ListItem>
                Photos, videos, and documents related to family heritage.
              </ListItem>
            </List>
          </Box>
          <Typography variant="subtitle1" gutterBottom>
            2.3 Technical data
          </Typography>
          <List>
            <ListItem>
              Device information, IP address, and browser type for security and
              analytics.
            </ListItem>
            <ListItem>
              Cookies to improve user experience and platform functionality.
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom>
            <strong>3. How we use your information</strong>
          </Typography>
          <Typography variant="subtitle1">
            We collect the following types of information:
          </Typography>
          <Typography>
            - Provide and improve family tree visualization, cultural content
            sharing, and migration tracking.
            <br />
            - Enable collaboration between family members.
            <br />- Personalize your experience based on your interactions.
            <br />- Ensure platform security and prevent unauthorized access.
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>4. Sharing and disclosure</strong>
          </Typography>
          <Typography variant="subtitle1">
            We do not sell your data. However, we may share it with:
          </Typography>
          <Typography variant="subtitle1">
            - Other family members with whom you choose to collaborate.
            <br />
            - Service providers assisting in hosting, analytics, or app
            functionalities.
            <br />- Legal authorities when required by law.
          </Typography>
          <Typography variant="subtitle1">
            Your personal data is <strong>never publicly visible</strong> unless
            you choose to share it.
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>5. Data security</strong>
          </Typography>
          <Typography variant="subtitle1">
            We implement security measures to protect your data but cannot
            guarantee absolute security. Users are encouraged to use strong
            passwords and keep their credentials private. We implement strong
            security measures, including:
          </Typography>
          <Typography variant="subtitle1">
            - Encryption: Protecting stored and transmitted data.
            <br />
            - Access Control: Only authorized users can edit family trees.
            <br />- Regular Audits: To ensure compliance with security
            standards.
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>6. Your rights</strong>
          </Typography>
          <Typography variant="subtitle1">
            - Access & Edit: You can view, update, or delete your data anytime.
            <br />
            - Account Deletion: Request full account removal by contacting
            support.
            <br />- Privacy Settings: Control who can see your family tree and
            cultural content.
          </Typography>
          <Typography variant="subtitle1">
            For any concerns, contact us at {AppConfig.appContactEmail}.
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>7. Changes to this policy</strong>
          </Typography>
          <Typography variant="subtitle1">
            We may update this policy to reflect improvements or legal
            requirements. Significant changes will be communicated through the
            app or via email.
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>8. Contact us</strong>
          </Typography>
          <Typography variant="subtitle1">
            For any questions regarding this Privacy Policy, please contact us
            at {AppConfig.appContactEmail}.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
