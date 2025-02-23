import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { CulturalPost } from '../../../types';
import { formatDate } from '../../../utils';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

type HubListProps = {
  posts: CulturalPost[];
};

export default function HubList({ posts }: HubListProps) {
  const navigate = useNavigate();
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <Grid container spacing={2} columns={12}>
      {posts?.map((post, index) => (
        <Grid key={`hublist_${index}`} size={{ xs: 12, md: 4 }}>
          <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === index ? 'Mui-focused' : ''}
            onClick={() => navigate(`/hub/${post.id}`)}
          >
            <CardMedia
              component="img"
              alt="hublist_image"
              image={post.image_url ?? ''}
              sx={{
                aspectRatio: '16 / 9',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <StyledCardContent>
              <Stack direction="row" spacing={1}>
                {post.tags.map((tag) => (
                  <Chip label={tag} variant="outlined" size="small" />
                ))}
              </Stack>
              <Typography gutterBottom variant="h6" component="div">
                {post.title}
              </Typography>
            </StyledCardContent>
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
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}
