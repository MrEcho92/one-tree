import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Switch,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useForm, Controller } from 'react-hook-form';
import FamilyMemberTable from './FamilyTable';
import { transformDate } from '../../../utils/date';
import { capitalize } from '../../../utils/capitalize';
import { UpdateTreePayload } from '../../../types/tree';
import { useAuth } from '../../../components/auth/AuthProvider';

type TreeOverviewProps = {
  initialData?: any;
  onSave?: any;
  openDeleteTreeModal: () => void;
  openAddCollaboratorsModal: () => void;
};

export default function FamilyTreeOverview({
  initialData,
  onSave,
  openDeleteTreeModal,
  openAddCollaboratorsModal,
}: TreeOverviewProps) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: initialData,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(!isEditing);
  const { currentUser } = useAuth();

  const handleSave = (data: any) => {
    if (!currentUser) {
      return;
    }
    const payload: UpdateTreePayload = {
      name: data.name,
      description: data.description,
      is_public: data.is_public,
      updated_by: currentUser.uid,
    };
    onSave(payload);
    setIsEditing(false);
  };

  const data = initialData?.members?.map((member: any) => ({
    first_name: capitalize(member.first_name),
    last_name: capitalize(member.last_name),
    gender: capitalize(member.gender),
    date_of_birth: transformDate(member.date_of_birth),
  }));

  return (
    <Box sx={{ width: '100%', height: '80vh', my: 1 }}>
      {isEditing && (
        <Card sx={{ p: 2, borderRadius: 2, mt: 1 }} variant="outlined">
          <CardContent>
            <form onSubmit={handleSubmit(handleSave)}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Name" fullWidth margin="dense" />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    margin="dense"
                    multiline
                    rows={3}
                  />
                )}
              />

              <Controller
                name="is_public"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        {...field}
                        checked={field.value}
                        onChange={(e) =>
                          setValue('is_public', e.target.checked)
                        }
                      />
                    }
                    label="Public"
                  />
                )}
              />
            </form>
          </CardContent>
          <CardActions>
            <Button onClick={handleEdit} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(handleSave)}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </CardActions>
        </Card>
      )}
      {!isEditing && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontWeight="bold">Tree Details</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Tooltip title="Edit tree">
                <IconButton onClick={() => setIsEditing(true)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete tree">
                <IconButton onClick={openDeleteTreeModal}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add a collaborator">
                <IconButton onClick={openAddCollaboratorsModal}>
                  <PersonAddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box py={1}>
            <Typography>{initialData?.description}</Typography>
          </Box>
        </Box>
      )}
      <Box py={3}>
        <Typography fontWeight="bold">
          Family Members{' '}
          {initialData?.members?.length > 0
            ? `(${initialData?.members?.length})`
            : null}
        </Typography>
        <Box pt={1}>
          {data?.length > 0 ? (
            <FamilyMemberTable data={data} />
          ) : (
            <Typography>No family member</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
