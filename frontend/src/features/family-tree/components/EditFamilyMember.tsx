import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
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
import ClearIcon from '@mui/icons-material/Clear';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddMemberDialog from './AddMemberDialog';
import { Person, UpdateMemberPayload } from '../../../types/tree';
import { transformDate } from '../../../utils/date';
import { useUpdateMember } from '../../../hooks/treeHooks';
import queryClient from '../../../core/http/react-query';
import { stringAvatar } from '../../../utils/transformTree';
import { capitalize } from '../../../utils';
import { useAuth } from '../../../components/auth/AuthProvider';

type EditFamilyMemberProps = {
  defaultValues: Person;
  closeDrawer: () => void;
  onAddMember: (data: any) => void;
  treeMembers?: ReadonlyArray<any>;
  setRootId?: React.Dispatch<React.SetStateAction<string | null>>;
  openDeleteMemberModal: (name: string, nodeId: string) => void;
  firstRootId: string;
  treeId: string;
};

export default function EditFamilyMember({
  defaultValues,
  closeDrawer,
  onAddMember,
  treeMembers,
  setRootId,
  openDeleteMemberModal,
  firstRootId,
  treeId,
}: EditFamilyMemberProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, reset, watch } = useForm<Person>({
    defaultValues,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState<boolean>(false);
  const [familyType, setFamilyType] = useState<string>('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isAlive = watch('is_alive', true);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [updatedData, setUpdatedData] = useState<any>(defaultValues);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (updatedData) {
      reset(updatedData);
    }
  }, [updatedData, reset]);

  const updateMutation = useUpdateMember(defaultValues?.id);

  const handleUpdate = (data: any) => {
    if (!currentUser) {
      return;
    }
    const payload: UpdateMemberPayload = {
      ...data,
      updated_by: currentUser.uid,
    };
    updateMutation.mutate(payload, {
      onSuccess: (updatedPerson) => {
        enqueueSnackbar('Family member details updated successfully!', {
          variant: 'success',
        });
        setIsEditing(false);
        setUpdatedData(updatedPerson);

        queryClient.refetchQueries({
          queryKey: ['familyTrees', treeId],
          exact: true,
        });
      },
      onError: (error) => {
        enqueueSnackbar('Failed to update family member details', {
          variant: 'error',
        });
        console.error('Error updating member:', error);
      },
    });
  };

  const handleAddMember = (data: any) => {
    onAddMember(data);
    setIsAddMemberOpen(false);
  };

  const handleOpenAddMember = (type: string) => {
    setFamilyType(type);
    setIsAddMemberOpen(true);
  };

  const MemberName =
    `${updatedData.first_name} ${updatedData.last_name}` as const;

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
          <form onSubmit={handleSubmit(handleUpdate)}>
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
                gap: 2,
                overflowY: 'scroll',
                minHeight: 650,
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
                name="last_name_at_birth"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Last Name at Birth" fullWidth />
                )}
              />
              <Controller
                name="date_of_birth"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    minDate={dayjs('1850-01-01').toDate()}
                    label="Date of Birth"
                    format="dd/MM/yyyy"
                    value={field.value ? new Date(field.value) : null}
                    onChange={(date) =>
                      field.onChange(
                        date instanceof Date && !isNaN(date.valueOf())
                          ? date.toISOString()
                          : null,
                      )
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
                      minDate={dayjs('1850-01-01').toDate()}
                      label="Date of Death"
                      format="dd/MM/yyyy"
                      value={field.value ? new Date(field.value) : null}
                      onChange={(date) =>
                        field.onChange(
                          date instanceof Date && !isNaN(date.valueOf())
                            ? date.toISOString()
                            : null,
                        )
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
              {MemberName}
            </Typography>
            <Tooltip title="Close">
              <IconButton onClick={closeDrawer}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Avatar
              {...stringAvatar(
                updatedData,
                `${updatedData?.first_name} ${updatedData?.last_name}`,
              )}
              src={updatedData?.photo_url}
            ></Avatar>
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
              <Tooltip title="Add family members">
                <IconButton onClick={handleClick} color="primary">
                  <GroupAddIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {!updatedData?.father_id && (
                  <MenuItem onClick={() => handleOpenAddMember('father')}>
                    Father
                  </MenuItem>
                )}
                {!updatedData?.mother_id && (
                  <MenuItem onClick={() => handleOpenAddMember('mother')}>
                    Mother
                  </MenuItem>
                )}
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
            {firstRootId !== updatedData.id && (
              <Tooltip title="Delete member">
                <IconButton
                  onClick={() =>
                    openDeleteMemberModal(MemberName, updatedData.id)
                  }
                  color="primary"
                >
                  <PersonRemoveIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Divider />
          <Button
            color="warning"
            variant="outlined"
            size="small"
            sx={{ mt: 2 }}
            onClick={() => {
              if (setRootId) setRootId(defaultValues.id);
              closeDrawer();
            }}
          >
            Show tree from here
          </Button>
          <Box sx={{ overflowY: 'scroll', maxHeight: 650 }}>
            <Typography variant="h5" py={1} fontWeight="500">
              Information
            </Typography>
            {updatedData?.middle_name && (
              <Box display={'flex'} gap={2} alignItems={'center'}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  Middle name
                </Typography>
                <Typography>{updatedData?.middle_name}</Typography>
              </Box>
            )}
            {updatedData?.last_name_at_birth && (
              <Box display={'flex'} gap={2} alignItems={'center'}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  Last Name at Birth
                </Typography>
                <Typography>{updatedData?.middle_name}</Typography>
              </Box>
            )}
            {updatedData?.date_of_birth && (
              <Box display={'flex'} gap={2} alignItems={'center'}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  Born
                </Typography>
                <Typography>
                  {transformDate(updatedData?.date_of_birth)}
                </Typography>
              </Box>
            )}
            {!updatedData?.is_alive && (
              <Box display={'flex'} gap={2} alignItems={'center'}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  Death date
                </Typography>
                <Typography>
                  {transformDate(updatedData?.death_date)}
                </Typography>
              </Box>
            )}
            {updatedData?.gender && (
              <Box display={'flex'} gap={2} alignItems={'center'}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  Gender
                </Typography>
                <Typography>{capitalize(updatedData?.gender)}</Typography>
              </Box>
            )}
            {updatedData?.gender && (
              <Box display={'flex'} gap={2} alignItems={'center'}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  Birth place
                </Typography>
                <Typography>{updatedData.birth_place}</Typography>
              </Box>
            )}
            {updatedData?.bio && (
              <Box display={'flex'} flexDirection={'column'} gap={1}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  Bio
                </Typography>
                <Typography variant="body2">
                  {updatedData?.bio || 'No bio available.'}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
      <AddMemberDialog
        isAddMemberOpen={isAddMemberOpen}
        setIsAddMemberOpen={setIsAddMemberOpen}
        familyType={familyType}
        handleAddMember={handleAddMember}
        selectedPerson={defaultValues}
        spouseMembers={treeMembers}
      />
    </Box>
  );
}
