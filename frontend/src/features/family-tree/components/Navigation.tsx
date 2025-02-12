import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import Tooltip from '@mui/material/Tooltip';
import { fitEdges } from '../../../utils/treeGraph';

export const Navigation = ({
  zoomIn,
  zoomOut,
  resetTransform,
  setTransform,
  drawingWidth,
  drawingHeight,
  openSearchModal,
}: any) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '30%',
        left: '10px',
        width: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        '@media print': {
          display: 'none',
        },
      }}
    >
      <Fab
        size="small"
        color="secondary"
        aria-label="Search tree"
        component="div"
      >
        <Tooltip title="Search family tree" placement="right">
          <IconButton onClick={openSearchModal}>
            <PersonSearchIcon />
          </IconButton>
        </Tooltip>
      </Fab>
      <Fab size="small" color="secondary" aria-label="Zoom in" component="div">
        <Tooltip title="Zoom in" placement="right">
          <IconButton onClick={() => zoomIn()}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Fab>
      <Fab size="small" color="secondary" aria-label="Zoom out" component="div">
        <Tooltip title="Zoom out" placement="right">
          <IconButton onClick={() => zoomOut()}>
            <RemoveIcon />
          </IconButton>
        </Tooltip>
      </Fab>
      <Fab
        size="small"
        color="secondary"
        aria-label="Center tree"
        component="div"
      >
        <Tooltip title="Center tree" placement="right">
          <IconButton onClick={() => resetTransform()}>
            <CenterFocusStrongIcon />
          </IconButton>
        </Tooltip>
      </Fab>
      <FitScreen
        setTransform={setTransform}
        drawingHeight={drawingHeight}
        drawingWidth={drawingWidth}
      />
    </Box>
  );
};

function FitScreen({ setTransform, drawingHeight, drawingWidth }: any) {
  const maxRight = 800 as const;
  const maxLeft = -825 as const;
  const maxBottom = 260 as const;
  const maxTop = -170 as const;

  const nodeHeight = 90 as const;
  const nodeWidth = 250 as const;

  const onFitTreeHandle = () => {
    fitEdges({
      drawingWidth,
      drawingHeight,
      rightX: maxRight,
      leftX: maxLeft - nodeWidth,
      bottomY: maxBottom,
      topY: maxTop - nodeHeight,
      setTransform,
    });
  };
  return (
    <Fab
      size="small"
      color="secondary"
      aria-label="Fit tree to screen"
      component="div"
    >
      <Tooltip title="Fit tree to screen" placement="right">
        <IconButton onClick={onFitTreeHandle}>
          <FitScreenIcon />
        </IconButton>
      </Tooltip>
    </Fab>
  );
}
