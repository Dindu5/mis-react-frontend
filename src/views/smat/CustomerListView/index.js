import React, { useState } from 'react';
import {
  Box,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import baseUrl from 'src/api';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Page from 'src/components/Page';
import Results from '../../../components/Results';
import Toolbar from '../../../components/Toolbar';

function TabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  table: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
  }
}));

const SobsListView = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [students, setStudents] = useState([]);

  const fetchDepartment = (id) => {
    const token = localStorage.getItem('Atoken');
    axios.defaults.headers.common.Authorization = token;
    axios
      .get(`${baseUrl}/departments/${id}`)
      .then((res) => {
        setStudents(res.data.students);
      })
      .catch((err) => {
        if (err.request) {
          console.log(err);
          console.log(err.response.data);
        } else {
          console.log(err.response.data);
        }
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const id = newValue + 30;
    fetchDepartment(id);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const departments = [
    { value: 'FMT', name: 'Financial Management Technology', id: 30 },
    { value: 'MMT', name: 'Maritime Management Technology', id: 31 },
    { value: 'PMT', name: 'Project Management Technology', id: 32 },
    { value: 'TMT', name: 'Transport Management Technolgy', id: 33 },
    { value: 'MGT', name: 'Management Technology', id: 34 },
  ];

  return (
    <div className={classes.root}>
      <Page
        className={classes.table}
        title="School of Engineering and Engineering Technology"
      >
        <AppBar position="static" color="white">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            style={{ backgrondColor: 'white' }}
          >
            {departments.map((department, index) => {
              return <Tab label={department.value} {...a11yProps(index)} key={department.value} />;
            })}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {departments.map((department, index) => {
            return (
              <TabPanel key={department.value} value={value} index={index} dir={theme.direction}>
                <Box mt={3}>
                  <h3 style={{ margin: '1rem 0' }}>{department.name}</h3>
                  <Toolbar />
                  <Results students={students} />
                </Box>
              </TabPanel>
            );
          })}
        </SwipeableViews>
      </Page>
    </div>
  );
};

export default SobsListView;
