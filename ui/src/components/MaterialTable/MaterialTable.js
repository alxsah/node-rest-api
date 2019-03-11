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
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBookingDialog from '../AddBookingDialog/AddBookingDialog';
import config from '../../config.json';

const bookingsEndpoint = `http://${config[process.env.NODE_ENV].hostname}:${config[process.env.NODE_ENV].port}/bookings`;

class MaterialTable extends Component {
    state = {
      rows: [],
      selected: '',
      hideDelete: true,
      userToken: localStorage.getItem('loginToken'),
      isDialogOpen: false,
    };
    componentDidMount = () => {
      this.getUserBookings();
    }
    getUserBookings = () => {
      axios.get(bookingsEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.userToken}`
        }
      })
      .then((res) => {
        this.setState({rows: res.data});
      });
    }

    handleRowClick = id => event => {
      if (this.state.selected === id) {
        this.setState({selected: ''});
      } else {
        this.setState({selected: id});
      }
    };

    handleDeleteClick = () => {
      axios.delete(`${bookingsEndpoint}/${this.state.selected}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.userToken}`
        }
      }).then(res => {
        this.getUserBookings();
      });
    }

    handleAddClick = () => {
      this.setState({isDialogOpen: true});
    }

    setDialogState = (state) => {
      this.setState({isDialogOpen: state});
    }

    handleAddCompletion = () => {
      this.getUserBookings();
    }

    hideDelete = () => this.state.selected.length === 0;

    isSelected = id => this.state.selected === id;

    render() {
      return (
      <Paper className="paper">
        <AddBookingDialog 
          open={this.state.isDialogOpen} 
          setDialogState={this.setDialogState}
          userToken={this.state.userToken}
          handleAddCompletion={this.handleAddCompletion}
        />
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
              <IconButton 
                className="add-icon"
                aria-label="Add">
                <AddIcon 
                  onClick={this.handleAddClick}
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
  