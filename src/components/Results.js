import React from 'react';
import moment from 'moment';
import {
  Typography,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'name', label: 'Full Name', minWidth: 250 },
  { id: 'regNo', label: 'Reg No', minWidth: 100 },
  {
    id: 'level',
    label: 'Level',
    minWidth: 50,
    align: 'right',
  },
  {
    id: 'manualID',
    label: 'Manual ID',
    minWidth: 120,
    align: 'right',
  },
  {
    id: 'createdAt',
    label: 'Date',
    minWidth: 120,
    align: 'right',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const Results = ({ students }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={student.id}
                  className="table-row-student"
                  onClick={() => { navigate(`/portal/student/${student.id}`, { replace: true }); }}
                >
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                    >
                      {`${student.firstname} ${student.lastname}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {student.reg_no}
                  </TableCell>
                  <TableCell align="right">
                    {student.level}
                  </TableCell>
                  <TableCell align="right">
                    {student.manual_id}
                  </TableCell>
                  <TableCell align="right">
                    {moment(student.created_at).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Results;
