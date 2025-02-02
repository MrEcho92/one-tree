import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Header } from '../../dashbord/components';
import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from '@mui/material';
import ReactFamilyTree from 'react-family-tree';
import { useTheme } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditNoteIcon from '@mui/icons-material/EditNote';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type {
  Node,
  ExtNode,
  Gender,
  RelType,
  Relation,
} from 'relatives-tree/lib/types';
import { FamilyNode } from '../components/FamilyNode';
import {
  DEFAULT_SOURCE,
  SOURCES,
  MAX_SCALE,
  MIN_SCALE,
  NODE_HEIGHT,
  NODE_WIDTH,
} from '../components/constants';
import { TreeWrapper } from '../components/TreeWrapper';
import { EditFamilyMember } from '../components/EditFamilyMember';

export function TreePage() {
  const { treeId } = useParams();
  const { palette } = useTheme();
  const [value, setValue] = useState('1');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState({ name: '', relationship: '' });

  const [source, setSource] = useState(DEFAULT_SOURCE);
  const [nodes, setNodes] = useState(SOURCES[source]);

  const firstNodeId = useMemo(() => nodes[0].id, [nodes]);
  const [rootId, setRootId] = useState(firstNodeId);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const openDrawer = (nodeId: string | null) => {
    setSelectedNode(nodeId);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      component="section"
      sx={{ flexGrow: 1, overflow: 'auto', width: '100%' }}
    >
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
          mx: 3,
          pb: 5,
          mt: { xs: 8, md: 0 },
        }}
      >
        <Header
          title="Ye family"
          headerName="Family tree"
          allowSideIcon={false}
        />
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          <Typography
            component="h2"
            variant="h6"
            sx={{ mb: 2, display: { md: 'none' } }}
          >
            Ye family
          </Typography>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Overview" value="1" />
                <Tab label="Tree" value="2" />
                <Tab label="Stories" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box sx={{ width: '100%', height: '80vh' }}></Box>
            </TabPanel>
            <TabPanel value="2" sx={{ p: { xs: '0' } }}>
              <Box
                sx={{
                  height: '100vh',
                  backgroundColor: palette.background.paper,
                }}
              >
                <Box sx={{ width: '100%', height: '80vh' }}>
                  <TransformWrapper
                    velocityAnimation={{
                      disabled: true,
                    }}
                    alignmentAnimation={{
                      disabled: true,
                    }}
                    zoomAnimation={{
                      disabled: true,
                    }}
                    doubleClick={{
                      disabled: true,
                    }}
                    limitToBounds={false}
                    minScale={MIN_SCALE}
                    maxScale={MAX_SCALE}
                    wheel={{ step: 0.02 }}
                  >
                    {({ zoomIn, zoomOut, resetTransform, setTransform }) => (
                      <TreeWrapper
                        zoomIn={zoomIn}
                        zoomOut={zoomOut}
                        resetTransform={resetTransform}
                        setTransform={setTransform}
                      >
                        <TransformComponent>
                          <Box
                            sx={{
                              height: '100vh',
                              width: '100vw',
                              display: 'flex',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              alignContent: 'flex-start',
                            }}
                          >
                            <ReactFamilyTree
                              nodes={nodes}
                              rootId={rootId}
                              width={NODE_WIDTH}
                              height={NODE_HEIGHT}
                              renderNode={(node: Readonly<ExtNode>) => (
                                <FamilyNode
                                  key={node.id}
                                  node={node}
                                  isRoot={node.id === rootId}
                                  // isHover={node.id === hoverId}
                                  onClick={openDrawer}
                                  onSubClick={setRootId}
                                  style={{
                                    width: NODE_WIDTH,
                                    height: NODE_HEIGHT,
                                    transform: `translate(${node.left * (NODE_WIDTH / 2)}px, ${
                                      node.top * (NODE_HEIGHT / 2)
                                    }px)`,
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </TransformComponent>
                      </TreeWrapper>
                    )}
                  </TransformWrapper>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="3">
              <Box sx={{ width: '100%', height: '80vh' }}>Family stories</Box>
            </TabPanel>
          </TabContext>
        </Box>
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={closeDrawer}
          PaperProps={{
            sx: { width: { xs: 250, md: 400 }, padding: 2 },
          }}
        >
          <EditFamilyMember defaultValues={{}} closeDrawer={closeDrawer} />
        </Drawer>
      </Stack>
    </Box>
  );
}
