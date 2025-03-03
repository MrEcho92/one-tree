import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { IconButton, InputAdornment, useTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../../../components/auth/AuthProvider';
import FormHelperText from '@mui/material/FormHelperText';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function SignUpPage() {
  const { signUp, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { palette } = useTheme();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    displayName: string;
    email: string;
    password: string;
    confirmEmail: string;
  }>();

  const onSubmit = async (data: any) => {
    if (!data) {
      return;
    }

    const displayName = data['displayName'];
    const email = data['email'];
    const password = data['password'];
    const confirmEmail = data['confirmEmail'];

    if (email !== confirmEmail) {
      return setError('Emails do not match');
    }
    setLoading(true);
    setError('');

    try {
      await signUp(email, password, displayName);
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Failed to create an account');
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
          <Typography component="h1" variant="h1" fontWeight="bold">
            Sign up
          </Typography>
          {error && (
            <Box sx={{ p: 2, mb: 1, color: palette.error.main }}>{error}</Box>
          )}
          <Box sx={{ mt: 3 }}>
            <form>
              <Box>
                <Controller
                  name="displayName"
                  control={control}
                  rules={{
                    required: 'Name is required',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      id="displayName"
                      label="Name"
                      error={!!errors.displayName}
                      helperText={
                        errors.displayName ? errors.displayName.message : ''
                      }
                      required
                      sx={{ mb: 2 }}
                    />
                  )}
                />
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
                  name="confirmEmail"
                  control={control}
                  rules={{
                    required: 'Email is required',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Confirm email address"
                      variant="outlined"
                      fullWidth
                      error={!!errors.confirmEmail}
                      helperText={
                        errors.confirmEmail ? errors.confirmEmail.message : ''
                      }
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
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'Password must include uppercase, lowercase, number, and special character',
                    },
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
              loading={loading}
            >
              Sign up with email
            </Button>
            <Divider>
              <Typography sx={{ color: 'text.secondary' }}>or</Typography>
            </Divider>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ mt: 3, mb: 2 }}
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>
            <Typography sx={{ textAlign: 'center', py: 2, mb: 8 }}>
              Already have an account?{' '}
              <Link
                href="/auth/login/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
