import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TimelineIcon from '@mui/icons-material/Timeline';
import Button from '@mui/material/Button';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { Header } from '../components';
import { useModal } from '../../../components/common';
import CreateTree from '../../family-tree/components/CreateTree';
import { useGetFamilyTreesByUser } from '../../../hooks/treeHooks';
import { transformDate } from '../../../utils/transformDate';

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
  const { openModal } = useModal();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const userId = '123@gmail.com';
  const {
    data: familyTrees,
    isLoading,
    isError,
  } = useGetFamilyTreesByUser(userId ?? '');
  const treeData = familyTrees as any;
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
        <Header title="Home" headerName="Dashboard" />
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Overview
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
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      endIcon={<ChevronRightRoundedIcon />}
                      fullWidth={isSmallScreen}
                      onClick={() => {
                        if (data.id === 'family-tree')
                          openModal(<CreateTree />);
                      }}
                    >
                      {data?.btnTitle}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider />

          <Typography component="h2" variant="h6" sx={{ my: 2 }}>
            Details
          </Typography>
          <Grid container spacing={2} columns={12}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                  <Typography component="h2" variant="subtitle1" gutterBottom>
                    Family Trees
                  </Typography>
                  <Stack sx={{ justifyContent: 'space-between' }}>
                    {treeData &&
                      treeData.map((tree: any) => {
                        return (
                          <Stack
                            key={tree.id}
                            direction="row"
                            sx={{
                              alignContent: { xs: 'center', sm: 'flex-start' },
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
                              <Typography
                                component="p"
                                variant="subtitle2"
                                sx={{ color: theme.palette.text.secondary }}
                              >
                                Updated {transformDate(tree.updated_at)}
                              </Typography>
                            </Box>
                            <Box>
                              <ChevronRightOutlinedIcon />
                            </Box>
                          </Stack>
                        );
                      })}
                    {!treeData && <Box>No family trees available</Box>}
                  </Stack>
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
                      Cultural stories
                    </Typography>
                    <Stack sx={{ justifyContent: 'space-between' }}>
                      <Stack
                        direction="row"
                        sx={{
                          alignContent: { xs: 'center', sm: 'flex-start' },
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Typography variant="h4" component="p">
                          13,277
                        </Typography>
                      </Stack>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary' }}
                      >
                        Sessions per day for the last 30 days
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Stack
                gap={2}
                direction={{ xs: 'column', sm: 'row', lg: 'column' }}
              >
                <Card variant="outlined" sx={{ width: '100%' }}>
                  <CardContent>
                    <Typography component="h2" variant="subtitle1" gutterBottom>
                      Migration Tracking history
                    </Typography>
                    <Stack sx={{ justifyContent: 'space-between' }}>
                      <Stack
                        direction="row"
                        sx={{
                          alignContent: { xs: 'center', sm: 'flex-start' },
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Typography variant="h4" component="p">
                          13,277
                        </Typography>
                      </Stack>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary' }}
                      >
                        Sessions per day for the last 30 days
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}
