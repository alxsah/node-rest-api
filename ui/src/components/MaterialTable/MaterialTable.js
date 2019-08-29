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
import constants from '../../util/constants';

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
  };

  static propTypes = {
    classes: PropTypes.object
  }

  componentDidMount = () => {
    this.getUserBookings();
  }

  getUserBookings = () => {
    axios.get(bookingsEndpoint, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
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
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(() => {
        // Ensure no row is selected after deletion
        this.setState({selected: ''});
        this.getUserBookings();
      });
    }

  setDialogState = (dialogType, state) =>
    dialogType === constants.DIALOG_TYPE.ADD ? this.setState({isAddDialogOpen: state})
    : this.setState({isEditDialogOpen: state});

    handleAddCompletion = booking => {
      axios.post(bookingsEndpoint, booking,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(() => {
        this.setDialogState(constants.DIALOG_TYPE.ADD, false);
        this.getUserBookings();
      })
      .catch(() => this.setState({error: true}));
    }

  isNothingSelected = () => this.state.selected.length === 0;

  isSelected = id => this.state.selected === id;

  getSelectedBooking = () => this.state.rows.filter(row => this.isSelected(row._id))[0];

  handleEditCompletion = booking => {
    axios.put(`${bookingsEndpoint}/${this.state.selected}`, booking, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(() => {
      this.setDialogState(constants.DIALOG_TYPE.EDIT, false);
      this.getUserBookings();
    })
    .catch(() => this.setState({error: true}));
  }

  renderDialogs = () => (
    <div>
      <BookingDialog 
      dialogType={constants.DIALOG_TYPE.ADD}
        open={this.state.isAddDialogOpen}
        onClose={() => this.setState({isAddDialogOpen: !this.state.isAddDialogOpen})}
        onSubmit={this.handleAddCompletion}/>
      <BookingDialog
        dialogType={constants.DIALOG_TYPE.EDIT}
        selectedBooking={this.getSelectedBooking()}
        open={this.state.isEditDialogOpen} 
        onClose={() => this.setState({isEditDialogOpen: !this.state.isEditDialogOpen})}
        onSubmit={this.handleEditCompletion}/>
    </div>
  );

  renderTableHead = () => (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Description</TableCell>
      <TableCell>Date</TableCell>
      <TableCell className="icon-cell">
        <div className={this.props.classes.iconContainer}>
          <IconButton
            onClick={() => this.setDialogState(constants.DIALOG_TYPE.ADD, true)}
            className={this.props.classes.addIcon}
            aria-label="Add">
            <AddIcon />
          </IconButton>
          <IconButton
            onClick={() => this.setDialogState(constants.DIALOG_TYPE.EDIT, true)}
            className={`${this.props.classes.editIcon} ${this.isNothingSelected() ? this.props.classes.hidden: ''}`}
            aria-label="Edit">
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={this.handleDeleteClick}
            className={`${this.props.classes.deleteIcon} ${this.isNothingSelected() ? this.props.classes.hidden : ''}`} 
            aria-label="Delete">
            <DeleteIcon />
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
            <TableCell>{row.description}</TableCell>
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
