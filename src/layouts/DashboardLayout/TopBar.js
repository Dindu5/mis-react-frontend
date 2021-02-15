import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { UserContext } from 'src/context/UserContext';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const { setAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    console.log('logout');
    localStorage.removeItem('Atoken');
    setAuthenticated(false);
    navigate('/login', { replace: true });
  };

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Logo />
          <h4 style={{ marginLeft: '8px', color: 'white', fontFamily: 'roboto' }}>CSC-201 Portal</h4>
        </RouterLink>
        <Box flexGrow={1} />
        <IconButton color="inherit" onClick={() => { logout(); }}>
          <InputIcon />
        </IconButton>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
