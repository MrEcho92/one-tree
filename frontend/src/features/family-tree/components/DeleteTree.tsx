import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';

type DeleteTreeProps = {
  closeModal: () => void;
  onDelete: () => void;
};

export default function DeleteTree({ closeModal, onDelete }: DeleteTreeProps) {
  function handleOnDeleteTree() {
    if (onDelete) {
      onDelete();
    }
  }
  return (
    <Box p={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        <Typography variant="h5">Delete Tree</Typography>
        <IconButton onClick={closeModal}>
          <ClearIcon />
        </IconButton>
      </Box>
      <Box py={1}>
        <Typography variant="body1">
          Are you sure you want to delete this family tree? This action cannot
          be undone.
        </Typography>
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
        <Button variant="outlined" onClick={closeModal}>
          No
        </Button>
        <Button variant="contained" onClick={handleOnDeleteTree}>
          Yes
        </Button>
      </Box>
    </Box>
  );
}
