import { Route, Routes } from 'react-router-dom';
import { CulturalPage } from '../page';

export function CulturalRoutes() {
  return (
    <Routes>
      <Route path="" element={<CulturalPage />}></Route>
    </Routes>
  );
}