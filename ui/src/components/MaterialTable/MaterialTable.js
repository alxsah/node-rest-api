import React, { Component } from 'react';
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class MaterialTable extends Component {
    state = {
      rows: []
    };
    componentDidMount = () => {
      this.getUserBookings();
    }
    getUserBookings = () => {
      const token = localStorage.getItem('loginToken');
      axios.get('http://localhost:3001/bookings', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res);
        this.setState({rows: res.data});
      });
    }
    render() {
      return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => {
              return (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      )
    }
  }
  
  export default MaterialTable;
  