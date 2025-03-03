import { Route, Routes } from 'react-router-dom';
import SignInPage from '../page/Login';
import SignUpPage from '../page/Signup';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<SignInPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}
