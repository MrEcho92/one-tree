import React, { useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import type { ExtNode } from 'relatives-tree/lib/types';
import { deepOrange, grey } from '@mui/material/colors';
import { useTheme } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { theme } from '../../../core';

interface FamilyNodeProps {
  node: ExtNode;
  isRoot: boolean;
  isHover?: boolean;
  onClick?: (id: string) => void;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
}

export const FamilyNode = React.memo(function FamilyNode({
  node,
  isRoot,
  isHover,
  onClick,
  onSubClick,
  style,
}: FamilyNodeProps) {
  const { palette } = useTheme();
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
          backgroundColor: grey[100],
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={clickHandler}
      >
        <Avatar
          sx={{ bgcolor: deepOrange[500], width: 60, height: 60 }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        >
          B
        </Avatar>
        <Box>{node.id}</Box>
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
              color: 'palette.common.white',
            }}
          >
            <AccountTreeIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
});
