import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Pagination from '@mui/material/Pagination';
import Latest from '../components/Latest';
import HubList from '../components/HubList';

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '60ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export function CulturalPage() {
  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };

  return (
    <Box mt={'64px'}>
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
          <Search />
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
            <Chip onClick={handleClick} size="medium" label="All categories" />
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
            />
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
            <Search />
          </Box>
        </Box>
        <Latest />
        <HubList />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            pt: 2,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Pagination count={10} variant="outlined" color="primary" />
        </Box>
      </Container>
    </Box>
  );
}
