import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import { DeleteMemberPayload } from '../../../types/tree';

type DeleteMemberProps = {
  closeModal: () => void;
  name: string;
  onDelete: (payload: DeleteMemberPayload) => void;
  nodeId: string;
  rootId: string;
};
export default function DeleteMember({
  closeModal,
  name,
  nodeId,
  onDelete,
  rootId,
}: DeleteMemberProps) {
  function handleOnDeleteMember() {
    const payload: DeleteMemberPayload = {
      delete_member_id: nodeId,
      root_id: rootId,
    };
    if (onDelete) {
      onDelete(payload);
    }
  }
  return (
    <Box p={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        <Typography variant="h5">Delete member from tree</Typography>
        <IconButton onClick={closeModal}>
          <ClearIcon />
        </IconButton>
      </Box>
      <Box p={1}>
        <Typography variant="body1">Are you sure you want {name} ?</Typography>
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
