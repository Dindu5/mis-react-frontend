import React from 'react';
// import clsx from 'clsx';
//  import PropTypes from 'prop-types';
// import moment from 'moment';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import {
//   Avatar,
//   Box,
//   Card,
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Typography,
//   makeStyles
// } from '@material-ui/core';
// import getInitials from 'src/utils/getInitials';

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
  { id: 'name', label: 'Full Name', minWidth: 170 },
  { id: 'regNo', label: 'Reg No', minWidth: 50 },
  {
    id: 'level',
    label: 'Level',
    minWidth: 50,
    align: 'right',
  },
  {
    id: 'manualID',
    label: 'Manual ID',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'createdAt',
    label: 'Date',
    minWidth: 170,
    align: 'right',
  },
];

function createData(name, regNo, level, manualID, createdAt) {
  return (
    {
      name, regNo, level, manualID, createdAt
    }
  );
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263, 123),
  createData('China', 'CN', 1403500365, 9596961, 'friday'),
  createData('Italy', 'IT', 60483973, 301340, 'tuesday'),
  createData('United States', 'US', 327167434, 9833520, 'wenesday'),
  createData('Canada', 'CA', 37602103, 9984670, 'thursday'),
  createData('Australia', 'AU', 25475400, 7692024, 'thursday'),
  createData('Germany', 'DE', 83019200, 357578, 'thursday'),
  createData('Ireland', 'IE', 4857000, 70273, 'thursday'),
  createData('Mexico', 'MX', 126577691, 1972550, 'thursday'),
  createData('Japan', 'JP', 126317000, 377973, 'thursday'),
  createData('France', 'FR', 67022000, 640679, 'thursday'),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246, 'thursday'),
  createData('Nigeria', 'NG', 200962417, 923768, 'thursday'),
  createData('Brazil', 'BR', 210147125, 8515767, 'thursday'),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const Results = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

// const useStyles = makeStyles((theme) => ({
//   root: {},
//   avatar: {
//     marginRight: theme.spacing(2)
//   }
// }));

// const Results = ({ className, customers, ...rest }) => {
//   const classes = useStyles();
//   const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(0);

//   const handleSelectAll = (event) => {
//     let newSelectedCustomerIds;

//     if (event.target.checked) {
//       newSelectedCustomerIds = customers.map((customer) => customer.id);
//     } else {
//       newSelectedCustomerIds = [];
//     }

//     setSelectedCustomerIds(newSelectedCustomerIds);
//   };

//   const handleSelectOne = (event, id) => {
//     const selectedIndex = selectedCustomerIds.indexOf(id);
//     let newSelectedCustomerIds = [];

//     if (selectedIndex === -1) {
//       newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
//     } else if (selectedIndex === 0) {
//       newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
//     } else if (selectedIndex === selectedCustomerIds.length - 1) {
//       newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelectedCustomerIds = newSelectedCustomerIds.concat(
//         selectedCustomerIds.slice(0, selectedIndex),
//         selectedCustomerIds.slice(selectedIndex + 1)
//       );
//     }

//     setSelectedCustomerIds(newSelectedCustomerIds);
//   };

//   const handleLimitChange = (event) => {
//     setLimit(event.target.value);
//   };

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   return (
//     <Card
//       className={clsx(classes.root, className)}
//       {...rest}
//     >
//       <PerfectScrollbar>
//         <Box minWidth={850}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell padding="checkbox">
//                   <Checkbox
//                     checked={selectedCustomerIds.length === customers.length}
//                     color="primary"
//                     indeterminate={
//                       selectedCustomerIds.length > 0
//                       && selectedCustomerIds.length < customers.length
//                     }
//                     onChange={handleSelectAll}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   Name
//                 </TableCell>
//                 <TableCell>
//                   Email
//                 </TableCell>
//                 <TableCell>
//                   Department
//                 </TableCell>
//                 <TableCell>
//                   Phone
//                 </TableCell>
//                 <TableCell>
//                   Registration date
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {customers.slice(0, limit).map((customer) => (
//                 <TableRow
//                   hover
//                   key={customer.id}
//                   selected={selectedCustomerIds.indexOf(customer.id) !== -1}
//                 >
//                   <TableCell padding="checkbox">
//                     <Checkbox
//                       checked={selectedCustomerIds.indexOf(customer.id) !== -1}
//                       onChange={(event) => handleSelectOne(event, customer.id)}
//                       value="true"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Box
//                       alignItems="center"
//                       display="flex"
//                     >
//                       <Avatar
//                         className={classes.avatar}
//                         src={customer.avatarUrl}
//                       >
//                         {getInitials(customer.name)}
//                       </Avatar>
//                       <Typography
//                         color="textPrimary"
//                         variant="body1"
//                       >
//                         {customer.name}
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     {customer.email}
//                   </TableCell>
//                   <TableCell>
//                     {`${customer.address.city},
//                        ${customer.address.state}, ${customer.address.country}`}
//                   </TableCell>
//                   <TableCell>
//                     {customer.phone}
//                   </TableCell>
//                   <TableCell>
//                     {moment(customer.createdAt).format('DD/MM/YYYY')}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>
//       </PerfectScrollbar>
//       <TablePagination
//         component="div"
//         count={customers.length}
//         onChangePage={handlePageChange}
//         onChangeRowsPerPage={handleLimitChange}
//         page={page}
//         rowsPerPage={limit}
//         rowsPerPageOptions={[5, 10, 25]}
//       />
//     </Card>
//   );
// };

// Results.propTypes = {
//   className: PropTypes.string,
//   customers: PropTypes.array.isRequired
// };

export default Results;
