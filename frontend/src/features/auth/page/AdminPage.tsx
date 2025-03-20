import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet-async';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Header } from '../../dashbord/components';
import { useAuth } from '../../../components/auth/AuthProvider';
import { decodeToken } from '../../../utils';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useSetAdminRole } from '../../../hooks/userHooks';
import { AppConfig } from '../../../core/constants';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import { TabPanel } from '@mui/lab';
import { useAllGetCulturalPosts } from '../../../hooks';
import CulturalAdminPanel from '../components/CulturalAdminPanel';

const AVAILABLE_ROLES = ['admin', 'user'];

export default function AdminPage() {
  const { currentUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { handleSubmit, control } = useForm({
    defaultValues: {
      uid: '',
      roles: [],
    },
  });

  const mutation = useSetAdminRole();
  const {
    data: Posts,
    isLoading,
    isError,
    refetch,
    error,
  } = useAllGetCulturalPosts();
  const postsData = Posts as any;

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const token = await currentUser.getIdToken(true);
      const decodedToken = decodeToken(token);

      setIsAdmin(decodedToken.roles?.includes('admin')); // Check if "admin" is in roles
      setLoading(false);
    };
    fetchUserRole();
  }, [currentUser]);

  if (loading || isLoading) {
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
  if (!isAdmin)
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
        <Typography color="error">Access Denied: Admins Only</Typography>
      </Box>
    );

  const onSubmit = async (data: { uid: string; roles: string[] }) => {
    mutation.mutate(data, {
      onSuccess: () => {
        enqueueSnackbar('User roles updated successfully!', {
          variant: 'success',
        });
      },
      onError: (error) => {
        enqueueSnackbar('Failed to update roles.', {
          variant: 'error',
        });
        console.error('Failed to update roles.', error);
      },
    });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, overflow: 'auto', width: '100%' }}>
      <Helmet>
        <title>Admin | {AppConfig.appName}</title>
        <meta name="description" content="View your admin page" />
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
        <Header title="Home" headerName="Admin" />
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="admin page">
              <Tab label="Assign Roles" value="1" />
              <Tab label="Review Posts" value="2" />
            </TabList>
            <TabPanel value="1">
              <Container maxWidth="sm">
                <Typography variant="h4" gutterBottom>
                  Assign User Roles
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box mb={2} mt={2}>
                    <Controller
                      name="uid"
                      control={control}
                      rules={{ required: 'User UID is required' }}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label="User UID"
                          variant="outlined"
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </Box>

                  <Box mb={2} mt={2}>
                    <FormControl fullWidth>
                      <InputLabel>Select Roles</InputLabel>
                      <Controller
                        name="roles"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            input={<OutlinedInput label="Select Roles" />}
                            multiple
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </Box>
                            )}
                          >
                            {AVAILABLE_ROLES.map((role) => (
                              <MenuItem key={role} value={role}>
                                {role}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? 'Assigning...' : 'Assign Roles'}
                  </Button>
                </form>
              </Container>
            </TabPanel>
            <TabPanel value="2">
              <CulturalAdminPanel
                posts_={postsData}
                isError={isError}
                error={error}
                refetch={refetch}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Stack>
    </Box>
  );
}
