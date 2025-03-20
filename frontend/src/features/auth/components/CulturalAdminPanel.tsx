import { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Toolbar,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Visibility as PreviewIcon,
  OpenInNew as RedirectIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import ErrorDisplay from '../../../components/common/ErrorDisplay';
import { formatDate } from '../../../utils/date';
import { ContextStatus } from '../../../types/culturalPosts';

type CulturalAdminPanelProps = {
  posts_: any[];
  isError?: boolean;
  refetch?: any;
  error?: any;
};

const CulturalAdminPanel = ({
  posts_,
  isError,
  refetch,
  error,
}: CulturalAdminPanelProps) => {
  const [posts, setPosts] = useState(posts_);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    let result = posts;

    if (statusFilter !== 'all') {
      result = result.filter((post) => post.status === statusFilter);
    }

    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(lowercasedSearch) ||
          post.author.toLowerCase().includes(lowercasedSearch),
      );
    }

    setFilteredPosts(result);
  }, [statusFilter, searchTerm, posts]);

  const handleStatusChange = (postId: any, newStatus: any) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, status: newStatus } : post,
      ),
    );
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case ContextStatus.APPROVED:
        return 'success';
      case ContextStatus.PENDING:
        return 'warning';
      case ContextStatus.REJECTED:
        return 'error';
      default:
        return 'default';
    }
  };

  const handleRedirect = (postId: any) => {
    window.open(`/hub/${postId}`, '_blank');
  };

  if (isError) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  return (
    <Box sx={{ width: '100%', bgcolor: '#f9f9f9', p: 3 }}>
      <Paper
        sx={{
          width: '100%',
          mb: 2,
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <Toolbar
          sx={{
            pl: { sm: 3 },
            pr: { xs: 1, sm: 3 },
            py: 2,
            bgcolor: '#fff',
          }}
        >
          <Typography
            sx={{ flex: '1 1 100%', fontWeight: 500 }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Posts Management
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              mr: 2,
              width: '250px',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl
            variant="outlined"
            size="small"
            sx={{
              minWidth: 150,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          >
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="all">All Posts</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>

        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', pl: 3 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Actions
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', pr: 3 }}>
                  View
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow
                  hover
                  key={post.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      pl: 3,
                      fontWeight: 500,
                      maxWidth: '300px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline',
                      },
                    }}
                    onClick={() => {}}
                  >
                    {post.title}
                  </TableCell>
                  <TableCell>{formatDate(post.created_at)}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        post.status.charAt(0).toUpperCase() +
                        post.status.slice(1)
                      }
                      color={getStatusColor(post.status)}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {post.status === ContextStatus.PENDING ? (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: 1,
                        }}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          startIcon={<ApproveIcon />}
                          onClick={() =>
                            handleStatusChange(post.id, 'approved')
                          }
                          sx={{
                            borderRadius: 1.5,
                            textTransform: 'none',
                            fontWeight: 500,
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<RejectIcon />}
                          onClick={() =>
                            handleStatusChange(post.id, 'rejected')
                          }
                          sx={{
                            borderRadius: 1.5,
                            textTransform: 'none',
                            fontWeight: 500,
                          }}
                        >
                          Reject
                        </Button>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: 1,
                        }}
                      >
                        {post.status === ContextStatus.REJECTED && (
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            startIcon={<ApproveIcon />}
                            onClick={() =>
                              handleStatusChange(post.id, 'approved')
                            }
                            sx={{
                              borderRadius: 1.5,
                              textTransform: 'none',
                              fontWeight: 500,
                            }}
                          >
                            Approve
                          </Button>
                        )}
                        {post.status === ContextStatus.APPROVED && (
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<RejectIcon />}
                            onClick={() =>
                              handleStatusChange(post.id, 'rejected')
                            }
                            sx={{
                              borderRadius: 1.5,
                              textTransform: 'none',
                              fontWeight: 500,
                            }}
                          >
                            Reject
                          </Button>
                        )}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ pr: 3 }}>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}
                    >
                      <IconButton
                        color="info"
                        size="small"
                        onClick={() => {}}
                        title="Preview post"
                      >
                        <PreviewIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleRedirect(post.id)}
                        title="Open post in new tab"
                      >
                        <RedirectIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}

              {filteredPosts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body1" sx={{ py: 3 }}>
                      No posts found matching the current filters
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredPosts.length} posts
        </Typography>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PreviewIcon fontSize="small" color="info" />
            <Typography variant="body2" color="text.secondary">
              Preview post
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <RedirectIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary">
              Open in new tab
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CulturalAdminPanel;
