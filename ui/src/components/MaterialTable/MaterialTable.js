import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BookingDialog from '../BookingDialog/BookingDialog';
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
import EditIcon from '@material-ui/icons/Edit';
import config from '../../config.json';

const bookingsEndpoint = `http://${config[process.env.NODE_ENV].hostname}:${config[process.env.NODE_ENV].port}/bookings`;

const styles = theme => ({
  paper: {
    overflowX: 'scroll',
  },
  iconContainer: {
    display: 'flex'
  },
  addIcon: {
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  editIcon: {
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  deleteIcon: {
    '&:hover': {
      color: theme.palette.secondary.main
    }
  },
  hidden: {
    visibility: 'hidden'
  }
});

class MaterialTable extends Component {
  state = {
    rows: [],
    selected: '',
    hideDelete: true,
    isAddDialogOpen: false,
    isEditDialogOpen: false,
    userToken: localStorage.getItem('loginToken'),
  };

  static propTypes = {
    classes: PropTypes.object
  }

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
    .then(res => {
      this.setState({rows: res.data});
    });
  }

  handleRowClick = id => () => {
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

  setDialogState = (dialogType, state) =>
    dialogType === 'Add' ? this.setState({isAddDialogOpen: state})
    : this.setState({isEditDialogOpen: state});

    handleAddCompletion = booking => {
      axios.post(bookingsEndpoint, booking,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.userToken}`
        }
      })
      .then(res => {
        this.setDialogState('Add', false);
      }).catch(err => {
        this.setState({error: true});
      });
      this.getUserBookings();
    }

  isNothingSelected = () => this.state.selected.length === 0;

  isSelected = id => this.state.selected === id;

  getSelectedBooking = () => this.state.rows.filter(row => this.isSelected(row._id))[0];

  handleEditCompletion = booking => {
    axios.put(`${bookingsEndpoint}/${this.state.selected}`, booking, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.userToken}`
      }
    }).then(res => {
      this.setDialogState('Edit', false);
    }).catch(err => {
      this.setState({error: true});
    });
    this.getUserBookings();
  }

  renderDialogs = () => (
    <div>
      <BookingDialog 
      dialogType="Add"
        open={this.state.isAddDialogOpen}
        setDialogState={this.setDialogState}
        handleCompletion={this.handleAddCompletion}/>
      <BookingDialog
        dialogType="Edit"
        selectedBooking={this.getSelectedBooking()}
        open={this.state.isEditDialogOpen} 
        setDialogState={this.setDialogState}
        handleCompletion={this.handleEditCompletion}/>
    </div>
  );

  renderTableHead = () => (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Location</TableCell>
      <TableCell>Date</TableCell>
      <TableCell className="icon-cell">
        <div className={this.props.classes.iconContainer}>
          <IconButton 
            className={this.props.classes.addIcon}
            aria-label="Add">
            <AddIcon 
              onClick={() => this.setDialogState('Add', true)}/>
          </IconButton>
          <IconButton 
            className={`${this.props.classes.editIcon} ${this.isNothingSelected() ? this.props.classes.hidden: ''}`}
            aria-label="Edit">
            <EditIcon 
              onClick={() => this.setDialogState('Edit', true)}/>
          </IconButton>
          <IconButton 
            className={`${this.props.classes.deleteIcon} ${this.isNothingSelected() ? this.props.classes.hidden : ''}`} 
            aria-label="Delete">
            <DeleteIcon 
              onClick={this.handleDeleteClick}/>
          </IconButton>
        </div>
      </TableCell>
      </TableRow>
    </TableHead>
  );

  renderTableBody = () => (
    <TableBody>
      {this.state.rows.map(row => {
        return (
          <TableRow 
            key={row._id}
            role="checkbox"
            onClick={this.handleRowClick(row._id)}
            selected={this.isSelected(row._id)}>
            <TableCell padding="checkbox">
              <Checkbox checked={this.isSelected(row._id)} />
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.location}</TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
  
  render() {
    return (
    <Paper className={this.props.classes.paper}>
      {this.renderDialogs()}
      <Table padding="dense">
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    </Paper>
    )
  }
}

const MaterialTableStyled = withStyles(styles)(MaterialTable);
export default MaterialTableStyled;
