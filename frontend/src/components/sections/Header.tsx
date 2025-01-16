import {
  Avatar,
  Box,
  Button,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Drawer,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenMenu(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpenMenu(false);
    }
  };

  return (
    <AppBar className="header-container">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {AppConfig.appName}
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            <Button
              variant="text"
              size="small"
              sx={{
                color() {
                  return theme.palette.primary.contrastText;
                },
              }}
            >
              {t('header:home')}
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => scrollToSection('features')}
              sx={{
                color() {
                  return theme.palette.primary.contrastText;
                },
              }}
            >
              {t('header:ourFeatures')}
            </Button>
            <Button
              variant="text"
              size="small"
              sx={{
                color() {
                  return theme.palette.primary.contrastText;
                },
              }}
            >
              {t('header:aboutUs')}
            </Button>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button
              variant="text"
              color="secondary"
              size="small"
              onClick={() => {}}
            >
              {t('common:login')}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => {}}
              sx={{}}
            >
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
              <MenuItem onClick={handleClose}>{t('common:logout')}</MenuItem>
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Button
              variant="text"
              color="secondary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: '30px', p: '4px' }}
            >
              <MenuIcon />
            </Button>
            <Drawer
              anchor="right"
              open={openMenu}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{
                  minWidth: '60dvw',
                  p: 2,
                  backgroundColor: 'background.paper',
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    flexGrow: 1,
                  }}
                ></Box>
                <MenuItem onClick={() => {}}>Home</MenuItem>
                <MenuItem onClick={() => scrollToSection('features')}>
                  Our features
                </MenuItem>
                <MenuItem onClick={() => {}}>About us</MenuItem>
                <Divider />
                <MenuItem>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{ width: '100%' }}
                  >
                    {t('common:signUp')}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{ width: '100%' }}
                  >
                    {t('common:login')}
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
