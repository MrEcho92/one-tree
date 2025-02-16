import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import { AddCollaboratorsPayload } from '../../../types/tree';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type AddCollaborators = {
  closeModal: () => void;
  onAddCollaborators: (payload: AddCollaboratorsPayload) => void;
};

export default function AddCollaborators({
  closeModal,
  onAddCollaborators,
}: AddCollaborators) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  function handleOnAddCollaborators(data: any) {
    const payload: AddCollaboratorsPayload = {
      collaborators: [data.email],
    };
    onAddCollaborators(payload);
  }
  return (
    <Box p={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        <Typography variant="h5">Add Collaborator</Typography>
        <IconButton onClick={closeModal}>
          <ClearIcon />
        </IconButton>
      </Box>
      <Box pt={1}>
        <Typography variant="body1">
          Invite someone to collaborate on this family tree.
        </Typography>
        <Box py={2}>
          <form onSubmit={handleSubmit(handleOnAddCollaborators)}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  size="small"
                />
              )}
            />
          </form>
        </Box>
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
          variant="contained"
          onClick={handleSubmit(handleOnAddCollaborators)}
        >
          Send Invitation
        </Button>
      </Box>
    </Box>
  );
}
