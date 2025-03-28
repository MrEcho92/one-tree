import { useCallback, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';
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
import { AddStoryPayload, UpdateStoryPayload } from '../../../types';
import {
  useCreateStory,
  useUpdateStory,
  useGetFamilyStories,
  useGetFamilyStoriesById,
  useDeleteFamilyStory,
} from '../../../hooks/treeHooks';
import { capitalize } from '../../../utils';
import StoryDetails from './StoryDetails';
import queryClient from '../../../core/http/react-query';
import ErrorDisplay from '../../../components/common/ErrorDisplay';
import { MaxFamilyStories } from '../../../core';
import Tooltip from '@mui/material/Tooltip';

type FamilyStoryProps = {
  treeId: string;
};

export function FamilyStory({ treeId }: FamilyStoryProps) {
  const { openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [selectedStoryId, setSelectedStoryId] = useState<string>('');

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    storyId: string,
  ) => {
    setSelectedIndex(index);
    setSelectedStoryId(storyId);
  };

  const createMutation = useCreateStory();
  const { data, isLoading, isError, error, refetch } = useGetFamilyStories(
    treeId ?? '',
  );
  const {
    data: storyData,
    isLoading: isStoryLoading,
    isError: isStoryError,
    error: storyError,
    refetch: storyReFetch,
  } = useGetFamilyStoriesById(selectedStoryId);
  const deleteStoryMutation = useDeleteFamilyStory(selectedStoryId ?? '');
  const updateStoryMutation = useUpdateStory(selectedStoryId ?? '');

  const familyStories = useMemo(() => {
    if (data) {
      return data as any;
    }
    return null;
  }, [data]);

  const getStoryDetails = useCallback(() => {
    if (storyData) {
      return storyData as any;
    }
    return null;
  }, [storyData]);

  const storyDetails = getStoryDetails();

  const isStoryLimitReached = familyStories?.length >= MaxFamilyStories;

  if (isLoading || isStoryLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          mt: '64px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || isStoryError) {
    return (
      <ErrorDisplay
        error={error || storyError}
        onRetry={refetch || storyReFetch}
      />
    );
  }

  function handleAddStory(payload: AddStoryPayload) {
    createMutation.mutate(payload, {
      onSuccess: () => {
        enqueueSnackbar('Story added successfully', { variant: 'success' });
        queryClient.refetchQueries({
          queryKey: ['familyStories', treeId],
          exact: true,
        });
        closeModal?.();
      },
      onError: (error: any) => {
        enqueueSnackbar(`Failed to add story: ${error.message}`, {
          variant: 'error',
        });
      },
    });
  }

  function handleUpdateStory(payload: UpdateStoryPayload): void {
    updateStoryMutation.mutate(payload, {
      onSuccess: () => {
        enqueueSnackbar('Family story updated successfully!', {
          variant: 'success',
        });
        queryClient.refetchQueries({
          queryKey: ['familyStories', selectedStoryId],
          exact: true,
        });
      },
      onError: (error) => {
        enqueueSnackbar('Failed to update family story', {
          variant: 'error',
        });
        console.error('Error updating story:', error);
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

  function handleDeleteStory() {
    deleteStoryMutation.mutate(undefined, {
      onSuccess: () => {
        enqueueSnackbar('Story deleted successfully!', {
          variant: 'success',
        });
        queryClient.refetchQueries({
          queryKey: ['familyStories', treeId],
          exact: true,
        });
        closeModal?.();
      },
      onError: (error) => {
        enqueueSnackbar('Failed to delete story', {
          variant: 'error',
        });
        console.error('Error deleting story:', error);
      },
    });
  }

  return (
    <Box sx={{ width: '100%', height: '80vh', my: 1 }}>
      <Box py={1} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography
          variant="body1"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          The family story section allows you to preserve and share these
          priceless memories (such as recipes, ceremonies, traditions) with
          loved ones.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          Your family&apos;s history is more than just names and dates -
          it&apos;s the stories, traditions, and experiences that shape your
          identity. Keep them private or share them with the community to
          celebrate your heritage.
        </Typography>
        {isStoryLimitReached ? (
          <Box sx={{ textAlign: 'left' }}>
            <Tooltip
              title={`You can only add up to ${MaxFamilyStories} family stories.`}
            >
              <span>
                <Button disabled>Add a story</Button>
              </span>
            </Tooltip>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="info"
            endIcon={<AddIcon />}
            sx={{ alignSelf: 'flex-start', pt: 1 }}
            onClick={openAddStory}
          >
            Add a story
          </Button>
        )}
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '30%' } }}>
          <Typography variant="body1" fontWeight="bold" py={1}>
            Family Stories
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Select a story from the list to view its details.
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
                    <Typography noWrap color="info">
                      {capitalize(story.title)}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{ width: { xs: '100%', md: '70%' }, bgcolor: 'background.paper' }}
        >
          <StoryDetails
            story={storyDetails}
            onDeleteStory={handleDeleteStory}
            onUpdateStory={handleUpdateStory}
          />
        </Box>
      </Box>
    </Box>
  );
}
