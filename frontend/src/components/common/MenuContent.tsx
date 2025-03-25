import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeIcon from '@mui/icons-material/Home';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useAuth } from '../auth/AuthProvider';
import { decodeToken } from '../../utils';
import { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';

const mainListItems = [
  { text: 'Dashboard', icon: <SpaceDashboardIcon />, path: '/app' },
];

const navigateToNewTab = (path: any) => {
  const newTab = window.open(path, '_blank');
  newTab?.focus();
};

const secondaryListItems = [
  {
    text: 'Homepage',
    icon: <HomeIcon />,
    path: '/',
    nextPage: true,
  },
  {
    text: 'Admin',
    icon: <AdminPanelSettingsIcon />,
    path: '/app/admin',
    isAdmin: true,
  },
  { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/app/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, path: '/about' },
  {
    id: 'feedback',
    text: 'Share feedback',
    icon: <HelpRoundedIcon />,
    path: 'https://forms.gle/26QZ5CdX8s7Crb5z6',
    nextPage: true,
  },
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
      <Box>
        <Divider />
        <List dense>
          {secondaryListItems
            .filter((item) => !item.isAdmin || isAdmin)
            .map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => {
                    if (item.nextPage) {
                      return navigateToNewTab(item.path);
                    }
                    return navigate(item.path);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          {
            <ListItem sx={{ display: 'block' }} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CreateNewFolderIcon />
                </ListItemIcon>
                <a
                  data-canny-link
                  href="https://onetree.canny.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  Feature requests
                </a>
              </ListItemButton>
            </ListItem>
          }
        </List>
      </Box>
    </Stack>
  );
}
