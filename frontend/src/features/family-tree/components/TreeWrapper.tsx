import React, { memo, useRef } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import RestoreIcon from '@mui/icons-material/Restore';
import Tooltip from '@mui/material/Tooltip';
import { Navigation } from './Navigation';
import { useElementSize } from './common/useTreeHooks';

export const TreeWrapper = memo(
  ({
    zoomIn,
    zoomOut,
    resetTransform,
    setTransform,
    resetRootId,
    resetRootHandler,
    openSearchModal,
    children,
  }: any) => {
    const wrapperRef = useRef(null);

    const { width: drawingWidth, height: drawingHeight } = useElementSize(
      wrapperRef as any,
    );
    return (
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          '.react-transform-wrapper, .react-transform-component': {
            width: '100%',
            height: '100%',
            position: 'relative',
          },
        }}
        ref={wrapperRef}
      >
        {resetRootId && (
          <Box
            sx={{
              position: 'absolute',
              top: '5%',
              left: '10px',
              width: '32px',
            }}
          >
            <Fab
              size="small"
              color="secondary"
              aria-label="Reset to rootId"
              component="div"
            >
              <Tooltip title="Reset to root user" placement="right">
                <IconButton onClick={resetRootHandler}>
                  <RestoreIcon />
                </IconButton>
              </Tooltip>
            </Fab>
          </Box>
        )}
        {children}
        <Navigation
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          resetTransform={resetTransform}
          setTransform={setTransform}
          drawingWidth={drawingWidth}
          drawingHeight={drawingHeight}
          resetRootId={resetRootId}
          resetRootHandler={resetRootHandler}
          openSearchModal={openSearchModal}
        />
      </Box>
    );
  },
  () => true,
);
