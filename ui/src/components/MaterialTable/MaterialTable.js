import React, { Component } from 'react';
import axios from 'axios'
import './MaterialTable.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class MaterialTable extends Component {
    state = {
      rows: [],
      selected: '',
      hideDelete: true,
      userToken: localStorage.getItem('loginToken')
    };
    componentDidMount = () => {
      this.getUserBookings();
    }
    getUserBookings = () => {
      axios.get('http://localhost:3001/bookings', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.userToken}`
        }
      })
      .then((res) => {
        console.log(res);
        this.setState({rows: res.data});
      });
    }

    handleRowClick = id => event => {
      if (this.state.selected === id) {
        this.setState({selected: ''});
      } else {
        this.setState({selected: id});
      }
      /* let { selected } = this.state;
      const selectedIndex = selected.indexOf(id);
      if (selectedIndex === -1) {
        selected.push(id);
      } else {
        selected = selected.filter(x => x !== id);
      }
      this.setState({selected: selected}); */
      console.log('selected:', this.state.selected);
    };

    handleDeleteClick = () => {
      axios.delete(`http://localhost:3001/bookings/${this.state.selected}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.userToken}`
        }
      }).then(res => {
        console.log(res);
        this.getUserBookings();
      });
    }

    hideDelete = () => this.state.selected.length === 0;

    isSelected = id => this.state.selected === id;

    render() {
      return (
      <Paper className="paper">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>
              <IconButton 
                className={this.hideDelete() ? 'hidden' : ''} 
                aria-label="Delete">
                <DeleteIcon 
                  onClick={this.handleDeleteClick}
                />
              </IconButton>
            </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => {
              return (
                <TableRow 
                  key={row._id}
                  role="checkbox"
                  onClick={this.handleRowClick(row._id)}
                  selected={this.isSelected(row._id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={this.isSelected(row._id)} />
                  </TableCell>
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
  