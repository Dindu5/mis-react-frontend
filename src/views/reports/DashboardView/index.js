import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';
import baseUrl from 'src/api';
import { DataContext } from 'src/context/DataContext';
import Page from 'src/components/Page';
import Budget from './Budget';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import Faculty from './FacultyReport';
import Results from '../../../components/Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [studentsToday, setstudentsToday] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const { count, setCount } = useContext(DataContext);

  useEffect(() => {
    const requestOne = axios.get(`${baseUrl}/students/count`);
    const requestTwo = axios.get(`${baseUrl}/students`);
    const requestThree = axios.get(`${baseUrl}/faculties`);
    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responesThree = responses[2];

          setCount(responseOne.data);
          setAllStudents(responseTwo.data);
          setSchools(responesThree.data);
          console.log('school', schools);
          const sortedActivities = responseTwo.data.slice(0, 7).sort((a, b) => (
            new Date(b.created_at) - new Date(a.created_at)
          ));
          console.log('sortedActivities', sortedActivities);
          setstudentsToday(sortedActivities);
          console.log(responseOne, responseTwo, responesThree);
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
  }, []);

  // console.log('all', allStudents);

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget todayCount={allStudents} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers total={count} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress total={count} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit total={count} />
          </Grid>
          {schools.length !== 0 ? schools.map((school) => {
            return (
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
                key={school.id}
              >
                <Faculty school={school} key={school.id} />
              </Grid>
            );
          }) : ''}
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <Sales schools={schools} />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <Card>
              <CardHeader title="Recently Registered" />
              <Divider />
              <Results students={studentsToday} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
