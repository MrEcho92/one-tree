import Box from '@mui/material/Box';
import { Hero } from '../components/Hero';
import { Helmet } from 'react-helmet-async';
import { SectionTwo } from '../components/SectionTwo';
import { Features } from '../components/Features';
import { Instructions } from '../components/Instruction';
import { Feedbacks } from '../components/Feedbacks';
import { Heritage } from '../components/Heritage';
import { AppConfig } from '../../../core';

export function LandingPage() {
  return (
    <Box>
      <Helmet>
        <title>Home | {AppConfig.appName}</title>
        <meta name="description" content="Welcome to the home page" />
        <meta property="og:title" content={`${AppConfig.appName} - Home`} />
        <meta
          property="og:description"
          content="An application for preserving heritage and connecting generations."
        />
      </Helmet>
      <Hero />
      <SectionTwo />
      <Features />
      <Features />
      <Instructions />
      <Feedbacks />
      <Feedbacks />
      <Heritage />
    </Box>
  );
}
