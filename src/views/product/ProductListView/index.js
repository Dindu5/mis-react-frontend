import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Page from 'src/components/Page';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  form: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ProductList = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    regno: '',
    level: '',
    faculty: '',
    department: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const futoData = [
    {
      school: 'SAAT',
      name: 'School of Agriculture and Agricultural Extension',
    },
    {
      school: 'SOBS',
      name: 'School of Biological Sciences',
    },
    {
      school: 'SEET',
      name: 'School of Engineering and Engineering Technology',
    },
  ];

  let departments = [];

  switch (values.faculty) {
    case 'SAAT':
      departments = [
        { value: 'AEX', name: 'Agricultural Extension' },
        { value: 'AEC', name: 'Agricultural Economics' },
        { value: 'AST', name: 'Animal Science and Technology' },
        { value: 'CST', name: 'Crop Science and Technology' },
        { value: 'FAT', name: 'Fisheries and Aquaticulture Technology' },
        { value: 'FWT', name: 'Forestry and Widelife Technology' },
        { value: 'SST', name: 'Soil Science Technology' },
      ];
      break;
    case 'SOBS':
      departments = [
        { value: 'BCH', name: 'Biochemisty' },
        { value: 'BIO', name: 'Biology' },
        { value: 'BTC', name: 'Biotechnology' },
        { value: 'MCB', name: 'Micro Biology' },
      ];
      break;
    case 'SEET':
      departments = [
        { value: 'AGE', name: 'Agricultural Engineering' },
        { value: 'CHE', name: 'Chemical Engineering' },
        { value: 'EEE', name: 'Electrical and Electronics Engineering' },
        { value: 'CIE', name: 'Civil Engineering' },
        { value: 'FST', name: 'Food Science Technology' },
      ];
      break;

    default:
      departments = [];
      break;
  }

  return (
    <Page className={classes.root} title="Register Students">
      <Container maxWidth={false}>
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item lg={3} md={3} xs={0} />
            <Grid item lg={6} md={6} xs={12}>
              <form className={classes.form}>
                <Card>
                  <CardHeader subheader="Enter students details to register them for CSC 201 Manual collection" title="Register Students" />
                  <Divider />
                  <CardContent>
                    <TextField
                      fullWidth
                      label="First Name"
                      margin="normal"
                      name="firstname"
                      onChange={handleChange}
                      type="text"
                      value={values.firstname}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      margin="normal"
                      name="lastname"
                      onChange={handleChange}
                      type="text"
                      value={values.lastname}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Registration Number"
                      margin="normal"
                      name="regno"
                      onChange={handleChange}
                      type="number"
                      value={values.regno}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      margin="normal"
                      name="email"
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                    <FormControl fullWidth variant="outlined" className={classes.formControl} margin="normal">
                      <InputLabel id="level">Level</InputLabel>
                      <Select
                        fullWidth
                        labelId="level"
                        value={values.level}
                        onChange={handleChange}
                        label="Level"
                        name="level"
                      >
                        <MenuItem value={100}>100</MenuItem>
                        <MenuItem value={200}>200</MenuItem>
                        <MenuItem value={300}>300</MenuItem>
                        <MenuItem value={400}>400</MenuItem>
                        <MenuItem value={500}>500</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" className={classes.formControl} margin="normal">
                      <InputLabel id="level">School</InputLabel>
                      <Select
                        fullWidth
                        labelId="level"
                        value={values.faculty}
                        onChange={handleChange}
                        label="School"
                        name="faculty"
                      >
                        {futoData.map((school) => {
                          return (
                            <MenuItem
                              key={school.name}
                              value={school.school}
                            >
                              {school.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" className={classes.formControl} margin="normal">
                      <InputLabel id="level">Department</InputLabel>
                      <Select
                        fullWidth
                        labelId="level"
                        value={values.department}
                        onChange={handleChange}
                        label="Department"
                        name="department"
                      >
                        {departments.map((department) => {
                          return (
                            <MenuItem
                              key={department.name}
                              value={department.value}
                            >
                              {department.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </CardContent>
                  <Divider />
                  <Box display="flex" justifyContent="flex-end" p={2}>
                    <Button color="primary" variant="contained">
                      Register
                    </Button>
                  </Box>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default ProductList;
