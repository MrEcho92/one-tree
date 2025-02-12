import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDeleteFamilyTree } from '../../../hooks/treeHooks';

type TreeOverviewProps = {
  description: string | undefined;
};

export default function TreeOverview({ description }: TreeOverviewProps) {
  return (
    <Box sx={{ width: '100%', height: '80vh' }}>
      <Typography>{description}</Typography>
      <Button>Add collaborators</Button>
      <Button>Delete tree</Button>
      <Box>
        List of family members - maybe on click open pop out of person profile
      </Box>
    </Box>
  );
}
