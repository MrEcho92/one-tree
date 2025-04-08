import { useState } from 'react';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../components/common';
import Typography from '@mui/material/Typography';
import { Button, IconButton, TextField, useTheme } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../../../components/auth/AuthProvider';
import { useCreateMigrationRecord } from '../../../hooks';
import { ApiResponse } from '../../../types/api';

interface CreateMigrationRecordFormType {
  title: string;
  description: string;
}

export default function CreateMigrationRecord() {
  const { closeModal } = useModal();
  const { typography, palette } = useTheme();
  const { control, handleSubmit, reset } =
    useForm<CreateMigrationRecordFormType>();
  const { currentUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const mutation = useCreateMigrationRecord();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: CreateMigrationRecordFormType) => {
    if (!currentUser) {
      return;
    }
    const payload = {
      title: data.title,
      description: data.description,
      created_by: currentUser.uid,
    };
    setLoading(true);
    mutation.mutate(payload, {
      onSuccess: (response: ApiResponse<{ id: string }>) => {
        setLoading(false);
        enqueueSnackbar('Migration record added successfully', {
          variant: 'success',
        });
        if ('id' in response) {
          navigate(`/app/record/${response.id}`);
        } else if (response.data && 'id' in response.data) {
          navigate(`/app/record/${response.data.id}`);
        }
        reset();
        closeModal?.();
      },
      onError: (error) => {
        setLoading(false);
        console.error('Error creating migration record:', error);
        enqueueSnackbar(`Error creating migration record: ${error.message}`, {
          variant: 'error',
        });
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
          Create migration record
        </Typography>
        <IconButton onClick={closeModal}>
          <ClearIcon />
        </IconButton>
      </Box>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            required
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            InputLabelProps={{ shrink: true }}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            required
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        loading={loading}
      >
        Create Record
      </Button>
    </Box>
  );
}
