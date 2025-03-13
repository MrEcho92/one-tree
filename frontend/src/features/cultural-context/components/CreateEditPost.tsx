import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useForm, Controller } from 'react-hook-form';
import {
  Autocomplete,
  Button,
  Chip,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import ClearIcon from '@mui/icons-material/Clear';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import UploadIcon from '@mui/icons-material/Upload';
import { topTags } from '../../family-tree';
import { useModal } from '../../../components/common';
import {
  useCreateCulturalPost,
  useUpdateCulturalPost,
} from '../../../hooks/hubHooks';
import { CreateCulturalFormValues } from '../../../types';
import queryClient from '../../../core/http/react-query';
import { useAuth } from '../../../components/auth/AuthProvider';

const maxSize = 10 * 1024 * 1024; // 10MB

type CreateCulturalPostProps = {
  post?: any;
};

export default function CreateCulturalPost({ post }: CreateCulturalPostProps) {
  const { typography, palette } = useTheme();
  const { closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useAuth();

  const editMode = !!post;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateCulturalFormValues>({
    defaultValues: {
      title: '',
      content: '',
      tags: [],
      media: '',
      link_url: '',
    },
  });
  const [valueTab, setValueTab] = useState<string>('1');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string | null>(null);

  useEffect(() => {
    if (editMode && post) {
      reset({
        title: post.title || '',
        content: post.content || '',
        tags: post.tags || [],
        link_url: post.link_url || '',
      });

      // Determine which tab to show based on post content
      if (post.image_url) {
        setValueTab('2');
        setMediaPreview(post.image_url);
        setMediaType('image');
      } else if (post.video_url) {
        setValueTab('2');
        setMediaPreview(post.video_url);
        setMediaType('video');
      } else if (post.audio_url) {
        setValueTab('2');
        setMediaPreview(post.audio_url);
        setMediaType('audio');
      } else if (post.link_url) {
        setValueTab('3');
      } else {
        setValueTab('1');
      }
    }
  }, [editMode, post, reset]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

  const createMutation = useCreateCulturalPost();
  const updateMutation = useUpdateCulturalPost(post?.id ?? '');

  const mutation = editMode ? updateMutation : createMutation;

  const onSubmit = (data: any) => {
    if (!currentUser) {
      return;
    }
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('link_url', data.link_url);
    data.tags.forEach((tag: any) => {
      formData.append('tags', tag);
    });

    const userId = currentUser.uid;
    if (editMode) {
      formData.append('updated_by', userId);
    } else {
      formData.append('created_by', userId);
    }
    if (currentUser.displayName)
      formData.append('name', currentUser.displayName);

    if (data.media) {
      const { type } = data.media;

      if (['image/png', 'image/jpeg', 'image/jpg'].includes(type)) {
        formData.append('image_file', data.media);
      } else if (
        ['video/mp4', 'video/mpeg', 'video/quicktime'].includes(type)
      ) {
        formData.append('video_file', data.media);
      } else if (
        ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg'].includes(type)
      ) {
        formData.append('audio_file', data.media);
      }
    }

    // if (editMode) {
    //   if (post?.image_url) formData.append('image_file', post.image_url);
    //   if (post?.video_url) formData.append('video_file', post.video_url);
    //   if (post?.audio_url) formData.append('audio_file', post.audio_url);
    // }

    mutation.mutate(formData, {
      onSuccess: () => {
        enqueueSnackbar(
          `Cultural post ${editMode ? 'updated' : 'added'} successfully!`,
          {
            variant: 'success',
          },
        );
        queryClient.refetchQueries({
          queryKey: ['culturalPosts', editMode ? post.created_by : userId],
          exact: true,
        });
        closeModal?.();
      },
      onError: (error) => {
        enqueueSnackbar(
          `Failed to ${editMode ? 'update' : 'add'} cultural post`,
          {
            variant: 'error',
          },
        );
        console.error(
          `Error ${editMode ? 'updating' : 'adding'} cultural post:`,
          error,
        );
      },
    });
  };

  const handleFileChange = (file: File) => {
    if (file.size > maxSize) {
      enqueueSnackbar('File size exceeds the maximum limit of 10MB', {
        variant: 'error',
      });
      return;
    }

    setValue('media', file as any);

    // Create preview URL
    const fileUrl = URL.createObjectURL(file);
    setMediaPreview(fileUrl);

    // Set media type for preview display
    if (file.type.startsWith('image/')) {
      setMediaType('image');
    } else if (file.type.startsWith('video/')) {
      setMediaType('video');
    } else if (file.type.startsWith('audio/')) {
      setMediaType('audio');
    }
  };

  // Function to render media preview
  const renderMediaPreview = () => {
    if (!mediaPreview) return null;

    switch (mediaType) {
      case 'image':
        return (
          <Box mt={2}>
            <img
              src={mediaPreview}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          </Box>
        );
      case 'video':
        return (
          <Box mt={2}>
            <video
              controls
              src={mediaPreview}
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          </Box>
        );
      case 'audio':
        return (
          <Box mt={2}>
            <audio controls src={mediaPreview} style={{ width: '100%' }} />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 4,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            fontWeight: typography.h1.fontWeight,
            fontSize: {
              xs: typography.h5.fontSize,
              md: typography.h3.fontSize,
            },
            color: palette.text.primary,
          }}
        >
          {editMode ? 'Edit cultural post' : 'Create a cultural post'}
        </Typography>
        <IconButton onClick={closeModal}>
          <ClearIcon />
        </IconButton>
      </Box>
      <Box>
        <form>
          <Box display="flex" flexDirection="column" gap={2}>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  margin="dense"
                  error={!!errors.title}
                  helperText={errors.title ? errors.title.message : ''}
                />
              )}
            />
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  freeSolo
                  options={topTags}
                  value={field.value}
                  onChange={(_, newValue) => setValue('tags', newValue)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="Add tags"
                      fullWidth
                      margin="dense"
                      helperText="Note you can add new tags e.g. Marriage, Ghana, Tradition"
                    />
                  )}
                />
              )}
            />
            <Box sx={{ width: '100%' }}>
              <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="create post">
                    <Tab label="Text" value="1" />
                    <Tab label="Image/ Video/ Audio" value="2" />
                    <Tab label="Link" value="3" />
                  </TabList>
                </Box>
                <TabPanel
                  value="1"
                  sx={{ p: { xs: '0', md: 1 }, minHeight: 400 }}
                >
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        style={{ height: 'calc(100vh - 400px)' }}
                        modules={{
                          toolbar: [
                            [{ header: '1' }, { header: '2' }],
                            [{ size: [] }],
                            [
                              'bold',
                              'italic',
                              'underline',
                              'strike',
                              'blockquote',
                            ],
                            [
                              { list: 'ordered' },
                              { list: 'bullet' },
                              { indent: '-1' },
                              { indent: '+1' },
                            ],
                            // ['link', 'image', 'video'],
                            ['clean'],
                          ],
                        }}
                        formats={[
                          'header',
                          'font',
                          'size',
                          'bold',
                          'italic',
                          'underline',
                          'strike',
                          'blockquote',
                          'list',
                          'indent',
                          // 'image',
                          // 'video',
                        ]}
                      />
                    )}
                  />
                </TabPanel>
                <TabPanel
                  value="2"
                  sx={{ p: { xs: '0', md: 1, minHeight: 300 } }}
                >
                  <Controller
                    name="media"
                    control={control}
                    render={({ field }) => (
                      <Box py={1}>
                        <input
                          accept="image/*,video/*,audio/*"
                          style={{ display: 'none' }}
                          id="upload-media"
                          type="file"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              handleFileChange(file);
                            }
                          }}
                        />
                        <label htmlFor="upload-media">
                          <Button
                            variant="outlined"
                            color="info"
                            component="span"
                            endIcon={<UploadIcon />}
                          >
                            {editMode && mediaPreview
                              ? 'Change media'
                              : 'Upload media'}
                          </Button>
                        </label>
                        {renderMediaPreview()}
                      </Box>
                    )}
                  />
                </TabPanel>
                <TabPanel value="3" sx={{ p: { xs: '0', md: 1 } }}>
                  <Controller
                    name="link_url"
                    control={control}
                    rules={{
                      pattern: {
                        value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                        message: 'Please enter a valid URL',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Link URL"
                        fullWidth
                        margin="dense"
                        error={!!errors.link_url}
                        helperText={
                          errors.link_url ? errors.link_url.message : ''
                        }
                      />
                    )}
                  />
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
        </form>
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit(onSubmit)}
      >
        {editMode ? 'Update' : 'Post'}
      </Button>
    </Box>
  );
}
