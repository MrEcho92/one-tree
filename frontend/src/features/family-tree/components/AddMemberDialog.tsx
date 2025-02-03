import { Dispatch, SetStateAction } from 'react';
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
import { Radio } from '@mui/material';
import { AddMemberTreeForm } from '../../../types/tree';

type AddMemberDialogProps = {
  isAddMemberOpen: boolean;
  setIsAddMemberOpen: Dispatch<SetStateAction<boolean>>;
  familyType?: string;
  handleAddMember: (data: any) => void;
};

export default function AddMemberDialog({
  isAddMemberOpen,
  setIsAddMemberOpen,
  familyType,
  handleAddMember,
}: AddMemberDialogProps) {
  const { control, handleSubmit, register, reset } = useForm<AddMemberTreeForm>(
    {
      defaultValues: {},
    },
  );
  function onSubmit(data: AddMemberTreeForm) {
    const payload = {
      [familyType as string]: data,
    };
    console.log('data', payload);
    reset();
  }
  return (
    <Dialog
      open={isAddMemberOpen}
      onClose={() => setIsAddMemberOpen(false)}
      maxWidth="sm"
    >
      <DialogTitle>Add New Family Member - {familyType}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
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
                  label="Date of Death"
                  format="dd/MM/yyyy"
                  value={field.value ? new Date(field.value as string) : null}
                  onChange={(date) =>
                    field.onChange(date ? date.toISOString() : null)
                  }
                  slots={{ textField: TextField }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              )}
            />
          </Box>
          <FormControl component="fieldset">
            <FormLabel>Gender</FormLabel>
            <Controller
              name={'gender'}
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  defaultValue={
                    familyType == 'father'
                      ? 'male'
                      : familyType == 'mother'
                        ? 'female'
                        : null
                  }
                >
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
