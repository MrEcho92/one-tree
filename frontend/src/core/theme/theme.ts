import { createTheme, ThemeOptions } from '@mui/material';

const themeOptions: ThemeOptions = {
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: 'white',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#086A33', // Deep Green
      contrastText: '#FFFFFF', // White text for buttons, headers
      dark: '#6E7783',
    },
    secondary: {
      main: '#FBB13C', // Golden Yellow
      contrastText: '#000000', // Black text for high contrast
    },
    background: {
      default: '#F4F1EA', // Warm Beige for app background
      paper: '#FFFFFF', // White for card-like elements
    },
    text: {
      primary: '#333333', // Dark gray for text
      secondary: '#6E7783', // Slate Gray for muted text
    },
    info: {
      main: '#118AB2', // Teal Blue for informative or secondary actions
    },
    common: {
      white: '#EEEEE',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    fontSize: 14, // Base size for readability
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 500 },
    h3: { fontSize: '1.75rem', fontWeight: 500 },
    h4: { fontSize: '1.5rem', fontWeight: 500 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
    button: { fontWeight: 600, textTransform: 'none' }, // Avoid full uppercase for readability
  },
};

export const theme = createTheme({ ...themeOptions });
