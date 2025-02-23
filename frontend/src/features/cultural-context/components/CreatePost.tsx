import { useState } from 'react';
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
import { useCreateCulturalPost } from '../../../hooks/hubHooks';
import { CreateCulturalFormValues } from '../../../types';

const maxSize = 10 * 1024 * 1024; // 10MB

export default function CreateCulturalPost() {
  const { typography, palette } = useTheme();
  const { closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCulturalFormValues>({
    defaultValues: {
      title: '',
      content: '',
      tags: [],
      media: '',
      link_url: '',
    },
  });
  const [valueTab, setValueTab] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

  const mutation = useCreateCulturalPost();

  const onSubmit = (data: any) => {
    const payload: { [key: string]: any } = {
      title: data.title,
      content: data.content,
      tags: data.tags,
      link_url: data.link,
      // TODO: add user email
      created_by: '123@gmail.com',
    };

    let uploadType: string | null = null;

    // handle audio upload type="audio/mpeg"

    const formData = new FormData();
    if (data.media) {
      if (['image/png', 'image/jpeg', 'image/jpg'].includes(data.media.type)) {
        uploadType = 'image_url';
        formData.append('image_url', data.media);
      } else if (
        ['video/mp4', 'video/mpeg', 'video/quicktime'].includes(data.media.type)
      ) {
        uploadType = 'video_url';
        formData.append('video_url', data.media);
      }
    }

    if (uploadType) {
      payload[uploadType] = formData;
    }

    mutation.mutate(payload, {
      onSuccess: () => {
        enqueueSnackbar('Cultural post added successfully!', {
          variant: 'success',
        });
        closeModal?.();
      },
      onError: (error) => {
        enqueueSnackbar('Failed to add cultural post', {
          variant: 'error',
        });
        console.error('Error adding cultural post:', error);
      },
    });
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
          Create a cultural post
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
                      helperText="Note you can add new tags e.g. Marriage, Nigeria, Ghana, Tradition"
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
                    <Tab label="Image & Video" value="2" />
                    <Tab label="Link" value="3" />
                  </TabList>
                </Box>
                <TabPanel
                  value="1"
                  sx={{ p: { xs: '0', md: 2 }, minHeight: 400 }}
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
                            ['link', 'image', 'video'],
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
                          'bullet',
                          'indent',
                          'image',
                          'video',
                        ]}
                      />
                    )}
                  />
                </TabPanel>
                <TabPanel
                  value="2"
                  sx={{ p: { xs: '0', md: 2, minHeight: 300 } }}
                >
                  <Controller
                    name="media"
                    control={control}
                    render={({ field }) => (
                      <Box>
                        <input
                          accept="image/*,video/*"
                          style={{ display: 'none' }}
                          id="upload-media"
                          type="file"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              if (file.size > maxSize) {
                                enqueueSnackbar(
                                  'File size exceeds the maximum limit of 10MB',
                                  { variant: 'error' },
                                );
                                return;
                              }
                              field.onChange(file);
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
                            Upload media
                          </Button>
                        </label>
                      </Box>
                    )}
                  />
                </TabPanel>
                <TabPanel value="3" sx={{ p: { xs: '0', md: 2 } }}>
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
        Post
      </Button>
    </Box>
  );
}
