import { Route, Routes } from 'react-router-dom';
import { TreePage } from '../page';

export function TreeRoutes() {
  return (
    <Routes>
      <Route path=":treeId" element={<TreePage />} />
    </Routes>
  );
}
