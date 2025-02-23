import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {
  FacebookIcon,
  FacebookShareButton,
  XIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import { useGetCulturalPostsByUser } from '../../../hooks/hubHooks';
import { capitalize } from '../../../utils';
import { formatDate } from '../../../utils';
import { AppConfig } from '../../../core/constants';

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
  const { contextId } = useParams();

  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const { data, isLoading, isError } = useGetCulturalPostsByUser(
    contextId ?? '',
  );

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error...</Box>;
  }

  let PostDetails;
  if (data) {
    PostDetails = data as any;
  }

  return (
    <Box mt="64px">
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
              <Typography variant="h1" gutterBottom>
                {capitalize(PostDetails?.title)}
              </Typography>
              <Box display="flex" gap={1}>
                <Typography variant="subtitle2">
                  Written by {PostDetails?.created_by}
                </Typography>
                <Typography variant="subtitle2">
                  {formatDate(PostDetails?.updated_at)}
                </Typography>
              </Box>
            </Box>
            <Box>
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {PostDetails?.content}
              </ReactMarkdown>
            </Box>
            {PostDetails?.image_url && (
              <CardMedia
                component="img"
                alt="green iguana"
                image={PostDetails?.image_url}
                sx={{
                  // aspectRatio: '16 / 9',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  width: '100%',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              />
            )}
            {PostDetails?.video_url && (
              <Box>
                <iframe
                  width="100%"
                  height="315"
                  src={PostDetails?.video_url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            )}
            {PostDetails?.link_url && (
              <Box textAlign="center" mt={4}>
                <Link
                  href={PostDetails?.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  {PostDetails?.link_url}
                </Link>
              </Box>
            )}
            <Card sx={{ width: '100%', mx: 'auto', p: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Listen to this Audio
                </Typography>
                <audio
                  controls
                  controlsList="nodownload"
                  style={{ width: '100%' }}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source
                    src={
                      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
                    }
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </CardContent>
            </Card>
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
                Related posts
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
              <Box>
                <Typography variant="h6" gutterBottom>
                  Share
                </Typography>
                <Box display="flex" gap={1}>
                  <Box
                    sx={{
                      svg: {
                        borderRadius: '50%',
                        height: '35px',
                        width: '35px',
                        overflow: 'hidden',
                      },
                    }}
                  >
                    <FacebookShareButton
                      url={url}
                      hashtag={AppConfig.SITE_NAME}
                    >
                      <FacebookIcon />
                    </FacebookShareButton>
                  </Box>
                  <Box
                    sx={{
                      svg: {
                        borderRadius: '50%',
                        height: '35px',
                        width: '35px',
                        overflow: 'hidden',
                      },
                    }}
                  >
                    <TwitterShareButton
                      url={url}
                      title={PostDetails?.title}
                      hashtags={[AppConfig.SITE_NAME]}
                    >
                      <XIcon />
                    </TwitterShareButton>
                  </Box>
                  <Box
                    sx={{
                      svg: {
                        borderRadius: '50%',
                        height: '35px',
                        width: '35px',
                        overflow: 'hidden',
                      },
                    }}
                  >
                    <WhatsappShareButton url={url} title={PostDetails?.title}>
                      <WhatsappIcon />
                    </WhatsappShareButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
