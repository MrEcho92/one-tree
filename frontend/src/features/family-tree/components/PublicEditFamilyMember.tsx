import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Box,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
  Divider,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Person } from '../../../types/tree';
import { transformDate } from '../../../utils/date';
import { stringAvatar } from '../../../utils/transformTree';
import { capitalize } from '../../../utils';

type PublicEditFamilyProps = {
  defaultValues: Person;
  closeDrawer: () => void;
  treeMembers?: ReadonlyArray<any>;
  setRootId?: React.Dispatch<React.SetStateAction<string | null>>;
  firstRootId: string;
  resetRootHandler: () => void;
  rootId: string;
  openCreateTree?: () => void;
};

export default function PublicEditFamilyMember({
  defaultValues,
  closeDrawer,
  setRootId,
  firstRootId,
  resetRootHandler,
  rootId,
  openCreateTree,
}: PublicEditFamilyProps) {
  const navigate = useNavigate();
  const [updatedData] = useState<any>(defaultValues);

  const MemberName =
    `${updatedData.first_name} ${updatedData.last_name}` as const;

  return (
    <Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="600">
            {MemberName}
          </Typography>
          <Tooltip title="Close">
            <IconButton onClick={closeDrawer}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          mb={2}
        >
          <Avatar
            {...stringAvatar(updatedData)}
            src={updatedData?.photo_url}
          ></Avatar>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            py: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Tooltip title="Add family members">
                  <IconButton onClick={openCreateTree} color="primary">
                    <GroupAddIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="caption"> Add family member</Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            gap: 1,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {rootId !== firstRootId ? (
            <Button
              color="warning"
              variant="outlined"
              size="small"
              onClick={() => {
                if (resetRootHandler) resetRootHandler();
                closeDrawer();
              }}
            >
              Reset to root user
            </Button>
          ) : null}
          {rootId !== defaultValues?.id ? (
            <Button
              color="warning"
              variant="outlined"
              size="small"
              onClick={() => {
                if (setRootId) setRootId(defaultValues?.id);
                closeDrawer();
              }}
            >
              Show tree from here
            </Button>
          ) : null}
          <Button
            variant="contained"
            size="small"
            color="info"
            disableElevation
            onClick={() => navigate('/auth/signup')}
          >
            Sign up for more
          </Button>
        </Box>

        <Box sx={{ overflowY: 'scroll', maxHeight: 650 }}>
          <Typography variant="h5" py={1} fontWeight="500">
            Information
          </Typography>
          <Divider />
          <Box py={1}>
            <Typography
              variant="subtitle1"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Name
            </Typography>
            <Typography>{MemberName}</Typography>
          </Box>
          {updatedData?.middle_name && (
            <Box py={1}>
              <Typography
                variant="subtitle1"
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                Middle name
              </Typography>
              <Typography>{updatedData?.middle_name}</Typography>
            </Box>
          )}
          {updatedData?.last_name_at_birth && (
            <Box display={'flex'} gap={2} alignItems={'center'}>
              <Typography
                variant="subtitle1"
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                Last Name at Birth
              </Typography>
              <Typography>{updatedData?.last_name_at_birth}</Typography>
            </Box>
          )}
          {updatedData?.gender && (
            <Box py={1}>
              <Typography
                variant="subtitle1"
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                Gender
              </Typography>
              <Typography>{capitalize(updatedData?.gender)}</Typography>
            </Box>
          )}
          <Divider />
          {updatedData?.date_of_birth && (
            <Box py={1}>
              <Typography
                variant="subtitle1"
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                Born
              </Typography>
              <Typography>
                {transformDate(updatedData?.date_of_birth)}
              </Typography>
            </Box>
          )}
          {updatedData?.birth_place && (
            <Box py={1}>
              <Typography
                variant="subtitle1"
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                Birth place
              </Typography>
              <Typography>{updatedData.birth_place}</Typography>
            </Box>
          )}
          {!updatedData?.is_alive ? (
            <Box py={1}>
              <Typography
                variant="subtitle1"
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                Living status
              </Typography>
              <Typography>Death date</Typography>
              <Typography>{transformDate(updatedData?.death_date)}</Typography>
            </Box>
          ) : (
            <Box py={1}>
              <Typography
                variant="subtitle1"
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                Living status
              </Typography>
              <Typography>Living</Typography>
            </Box>
          )}
          <Divider />
          {updatedData?.bio && (
            <Box display={'flex'} flexDirection={'column'} gap={1}>
              <Typography
                variant="subtitle1"
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                Biography
              </Typography>
              <Typography variant="body2" lineHeight={1.8}>
                {updatedData?.bio || 'No bio available.'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
