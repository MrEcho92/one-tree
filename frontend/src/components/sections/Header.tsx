import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import { AppConfig } from '../../core/constants';

export function Header() {
  const theme = useTheme();
  const { t } = useTranslation(['common', 'header']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box component="header" className="header-container">
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          minHeight: '80px',
          px: 5,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={3}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              height: 24,
              color: 'inherit',
            }}
          >
            {AppConfig.appName}
          </Box>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={3}>
          <Box>Home</Box>
          <Box>Our features</Box>
          <Box>About us</Box>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Button variant="text" color="secondary">
            {t('common:login')}
          </Button>
          <Button variant="text" color="secondary">
            {t('common:signUp')}
          </Button>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Stack>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
}
