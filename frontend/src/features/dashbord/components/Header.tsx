import * as React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuButton from '../../../components/common/MenuButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

type HeaderProps = {
  headerName: string;
  title: string;
  allowSideIcon?: boolean;
};

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: theme.palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export function NavbarBreadcrumbs({ title, headerName }: HeaderProps) {
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">{headerName}</Typography>
      <Typography
        variant="body1"
        sx={{ color: 'text.primary', fontWeight: 600 }}
      >
        {title}
      </Typography>
    </StyledBreadcrumbs>
  );
}

export function Header({
  headerName,
  title,
  allowSideIcon = true,
}: HeaderProps) {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs title={title} headerName={headerName} />
      {allowSideIcon && (
        <Stack direction="row" sx={{ gap: 1 }}>
          <MenuButton showBadge aria-label="Open notifications">
            <NotificationsRoundedIcon />
          </MenuButton>
        </Stack>
      )}
    </Stack>
  );
}
