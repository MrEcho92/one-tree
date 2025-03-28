import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { AddStoryPayload } from '../../../types';
import { topTags } from './constants';
import { useAuth } from '../../../components/auth/AuthProvider';

type AddStoryProps = {
  closeModal: () => void;
  onAddStory: (payload: AddStoryPayload) => void;
  treeId: string;
};

type FormValues = {
  title: string;
  content: string;
  tags: string[];
  is_public: boolean;
};

export default function AddStoryToTree({
  closeModal,
  onAddStory,
  treeId,
}: AddStoryProps) {
  const { currentUser } = useAuth();
  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      title: '',
      content: '',
      tags: [],
      is_public: false,
    },
  });

  function onSubmit(data: any) {
    if (currentUser) {
      const payload: AddStoryPayload = {
        title: data.title,
        content: data.content,
        tags: data.tags,
        is_public: data.is_public,
        tree_id: treeId,
        created_by: currentUser.uid,
      };

      if (onAddStory) {
        onAddStory(payload);
      }
    }
  }

  return (
    <Box p={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        <Typography variant="h5">Add story</Typography>
        <IconButton onClick={closeModal}>
          <ClearIcon />
        </IconButton>
      </Box>
      <Box py={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                InputLabelProps={{ shrink: true }}
              />
            )}
          />

          <Controller
            name="content"
            control={control}
            rules={{ required: 'Content is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Content"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="dense"
                multiline
                rows={8}
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
                    InputLabelProps={{ shrink: true }}
                    placeholder="Add tags"
                    fullWidth
                    margin="dense"
                    helperText="Note you can add new tags e.g. marriage, tradition"
                  />
                )}
              />
            )}
          />

          <Controller
            name="is_public"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch {...field} checked={field.value} />}
                label="Make story public"
              />
            )}
          />
        </form>
      </Box>
      <Box
        py={2}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
          fullWidth
        >
          Add story
        </Button>
      </Box>
    </Box>
  );
}
