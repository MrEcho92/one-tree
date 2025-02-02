import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
  Stack,
  Menu,
  Divider,
  FormControl,
  InputLabel,
  Select,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import EditNoteIcon from '@mui/icons-material/EditNote';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type EditFamilyMemberProps = {
  defaultValues: any;
  closeDrawer: () => void;
};

export function EditFamilyMember({
  defaultValues,
  closeDrawer,
}: EditFamilyMemberProps) {
  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState<boolean>(false);
  const [familyType, setFamilyType] = useState<string>('');

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const isAlive = watch('is_alive', true);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //   useEffect(() => {
  //     reset(defaultValues); // Reset form when data changes
  //   }, [defaultValues, reset]);

  const handleUpdate = (data: any) => {
    console.log('update data: ', data);
  };

  const handleAddMember = (data: any) => {
    console.log('add member: ', data);
  };

  const handleOpenAddMember = (type: string) => {
    setFamilyType(type);
    setIsAddMemberOpen(true);
  };

  return (
    <Box>
      {isEditing ? (
        <>
          <Typography variant="h4">Edit details</Typography>
          <form onSubmit={() => {}}>
            <Controller
              name="photo_url"
              control={control}
              render={({ field }) => (
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  <Avatar
                    src={field.value}
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                </div>
              )}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                overflowY: 'scroll',
                maxHeight: 650,
              }}
            >
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="First Name" fullWidth />
                )}
              />
              <Controller
                name="middle_name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Middle Name" fullWidth />
                )}
              />
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Last Name" fullWidth />
                )}
              />
              <Controller
                name="date_of_birth"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Date of Birth"
                    format="dd/MM/yyyy"
                    value={field.value ? new Date(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date ? date.toISOString() : null)
                    }
                    slots={{ textField: TextField }}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                )}
              />
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel>Gender</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Controller
                    name="is_alive"
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                }
                label="Is Alive?"
                sx={{ mt: 2 }}
              />
              {!isAlive && (
                <Controller
                  name="death_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Date of Death"
                      format="dd/MM/yyyy"
                      value={field.value ? new Date(field.value) : null}
                      onChange={(date) =>
                        field.onChange(date ? date.toISOString() : null)
                      }
                      slots={{ textField: TextField }}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  )}
                />
              )}
              <Controller
                name="birth_place"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Place of Birth"
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                )}
              />
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Bio"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mt: 2 }}
                  />
                )}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 2, ml: 2 }}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </form>
        </>
      ) : (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" gutterBottom>
              {`${defaultValues.first_name} ${defaultValues.last_name}`}
            </Typography>
            <Tooltip title="Close">
              <IconButton onClick={closeDrawer}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Avatar
              sx={{ width: 56, height: 56 }}
              src={defaultValues.photo_url}
            >
              H
            </Avatar>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              py: 1,
            }}
          >
            <Tooltip title="Edit details">
              <IconButton onClick={() => setIsEditing(true)}>
                <EditNoteIcon />
              </IconButton>
            </Tooltip>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleClick}
              >
                Add family member
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={() => handleOpenAddMember('Father')}>
                  Father
                </MenuItem>
                <MenuItem onClick={() => handleOpenAddMember('Mother')}>
                  Mother
                </MenuItem>
                <MenuItem onClick={() => handleOpenAddMember('Spouse')}>
                  Spouse/ Ex
                </MenuItem>
                <MenuItem onClick={() => handleOpenAddMember('Sibling')}>
                  Sibling
                </MenuItem>
                <MenuItem onClick={() => handleOpenAddMember('Child')}>
                  Child
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Divider />
          <Typography variant="h5">
            {defaultValues.first_name} {defaultValues.last_name}
          </Typography>
          <Typography variant="subtitle1">
            Born: {defaultValues.date_of_birth}
          </Typography>
          <Typography variant="subtitle1">
            Gender: {defaultValues.gender}
          </Typography>
          <Typography variant="subtitle1">Bio: {defaultValues.bio}</Typography>
          <Typography variant="subtitle1">
            Birth place: {defaultValues.birth_place || 'N/A'}
          </Typography>
          <Typography variant="subtitle1">
            {defaultValues.is_alive
              ? 'Alive'
              : `Died: ${defaultValues.death_date}`}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {defaultValues.bio || 'No bio available.'}
          </Typography>
        </Box>
      )}
      <Dialog open={isAddMemberOpen} onClose={() => setIsAddMemberOpen(false)}>
        <DialogTitle>Add New Family Member - {familyType}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleAddMember)}>
            <Box>
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="First Name" fullWidth />
                )}
              />
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    sx={{ my: 2 }}
                  />
                )}
              />
              <Controller
                name="date_of_birth"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Date of Death"
                    format="dd/MM/yyyy"
                    value={field.value ? new Date(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date ? date.toISOString() : null)
                    }
                    slots={{ textField: TextField }}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                )}
              />
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ my: 1 }}
          >
            Add Member
          </Button>
          <Button onClick={() => setIsAddMemberOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
