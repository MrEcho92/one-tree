import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';

type PublicTreeCTAProps = {
  closeModal: () => void;
};
export default function PublicTreeCTA({ closeModal }: PublicTreeCTAProps) {
  const navigate = useNavigate();
  return (
    <Box p={2}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Family is about bond built over time
        </Typography>
        <IconButton onClick={closeModal}>
          <ClearIcon />
        </IconButton>
      </Box>
      <Box py={1}>
        <Typography variant="body1">
          Bob Marley&apos;s family tree is just one example. Explore the tree or
          start your own to trace your family history.
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
        <Button
          variant="contained"
          onClick={() => {
            navigate('/app');
            closeModal();
          }}
          disableElevation
        >
          Create tree
        </Button>
      </Box>
    </Box>
  );
}
