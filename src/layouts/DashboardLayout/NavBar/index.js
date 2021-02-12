import React, { useEffect, useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  Users as UsersIcon,
  Database as DatabaseIcon
} from 'react-feather';
import { UserContext } from 'src/context/UserContext';
import NavItem from './NavItem';

const userStatic = {
  avatar: '/static/download.png',
};

const items = [
  {
    href: '/portal/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/portal/products',
    icon: UsersIcon,
    title: 'Register Students'
  },
  {
    href: '/portal/saat',
    icon: DatabaseIcon,
    title: 'SAAT'
  },
  {
    href: '/portal/sobs',
    icon: DatabaseIcon,
    title: 'SOBS'
  },
  {
    href: '/portal/seet',
    icon: DatabaseIcon,
    title: 'SEET'
  },
  {
    href: '/portal/soes',
    icon: DatabaseIcon,
    title: 'SOES'
  },
  {
    href: '/portal/smat',
    icon: DatabaseIcon,
    title: 'SMAT'
  },
  {
    href: '/portal/shot',
    icon: DatabaseIcon,
    title: 'SHOT'
  },
  {
    href: '/portal/scit',
    icon: DatabaseIcon,
    title: 'SCIT'
  },
  {
    href: '/portal/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/portal/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={userStatic.avatar}
          to="/portal/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.username}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Lecturer
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
