import React, { useState } from 'react';
import {
  Box,
  makeStyles
} from '@material-ui/core';
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
import data from './data';

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

const CustomerListView = () => {
  const classes = useStyles();
  const [customers] = useState(data);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const departments = [
    { value: 'AEX', name: 'Agricultural Extension' },
    { value: 'AEC', name: 'Agricultural Economics' },
    { value: 'AST', name: 'Animal Science and Technology' },
    { value: 'CST', name: 'Crop Science and Technology' },
    { value: 'FAT', name: 'Fisheries and Aquaticulture Technology' },
    { value: 'FWT', name: 'Forestry and Widelife Technology' },
    { value: 'SST', name: 'Soil Science Technology' },
  ];

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
                  <Toolbar />
                  <Results customers={customers} />
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