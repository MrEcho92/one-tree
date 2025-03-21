import { Route, Routes } from 'react-router-dom';
import { CulturalPage } from '../page';
import HubDetails from '../components/HubDetails';

export function CulturalRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<CulturalPage />} />
      <Route path=":contextId" element={<HubDetails />} />
    </Routes>
  );
}
