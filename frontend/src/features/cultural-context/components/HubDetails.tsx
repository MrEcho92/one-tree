import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Grid from '@mui/material/Grid2';

const articleInfo = [
  {
    tag: 'Engineering',
    title: 'The future of AI in software engineering',
    description:
      'Artificial intelligence is revolutionizing software engineering. Explore how AI-driven tools are enhancing development processes and improving software quality.',
    authors: [
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
    ],
  },
  {
    tag: 'Product',
    title: 'Driving growth with user-centric product design',
    description:
      'Our user-centric product design approach is driving significant growth. Learn about the strategies we employ to create products that resonate with users.',
    authors: [{ name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
  },
];

export default function HubDetails() {
  const theme = useTheme();
  return (
    <Box mt={'64px'}>
      <Container
        maxWidth="xl"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 14, gap: 4 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            height: '100%',
          }}
        >
          <Box
            sx={{
              width: { sx: '100%', md: '70%' },
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              pr: { xs: 'none', md: 2 },
            }}
          >
            <Box>
              <Typography variant="h3" gutterBottom>
                Cultural Hub
              </Typography>
              <Box display="flex" gap={1}>
                <Typography variant="subtitle2">Created by Tom</Typography>
                <Typography variant="subtitle2">20 Feb 2025</Typography>
              </Box>
            </Box>
            <Typography>
              Explore and celebrate rich traditions! Read and share stories,
              recipes, and customs that keep your heritage alive. Welcome to the
              Culture section of our news, where we explore the latest trends
              and topics in art, music, film, literature, and more. From
              groundbreaking exhibitions and performances to up-and-coming
              artists and cultural events, we aim to provide you with a diverse
              range of stories that showcase the richness and diversity of our
              world's creative landscape.
            </Typography>
            <CardMedia
              component="img"
              alt="green iguana"
              image="https://picsum.photos/800/450?random=45"
              sx={{
                // aspectRatio: '16 / 9',
                borderBottom: '1px solid',
                borderColor: 'divider',
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            />
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
                  <Typography component="div" variant="h5">
                    Live From Space
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                  >
                    Mac Miller
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 2,
                  }}
                >
                  <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? (
                      <SkipNextIcon />
                    ) : (
                      <SkipPreviousIcon />
                    )}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? (
                      <SkipPreviousIcon />
                    ) : (
                      <SkipNextIcon />
                    )}
                  </IconButton>
                </Box>
              </Box>
            </Card>
            <Box>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
            <Typography>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore tenetur eius beatae omnis aliquam rerum quas corrupti
              illum obcaecati nisi quia repellendus illo dignissimos, adipisci
              est, delectus fugit vitae aperiam. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Ipsum maiores dolorem ea, quo,
              repellendus minima delectus culpa laboriosam officia assumenda
              obcaecati, mollitia accusantium voluptate nobis. Consequatur
              voluptatum obcaecati fuga aspernatur?
            </Typography>
          </Box>

          <Divider orientation="vertical" variant="middle" flexItem />

          <Box sx={{ width: { sx: '100%', md: '30%' } }}>
            <Box
              sx={{
                pl: { xs: 'none', md: 2 },
                display: 'flex',
                gap: 2,
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Related post
              </Typography>
              <Grid container spacing={2} columns={12}>
                {articleInfo.map((article, index) => (
                  <Grid key={index} size={{ xs: 12, sm: 6 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                        bgcolor: '#ffff',
                        p: 2,
                        borderRadius: '8px',
                      }}
                    >
                      <Typography variant="subtitle2">
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {article.description.length > 50
                          ? `${article.description.substring(0, 50)}...`
                          : article.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Divider />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
