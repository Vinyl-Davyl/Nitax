import faker from 'faker';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 17,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));

let USERS = [], STATUSES = ['Completed', 'In-Progress', 'Incomplete'];
for(let i=0;i<14;i++) {
    USERS[i] = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        jobTitle: faker.name.jobTitle(),
        company: faker.company.companyName(),
        joinDate: faker.date.past().toLocaleDateString('en-US'),
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
    }
}

function MTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>User Info</TableCell>
            <TableCell className={classes.tableHeaderCell}>Email</TableCell>
            <TableCell className={classes.tableHeaderCell}>Phone</TableCell>
            <TableCell className={classes.tableHeaderCell}>Date</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.name}>
              <TableCell>
                {row.name}
              </TableCell>
              <TableCell>
                {row.email}
              </TableCell>
              <TableCell>
                 {row.phone}
              </TableCell>
              <TableCell>
                {row.joinDate}
                </TableCell>
              <TableCell>
                  <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((row.status === 'Completed' && 'green') ||
                        (row.status === 'In-Progress' && 'yellow') ||
                        (row.status === 'Incomplete' && 'orange'))
                    }}
                  >{row.status}</Typography>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={USERS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default MTable;
