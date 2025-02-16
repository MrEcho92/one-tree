import { Route, Routes } from 'react-router-dom';
import FamilyTreePage from '../page/FamilyTreePage';

export function TreeRoutes() {
  return (
    <Routes>
      <Route path=":treeId" element={<FamilyTreePage />} />
    </Routes>
  );
}
