import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';

interface ForgotPasswordProps {
  handleForgotPassword: (email: string) => void;
  handleClose?: () => void;
}

export default function ForgotPassword({
  handleForgotPassword,
  handleClose,
}: ForgotPasswordProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ email: string }>();

  function onSubmit(data: any) {
    if (data.email) {
      const email = data.email;
      if (handleForgotPassword) handleForgotPassword(email);
    }
  }

  return (
    <Box>
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a
          link to reset your password.
        </DialogContentText>
        <OutlinedInput
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          fullWidth
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Continue
        </Button>
      </DialogActions>
    </Box>
  );
}
