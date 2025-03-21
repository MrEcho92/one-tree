import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../../components/auth/AuthProvider';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import ForgotPassword from '../components/ForgotPassword';
import { useModal } from '../../../components/common';
import EmailVerification from '../components/EmailVerification';
import { AppConfig } from '../../../core';
import { firebaseErrorMessages } from '../components';

export default function LogInPage() {
  const navigate = useNavigate();
  const { palette, typography } = useTheme();
  const { openModal, closeModal } = useModal();
  const {
    login,
    loginWithGoogle,
    loading,
    resendVerificationEmail,
    forgotPassword,
  } = useAuth();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handleResendVerification = async () => {
    const { email, password } = getValues();
    try {
      const result = await resendVerificationEmail(email, password);
      if (result.success) {
        closeModal?.();
      }
    } catch (error: any) {
      console.error('Error resending verification:', error);
    }
  };

  const handleForgotPassword = async (email: string) => {
    if (!email) {
      enqueueSnackbar('Please enter your email to reset your password.', {
        variant: 'error',
      });
      return;
    }
    try {
      await forgotPassword(email);
      closeModal?.();
    } catch (error) {
      console.error('Error resetting password. Try again.');
    }
  };

  const onSubmit = async (data: any) => {
    const email = data['email'];
    const password = data['password'];

    if (!email || !password) {
      return;
    }
    setError('');

    try {
      const result = await login(email, password);

      if (!result.isEmailVerified) {
        openModal(
          <EmailVerification
            handleResendVerification={handleResendVerification}
            handleClose={closeModal}
          />,
        );
      }

      if (result.success && result.isEmailVerified) {
        navigate('/app');
      }
    } catch (err: any) {
      const errorCode = err.code;
      if (firebaseErrorMessages[errorCode]) {
        setError(firebaseErrorMessages[errorCode]);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError('');

    try {
      await loginWithGoogle();
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Failed to log in with Google');
    }
  };

  function openForgotPasswordModal(): void {
    openModal(
      <ForgotPassword
        handleClose={closeModal}
        handleForgotPassword={handleForgotPassword}
      />,
    );
  }

  return (
    <Box>
      <Helmet>
        <title>Login | {AppConfig.appName}</title>
        <meta name="description" content="Login to your account" />
      </Helmet>
      <Box
        sx={{
          padding: '28px',
          marginLeft: 'auto',
          marginRight: 'auto',
          top: '0px',
          display: 'flex',
          cursor: 'pointer',
          color: palette.primary.main,
          fontWeight: typography.h1.fontWeight,
        }}
        onClick={() => navigate('/')}
      >
        <Typography variant="h2" gutterBottom>
          {AppConfig.appName}
        </Typography>
      </Box>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 12,
            marginBottom: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h2">
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
                      autoComplete="email"
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
                <Link
                  variant="body2"
                  component="button"
                  onClick={openForgotPasswordModal}
                  sx={{ alignSelf: 'center' }}
                >
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
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/signup"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
