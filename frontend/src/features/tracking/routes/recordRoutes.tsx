import { Route, Routes } from 'react-router-dom';
import MigrationPage from '../page/MigrationPage';

export function RecordRoutes() {
  return (
    <Routes>
      <Route path=":recordId" element={<MigrationPage />} />
    </Routes>
  );
}
