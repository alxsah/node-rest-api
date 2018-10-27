import React, { Component } from 'react';
import './AddBookingDialog.scss';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddBookingDialog extends Component {

  state = {
    name: '',
    datetime: new Date().toISOString().slice(0,-8),
    location: '',
    missingFields: false,
    error: false
  }

  handleClose = () => {
    this.props.setDialogState(false);
  };

  handleChange = name => event => {
    this.setState({
      missingFields: false,
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    console.log('handleSubmit', this.state.name, this.state.location, this.state.datetime);
    if (!this.state.name || !this.state.datetime || !this.state.location) {
      this.setState({missingFields: true});
    } else {
      axios.post('http://localhost:3001/bookings', {
        name: this.state.name,
        location: this.state.location,
        datetime: this.state.datetime,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.userToken}`
        }
      })
      .then((res) => {
        console.log(res);
        this.props.setDialogState(false);
        this.props.handleAddCompletion();
      }).catch((err) => {
        console.log(err);
        this.setState({error: true});
      });
    }
  }

  render() {
    return (
      <Dialog
      open={this.props.open}
      onClose={this.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add a Booking</DialogTitle>
      <DialogContent>
        <DialogContentText>

        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Booking Name"
          type="text"
          onChange={this.handleChange('name')}
          fullWidth
        />
        <TextField
          margin="dense"
          id="datetime"
          label="Date"
          type="datetime-local"
          value={this.state.datetime}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleChange('datetime')}
          fullWidth
        />
        <TextField
          margin="dense"
          id="location"
          label="Location"
          type="text"
          onChange={this.handleChange('location')}
          fullWidth
        />
        <p className={this.state.missingFields ? 'error-message' : 'hidden'}>Please fill out all the fields.</p>
        <p className={this.state.error ? 'error-message' : 'hidden'}>There was an error adding your booking.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleSubmit} color="primary">
          Add
        </Button>
        <Button onClick={this.handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
    );
  }
}

export default AddBookingDialog;