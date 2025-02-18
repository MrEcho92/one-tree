import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import { Drawer } from '@mui/material';
import ReactFamilyTree from 'react-family-tree';
import { useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';
import type { Node, ExtNode } from 'relatives-tree/lib/types';
import { FamilyNode } from '../components/FamilyNode';
import {
  MAX_SCALE,
  MIN_SCALE,
  NODE_HEIGHT,
  NODE_WIDTH,
} from '../components/constants';
import { TreeWrapper } from '../components/TreeWrapper';
import EditFamilyMember from '../components/EditFamilyMember';
import {
  useGetFamilyTrees,
  useAddMemberFamilyTree,
  useDeleteFamilyTreeMember,
  useDeleteFamilyTree,
  useUpdateTree,
  useAddCollaborators,
} from '../../../hooks/treeHooks';
import {
  Person,
  AddMemberPayload,
  DeleteMemberPayload,
  UpdateTreePayload,
  AddCollaboratorsPayload,
} from '../../../types/tree';
import { transformNodeData } from '../../../utils/transformTree';
import queryClient from '../../../core/http/react-query';
import FamilyTreeOverview from '../components/FamilyOverview';
import { useModal } from '../../../components/common';
import MemberSearch from '../components/MemberSearch';
import DeleteMember from '../components/DeleteMember';
import DeleteTree from '../components/DeleteTree';
import AddCollaborators from '../components/AddCollaborators';
import { FamilyStory } from '../components';

export default function FamilyTreePage() {
  const { treeId } = useParams();
  const { palette } = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const { t } = useTranslation('tree');

  const [value, setValue] = useState<string>('1');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [firstRootId, setFirstRootId] = useState<string | null>(null);
  const [rootId, setRootId] = useState<string | null>(null);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const openDrawer = (nodeId: string | null) => {
    setSelectedNode(nodeId);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const { data, isLoading, isError } = useGetFamilyTrees(treeId ?? '');
  const mutation = useAddMemberFamilyTree(treeId ?? '');
  const deleteTreeMemberMutation = useDeleteFamilyTreeMember(treeId ?? '');
  const deleteFamilyTreeMutation = useDeleteFamilyTree(treeId ?? '');
  const updateTreeMutation = useUpdateTree(treeId ?? '');
  const addCollaboratorsMutation = useAddCollaborators(treeId ?? '');

  useEffect(() => {
    if (data) {
      const tree = data as any;
      const members = tree?.members ?? [];
      const nodesData = transformNodeData(members);
      setNodes(nodesData);
      const rootId = members?.filter(
        (person: Person) => person.father_id && person.mother_id,
      )[0]?.id;
      setFirstRootId(rootId);
      setRootId(rootId);
    }
  }, [data]);

  const familyTree = useMemo(() => {
    if (data) {
      return data as any;
    }
    return null;
  }, [data]);

  const resetRootHandler = useCallback(
    () => setRootId(firstRootId),
    [firstRootId],
  );

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error occured</Box>;
  }

  function handleAddMember(payload: AddMemberPayload): void {
    mutation.mutate(payload, {
      onSuccess: () => {
        enqueueSnackbar('Family member added successfully!', {
          variant: 'success',
        });
        queryClient.refetchQueries({
          queryKey: ['familyTrees', treeId],
          exact: true,
        });
      },
      onError: (error) => {
        enqueueSnackbar('Failed to add family member', {
          variant: 'error',
        });
        console.error('Error adding member:', error);
      },
    });
  }

  function openSearchModal(): void {
    openModal(
      <MemberSearch
        closeModal={closeModal}
        members={familyTree?.members}
        setRootId={setRootId}
      />,
    );
  }

  function handleDeleteMember(payload: DeleteMemberPayload): void {
    deleteTreeMemberMutation.mutate(payload, {
      onSuccess: () => {
        enqueueSnackbar('Family member deleted successfully!', {
          variant: 'success',
        });
        queryClient.refetchQueries({
          queryKey: ['familyTrees', treeId],
          exact: true,
        });
        closeDrawer();
      },
      onError: (error) => {
        enqueueSnackbar('Failed to delete family member', {
          variant: 'error',
        });
        console.error('Error deleting member:', error);
      },
    });
  }

  function handleDeleteTree() {
    deleteFamilyTreeMutation.mutate(undefined, {
      onSuccess: () => {
        enqueueSnackbar('Family tree deleted successfully!', {
          variant: 'success',
        });
        // Redirect to dashboard
        navigate('/app');
      },
      onError: (error) => {
        enqueueSnackbar('Failed to delete family tree', {
          variant: 'error',
        });
        console.error('Error deleting tree:', error);
      },
    });
  }

  function handleUpdateTree(payload: UpdateTreePayload): void {
    updateTreeMutation.mutate(payload, {
      onSuccess: () => {
        enqueueSnackbar('Family tree updated successfully!', {
          variant: 'success',
        });
        queryClient.refetchQueries({
          queryKey: ['familyTrees', treeId],
          exact: true,
        });
      },
      onError: (error) => {
        enqueueSnackbar('Failed to update family tree', {
          variant: 'error',
        });
        console.error('Error updating tree:', error);
      },
    });
  }

  function handleAddCollaborators(payload: AddCollaboratorsPayload): void {
    addCollaboratorsMutation.mutate(payload, {
      onSuccess: () => {
        enqueueSnackbar('Collaborator added successfully!', {
          variant: 'success',
        });
        queryClient.refetchQueries({
          queryKey: ['familyTrees', treeId],
          exact: true,
        });
        closeModal?.();
      },
      onError: (error) => {
        enqueueSnackbar('Failed to add collaborator', {
          variant: 'error',
        });
        console.error('Error adding collaborator:', error);
      },
    });
  }

  function openDeleteMemberModal(name: string, nodeId: string): void {
    openModal(
      <DeleteMember
        closeModal={closeModal}
        name={name}
        nodeId={nodeId}
        onDelete={handleDeleteMember}
        rootId={firstRootId ?? ''}
      />,
    );
  }

  function openDeleteTreeModal() {
    openModal(
      <DeleteTree closeModal={closeModal} onDelete={handleDeleteTree} />,
    );
  }
  function openAddCollaboratorsModal() {
    openModal(
      <AddCollaborators
        closeModal={closeModal}
        onAddCollaborators={handleAddCollaborators}
      />,
    );
  }

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
          title={familyTree?.name ?? ''}
          headerName="Family tree"
          allowSideIcon={false}
        />
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          <Typography
            component="h2"
            variant="h6"
            sx={{ mb: 2, display: { md: 'none' } }}
          >
            {familyTree?.name ?? ''}
          </Typography>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="family tree tabs">
                <Tab label={t('tree:treeId.navItems.overview')} value="1" />
                <Tab label={t('tree:treeId.navItems.tree')} value="2" />
                <Tab label={t('tree:treeId.navItems.stories')} value="3" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ p: { xs: '0' } }}>
              <FamilyTreeOverview
                initialData={familyTree}
                openDeleteTreeModal={openDeleteTreeModal}
                openAddCollaboratorsModal={openAddCollaboratorsModal}
                onSave={handleUpdateTree}
              />
            </TabPanel>
            <TabPanel value="2" sx={{ p: { xs: '0' } }}>
              <Box
                sx={{
                  height: '100vh',
                  backgroundColor: palette.background.paper,
                }}
              >
                {nodes.length > 0 ? (
                  <Box sx={{ width: '100%', height: '80vh' }}>
                    <TransformWrapper
                      key={rootId}
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
                                      nodeDetails={familyTree?.members?.find(
                                        (member: Person) =>
                                          member.id === node.id,
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
                  <Box>No tree</Box>
                )}
              </Box>
            </TabPanel>
            <TabPanel value="3" sx={{ p: { xs: '0' } }}>
              <FamilyStory treeId={treeId ?? ''} />
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
          <EditFamilyMember
            defaultValues={familyTree?.members?.find(
              (member: Person) => member.id === selectedNode,
            )}
            closeDrawer={closeDrawer}
            onAddMember={handleAddMember}
            treeMembers={familyTree?.members}
            setRootId={setRootId}
            openDeleteMemberModal={openDeleteMemberModal}
            firstRootId={firstRootId ?? ''}
            treeId={treeId ?? ''}
          />
        </Drawer>
      </Stack>
    </Box>
  );
}
