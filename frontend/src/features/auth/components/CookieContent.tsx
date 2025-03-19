import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Slide,
  Divider,
  FormGroup,
  FormControlLabel,
  Switch,
  Link,
  Stack,
} from '@mui/material';
import CookieIcon from '@mui/icons-material/Cookie';
import Cookies from 'js-cookie';

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required?: boolean;
}

interface CookiePreferences {
  [key: string]: boolean;
}

interface CookieConsentProps {
  cookiePolicyUrl?: string;
  onAccept?: (preferences: CookiePreferences) => void;
  onDecline?: () => void;
  cookieExpires?: number;
}

const cookieCategories: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Necessary',
    description:
      'Essential cookies that enable basic functionality of the website.',
    required: true,
  },
  {
    id: 'functional',
    name: 'Functional',
    description:
      'Cookies that enhance the functionality of the website, such as remembering your preferences.',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description:
      'Cookies that help us understand how you interact with our website.',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Cookies used to deliver advertisements more relevant to you.',
  },
];

const CookieConsent: React.FC<CookieConsentProps> = ({
  cookiePolicyUrl = '/cookie-policy',
  onAccept = () => {},
  onDecline = () => {},
  cookieExpires = 365, // Default: 1 year
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(
    cookieCategories.reduce((acc: CookiePreferences, category) => {
      acc[category.id] = category.required || false;
      return acc;
    }, {}),
  );

  useEffect(() => {
    const consentCookie = Cookies.get('cookieConsent');

    if (!consentCookie) {
      setOpen(true);
    } else {
      try {
        const savedPrefs = Cookies.get('cookiePreferences');
        if (savedPrefs) {
          setPreferences(JSON.parse(savedPrefs));
        }
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  const handleToggle = (id: string): void => {
    if (id === 'necessary') return;
    setPreferences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAcceptAll = (): void => {
    const allAccepted = cookieCategories.reduce(
      (acc: CookiePreferences, category) => {
        acc[category.id] = true;
        return acc;
      },
      {},
    );
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };

  const handleSavePreferences = (): void => {
    saveConsent(preferences);
  };

  const handleDeclineAll = (): void => {
    const onlyNecessary = cookieCategories.reduce(
      (acc: CookiePreferences, category) => {
        acc[category.id] = category.required || false;
        return acc;
      },
      {},
    );

    setPreferences(onlyNecessary);
    saveConsent(onlyNecessary);
    onDecline();
  };

  const saveConsent = (prefs: CookiePreferences): void => {
    const cookieOptions = {
      expires: cookieExpires,
      sameSite: 'strict' as const,
      secure: window.location.protocol === 'https:',
    };

    // Save consent and preferences as cookies
    Cookies.set('cookieConsent', 'true', cookieOptions);
    Cookies.set('cookiePreferences', JSON.stringify(prefs), cookieOptions);

    // For GDPR compliance, set a cookie with timestamp (proves when consent was given)
    Cookies.set(
      'cookieConsentTimestamp',
      new Date().toISOString(),
      cookieOptions,
    );

    applyCookiePreferences(prefs);

    onAccept(prefs);

    setOpen(false);
  };

  const applyCookiePreferences = (prefs: CookiePreferences): void => {
    const allCookies = Cookies.get();

    if (!prefs.analytics) {
      // Example: removing Google Analytics cookies
      Object.keys(allCookies).forEach((cookie) => {
        if (cookie.startsWith('_ga') || cookie.startsWith('_gid')) {
          Cookies.remove(cookie);
        }
      });
    }

    if (!prefs.marketing) {
      // Example: removing common marketing cookies
      Object.keys(allCookies).forEach((cookie) => {
        if (cookie.startsWith('_fbp') || cookie.includes('ads')) {
          Cookies.remove(cookie);
        }
      });
    }
  };

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Paper
        elevation={8}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          p: 3,
          borderRadius: '16px 16px 0 0',
          maxHeight: expanded ? '80vh' : '30vh',
          overflow: 'auto',
          transition: 'max-height 0.3s ease-in-out',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CookieIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="h2">
            Cookie Settings
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          We use cookies to enhance your browsing experience, serve personalized
          ads or content, and analyze our traffic. By clicking "Accept All", you
          consent to our use of cookies as described in our{' '}
          <Link href={cookiePolicyUrl} target="_blank" rel="noopener">
            Cookie Policy
          </Link>
          .
        </Typography>

        {expanded && (
          <>
            <Divider sx={{ my: 2 }} />

            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 'bold', mt: 2 }}
            >
              Manage Consent Preferences
            </Typography>

            <FormGroup>
              {cookieCategories.map((category) => (
                <Box key={category.id} sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences[category.id]}
                        onChange={() => handleToggle(category.id)}
                        disabled={category.required}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2" component="span">
                        {category.name} {category.required && '(Required)'}
                      </Typography>
                    }
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', ml: 4 }}
                  >
                    {category.description}
                  </Typography>
                </Box>
              ))}
            </FormGroup>
          </>
        )}

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mt: 3 }}
          justifyContent="space-between"
        >
          <Button
            color="inherit"
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{ alignSelf: 'flex-start' }}
          >
            {expanded ? 'Hide Details' : 'Customize Settings'}
          </Button>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeclineAll}
              size="small"
            >
              Decline All
            </Button>

            {expanded ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSavePreferences}
                size="small"
              >
                Save Preferences
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAcceptAll}
                size="small"
              >
                Accept All
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>
    </Slide>
  );
};

export default CookieConsent;
