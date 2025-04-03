import { useState, useMemo, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { debounce } from 'lodash';
import { Helmet } from 'react-helmet-async';
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
import ErrorDisplay from '../../../components/common/ErrorDisplay';
import { AppConfig } from '../../../core';

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
  const { palette, typography } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSearch, setTempSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        setSearchQuery(query);
        setPage(1); // Reset pagination on new search
      }, 300),
    [setSearchQuery, setPage],
  );

  useEffect(() => {
    debouncedSearch(tempSearch);
  }, [tempSearch, debouncedSearch]);

  const { data, isLoading, isError, error, refetch } = useGetCulturalPosts(
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

  if (isError) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
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
    <Box mt="64px" sx={{height: '80vh'}}>
      <Helmet>
        <title>Cultural Hub | {AppConfig.appName}</title>
        <meta
          name="description"
          content="View cultural posts about african heritage"
        />
        <meta
          property="og:title"
          content={`${AppConfig.appName} - Dashboard`}
        />
        <meta
          property="og:description"
          content="View cultural posts about african heritage"
        />
      </Helmet>
      <Container
        maxWidth="xl"
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          my: 14,
          gap: 4,
          px: { xs: 3, sm: 8 },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box display="flex" flexDirection={'column'} gap={2}>
            <Typography
              sx={{
                fontSize: {
                  xs: typography.h3.fontSize,
                  md: typography.h2.fontSize,
                },
                fontWeight: {
                  xs: typography.h3.fontWeight,
                  md: typography.h1.fontWeight,
                },
                color: palette.primary.main,
              }}
              gutterBottom
            >
              Cultural Hub - African History Collections
            </Typography>
            <Typography
              sx={{
                color: palette.text.primary,
                fontSize: {
                  xs: typography.body1.fontSize,
                  md: '18px',
                },
                lineHeight: '1.8',
              }}
            >
              Discover and share the traditions that keep our culture alive.
              From ancestral stories and folklore to music, art, and cuisine,
              the Cultural Hub is a space to explore Africa&apos;s rich
              heritage. Preserve history, pass down traditions, and reconnect
              with your roots—all in one place. 🌍✨
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
        {!isLoading ? (
          <>
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
                <Typography variant="h6" color='text.secondary'>
                  No record found {searchQuery && `for ${searchQuery}`}
                </Typography>
              </Box>
            )}
          </>
        ) : (
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
        )}
      </Container>
    </Box>
  );
}
