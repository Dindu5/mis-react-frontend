import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import baseUrl from 'src/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UserContext } from 'src/context/UserContext';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState('');
  const { setAuthenticated, setUser } = useContext(UserContext);

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              identifier: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              identifier: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string()
                .max(255)
                .required('Password is required')
            })}
            onSubmit={(values) => {
              setLoading(true);
              seterror('');
              // const token = localStorage.getItem('Atoken');
              // axios.defaults.headers.common.Authorization = token;
              // console.log(token);
              delete axios.defaults.headers.common.Authorization;
              axios
                .post(`${baseUrl}/auth/local`, values)
                .then((res) => {
                  const Atoken = `Bearer ${res.data.jwt}`;
                  localStorage.setItem('Atoken', Atoken);
                  axios.defaults.headers.common.Authorization = Atoken;
                  setAuthenticated(true);
                  setUser(res.data.user);
                  navigate('/portal/dashboard', { replace: true });
                })
                .catch((err) => {
                  console.log(err.response.data.message[0].messages[0].message);
                  setLoading(false);
                  seterror(err.response.data.message[0].messages[0].message);
                });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Log in to MIS portal to register students
                  </Typography>
                </Box>
                <Box mt={3} mb={1} />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="identifier"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.identifier}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                { error ? (
                  <Typography color="error" variant="body1">
                    { error }
                  </Typography>
                )
                  : '' }
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    { loading ? <CircularProgress /> : 'Sign in now'}
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
