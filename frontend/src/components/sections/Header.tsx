import {
  Box,
  Button,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Drawer,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AppConfig } from '../../core/constants';
import { useAuth } from '../auth';

export function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'header']);
  const { isAuthenticated } = useAuth();

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
              onClick={() => navigate('/')}
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
              onClick={() => {
                scrollToSection('features');
              }}
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
              onClick={() => navigate('/hub')}
              sx={{
                color() {
                  return theme.palette.primary.contrastText;
                },
              }}
            >
              {t('header:hub')}
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => navigate('/about')}
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
            {!isAuthenticated ? (
              <>
                <Button
                  variant="text"
                  color="secondary"
                  size="small"
                  onClick={() => navigate('/auth/login')}
                >
                  {t('common:login')}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => navigate('/auth/signup')}
                >
                  {t('common:signUp')}
                </Button>
              </>
            ) : (
              <Button
                variant="text"
                color="secondary"
                size="small"
                onClick={() => navigate('/app')}
              >
                {t('common:GoToDashboard')}
              </Button>
            )}
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
                <MenuItem
                  onClick={() => {
                    navigate('/');
                    setOpenMenu(false);
                  }}
                >
                  {t('header:home')}
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('features')}>
                  {t('header:ourFeatures')}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate('/hub');
                    setOpenMenu(false);
                  }}
                >
                  {t('header:hub')}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate('/about');
                    setOpenMenu(false);
                  }}
                >
                  {t('header:aboutUs')}
                </MenuItem>
                <Divider />
                {!isAuthenticated ? (
                  <>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        sx={{ width: '100%' }}
                        onClick={() => navigate('/auth/signup')}
                      >
                        {t('common:signUp')}
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onClick={() => navigate('/auth/login')}
                      >
                        {t('common:login')}
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="text"
                      sx={{ width: '100%' }}
                      onClick={() => navigate('/app')}
                    >
                      {t('common:GoToDashboard')}
                    </Button>
                  </MenuItem>
                )}
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
