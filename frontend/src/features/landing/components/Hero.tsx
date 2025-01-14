import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function Hero() {
  return (
    <Box
      id="hero"
      sx={({ palette }) => ({
        width: '100%',
        backgroundColor: palette.primary.main,
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h2"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
              color: 'background.default',
            }}
          >
            Reconnect with Your Roots. Celebrate Your Heritage.
          </Typography>
          <Typography
            textAlign="center"
            color="text.primary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            An interactive platform to help African diaspora families explore
            their history, preserve cultural traditions, and collaborate across
            generations.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
