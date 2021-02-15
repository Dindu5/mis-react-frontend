import React, { useState, useEffect } from 'react';
import {
  Box,
  makeStyles,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import axios from 'axios';
import baseUrl from 'src/api';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Page from 'src/components/Page';
import Results from '../../../components/Results';

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
          {children}
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
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [students, setStudents] = useState([]);
  const [loading, setloading] = useState(false);
  const [foundStudents, setfoundStudents] = useState([]);

  const search = (val) => {
    const filteredStudents = students.filter((student) => {
      const id = student.manual_id;
      return id.includes(val);
    });
    setfoundStudents(filteredStudents);
  };

  const fetchDepartment = (id) => {
    setloading(true);
    const token = localStorage.getItem('Atoken');
    axios.defaults.headers.common.Authorization = token;
    axios
      .get(`${baseUrl}/departments/${id}`)
      .then((res) => {
        setStudents(res.data.students);
        setfoundStudents(res.data.students);
        setloading(false);
      })
      .catch((err) => {
        if (err.request) {
          console.log(err);
          console.log(err.response);
        } else {
          console.log(err.response);
        }
        setloading(false);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const id = newValue + 24;
    fetchDepartment(id);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const departments = [
    { value: 'ARC', name: 'Architecture', id: 24 },
    { value: 'BUT', name: 'Building Technology', id: 25 },
    { value: 'EVT', name: 'Environmental Technology', id: 26 },
    { value: 'QST', name: 'Quantity Surveying', id: 27 },
    { value: 'SGI', name: 'Surveying and Geoinformatics', id: 28 },
    { value: 'URP', name: 'Urban and Regional Planning', id: 29 }
  ];

  useEffect(() => {
    fetchDepartment(departments[0].id);
  }, []);

  return (
    <div className={classes.root}>
      <Page
        className={classes.table}
        title="School of Agriculture and Agricultural Technology"
      >
        <AppBar position="static" color="paper">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            style={{ backgrondColor: 'white' }}
          >
            {departments.map((department, index) => {
              return <Tab label={department.value} key={department.value} {...a11yProps(index)} />;
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
                  <div>
                    <Box mt={3} mb={3}>
                      <Card>
                        <CardContent>
                          <Box maxWidth={500}>
                            <TextField
                              fullWidth
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SvgIcon
                                      fontSize="small"
                                      color="action"
                                    >
                                      <SearchIcon />
                                    </SvgIcon>
                                  </InputAdornment>
                                )
                              }}
                              placeholder="Search Students Manual ID"
                              variant="outlined"
                              onChange={(e) => {
                                search(e.target.value);
                              }}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </div>
                  <Results students={foundStudents} loading={loading} />
                </Box>
              </TabPanel>
            );
          })}
        </SwipeableViews>
      </Page>
    </div>
  );
};

export default CustomerListView;
