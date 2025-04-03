import { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Drawer } from '@mui/material';
import ReactFamilyTree from 'react-family-tree';
import type { Node, ExtNode } from 'relatives-tree/lib/types';
import {
  MAX_SCALE,
  MIN_SCALE,
  NODE_HEIGHT,
  NODE_WIDTH,
} from '../components/constants';
import { TreeWrapper } from '../components/TreeWrapper';
import PublicEditFamilyMember from '../components/PublicEditFamilyMember';
import { Person } from '../../../types/tree';
import { FamilyNode } from '../components/FamilyNode';
import { transformNodeData } from '../../../utils/transformTree';
import { useModal } from '../../../components/common';
import MemberSearch from '../components/MemberSearch';
import treeDataJson from '../components/mock/sampleTree.json';
import PublicTreeCTA from '../components/PublicTreeCTA';
import { AppConfig } from '../../../core/constants/constants';

export default function PublicTreePage() {
  const { palette } = useTheme();
  const { openModal, closeModal } = useModal();

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [firstRootId, setFirstRootId] = useState<string | null>(null);
  const [rootId, setRootId] = useState<string | null>(null);

  const membersData = treeDataJson as any;

  useEffect(() => {
    if (membersData) {
      const tree = membersData as any;
      const members = tree ?? [];
      const nodesData = transformNodeData(members);
      setNodes(nodesData);
      const rootId = members?.filter(
        (person: Person) => person.father_id && person.mother_id,
      )[0]?.id;
      setFirstRootId(rootId);
      setRootId(rootId);
    }
  }, []);

  const resetRootHandler = useCallback(
    () => setRootId(firstRootId),
    [firstRootId],
  );

  function openSearchModal(): void {
    openModal(
      <MemberSearch
        closeModal={closeModal}
        members={membersData}
        setRootId={setRootId}
      />,
    );
  }

  const openDrawer = (nodeId: string | null) => {
    setSelectedNode(nodeId);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  function openCreateTree(): void {
    openModal(<PublicTreeCTA closeModal={closeModal} />);
  }

  return (
    <Box mt="64px" sx={{ height: '100vh' }} mb="30px">
      <Helmet>
        <title>Family tree | {AppConfig.appName}</title>
        <meta name="description" content="View your family tree" />
      </Helmet>
      <Box
        sx={{
          width: '100%',
          height: 40,
          bgcolor: palette.info.main,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 3,
        }}
      >
        <Typography color="primary.contrastText" fontWeight={600}>
          You are viewing Bob Marley's family tree
        </Typography>
      </Box>
      <Box
        sx={{
          height: '100vh',
          backgroundColor: palette.background.paper,
        }}
      >
        {nodes.length > 0 ? (
          <Box sx={{ width: '100%', height: '80vh' }}>
            <TransformWrapper
              key={`${rootId}-${nodes.length}`}
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
                  resetRootId={rootId !== firstRootId}
                  resetRootHandler={resetRootHandler}
                  openSearchModal={openSearchModal}
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
                      {rootId && (
                        <ReactFamilyTree
                          key={`${rootId}-${nodes.length}`}
                          nodes={nodes}
                          rootId={rootId}
                          width={NODE_WIDTH}
                          height={NODE_HEIGHT}
                          renderNode={(node: Readonly<ExtNode>) => (
                            <FamilyNode
                              key={node.id}
                              node={node}
                              nodeDetails={membersData?.find(
                                (member: Person) => member.id === node.id,
                              )}
                              isRoot={node.id === rootId}
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
                      )}
                    </Box>
                  </TransformComponent>
                </TreeWrapper>
              )}
            </TransformWrapper>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              flexDirection: 'column',
              textAlign: 'center',
              color: palette.text.secondary,
            }}
          >
            <Typography variant="h6" gutterBottom>
              No family tree data available
            </Typography>
          </Box>
        )}
      </Box>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: { width: { xs: 250, md: 400 }, padding: 2 },
        }}
      >
        <PublicEditFamilyMember
          defaultValues={membersData?.find(
            (member: Person) => member.id === selectedNode,
          )}
          closeDrawer={closeDrawer}
          treeMembers={membersData}
          rootId={rootId ?? ''}
          setRootId={setRootId}
          firstRootId={firstRootId ?? ''}
          resetRootHandler={resetRootHandler}
          openCreateTree={openCreateTree}
        />
      </Drawer>
    </Box>
  );
}
