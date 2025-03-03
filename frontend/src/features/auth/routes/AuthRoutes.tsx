import { Route, Routes } from 'react-router-dom';
import LogInPage from '../page/Login';
import SignUpPage from '../page/Signup';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<LogInPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}
