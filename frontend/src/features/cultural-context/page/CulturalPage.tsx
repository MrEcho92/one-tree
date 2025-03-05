import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Pagination from '@mui/material/Pagination';
import Latest from '../components/Latest';
import HubList from '../components/HubList';
import { useGetCulturalPosts } from '../../../hooks/hubHooks';

type SearchProps = {
  value: string;
  onSearch: (e: any) => void;
  placeholder: string;
};

export function Search({ value, onSearch, placeholder }: SearchProps) {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '60ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder={placeholder}
        sx={{ flexGrow: 1 }}
        value={value}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
        onChange={onSearch}
      />
    </FormControl>
  );
}

export function CulturalPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSearch, setTempSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setPage(1); // Reset pagination on new search
    }, 300),
    [],
  );

  useEffect(() => {
    debouncedSearch(tempSearch);
  }, [tempSearch, debouncedSearch]);

  const { data, isLoading, isError } = useGetCulturalPosts(
    searchQuery,
    page,
    limit,
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    return <Box mt={'64px'}>Error...</Box>;
  }

  let Posts;
  let latestPosts: any[] = [];
  let remainingPosts: any[] = [];

  if (data) {
    Posts = data as any;
    latestPosts = Posts?.cultural_contexts?.slice(0, 3) || [];
    remainingPosts = Posts?.cultural_contexts?.slice(3) || [];
  }
  return (
    <Box mt="64px">
      <Container
        maxWidth="xl"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 14, gap: 4 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box>
            <Typography variant="h1" gutterBottom>
              Cultural Hub
            </Typography>
            <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>
              Explore and celebrate rich traditions! Read and share stories,
              recipes, and customs that keep your heritage alive. Welcome to the
              Culture section of our news, where we explore the latest trends
              and topics in art, music, film, literature, and more. From
              groundbreaking exhibitions and performances to up-and-coming
              artists and cultural events, we aim to provide you with a diverse
              range of stories that showcase the richness and diversity of our
              world's creative landscape.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search
            value={tempSearch}
            onSearch={(e) => setTempSearch(e.target.value)}
            placeholder="Search..."
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            width: '100%',
            justifyContent: 'space-between',
            alignItems: { xs: 'start', md: 'center' },
            gap: 2,
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              flexDirection: 'row',
              gap: 3,
              overflow: 'auto',
            }}
          >
            {/* <Chip onClick={handleClick} size="medium" label="All categories" />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Company"
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
              }}
            />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Product"
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
              }}
            />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Design"
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
              }}
            />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Engineering"
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
              }}
            /> */}
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'row',
              gap: 1,
              width: { xs: '100%', md: 'fit-content' },
              overflow: 'auto',
            }}
          >
            <Search
              value={tempSearch}
              onSearch={(e) => setTempSearch(e.target.value)}
              placeholder="Search..."
            />
          </Box>
        </Box>
        {latestPosts.length > 0 && <Latest posts={latestPosts} />}
        {remainingPosts.length > 0 && <HubList posts={remainingPosts} />}
        {Posts && Posts.total_pages > 1 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              pt: 2,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Pagination
              count={Posts.total_pages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
              size="large"
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
        )}
        {Posts && Posts?.cultural_contexts?.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6">
              No post found {searchQuery && `for ${searchQuery}`}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
