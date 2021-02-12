import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import baseUrl from 'src/api';
import { UserContext } from 'src/context/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState('');
  const { setAuthenticated, setUser } = useContext(UserContext);

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              username: '',
              password: '',
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                username: Yup.string().max(255).required('First name is required'),
                password: Yup.string().max(255).required('password is required'),
              })
            }
            onSubmit={(values) => {
              setLoading(true);
              seterror(false);
              delete axios.defaults.headers.common.Authorization;
              axios
                .post(`${baseUrl}/auth/local/register`, values)
                .then((res) => {
                  const Atoken = `Bearer ${res.data.jwt}`;
                  console.log(res);
                  localStorage.setItem('Atoken', Atoken);
                  axios.defaults.headers.common.Authorization = Atoken;
                  setAuthenticated(true);
                  setUser(res.data.user);
                  navigate('/portal/dashboard', { replace: true });
                })
                .catch((err) => {
                  if (err.request) {
                    console.log(err);
                    console.log(err.response.data.message[0].messages[0].message);
                    seterror(err.response.data.message[0].messages[0].message);
                  } else {
                    console.log(err.response.data.message[0].messages[0].message);
                    seterror(err.response.data.message[0].messages[0].message);
                  }
                });
              setLoading(false);
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
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Only authorised lecturers can register
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="First name"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                {/* <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                /> */}
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
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
                <Box
                  alignItems="center"
                  display="flex"
                >
                  { error ? (
                    <Typography color="error" variant="body1">
                      {error}
                    </Typography>
                  )
                    : '' }
                </Box>
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={loading}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    { loading ? <CircularProgress /> : 'Sign up now'}
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
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

export default RegisterView;
