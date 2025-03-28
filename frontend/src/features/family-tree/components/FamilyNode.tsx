import React, { useCallback } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import type { ExtNode } from 'relatives-tree/lib/types';
import { green, grey } from '@mui/material/colors';
import { useTheme } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { getYearFromDate } from '../../../utils/date';
import { Person } from '../../../types/tree';
import { stringAvatar } from '../../../utils/transformTree';

interface FamilyNodeProps {
  node: ExtNode;
  isRoot: boolean;
  isHover?: boolean;
  onClick?: (id: string) => void;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
  nodeDetails?: Person;
}

export const FamilyNode = React.memo(function FamilyNode({
  node,
  isRoot,
  onClick,
  onSubClick,
  style,
  nodeDetails,
}: FamilyNodeProps) {
  const { palette, typography } = useTheme();
  const clickHandler = useCallback(() => {
    if (onClick) {
      onClick(node.id);
    }
  }, [node.id, onClick]);
  const clickSubHandler = useCallback(
    () => onSubClick(node.id),
    [node.id, onSubClick],
  );

  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        p: 2,
      }}
      style={style}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: isRoot ? green[500] : grey[200],
          color: isRoot ? 'white' : null,
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={clickHandler}
      >
        <Avatar alt="Remy Sharp" {...stringAvatar(nodeDetails)} />
        <Box
          p={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: typography.body2.fontSize,
                md: typography.body1.fontSize,
              },
              fontWeight: typography.h1.fontWeight,
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}
            title={`${nodeDetails?.first_name} ${nodeDetails?.last_name}`} // Shows full text on hover
          >{`${nodeDetails?.first_name} ${nodeDetails?.last_name}`}</Typography>
          <Typography>
            {nodeDetails?.date_of_birth
              ? `${getYearFromDate(nodeDetails.date_of_birth)}${
                  nodeDetails?.is_alive
                    ? ' - Living'
                    : nodeDetails?.death_date
                      ? ` - ${getYearFromDate(nodeDetails.death_date)}`
                      : ''
                }`
              : ''}
          </Typography>
        </Box>
        {isRoot && (
          <Box
            sx={{
              bgcolor: palette.info.main,
              color: palette.primary.contrastText,
              px: 1,
              borderRadius: 1,
            }}
          >
            <Typography variant="caption" textAlign="center">
              Focus Person
            </Typography>
          </Box>
        )}
      </Box>
      {node.hasSubTree && (
        <Box
          sx={{
            position: 'absolute',
            top: '6px',
            right: '24px',
            width: '14px',
            height: '10px',
          }}
        >
          <IconButton
            onClick={clickSubHandler}
            sx={{
              backgroundColor: palette.info.main,
              color: palette.common.white,
            }}
          >
            <AccountTreeIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
});
