import { Route, Routes } from 'react-router-dom';
import { LandingPage } from '../page/LandingPage';

export function LandingRoutes() {
  return (
    <Routes>
      <Route path="" element={<LandingPage />}></Route>
    </Routes>
  );
}
