import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../../components/auth/AuthProvider';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';

export default function LogInPage() {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { login, loginWithGoogle } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const firebaseErrorMessages: Record<string, string> = {
    'auth/invalid-email': 'The email address is badly formatted.',
    'auth/user-not-found': 'No user found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/too-many-requests':
      'Too many unsuccessful login attempts. Please try again later.',
    'auth/email-already-in-use': 'This email address is already in use.',
    'auth/network-request-failed':
      'Network error. Please check your connection.',
    'auth/invalid-credential': 'Invalid credentials',
  };

  const onSubmit = async (data: any) => {
    const email = data['email'];
    const password = data['password'];

    if (!email || !password) {
      return;
    }
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/app');
    } catch (err: any) {
      const errorCode = err.code;
      if (firebaseErrorMessages[errorCode]) {
        setError(firebaseErrorMessages[errorCode]);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await loginWithGoogle();
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Failed to log in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          padding: '28px',
          marginLeft: 'auto',
          marginRight: 'auto',
          top: '0px',
          display: 'flex',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
      </Box>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h1" fontWeight="bold">
            Welcome back!
          </Typography>
          {error && (
            <Box sx={{ p: 2, mb: 1, color: palette.error.main }}>{error}</Box>
          )}
          <Box sx={{ mt: 3 }}>
            <form>
              <Box>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ''}
                      required
                      sx={{ mb: 2 }}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Password is required',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      variant="outlined"
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      error={!!errors.password}
                      helperText={
                        errors.password ? errors.password.message : ''
                      }
                      autoComplete="current-password"
                      required
                      sx={{ mb: 2 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText>
                    Password must contain at least 8 characters, including:
                    <ul>
                      <li>One uppercase letter (A-Z)</li>
                      <li>One lowercase letter (a-z)</li>
                      <li>One number (0-9)</li>
                      <li>One special character (@, $, !, %, *, ?, &)</li>
                    </ul>
                  </FormHelperText>
                )}
              </Box>
            </form>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Divider>
              <Typography sx={{ color: 'text.secondary' }}>or</Typography>
            </Divider>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleLogin}
              startIcon={<GoogleIcon />}
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              Log in with Google
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
