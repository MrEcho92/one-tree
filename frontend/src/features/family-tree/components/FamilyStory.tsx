import { useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useModal } from '../../../components/common';
import AddStoryToTree from './AddStoryModal';
import { AddStoryPayload } from '../../../types';
import {
  useCreateStory,
  useUpdateStory,
  useGetFamilyStories,
  useGetFamilyStoriesById,
  useDeleteFamilyStory,
} from '../../../hooks/treeHooks';
import { capitalize } from '../../../utils';

type FamilyStoryProps = {
  treeId: string;
};

export function FamilyStory({ treeId }: FamilyStoryProps) {
  const { openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();
  
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [selectedStoryId, setSelectedStoryId] = useState<string>("");

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    storyId: string,
  ) => {
    setSelectedIndex(index);
    setSelectedStoryId(storyId)
  };

  const createMutation = useCreateStory();
  const { data, isLoading, isError } = useGetFamilyStories(treeId ?? '');
  const {
    data: storyData,
    isLoading: isStoryLoading,
    isError: isStoryError,
  } = useGetFamilyStoriesById(selectedStoryId);

  function handleAddStory(payload: AddStoryPayload) {
    createMutation.mutate(payload, {
      onSuccess: () => {
        enqueueSnackbar('Story added successfully', { variant: 'success' });
        closeModal();
      },
      onError: (error: any) => {
        enqueueSnackbar(`Failed to add story: ${error.message}`, {
          variant: 'error',
        });
      },
    });
  }

  function openAddStory(): void {
    openModal(
      <AddStoryToTree
        closeModal={closeModal}
        onAddStory={handleAddStory}
        treeId={treeId}
      />,
    );
  }
  const familyStories = useMemo(() => {
    if (data) {
      return data as any;
    }
    return null;
  }, [data]);

  console.log('data', data);
  return (
    <Box sx={{ width: '100%', height: '80vh', my: 1 }}>
      <Box py={1} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="body1">
          The family story section allows you to preserve and share these
          priceless memories (such as recipes, ceremonies, traditions) with
          loved ones.
        </Typography>
        <Typography variant="body1">
          Your family’s history is more than just names and dates - it’s the
          stories, traditions, and experiences that shape your identity. Keep
          them private or share them with the community to celebrate your
          heritage.
        </Typography>
        <Button
          variant="contained"
          color="info"
          endIcon={<AddIcon />}
          sx={{ alignSelf: 'flex-start', pt: 1 }}
          onClick={openAddStory}
        >
          Add a story
        </Button>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Box sx={{ width: { xs: '40%', md: '30%' } }}>
          <Typography variant="body1" fontWeight="bold" py={1}>
            Family Stories
          </Typography>
          <List component="nav" aria-label="main mailbox folders">
            {familyStories?.map((story: any, index: number) => (
              <ListItemButton
                key={story.id}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index, story.id)}
              >
                <ListItemText
                  primary={
                    <Typography noWrap>{capitalize(story.title)}</Typography>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{ width: { xs: '60%', md: '70%' }, bgcolor: 'background.paper' }}
        >
          <Typography>Family Stories</Typography>
        </Box>
      </Box>
    </Box>
  );
}
