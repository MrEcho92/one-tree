import { Box } from '@mui/material';

export function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        backgroundColor: 'background.default',
        color: 'text.secondary',
        bottom: 0,
        width: '100%',
      }}
    >
      <p>&copy; {new Date().getFullYear()} Onetree</p>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <a href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>
          About us
        </a>
        <a href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>
          Contact us
        </a>
        <a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>
          Privacy policy
        </a>
      </Box>
    </Box>
  );
}
