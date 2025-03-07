import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function About() {
  const { palette, typography } = useTheme();
  return (
    <Box mt="64px">
      <Container
        maxWidth="xl"
        component="main"
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
              fontSize: {
                xs: typography.h3.fontSize,
                md: typography.h1.fontSize,
              },
              fontWeight: {
                xs: typography.h3.fontWeight,
                md: typography.h1.fontWeight,
              },
              color: palette.background.default,
            }}
          >
            jbjllknkl
          </Typography>
          <Typography
            textAlign="center"
            color="text.primary"
            sx={{
              alignSelf: 'center',
              width: { sm: '100%', md: '80%' },
              color: palette.secondary.main,
              fontSize: {
                xs: typography.fontSize,
                md: typography.body1.fontSize,
              },
              fontWeight: { xs: 'none', md: typography.h3.fontWeight },
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
            consectetur cupiditate veniam porro nisi aperiam dolores mollitia.
            Magnam nulla aliquid alias reiciendis quam, ipsam mollitia. Unde
            corporis harum ea voluptates?
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
