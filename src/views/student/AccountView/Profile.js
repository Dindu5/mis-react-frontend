import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const user = {
  avatar: '/static/download.png',
  timezone: 'GMT+1'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, student, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      {student ? (
        <div>
          <CardContent>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
            >
              <Avatar
                className={classes.avatar}
                src={user.avatar}
                mb={5}
              />
              <br />
              <br />
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h3"
                mt={5}
              >
                {`${student.lastname} ${student.firstname}`}
              </Typography>
              <br />
              <Typography
                color="textSecondary"
                variant="body1"
                mt={5}
              >
                {student.email}
              </Typography>
              <Typography
                mb={2}
                color="textSecondary"
                variant="body1"
              >
                {student.reg_no}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body1"
              >
                {student.department ? student.department.name : ''}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body1"
              >
                {`${student.level} Level`}
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          <CardContent>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
            >
              <Typography
                color="textPrimary"
                variant="h4"
              >
                {`Manual ID: ${student.manual_id}`}
              </Typography>
              <br />
              <Typography
                className={classes.dateText}
                color="textSecondary"
                variant="body1"
              >
                {`Registered on : ${moment(student.created_at).format('DD/MM/YYYY')}`}
              </Typography>
              <Typography
                className={classes.dateText}
                color="textSecondary"
                variant="body1"
              >
                {`Registered by : ${student.users_permissions_user ? student.users_permissions_user.username : ''}`}
              </Typography>
            </Box>
          </CardContent>
        </div>
      ) : (
        <CardContent>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <Avatar
              className={classes.avatar}
              src={user.avatar}
              mb={5}
            />
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
            >
              Student Not Found
            </Typography>
          </Box>
        </CardContent>
      )}
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
