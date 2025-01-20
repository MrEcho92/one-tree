import Box from '@mui/material/Box';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Divider, useTheme } from '@mui/material';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface CreateTreeFormValues {
  name: string;
  description?: string;
  is_public: boolean;
  root_first_name: string;
  root_last_name: string;
  root_date_of_birth?: string;
  root_gender: string;
  root_is_alive: boolean;
  father_first_name?: string;
  father_last_name?: string;
  father_date_of_birth?: string;
  father_gender?: string;
  father_is_alive?: boolean;
  mother_first_name?: string;
  mother_last_name?: string;
  mother_date_of_birth?: string;
  mother_gender?: string;
  mother_is_alive?: boolean;
}

export default function CreateTree() {
  const { typography, palette } = useTheme();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateTreeFormValues>({
    defaultValues: {
      is_public: false,
      root_is_alive: true,
      father_is_alive: true,
      mother_is_alive: true,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: CreateTreeFormValues) => {
    const payload = {
      name: data.name,
      description: data.description,
      is_public: data.is_public,
      root_member: {
        first_name: data.root_first_name,
        last_name: data.root_last_name,
        date_of_birth: data.root_date_of_birth,
        gender: data.root_gender,
        is_alive: data.root_is_alive,
      },
      father: {
        first_name: data.father_first_name,
        last_name: data.father_last_name,
        date_of_birth: data.father_date_of_birth,
        gender: data.father_gender,
        is_alive: data.father_is_alive,
      },
      mother: {
        first_name: data.mother_first_name,
        last_name: data.mother_last_name,
        date_of_birth: data.mother_date_of_birth,
        gender: data.mother_gender,
        is_alive: data.mother_is_alive,
      },
    };

    console.log('payload', payload);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 4,
      }}
    >
      <Typography
        sx={{
          fontWeight: typography.h1.fontWeight,
          fontSize: { xs: typography.h4.fontSize, md: typography.h3.fontSize },
          color: palette.text.primary,
        }}
      >
        Create Family Tree
      </Typography>
      <TextField
        label="Tree Name"
        {...register('name', { required: true })}
        required
      />
      <TextField label="Description" {...register('description')} />
      <FormControlLabel
        control={<Checkbox {...register('is_public')} />}
        label="Make tree public?"
      />
      <Divider />
      <Typography
        sx={{
          fontSize: {
            xs: typography.body1.fontSize,
            md: typography.h4.fontSize,
          },
          color: palette.text.secondary
        }}
      >
        Root Member (Me)
      </Typography>
      <TextField
        label="First Name"
        {...register('root_first_name', { required: true })}
        required
      />
      <TextField
        label="Last Name"
        {...register('root_last_name', { required: true })}
        required
      />
      <Controller
        name="root_date_of_birth"
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
      <FormControl>
        <InputLabel>Gender</InputLabel>
        <Controller
          name="root_gender"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          )}
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox {...register('root_is_alive')} />}
        label="Is Deceased?"
      />
      <Divider />
      <Typography
        sx={{
          fontSize: {
            xs: typography.body1.fontSize,
            md: typography.h4.fontSize,
          },
          color: palette.text.secondary
        }}
      >
        Father
      </Typography>
      <TextField label="First Name" {...register('father_first_name')} />
      <TextField label="Last Name" {...register('father_last_name')} />
      <Controller
        name="father_date_of_birth"
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
      <FormControl>
        <InputLabel>Gender</InputLabel>
        <Controller
          name="father_gender"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          )}
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox {...register('father_is_alive')} />}
        label="Is Deceased?"
      />
      <Divider />
      <Typography
        sx={{
          fontSize: {
            xs: typography.body1.fontSize,
            md: typography.h4.fontSize,
          },
          color: palette.text.secondary
        }}
      >
        Mother
      </Typography>
      <TextField label="First Name" {...register('mother_first_name')} />
      <TextField label="Last Name" {...register('mother_last_name')} />
      <Controller
        name="mother_date_of_birth"
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
      <FormControl>
        <InputLabel>Gender</InputLabel>
        <Controller
          name="mother_gender"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          )}
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox {...register('mother_is_alive')} />}
        label="Is Deceased?"
      />

      <Button type="submit" variant="contained" color="primary">
        Create Tree
      </Button>
    </Box>
  );
}
