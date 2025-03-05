import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../components/common';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Divider,
  FormLabel,
  IconButton,
  useTheme,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  CreateFamilyTreePayload,
  CreateTreeFormValues,
} from '../../../types/tree';
import { useCreateFamilyTree } from '../../../hooks/treeHooks';
import { ApiResponse } from '../../../types/api';
import { useAuth } from '../../../components/auth/AuthProvider';

export default function CreateTree() {
  const { typography, palette } = useTheme();
  const { currentUser } = useAuth();
  const { closeModal } = useModal();
  const { control, handleSubmit, register } = useForm<CreateTreeFormValues>({
    defaultValues: {
      is_public: false,
      father_is_alive: true,
      mother_is_alive: true,
    },
  });

  const navigate = useNavigate();
  const { t } = useTranslation(['tree', 'common']);

  const mutation = useCreateFamilyTree();

  const onSubmit = async (data: CreateTreeFormValues) => {
    if (!currentUser) {
      return;
    }
    const payload: CreateFamilyTreePayload = {
      name: data.name,
      description: data.description,
      is_public: data.is_public,
      created_by: currentUser.uid,
      root_member: {
        first_name: data.root_first_name,
        last_name: data.root_last_name,
        date_of_birth: data.root_date_of_birth,
        gender: data.root_gender,
      },
      father: {
        first_name: data.father_first_name,
        last_name: data.father_last_name,
        date_of_birth: data.father_date_of_birth,
        gender: data.father_gender,
        is_alive: !data.father_is_alive,
      },
      mother: {
        first_name: data.mother_first_name,
        last_name: data.mother_last_name,
        date_of_birth: data.mother_date_of_birth,
        gender: data.mother_gender,
        is_alive: !data.mother_is_alive,
      },
    };

    mutation.mutate(payload, {
      onSuccess: (response: ApiResponse<{ id: string }>) => {
        if ('id' in response) {
          navigate(`/app/tree/${response.id}`);
        } else if (response.data && 'id' in response.data) {
          navigate(`/app/tree/${response.data.id}`);
        }
        closeModal?.();
      },
      onError: (error) => {
        console.error('Error creating family tree:', error);
      },
    });
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            fontWeight: typography.h1.fontWeight,
            fontSize: {
              xs: typography.h4.fontSize,
              md: typography.h3.fontSize,
            },
            color: palette.text.primary,
          }}
        >
          {t('tree:createTree.title')}
        </Typography>
        <IconButton onClick={closeModal}>
          <ClearIcon />
        </IconButton>
      </Box>
      <TextField
        label={t('tree:createTree.sections.treeName')}
        {...register('name', { required: true })}
        required
      />
      <TextField
        label={t('tree:createTree.sections.description')}
        {...register('description')}
      />
      <FormControlLabel
        control={<Checkbox {...register('is_public')} />}
        label={t('tree:createTree.sections.makeTreePublic')}
      />
      <Divider />
      <Typography
        sx={{
          fontSize: {
            xs: typography.body1.fontSize,
            md: typography.h4.fontSize,
          },
          color: palette.text.secondary,
        }}
      >
        {t('tree:createTree.sections.makeTreePublic')}
      </Typography>
      <TextField
        label={t('tree:createTree.sections.common.firstName')}
        {...register('root_first_name', { required: true })}
        required
      />
      <TextField
        label={t('tree:createTree.sections.common.lastName')}
        {...register('root_last_name', { required: true })}
        required
      />
      <Controller
        name="root_date_of_birth"
        control={control}
        render={({ field }) => (
          <DatePicker
            minDate={dayjs('1850-01-01').toDate()}
            label={t('tree:createTree.sections.common.dob')}
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
      <FormControl component="fieldset" required>
        <FormLabel>{t('tree:createTree.sections.common.gender')}</FormLabel>
        <Controller
          name="root_gender"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value="male">{t('common:male')}</MenuItem>
              <MenuItem value="female">{t('common:female')}</MenuItem>
            </Select>
          )}
        />
      </FormControl>
      <Divider />
      <Typography
        sx={{
          fontSize: {
            xs: typography.body1.fontSize,
            md: typography.h4.fontSize,
          },
          color: palette.text.secondary,
        }}
      >
        {t('tree:createTree.sections.father.title')}
      </Typography>
      <TextField
        label={t('tree:createTree.sections.common.firstName')}
        {...register('father_first_name')}
      />
      <TextField
        label={t('tree:createTree.sections.common.lastName')}
        {...register('father_last_name')}
      />
      <Controller
        name="father_date_of_birth"
        control={control}
        render={({ field }) => (
          <DatePicker
            minDate={dayjs('1850-01-01').toDate()}
            label={t('tree:createTree.sections.common.dob')}
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
      <FormControl component="fieldset" required>
        <FormLabel>{t('tree:createTree.sections.common.gender')}</FormLabel>
        <Controller
          name="father_gender"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value="male">{t('common:male')}</MenuItem>
              <MenuItem value="female">{t('common:female')}</MenuItem>
            </Select>
          )}
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox {...register('father_is_alive')} />}
        label={t('tree:createTree.sections.common.deceased')}
      />
      <Divider />
      <Typography
        sx={{
          fontSize: {
            xs: typography.body1.fontSize,
            md: typography.h4.fontSize,
          },
          color: palette.text.secondary,
        }}
      >
        {t('tree:createTree.sections.mother.title')}
      </Typography>
      <TextField
        label={t('tree:createTree.sections.common.firstName')}
        {...register('mother_first_name')}
      />
      <TextField
        label={t('tree:createTree.sections.common.lastName')}
        {...register('mother_last_name')}
      />
      <Controller
        name="mother_date_of_birth"
        control={control}
        render={({ field }) => (
          <DatePicker
            minDate={dayjs('1850-01-01').toDate()}
            label={t('tree:createTree.sections.common.dob')}
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
      <FormControl component="fieldset" required>
        <FormLabel>{t('tree:createTree.sections.common.gender')}</FormLabel>
        <Controller
          name="mother_gender"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value="male">{t('common:male')}</MenuItem>
              <MenuItem value="female">{t('common:female')}</MenuItem>
            </Select>
          )}
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox {...register('mother_is_alive')} />}
        label={t('tree:createTree.sections.common.deceased')}
      />

      <Button type="submit" variant="contained" color="primary">
        {t('tree:createTree.actionBtn')}
      </Button>
    </Box>
  );
}
