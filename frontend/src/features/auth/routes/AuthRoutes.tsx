import { Route, Routes } from 'react-router-dom';
import SignInPage from '../page/Signin';
import SignUpPage from '../page/Signup';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<SignInPage />} />
      <Route path="/sigin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}
