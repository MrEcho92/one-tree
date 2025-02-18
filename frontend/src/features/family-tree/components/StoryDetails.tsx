import React, { useState } from 'react';
import {
  Typography,
  Box,
  Menu,
  MenuItem,
  TextField,
  FormControlLabel,
  Switch,
  Button,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { FamilyStory, UpdateStoryPayload } from '../../../types/tree';
import { capitalize } from '../../../utils';
import { useModal } from '../../../components/common';
import DeleteStory from './DeleteStory';
import { StoryForm } from '../../../types/tree';
import { topTags } from './constants';

type StoryDetailsProps = {
  story: FamilyStory;
  onDeleteStory: () => void;
  onUpdateStory: (payload: UpdateStoryPayload) => void;
};

export default function StoryDetails({
  story,
  onDeleteStory,
  onUpdateStory,
}: StoryDetailsProps) {
  const { openModal, closeModal } = useModal();

  const { control, handleSubmit, setValue } = useForm<StoryForm>({
    defaultValues: story,
  });

  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => setIsEditing(!isEditing);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!story)
    return (
      <Box p={2}>
        <Typography variant="body2">No story selected</Typography>
      </Box>
    );

  function openDeleteModal(): void {
    openModal(<DeleteStory closeModal={closeModal} onDelete={onDeleteStory} />);
  }

  function onSubmit(data: any) {
    // TODO: add user email
    const payload: UpdateStoryPayload = {
      title: data.title,
      content: data.content,
      tags: data.tags,
      is_public: data.is_public,
      updated_by: '123@gmail.com',
    };

    if (onUpdateStory) {
      onUpdateStory(payload);
    }
    setIsEditing(false);
  }

  return (
    <Box p={3}>
      {isEditing && (
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Content"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={5}
                  margin="normal"
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
                      helperText="Please note you can add new tags"
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
                  label="Public"
                />
              )}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button onClick={handleEdit} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      )}
      {!isEditing && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" gutterBottom>
              {capitalize(story?.title)}
            </Typography>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => setIsEditing(true)}>
                <EditIcon color="info" /> Edit
              </MenuItem>
              <MenuItem onClick={openDeleteModal}>
                <DeleteIcon color="info" /> Delete
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="body1"
            sx={{ marginBottom: 2, whiteSpace: 'pre-line' }}
          >
            {story?.content}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {story?.tags?.map((tag, index) => (
              <Chip key={index} label={tag} variant="outlined" />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
