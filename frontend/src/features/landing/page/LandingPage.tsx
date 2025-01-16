import Box from '@mui/material/Box';
import { Hero } from '../components/Hero';
import { SectionTwo } from '../components/SectionTwo';
import { Features } from '../components/Features';
import { Instructions } from '../components/Instruction';
import { Feedbacks } from '../components/Feedbacks';
import { Heritage } from '../components/Heritage';

export function LandingPage() {
  return (
    <Box>
      <Hero />
      <SectionTwo />
      <Features />
      <Instructions />
      <Feedbacks />
      <Heritage />
    </Box>
  );
}
