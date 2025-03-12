import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Divider,
  MenuItem,
  OutlinedInput,
  Radio,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { AddMemberTreeForm } from '../../../types/tree';
import { capitalize } from '../../../utils/capitalize';
import { getMemberNames } from '../../../utils/getMembers';
import { MemberId } from '../../../types/tree';
import { Person } from '../../../types/tree';
import { useAuth } from '../../../components/auth/AuthProvider';

type AddMemberDialogProps = {
  isAddMemberOpen: boolean;
  setIsAddMemberOpen: Dispatch<SetStateAction<boolean>>;
  familyType?: string;
  handleAddMember: (data: any) => void;
  selectedPerson: Person;
  spouseMembers: any;
};

export default function AddMemberDialog({
  isAddMemberOpen,
  setIsAddMemberOpen,
  familyType,
  handleAddMember,
  spouseMembers,
  selectedPerson,
}: AddMemberDialogProps) {
  const { currentUser } = useAuth();
  const { control, handleSubmit, register, reset } = useForm<AddMemberTreeForm>(
    {
      defaultValues: {
        gender: 'male',
      },
    },
  );

  useEffect(() => {
    if (familyType) {
      reset({
        gender: familyType === 'mother' ? 'female' : 'male',
      });
    }
    if (selectedPerson) {
      reset({
        gender: selectedPerson.gender === 'female' ? 'male' : 'female',
      });
    }
  }, [familyType, selectedPerson, reset]);

  const [spouseNames, setSpouseNames] = useState<MemberId[]>([]);
  const [selectedSpouse, setSelectedSpouse] = useState<MemberId | null>(null);

  function onSubmit(data: AddMemberTreeForm) {
    const payload = {
      member: {
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
        created_by: currentUser?.uid,
      },
      relation: {
        primary_user_id: selectedPerson?.id,
        primary_user_gender: selectedPerson?.gender,
        rel: familyType,
        ...(familyType === 'child'
          ? {
              primary_spouse_id: selectedSpouse?.id,
              primary_spouse_gender: selectedSpouse?.gender,
              primary_children_id: selectedPerson?.children_id || [],
            }
          : null),
      },
    };

    handleAddMember(payload);

    reset({
      first_name: '',
      last_name: '',
      date_of_birth: null,
      gender:
        familyType === 'father'
          ? 'male'
          : familyType === 'mother'
            ? 'female'
            : 'male',
    } as any);
  }

  useEffect(() => {
    if (spouseMembers && isAddMemberOpen) {
      const spouse = getMemberNames(
        spouseMembers,
        selectedPerson?.spouse_id || [],
      );
      setSpouseNames(spouse);
    }
  }, [spouseMembers, isAddMemberOpen, selectedPerson?.spouse_id]);

  return (
    <Dialog
      open={isAddMemberOpen}
      onClose={() => setIsAddMemberOpen(false)}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Add New Family Member - {capitalize(familyType!)}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="First Name"
              {...register('first_name', { required: true })}
              required
            />
            <TextField
              label="Last Name"
              {...register('last_name', { required: true })}
              required
            />
            <Controller
              name={'date_of_birth'}
              control={control}
              render={({ field }) => (
                <DatePicker
                  minDate={dayjs('1850-01-01').toDate()}
                  maxDate={dayjs().toDate()}
                  label="Date of Birth"
                  format="dd/MM/yyyy"
                  value={field.value ? new Date(field.value as string) : null}
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
            <FormControl component="fieldset" required>
              <FormLabel>Gender</FormLabel>
              <Controller
                name={'gender'}
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row value={field.value}>
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
            {familyType === 'child' && (
              <>
                <Divider />
                <FormControl sx={{ my: 1 }}>
                  <FormLabel
                    sx={{ color: (theme) => theme.palette.text.primary }}
                  >
                    Select the other parent (optional)
                  </FormLabel>
                  <Typography variant="body2" py={1}>
                    If no parent is selected, the child will be added with only
                    one parent.
                  </Typography>
                  <Select
                    input={<OutlinedInput label="" />}
                    labelId="add-member-select-small-label"
                    id="add-member-select-small"
                    value={selectedSpouse?.fullName}
                    label="Spouse"
                    onChange={(event: SelectChangeEvent) => {
                      const value = event.target.value;
                      if (value === '') setSelectedSpouse(null);
                      setSelectedSpouse(
                        spouseNames?.find(
                          (name: MemberId) => name.id === value,
                        ) || null,
                      );
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {spouseNames.map((member: MemberId) => (
                      <MenuItem key={member.id} value={member.id}>
                        {member.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </Box>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
            <Button onClick={() => setIsAddMemberOpen(false)}>Cancel</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
