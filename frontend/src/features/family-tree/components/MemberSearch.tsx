import { SetStateAction, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Person } from '../../../types/tree';

type MemberSearchProps = {
  closeModal: () => void;
  members: Person[];
  setRootId?: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function MemberSearch({
  closeModal,
  members,
  setRootId,
}: MemberSearchProps) {
  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = (_event: any, value: SetStateAction<string>) => {
    setSearchValue(value);
  };
  const filteredOptions = members.filter((item) =>
    `${item.first_name} ${item.last_name}`
      .toLowerCase()
      .includes(searchValue.toLowerCase()),
  );
  const handleItemSelect = (event: any, selectedItem: any) => {
    if (selectedItem && setRootId) {
      setRootId(selectedItem?.id);
    }
    closeModal();
  };
  return (
    <Box p={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        <Typography variant="h5">Search family tree</Typography>
        <IconButton onClick={closeModal}>
          <ClearIcon />
        </IconButton>
      </Box>
      <Autocomplete
        size="small"
        fullWidth={false}
        options={filteredOptions}
        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by Name"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
        onInputChange={handleSearchChange}
        onChange={handleItemSelect}
        clearOnBlur
      />
    </Box>
  );
}
