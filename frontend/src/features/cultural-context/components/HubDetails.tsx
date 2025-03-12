import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {
  FacebookIcon,
  FacebookShareButton,
  XIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  TelegramIcon,
  TelegramShareButton,
  ThreadsIcon,
  ThreadsShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from 'react-share';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import {
  useGetCulturalPosts,
  useGetCulturalPostsById,
} from '../../../hooks/hubHooks';
import { formatDate } from '../../../utils';
import { AppConfig } from '../../../core/constants';
import ErrorDisplay from '../../../components/common/ErrorDisplay';

export default function HubDetails() {
  const { contextId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const {
    data,
    isLoading,
    isError,
    error: postsError,
    refetch: postsRefetch,
  } = useGetCulturalPostsById(contextId ?? '');

  useEffect(() => {
    let postData = data as any;
    if (postData?.tag?.length) {
      setSearchQuery(postData.tag[0]);
    }
  }, [data]);

  const {
    data: relatedData,
    isLoading: isRelatedDataLoading,
    isError: isRelatedDataError,
    error: errorQueryError,
    refetch: queryErrorRefetch,
  } = useGetCulturalPosts(searchQuery || '', 1, 5);

  if (isLoading || isRelatedDataLoading) {
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

  if (isError || isRelatedDataError) {
    return (
      <ErrorDisplay
        error={postsError || errorQueryError}
        onRetry={postsRefetch || queryErrorRefetch}
      />
    );
  }

  let postDetails: any;
  if (data) {
    postDetails = data as any;
  }

  let relatedPosts: any[] = [];
  if (relatedData) {
    const relateDataObj = relatedData as any;
    relatedPosts = relateDataObj?.cultural_contexts?.slice(0, 2);
  }
  return (
    <Box mt="64px">
      <Container
        maxWidth="lg"
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
                {postDetails?.title}
              </Typography>
              <Box display="flex" gap={1}>
                <Typography variant="subtitle2">
                  Written by {postDetails?.name}
                </Typography>
                <Typography variant="subtitle2">
                  {formatDate(postDetails?.updated_at)}
                </Typography>
              </Box>
            </Box>
            <Box>
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {postDetails?.content}
              </ReactMarkdown>
            </Box>
            {postDetails?.image_url && (
              <CardMedia
                component="img"
                alt="green iguana"
                image={postDetails?.image_url}
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
            {postDetails?.video_url && (
              <Box>
                <iframe
                  width="100%"
                  height="315"
                  src={postDetails?.video_url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            )}
            {postDetails?.link_url && (
              <Box textAlign="center" mt={4}>
                <Link
                  href={postDetails?.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  {postDetails?.link_url}
                </Link>
              </Box>
            )}
            {postDetails?.audio_url && (
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
                    <source src={postDetails?.audio_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </CardContent>
              </Card>
            )}
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
                {relatedPosts?.map((post, index) => (
                  <Grid key={post.id} size={{ xs: 12, sm: 6 }}>
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
                      onClick={() => {
                        navigate(`/hub/${post.id}`);
                      }}
                    >
                      <Typography variant="subtitle2">{post.title}</Typography>
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
                  <FacebookShareButton url={url} hashtag={AppConfig.SITE_NAME}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>

                  <TwitterShareButton
                    url={url}
                    title={postDetails?.title}
                    hashtags={[AppConfig.SITE_NAME]}
                  >
                    <XIcon size={32} round />
                  </TwitterShareButton>

                  <WhatsappShareButton url={url} title={postDetails?.title}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>

                  <TelegramShareButton url={url} title={postDetails?.title}>
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>

                  <LinkedinShareButton url={url} title={postDetails?.title}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>

                  <ThreadsShareButton url={url} title={postDetails?.titlr}>
                    <ThreadsIcon size={32} round />
                  </ThreadsShareButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
