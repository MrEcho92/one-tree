import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TimelineIcon from '@mui/icons-material/Timeline';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { Header } from '../components';
import { useModal } from '../../../components/common';
import CreateTree from '../../family-tree/components/CreateTree';
import { useGetFamilyTreesByUser } from '../../../hooks/treeHooks';
import { useGetCulturalPostsByUser } from '../../../hooks/hubHooks';
import { transformDate } from '../../../utils/date';
import CreateCulturalPost from '../../cultural-context/components/CreateEditPost';
import { useDeleteCulturalPost } from '../../../hooks/hubHooks';
import queryClient from '../../../core/http/react-query';
import { useAuth } from '../../../components/auth/AuthProvider';
import CreateMigrationRecord from '../../tracking/components/CreateMigrationRecord';
import DeleteModal from '../../../components/common/DeleteModal';
import { useGetMigrationRecordByUser } from '../../../hooks';
import ErrorDisplay from '../../../components/common/ErrorDisplay';
import { MaxFamilyTrees } from '../../../core';

const data = [
  {
    id: 'family-tree',
    title: 'Family tree',
    description: 'Create your family tree to map relationships',
    btnTitle: 'Create a family tree',
    icon: <AccountTreeIcon />,
  },
  {
    id: 'hub',
    title: 'Cultural story',
    description:
      'Upload and share stories, traditions, and recipes unique to your heritage',
    btnTitle: 'Create a cultural story',
    icon: <AutoStoriesIcon />,
  },
  {
    id: 'migration-tracker',
    title: 'Migration tracker',
    description: 'Document your familys migration journey',
    btnTitle: 'Create a migration journey',
    icon: <TimelineIcon />,
  },
] as const;

export function DashboardPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { t } = useTranslation('dashboard');
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useAuth();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [itemToDelete, setItemToDelete] = useState<string>('');

  const userId = currentUser?.uid;

  const {
    data: familyTrees,
    isLoading,
    isError,
    error: treeError,
    refetch: treeRefetch,
  } = useGetFamilyTreesByUser(userId ?? '', currentUser?.email ?? '');
  const treeData = familyTrees as any;

  const {
    data: Posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
    refetch: postsRefetch,
  } = useGetCulturalPostsByUser(userId ?? '');
  const postsData = Posts as any;

  const {
    data: Records,
    isLoading: isRecordsLoading,
    isError: isRecordsError,
    error: recordsError,
    refetch: recordsRefetch,
  } = useGetMigrationRecordByUser(userId ?? '');
  const recordsData = Records as any;

  const deleteMutation = useDeleteCulturalPost(itemToDelete);

  if (isLoading || isPostsLoading || isRecordsLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          mt: isSmallScreen ? '64px' : '',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (isError || isPostsError || isRecordsError) {
    return (
      <ErrorDisplay
        error={treeError || postsError || recordsError}
        onRetry={treeRefetch || postsRefetch || recordsRefetch}
      />
    );
  }

  function handleDeletePost() {
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        enqueueSnackbar('Cultural post deleted successfully!', {
          variant: 'success',
        });
        queryClient.refetchQueries({
          queryKey: ['culturalPosts', userId],
          exact: true,
        });
        closeModal?.();
      },
      onError: (error) => {
        enqueueSnackbar('Failed to delete cultural post', {
          variant: 'error',
        });
        console.error('Error deleting post:', error);
      },
    });
  }

  const isTreeLimitReached = treeData?.length >= MaxFamilyTrees;

  return (
    <Box component="main" sx={{ flexGrow: 1, overflow: 'auto', width: '100%' }}>
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
          mx: 3,
          pb: 5,
          mt: { xs: 8, md: 0 },
        }}
      >
        <Header
          title={t('dashboard:home')}
          headerName={t('dashboard:dashboard')}
        />
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            {t('dashboard:labels.overview')}
          </Typography>
          <Grid
            container
            spacing={3}
            columns={12}
            sx={{ mb: (theme) => theme.spacing(2) }}
          >
            {data.map((data, index) => (
              <Grid key={`dashboard_${index}`} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Card
                  variant="outlined"
                  sx={{ height: '100%', flexGrow: 1, borderRadius: 4 }}
                >
                  <CardContent>
                    {data?.icon}
                    <Typography
                      component="h2"
                      variant="subtitle2"
                      gutterBottom
                      sx={{ fontWeight: '600' }}
                    >
                      {data?.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
                      {data?.description}
                    </Typography>
                    {isTreeLimitReached && data.id === 'family-tree' ? (
                      <Tooltip title={`You can only add up to ${MaxFamilyTrees} family trees.`}>
                        <span>
                          <Button disabled>{data?.btnTitle}</Button>
                        </span>
                      </Tooltip>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        endIcon={<ChevronRightRoundedIcon />}
                        fullWidth={isSmallScreen}
                        onClick={() => {
                          switch (data.id) {
                            case 'family-tree':
                              openModal(<CreateTree />);
                              break;
                            case 'hub':
                              openModal(<CreateCulturalPost />);
                              break;
                            case 'migration-tracker':
                              openModal(<CreateMigrationRecord />);
                              break;
                            default:
                              break;
                          }
                        }}
                      >
                        {data?.btnTitle}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider />

          <Typography component="h2" variant="h6" sx={{ my: 2 }}>
            {t('dashboard:labels.details')}
          </Typography>
          <Grid container spacing={2} columns={12}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                  <Typography component="h2" variant="subtitle1" gutterBottom>
                    {t('dashboard:labels.familyTrees')}
                    {treeData?.length > 0 && ` (${treeData.length})`}
                  </Typography>
                  <Box sx={{ height: 250, overflowY: 'scroll' }}>
                    <Stack
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 1,
                      }}
                    >
                      {treeData &&
                        treeData.map((tree: any) => {
                          return (
                            <Stack
                              key={tree.id}
                              direction="row"
                              sx={{
                                alignContent: {
                                  xs: 'center',
                                  sm: 'flex-start',
                                },
                                alignItems: 'center',
                                gap: 1,
                                justifyContent: 'space-between',
                                '&:hover': {
                                  backgroundColor: theme.palette.grey[200],
                                  cursor: 'pointer',
                                },
                                p: 1,
                              }}
                              onClick={() => navigate(`/app/tree/${tree.id}`)}
                            >
                              <Box>
                                <Typography component="h2" variant="subtitle2">
                                  {tree.name}
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1}>
                                  <Typography
                                    component="p"
                                    variant="caption"
                                    sx={{ color: theme.palette.text.secondary }}
                                  >
                                    {t('dashboard:update')}{' '}
                                    {transformDate(tree.updated_at)}
                                  </Typography>
                                  {userId && tree.created_by !== userId ? (
                                    <Chip
                                      label={'Collaborator on tree'}
                                      size="small"
                                      color="success"
                                      variant="outlined"
                                    />
                                  ) : null}
                                </Box>
                              </Box>
                              <Box>
                                <ChevronRightOutlinedIcon />
                              </Box>
                            </Stack>
                          );
                        })}
                      {!treeData.length && (
                        <Typography variant="caption">
                          {t('dashboard:noFamilyAvailable')}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Stack
                gap={2}
                direction={{ xs: 'column', sm: 'row', lg: 'column' }}
              >
                <Card variant="outlined" sx={{ width: '100%' }}>
                  <CardContent>
                    <Typography component="h2" variant="subtitle1" gutterBottom>
                      {t('dashboard:labels.cultural')}
                      {postsData?.length > 0 && ` (${postsData.length})`}
                    </Typography>
                    <Box sx={{ height: 250, overflowY: 'scroll' }}>
                      <Stack
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: 1,
                        }}
                      >
                        {postsData &&
                          postsData.map((post: any) => {
                            return (
                              <Stack
                                key={post.id}
                                direction="row"
                                sx={{
                                  alignContent: {
                                    xs: 'center',
                                    sm: 'flex-start',
                                  },
                                  alignItems: 'center',
                                  gap: 1,
                                  justifyContent: 'space-between',
                                  p: 1,
                                }}
                              >
                                <Box>
                                  <Typography
                                    component="h2"
                                    variant="subtitle2"
                                  >
                                    {post.title}
                                  </Typography>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="flex-start"
                                    gap={1}
                                  >
                                    <Typography
                                      component="p"
                                      variant="caption"
                                      sx={{
                                        color: theme.palette.text.secondary,
                                      }}
                                    >
                                      {t('dashboard:update')}{' '}
                                      {transformDate(post.updated_at)}
                                    </Typography>
                                    <Chip
                                      label={post.status}
                                      size="small"
                                      color={
                                        post.status === 'approved'
                                          ? 'success'
                                          : 'default'
                                      }
                                    />
                                  </Box>
                                </Box>
                                <Box>
                                  <Tooltip title="Edit">
                                    <IconButton
                                      onClick={() =>
                                        openModal(
                                          <CreateCulturalPost post={post} />,
                                        )
                                      }
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Delete">
                                    <IconButton
                                      onClick={() => {
                                        setItemToDelete(post.id);
                                        openModal(
                                          <DeleteModal
                                            closeModal={closeModal}
                                            onDelete={handleDeletePost}
                                            deleteMessage={`Are you sure you want to delete post: ${post.title}?`}
                                            deleteTitle="Delete cultural post"
                                          />,
                                        );
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Stack>
                            );
                          })}
                        {!postsData.length && (
                          <Typography variant="caption">
                            {t('dashboard:noCulturalStoryAvailable')}
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                  <Typography component="h2" variant="subtitle1" gutterBottom>
                    {t('dashboard:labels.migration')}
                    {recordsData?.length > 0 && ` (${recordsData.length})`}
                  </Typography>
                  <Box sx={{ height: 250, overflowY: 'scroll' }}>
                    <Stack
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',

                        gap: 1,
                      }}
                    >
                      {recordsData &&
                        recordsData.map((record: any) => {
                          return (
                            <Stack
                              key={record.id}
                              direction="row"
                              sx={{
                                alignContent: {
                                  xs: 'center',
                                  sm: 'flex-start',
                                },
                                alignItems: 'center',
                                gap: 1,
                                justifyContent: 'space-between',
                                '&:hover': {
                                  backgroundColor: theme.palette.grey[200],
                                  cursor: 'pointer',
                                },
                                p: 1,
                              }}
                              onClick={() =>
                                navigate(`/app/record/${record.id}`)
                              }
                            >
                              <Box>
                                <Typography component="h2" variant="subtitle2">
                                  {record.title}
                                </Typography>
                                <Typography
                                  component="p"
                                  variant="caption"
                                  sx={{ color: theme.palette.text.secondary }}
                                >
                                  {t('dashboard:update')}{' '}
                                  {transformDate(record.updated_at)}
                                </Typography>
                              </Box>
                              <Box>
                                <ChevronRightOutlinedIcon />
                              </Box>
                            </Stack>
                          );
                        })}
                      {!recordsData.length && (
                        <Typography variant="caption">
                          {t('dashboard:noMigrationRecordAvailable')}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}
