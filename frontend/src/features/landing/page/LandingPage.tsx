import Box from '@mui/material/Box';
import { Hero } from '../components/Hero';
import { Helmet } from 'react-helmet-async';
import {
  FamilyTreeSection,
  WhyUS,
  Feedbacks,
  Heritage,
  HubSection,
  TrackerSection,
} from '../components';
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
      <WhyUS />
      <FamilyTreeSection />
      <HubSection />
      <TrackerSection />
      <Feedbacks />
      <Heritage />
    </Box>
  );
}
