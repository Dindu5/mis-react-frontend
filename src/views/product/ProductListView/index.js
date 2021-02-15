import React, { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';
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
import baseUrl from 'src/api';
import { useAlert } from 'react-alert';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Page from 'src/components/Page';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import { UserContext } from 'src/context/UserContext';

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
  const { user } = useContext(UserContext);
  const [loading, setloading] = useState(false);
  const alert = useAlert();
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    othernames: '',
    email: '',
    regno: '',
    level: '',
    faculty: '',
    department: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleSubmit = (e) => {
    setloading(true);
    e.preventDefault();
    const id = uuid();
    const modifiedValues = {
      firstname: values.firstname,
      lastname: values.lastname,
      othernames: values.othernames,
      email: values.email,
      reg_no: values.regno,
      level: values.level,
      users_permissions_user: {
        id: user.id
      },
      department: {
        id: values.department
      },
      faculty: {
        id: values.faculty
      },
      manual_id: id.slice(0, 8),
    };
    const token = localStorage.getItem('Atoken');
    axios.defaults.headers.common.Authorization = token;
    axios
      .post(`${baseUrl}/students`, modifiedValues)
      .then((res) => {
        console.log(res);
        setloading(false);
        alert.success('New Student successfully added');
        setValues({
          firstname: '',
          lastname: '',
          othernames: '',
          email: '',
          regno: '',
          level: '',
          faculty: '',
          department: '',
        });
      })
      .catch((err) => {
        if (err.request) {
          console.log(err.request);
          console.log(err.response);
        } else {
          console.log(err.response);
        }
        setloading(false);
        alert.success('Opps, Something went wrong, please try again');
      });
  };

  const futoData = [
    {
      school: 'SAAT',
      name: 'School of Agriculture and Agricultural Extension',
      id: 2,
    },
    {
      school: 'SOBS',
      name: 'School of Biological Sciences',
      id: 3,
    },
    {
      school: 'SEET',
      name: 'School of Engineering and Engineering Technology',
      id: 4,
    },
    {
      school: 'SOES',
      name: 'School of Environmental Sciences',
      id: 5,
    },
    {
      school: 'SMAT',
      name: 'School of Management Technology',
      id: 6,
    },
    {
      school: 'SOHT',
      name: 'School of Health Technology',
      id: 7,
    },
    {
      school: 'SCIT',
      name: 'School of Computing and Information Technology',
      id: 1,
    },
  ];

  let departments = [];

  switch (values.faculty) {
    case 2:
      departments = [
        { value: 'AEX', name: 'Agricultural Extension', id: 3 },
        { value: 'AST', name: 'Animal Science and Technology', id: 4 },
        { value: 'AEC', name: 'Agricultural Economics', id: 5 },
        { value: 'CST', name: 'Crop Science and Technology', id: 6 },
        { value: 'FAT', name: 'Fisheries and Aquaticulture Technology', id: 7 },
        { value: 'FWT', name: 'Forestry and Widelife Technology', id: 8 },
        { value: 'SST', name: 'Soil Science Technology', id: 9 },
      ];
      break;
    case 3:
      departments = [
        { value: 'BCH', name: 'Biochemisty', id: 10 },
        { value: 'BIO', name: 'Biology', id: 11 },
        { value: 'BTC', name: 'Biotechnology', id: 12 },
        { value: 'MCB', name: 'Micro Biology', id: 13 },
      ];
      break;
    case 4:
      departments = [
        { value: 'ABE', name: 'Agricultural and Bioresources Engineering', id: 14 },
        { value: 'CHE', name: 'Chemical Engineering', id: 15 },
        { value: 'EEE', name: 'Electrical and Electronics Engineering', id: 16 },
        { value: 'FST', name: 'Food Science Technology', id: 17 },
        { value: 'CIE', name: 'Civil Engineering', id: 18 },
        { value: 'MME', name: 'Material and Metallurgical Engineering', id: 19 },
        { value: 'MEE', name: 'Mechanical Engineering', id: 20 },
        { value: 'MCE', name: 'Mechatronic Engineering', id: 21 },
        { value: 'PET', name: 'Petroleum Engineering', id: 22 },
        { value: 'PTE', name: 'Polymer and Textile Engineering', id: 23 },
      ];
      break;

    case 5:
      departments = [
        { value: 'ARC', name: 'Architecture', id: 24 },
        { value: 'BUT', name: 'Building Technology', id: 25 },
        { value: 'EVT', name: 'Environmental Technology', id: 26 },
        { value: 'QST', name: 'Quantity Surveying', id: 27 },
        { value: 'SGI', name: 'Surveying and Geoinformatics', id: 28 },
        { value: 'URP', name: 'Urban and Regional Planning', id: 29 }
      ];
      break;

    case 6:
      departments = [
        { value: 'FMT', name: 'Financial Management Technology', id: 30 },
        { value: 'MMT', name: 'Maritime Management Technology', id: 31 },
        { value: 'PMT', name: 'Project Management Technology', id: 32 },
        { value: 'TMT', name: 'Transport Management Technolgy', id: 33 },
        { value: 'MGT', name: 'Management Technology', id: 34 }
      ];
      break;

    case 7:
      departments = [
        { value: 'BMT', name: 'Biomedical Technology', id: 35 },
        { value: 'DNT', name: 'Dental Technology', id: 36 },
        { value: 'EHS', name: 'Environmental Health Science', id: 37 },
        { value: 'OPT', name: 'Optomery', id: 38 },
        { value: 'POT', name: 'Prostetics and Orthotics', id: 39 },
        { value: 'PHT', name: 'Public Health Technology', id: 40 }
      ];
      break;

    case 1:
      departments = [
        { value: 'CSC', name: 'Computer Science', id: 41 },
        { value: 'IMT', name: 'Information Technology', id: 42 },
        { value: 'CBS', name: 'Cyber Security', id: 43 },
        { value: 'SWE', name: 'Software Engineering', id: 44 },
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
            <Grid item lg={3} md={3} />
            <Grid item lg={6} md={6} xs={12}>
              <form className={classes.form} onSubmit={handleSubmit}>
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
                      required
                      value={values.firstname}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      margin="normal"
                      name="lastname"
                      required
                      onChange={handleChange}
                      type="text"
                      value={values.lastname}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Other Names"
                      margin="normal"
                      name="othernames"
                      onChange={handleChange}
                      type="text"
                      value={values.othernames}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Registration Number"
                      margin="normal"
                      name="regno"
                      onChange={handleChange}
                      required
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
                      required
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
                        required
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
                        required
                        label="School"
                        name="faculty"
                      >
                        {futoData.map((school) => {
                          return (
                            <MenuItem
                              key={school.id}
                              value={school.id}
                            >
                              {school.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" className={classes.formControl} margin="normal">
                      <InputLabel id="le">Department</InputLabel>
                      <Select
                        fullWidth
                        labelId="le"
                        value={values.department}
                        required
                        defaultValue={values.department ? values.department : ''}
                        onChange={handleChange}
                        label="Department"
                        name="department"
                      >
                        {departments.map((department) => {
                          return (
                            <MenuItem
                              key={department.id}
                              value={department.id}
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
                    <Button color="primary" variant="contained" onClick={handleSubmit}>
                      { loading ? <CircularProgress color="secondary" /> : 'Register'}
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
