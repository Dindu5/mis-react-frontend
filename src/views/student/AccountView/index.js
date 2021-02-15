import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import baseUrl from 'src/api';
import Page from 'src/components/Page';
import { useParams } from 'react-router-dom';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const [student, setStudent] = useState({});
  const [values, setvalues] = useState({});
  const { slug } = useParams();
  console.log(slug);

  const fetchStudent = (id) => {
    const token = localStorage.getItem('Atoken');
    console.log('started');
    axios.defaults.headers.common.Authorization = token;
    axios
      .get(`${baseUrl}/students/${id}`)
      .then((res) => {
        setStudent(res.data);
        setvalues(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        if (err.request) {
          console.log(err);
          console.log(err.response);
        } else {
          console.log(err.response);
        }
      });
    console.log(student);
  };

  useEffect(() => {
    fetchStudent(slug);
  }, []);

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={4}
            xs={12}
          >
            <Profile student={student} />
          </Grid>
          <Grid
            item
            lg={8}
            md={8}
            xs={12}
          >
            <ProfileDetails
              student={student}
              refresh={setStudent}
              values={values}
              setValues={setvalues}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
