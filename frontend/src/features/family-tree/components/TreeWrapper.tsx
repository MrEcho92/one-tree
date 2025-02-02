import React, { memo, useRef } from 'react';
import Box from '@mui/material/Box';
import { Navigation } from './Navigation';
import { useElementSize } from './common/useTreeHooks';

export const TreeWrapper = memo(
  ({ zoomIn, zoomOut, resetTransform, setTransform, children }: any) => {
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
        {children}
        <Navigation
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          resetTransform={resetTransform}
          setTransform={setTransform}
          drawingWidth={drawingWidth}
          drawingHeight={drawingHeight}
        />
      </Box>
    );
  },
  () => true,
);
