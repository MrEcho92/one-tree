import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useAuth } from '../auth/AuthProvider';
import { decodeToken } from '../../utils';
import { useEffect, useState } from 'react';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: '/app' },
];

const secondaryListItems = [
  {
    text: 'Admin',
    icon: <AdminPanelSettingsIcon />,
    path: '/app/admin',
    isAdmin: true,
  },
  { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/app/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, path: '/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, path: '' },
];

export default function MenuContent() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!currentUser) {
        return;
      }
      const token = await currentUser.getIdToken(true);
      const decodedToken = decodeToken(token);

      setIsAdmin(decodedToken.roles?.includes('admin')); // Check if "admin" is in roles
    };
    fetchUserRole();
  }, [currentUser]);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={index === 0}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems
          .filter((item) => !item.isAdmin || isAdmin)
          .map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Stack>
  );
}
