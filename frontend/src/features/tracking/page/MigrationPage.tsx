import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Header } from '../../dashbord/components';
import Typography from '@mui/material/Typography';
import { Button, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import PlaceIcon from '@mui/icons-material/Place';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import AddIcon from '@mui/icons-material/Add';
import {
  useGetMigrationRecord,
  useUpdateMigrationRecord,
  useDeleteMigrationRecord,
} from '../../../hooks';
import { MigrationEvent } from '../../../types/migration';
import { useAuth } from '../../../components/auth/AuthProvider';
import queryClient from '../../../core/http/react-query';
import { useModal } from '../../../components/common';
import DeleteModal from '../../../components/common/DeleteModal';
import { AppConfig } from '../../../core';
import ErrorDisplay from '../../../components/common/ErrorDisplay';

export default function MigrationPage() {
  const { recordId } = useParams();
  const { currentUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MigrationEvent>({
    defaultValues: {
      year: 0,
      event: '',
      location: '',
      latitude: 0,
      longitude: 0,
    },
  });

  const { data, isLoading, isError, error, refetch } = useGetMigrationRecord(
    recordId ?? '',
  );

  const updateMutation = useUpdateMigrationRecord(recordId ?? '');

  const deleteMutation = useDeleteMigrationRecord(recordId ?? '');

  const migrationRecord = useMemo(() => {
    if (data) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return data as any;
    }
    return null;
  }, [data]);

  const [value, setValue] = useState('1');
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (isLoading) {
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

  if (isError) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  const handleAddEvent = (data: any) => {
    if (!currentUser) {
      return;
    }

    const updatedRecord = {
      ...migrationRecord,
      updated_by: currentUser.uid,
      timeline: [
        ...migrationRecord.timeline,
        {
          year: parseInt(data.year),
          event: data.event,
          location: data.location,
          latitude: data.latitude ? parseFloat(data.latitude) : null,
          longitude: data.longitude ? parseFloat(data.longitude) : null,
        },
      ].sort((a, b) => a.year - b.year),
    };

    updateMutation.mutate(updatedRecord, {
      onSuccess: () => {
        enqueueSnackbar('Migration record updated successfully!', {
          variant: 'success',
        });
        setIsEditing(false);
        reset();
        queryClient.refetchQueries({
          queryKey: ['migrationRecords', recordId],
          exact: true,
        });
      },
      onError: (error) => {
        enqueueSnackbar('Failed to update migration record', {
          variant: 'error',
        });
        console.error('Error updating migration record:', error);
      },
    });
  };

  const handleRemoveEvent = (index: number) => {
    if (!currentUser) {
      return;
    }
    const updatedTimeline = [...migrationRecord.timeline];
    updatedTimeline.splice(index, 1);

    const updatedRecord = {
      ...migrationRecord,
      updated_by: currentUser.uid,
      timeline: updatedTimeline,
    };

    updateMutation.mutate(updatedRecord, {
      onSuccess: () => {
        enqueueSnackbar('Migration record updated successfully!', {
          variant: 'success',
        });
        setIsEditing(false);
        reset();
        queryClient.refetchQueries({
          queryKey: ['migrationRecords', recordId],
          exact: true,
        });
      },
      onError: (error) => {
        enqueueSnackbar('Failed to update migration record', {
          variant: 'error',
        });
        console.error('Error updating migration record:', error);
      },
    });
  };

  function handleDeleteRecord() {
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        enqueueSnackbar('Migration record deleted successfully!', {
          variant: 'success',
        });
        closeModal?.();
        navigate('/app');
      },
      onError: (error) => {
        enqueueSnackbar('Failed to delete migration record', {
          variant: 'error',
        });
        console.error('Error deleting migration record:', error);
      },
    });
  }

  const TimeLineView = () => (
    <Box
      sx={{
        height: '100vh',
        py: 1,
      }}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {migrationRecord?.timeline.map((event: any, index: number) => (
          <TimelineItem key={`timeline_${index}`}>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card sx={{ minWidth: 275, borderRadius: 4 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      gutterBottom
                      sx={{ color: 'text.secondary', fontSize: 14 }}
                    >
                      {event.year}
                    </Typography>
                    {isEditing && (
                      <IconButton onClick={() => handleRemoveEvent(index)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Typography variant="body2">{event.event}</Typography>
                  {event.location && (
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <PlaceIcon />
                      <Typography variant="caption">
                        {event.location}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );

  const MapView = () => (
    <Paper sx={{ backgroundColor: '#e6f2ff', borderRadius: 1, p: 2, mt: 2 }}>
      <Box
        sx={{
          textAlign: 'center',
          p: 5,
          border: '1px dashed',
          borderColor: 'grey.300',
          borderRadius: 1,
        }}
      >
        <Typography color="text.secondary">
          Map visualization would be rendered here.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          (In a real application, this would use a map library like Leaflet or
          Google Maps to show migration paths between the coordinates in the
          timeline events)
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
          Migration Locations:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {migrationRecord?.timeline.map((event: any, index: number) => (
            <Paper
              key={`mapview_${index}`}
              elevation={1}
              sx={{ p: 1, display: 'flex', alignItems: 'center' }}
            >
              <Box
                sx={{
                  backgroundColor: 'primary.50',
                  color: 'primary.700',
                  p: 0.5,
                  borderRadius: 0.5,
                  mr: 1,
                  fontSize: '0.875rem',
                }}
              >
                {event.year}
              </Box>
              <Box>
                <Typography fontWeight="medium">
                  {event.location || 'Unknown location'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.event}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Paper>
  );

  return (
    <Box
      component="section"
      sx={{ flexGrow: 1, overflow: 'auto', width: '100%' }}
    >
      <Helmet>
        <title>Migration tracker | {AppConfig.appName}</title>
        <meta name="description" content="View your migration history" />
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
        <Header title="Home" headerName="Migration tracking" />
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              {migrationRecord?.title}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={isEditing ? <SaveIcon /> : <AddIcon />}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Save' : 'Add'}
              </Button>
              <Tooltip title="Delete migration record">
                <IconButton
                  onClick={() => {
                    openModal(
                      <DeleteModal
                        closeModal={closeModal}
                        onDelete={handleDeleteRecord}
                        deleteMessage={`Are you sure you want to delete migration record: ${migrationRecord?.title}?`}
                        deleteTitle={'Delete migration record'}
                      />,
                    );
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Typography component="p" variant="body1" sx={{ my: 2 }}>
            {migrationRecord?.description}
          </Typography>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="migration tracking tabsß"
              >
                <Tab label="Timeline View" value="1" />
                <Tab label="Map View" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ p: { xs: '0' } }}>
              {isEditing && (
                <Card sx={{ my: 2, borderRadius: 2 }}>
                  <CardHeader title="Add migration event" />
                  <CardContent>
                    <Box
                      component="form"
                      onSubmit={handleSubmit(handleAddEvent)}
                    >
                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Controller
                            name="year"
                            control={control}
                            rules={{
                              required: 'Year is required',
                              pattern: {
                                value: /^\d+$/,
                                message: 'Year must be a number',
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Year"
                                fullWidth
                                variant="outlined"
                                error={!!errors.year}
                                helperText={errors.year?.message}
                                placeholder="e.g., 2008"
                                size="small"
                              />
                            )}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Controller
                            name="location"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Location"
                                fullWidth
                                variant="outlined"
                                error={!!errors.location}
                                helperText={errors.location?.message}
                                placeholder="e.g., Ellis Island, New York"
                                size="small"
                              />
                            )}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Controller
                            name="latitude"
                            control={control}
                            rules={{
                              pattern: {
                                value: /^-?[0-9]\d*(\.\d+)?$/,
                                message: 'Must be a valid latitude',
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Latitude"
                                fullWidth
                                variant="outlined"
                                error={!!errors.latitude}
                                helperText={errors.latitude?.message}
                                placeholder="e.g., 40.6992"
                                size="small"
                              />
                            )}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Controller
                            name="longitude"
                            control={control}
                            rules={{
                              pattern: {
                                value: /^-?[0-9]\d*(\.\d+)?$/,
                                message: 'Must be a valid longitude',
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Longitude"
                                fullWidth
                                variant="outlined"
                                error={!!errors.longitude}
                                helperText={errors.longitude?.message}
                                placeholder="e.g., -74.0410"
                                size="small"
                              />
                            )}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Controller
                            name="event"
                            control={control}
                            rules={{
                              required: 'Event description is required',
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Event Description"
                                fullWidth
                                multiline
                                rows={3}
                                variant="outlined"
                                error={!!errors.event}
                                helperText={errors.event?.message}
                                placeholder="Describe the migration event"
                                size="small"
                              />
                            )}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              mt: 2,
                              gap: 2,
                            }}
                          >
                            <Button
                              type="submit"
                              variant="text"
                              color="primary"
                              size="small"
                              onClick={() => setIsEditing(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              size="small"
                              startIcon={<AddIcon />}
                            >
                              Add migration event
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
              )}

              {migrationRecord?.timeline?.length === 0 ? (
                <Box
                  sx={{
                    height: '100vh',
                    p: 1,
                  }}
                >
                  No timeline available
                </Box>
              ) : (
                <TimeLineView />
              )}
            </TabPanel>
            <TabPanel value="2" sx={{ p: { xs: '0' } }}>
              <Box
                sx={{
                  height: '100vh',
                  p: 2,
                }}
              >
                {/* <MapView /> */}
                <Typography>Map view feature coming soon!</Typography>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Stack>
    </Box>
  );
}
