import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CircularProgress, useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TextField, Button, Avatar, Container } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { updateProfile, deleteUser } from 'firebase/auth';
import { Header } from '../../dashbord/components';
import { useAuth } from '../../../components/auth/AuthProvider';
import { useModal } from '../../../components/common';
import DeleteModal from '../../../components/common/DeleteModal';
import { AppConfig } from '../../../core/constants';

interface ProfileFormData {
  displayName: string;
  email: string;
  photoURL?: string;
  phoneNumber?: string;
}

export default function ProfileSettings() {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { control, handleSubmit, setValue } = useForm<ProfileFormData>({
    defaultValues: {
      displayName: '',
      email: '',
      photoURL: '',
      phoneNumber: '',
    },
  });
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (currentUser) {
      setValue('displayName', currentUser.displayName || '');
      setValue('email', currentUser.email || '');
      setValue('phoneNumber', currentUser.phoneNumber || '');
    }
  }, [currentUser, setValue]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          mt: '64px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const onSubmit = async (data: any) => {
    if (!currentUser) return;
    setLoading(true);
    try {
      await updateProfile(currentUser, { displayName: data.displayName });
      enqueueSnackbar('Profile updated successfully', {
        variant: 'success',
      });
    } catch (error) {
      console.error('Update failed', error);
      enqueueSnackbar('Failed to update profile', {
        variant: 'error',
      });
    }
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;

    try {
      await deleteUser(currentUser);
      enqueueSnackbar('Account deleted successfully', {
        variant: 'success',
      });
      closeModal?.();
      navigate('/');
    } catch (error) {
      console.error('Delete failed', error);
      enqueueSnackbar('Failed to delete account', {
        variant: 'error',
      });
    }
  };

  function openAccDelete() {
    openModal(
      <DeleteModal
        closeModal={closeModal}
        onDelete={handleDeleteAccount}
        deleteMessage="Are you sure you want to delete your account? 
        This action cannot be undone. 
        Please ensure you have deleted your family trees, cultural stories and migration tracking info."
        deleteTitle="Delete Account"
      />,
    );
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, overflow: 'auto', width: '100%' }}>
      <Helmet>
        <title>Profile settings | {AppConfig.appName}</title>
        <meta name="description" content="View your profile settings" />
      </Helmet>
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
          mx: 3,
          pb: 5,
          mt: { xs: 8, md: 0 },
        }}
      >
        <Header title="Home" headerName="Settings" />
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Profile settings
          </Typography>
          <Container
            maxWidth="sm"
            sx={{
              bgcolor: palette.primary.contrastText,
              py: 3,
              borderRadius: 2,
            }}
          >
            <Box textAlign="center" my={4}>
              <Avatar
                src={currentUser?.photoURL ?? ''}
                sx={{ width: 80, height: 80, margin: 'auto' }}
              >
                P
              </Avatar>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="displayName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full Name"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    margin="normal"
                    disabled
                  />
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
              <Box my={2} display="flex" justifyContent="space-between">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  Save Changes
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={openAccDelete}
                  disabled={loading}
                >
                  Delete Account
                </Button>
              </Box>
            </form>
          </Container>
        </Box>
      </Stack>
    </Box>
  );
}
