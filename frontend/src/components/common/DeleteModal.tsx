import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';

type DeleteRecordProps = {
  closeModal: () => void;
  onDelete: () => void;
  deleteMessage: string;
  deleteTitle: string;
};
export default function DeleteModal({
  closeModal,
  onDelete,
  deleteMessage,
  deleteTitle,
}: DeleteRecordProps) {
  function handleOnDeleteMember() {
    if (onDelete) {
      onDelete();
    }
  }
  return (
    <Box p={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        <Typography variant="h5">{deleteTitle}</Typography>
        <IconButton onClick={closeModal}>
          <ClearIcon />
        </IconButton>
      </Box>
      <Box py={1}>
        <Typography variant="body1">{deleteMessage}</Typography>
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
        <Button variant="contained" onClick={handleOnDeleteMember}>
          Yes
        </Button>
      </Box>
    </Box>
  );
}
