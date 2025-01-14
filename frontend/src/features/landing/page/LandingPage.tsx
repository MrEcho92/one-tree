import Box from '@mui/material/Box';
import { Hero } from '../components/Hero';
import { SectionTwo } from '../components/SectionTwo';
import { Features } from '../components/Features';

export function LandingPage() {
  return (
    <Box>
      <Hero />
      <SectionTwo />
      <Features />
    </Box>
  );
}
