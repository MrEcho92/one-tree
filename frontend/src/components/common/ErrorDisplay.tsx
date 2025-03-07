import {
  Box,
  Typography,
  Button,
  Alert,
  AlertTitle,
  Paper,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

type ErrorDisplayProps = {
  error: any;
  onRetry?: () => void;
};

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <Box
      mt={10}
      mx={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          maxWidth: 600,
          width: '100%',
          borderTop: 5,
          borderColor: 'error.main',
        }}
      >
        <Alert severity="error" sx={{ textAlign: 'center' }}>
          <AlertTitle>Error</AlertTitle>
          {error?.message || 'Something went wrong. Please try again.'}
        </Alert>

        <Typography variant="body2" color="textSecondary" mt={1}>
          If the issue persists, please check your connection or try again
          later.
        </Typography>

        <Box mt={2} display="flex" gap={2}>
          {onRetry && (
            <Button
              variant="contained"
              color="primary"
              onClick={onRetry}
              startIcon={<RefreshIcon />}
            >
              Retry
            </Button>
          )}
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => window.location.reload()}
            startIcon={<ReportProblemIcon />}
          >
            Refresh Page
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
