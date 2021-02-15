import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import baseUrl from 'src/api';
import axios from 'axios';
import { UserContext } from 'src/context/UserContext';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({
  className,
  student,
  refresh,
  ...rest
}) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [state, setState] = React.useState(false);
  const alert = useAlert();
  const navigate = useNavigate();

  const handleCheck = (event) => {
    setState(event.target.checked);
  };
  const [values, setValues] = useState({
    lastname: student.lastname,
    firstname: student.firstname,
    othernames: student.othernames,
    email: student.email,
    reg_no: student.reg_no,
    level: student.level,
    faculty: student.faculty ? student.faculty.id : '',
    department: student.department ? student.department.id : '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuid();
    let modifiedValues;
    if (state) {
      modifiedValues = {
        firstname: values.firstname,
        lastname: values.lastname,
        othernames: values.othernames,
        email: values.email,
        reg_no: values.reg_no,
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
    } else {
      modifiedValues = {
        firstname: values.firstname,
        lastname: values.lastname,
        othernames: values.othernames,
        email: values.email,
        reg_no: values.reg_no,
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
      };
    }
    console.log(modifiedValues);
    const token = localStorage.getItem('Atoken');
    axios.defaults.headers.common.Authorization = token;
    axios
      .put(`${baseUrl}/students/${student.id}`, modifiedValues)
      .then((res) => {
        console.log(res);
        alert.success('Student Details Successfully Updated');
        refresh(res.data);
      })
      .catch((err) => {
        if (err.request) {
          console.log(err.request);
          console.log(err.response);
        } else {
          console.log(err.response.data.status);
        }
        alert.error('Opps, Something went wrong, please try again');
      });
  };

  const handleDelete = () => {
    const token = localStorage.getItem('Atoken');
    axios.defaults.headers.common.Authorization = token;
    axios
      .delete(`${baseUrl}/students/${student.id}`)
      .then((res) => {
        console.log(res);
        alert.success('Student Successfully Deleted');
        navigate('/portal/dashboard', { replace: true });
      })
      .catch((err) => {
        if (err.request) {
          console.log(err.request);
          console.log(err.response);
        } else {
          console.log(err.response);
        }
        alert.error('Opps, Something went wrong, please try again');
      });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Update students data here"
          title="Student Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastname"
                onChange={handleChange}
                required
                value={values.lastname}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="First name"
                name="firstname"
                onChange={handleChange}
                value={values.firstname}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Other Names"
                name="othernames"
                onChange={handleChange}
                value={values.othernames}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={values.email}
                variant="outlined"
                type="email"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Reg NO"
                name="reg_no"
                onChange={handleChange}
                value={values.reg_no}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                value={values.level}
                onChange={handleChange}
                label="Level"
                name="level"
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                <option value={100}>100</option>
                <option value={200}>200</option>
                <option value={300}>300</option>
                <option value={400}>400</option>
                <option value={500}>500</option>
              </TextField>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                value={values.faculty}
                onChange={handleChange}
                label="School"
                name="faculty"
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {futoData.map((school) => {
                  return (
                    <option
                      key={school.id}
                      value={school.id}
                    >
                      {school.name}
                    </option>
                  );
                })}
              </TextField>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                value={values.department}
                onChange={handleChange}
                label="Department"
                name="department"
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {departments.map((department) => {
                  return (
                    <option
                      key={department.id}
                      value={department.id}
                    >
                      {department.name}
                    </option>
                  );
                })}
              </TextField>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <FormControlLabel
                control={
                  (
                    <Switch
                      checked={state}
                      onChange={handleCheck}
                      name="check"
                      color="primary"
                    />
                  )
                }
                label="Do you want to generate another manual ID?"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          p={2}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={handleDelete}
          >
            Delete Student
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Update details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
