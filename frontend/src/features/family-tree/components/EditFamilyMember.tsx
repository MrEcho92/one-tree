import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
  Menu,
  Divider,
  FormControl,
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
import AddMemberDialog from './AddMemberDialog';
import { Person } from '../../../types/tree';
import { transformDate } from '../../../utils/transformDate';

type EditFamilyMemberProps = {
  defaultValues: Person;
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" py={1}>
              Edit details
            </Typography>
            <Tooltip title="Close">
              <IconButton onClick={() => setIsEditing(false)}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Box>
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
                pt: { xs: 1 },
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
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
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
            <Box
              sx={{
                display: 'flex',
                mt: 2,
                gap: 1,
                justifyContent: 'space-between',
              }}
            >
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
              <Button variant="outlined" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Box>
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
            <Typography variant="h6" gutterBottom fontWeight="600">
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
              sx={{ width: 80, height: 80 }}
              src={defaultValues?.photo_url}
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
              <IconButton onClick={() => setIsEditing(true)} color="primary">
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
                Add family members
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
                <MenuItem onClick={() => handleOpenAddMember('father')}>
                  Father
                </MenuItem>
                <MenuItem onClick={() => handleOpenAddMember('mother')}>
                  Mother
                </MenuItem>
                <MenuItem onClick={() => handleOpenAddMember('spouse')}>
                  Spouse/ Ex
                </MenuItem>
                <MenuItem onClick={() => handleOpenAddMember('sibling')}>
                  Sibling
                </MenuItem>
                <MenuItem onClick={() => handleOpenAddMember('child')}>
                  Child
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Divider />
          <Button color="warning" variant="text" size="small" sx={{ mt: 2 }}>
            Show tree from here
          </Button>
          <Box sx={{ overflowY: 'scroll', maxHeight: 250 }}>
            <Typography variant="h6" py={1} fontWeight="500">
              Information
            </Typography>
            <Typography variant="subtitle1">
              Born:{' '}
              {defaultValues?.date_of_birth
                ? transformDate(defaultValues.date_of_birth)
                : ''}
            </Typography>
            {!defaultValues.is_alive ? (
              <Typography variant="subtitle1">
                Death date:{' '}
                {defaultValues.death_date
                  ? transformDate(defaultValues.death_date)
                  : ''}
              </Typography>
            ) : null}
            <Typography variant="subtitle1">
              Gender: {defaultValues?.gender}
            </Typography>
            <Typography variant="subtitle1">
              Birth place: {defaultValues.birth_place}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {defaultValues.bio || 'No bio available.'}
            </Typography>
          </Box>
        </Box>
      )}
      <AddMemberDialog
        isAddMemberOpen={isAddMemberOpen}
        setIsAddMemberOpen={setIsAddMemberOpen}
        familyType={familyType}
        handleAddMember={handleAddMember}
      />
    </Box>
  );
}
