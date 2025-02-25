import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { CulturalPost } from '../../../types';
import { capitalize } from '../../../utils';
import { formatDate } from '../../../utils';

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '3px',
    borderRadius: '8px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '1px',
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.text.primary,
    opacity: 0.3,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  '&:hover::before': {
    width: '100%',
  },
}));

type LatestProps = {
  posts: CulturalPost[];
};

export default function Latest({ posts }: LatestProps) {
  const navigate = useNavigate();
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Latest
      </Typography>
      <Grid container spacing={4} columns={12} sx={{ my: 4 }}>
        {posts?.map((post, index) => (
          <Grid key={`latest_${index}`} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1,
                height: '100%',
                bgcolor: '#ffff',
                p: 2,
                borderRadius: '8px',
              }}
            >
              <Stack direction="row" spacing={1}>
                {post.tags.map((tag) => (
                  <Chip label={tag} variant="outlined" size="small" />
                ))}
              </Stack>
              <TitleTypography
                gutterBottom
                variant="h6"
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={index}
                className={focusedCardIndex === index ? 'Mui-focused' : ''}
                onClick={() => navigate(`/hub/${post.id}`)}
              >
                {capitalize(post.title)}
                <NavigateNextRoundedIcon
                  className="arrow"
                  sx={{ fontSize: '1rem' }}
                />
              </TitleTypography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="caption">{post.created_by}</Typography>
                </Box>
                <Typography variant="caption">
                  {formatDate(post.updated_at)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
