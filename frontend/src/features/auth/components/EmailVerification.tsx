import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

interface ForgotPasswordProps {
  handleResendVerification?: () => void;
  handleClose?: () => void;
}

export default function EmailVerification({
  handleResendVerification,
  handleClose,
}: ForgotPasswordProps) {
  return (
    <Box>
      <DialogTitle>Please verify your email</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          We&apos;ve sent an email with instructions to complete your
          registration.
        </DialogContentText>
        <DialogContentText>
          Please check your spam folder if you can&apos;t find the email. If you
          still can&apos;t find it, we can resend it.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleResendVerification}>
          Resend verification email
        </Button>
        <Button variant="contained" onClick={handleClose}>
          I have clicked the link
        </Button>
      </DialogActions>
    </Box>
  );
}
