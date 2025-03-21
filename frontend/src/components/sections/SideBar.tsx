import { styled, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from '../common/MenuContent';
import OptionsMenu from '../common/OptionsMenu';
import Divider from '@mui/material/Divider';
import { AppConfig } from '../../core/constants';
import { useAuth } from '../auth/AuthProvider';

const drawerWidth = 200;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export function SideMenu() {
  const { palette, typography } = useTheme();
  const { currentUser } = useAuth();
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: palette.background.paper,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          p: 1.5,
          color: palette.primary.main,
          fontWeight: typography.h1.fontWeight,
          cursor: 'pointer',
        }}
        onClick={() => {
          const newTab = window.open('/', '_blank');
          newTab?.focus();
        }}
      >
        {AppConfig.appName}
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <Avatar
          sizes="small"
          alt={currentUser?.displayName || 'User Avatar'}
          src={currentUser?.photoURL ?? '/static/images/avatar/7.jpg'}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              lineHeight: '16px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {currentUser?.displayName}
          </Typography>
          <Typography
            sx={{
              color: palette.text.secondary,
              fontSize: '8px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'block',
              maxWidth: '100%',
            }}
          >
            {currentUser?.email}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
