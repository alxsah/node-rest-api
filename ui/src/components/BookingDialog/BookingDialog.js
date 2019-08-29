import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  errorMessage: {
    fontFamily: 'Roboto',
    color: theme.palette.secondary.main
  },
  hidden: {
    visibility: 'hidden'
  },
  dialogTitle: {
    '& h2': {
      color: theme.palette.primary.main
    }
  }
});

class BookingDialog extends Component {

  FILL_OUT_ALL_FIELDS = 'Please fill out all the fields.';
  DIALOG_TITLE = `${this.props.dialogType} a Booking`;
  BOOKING_NAME = 'Booking Name (Max 50 chars)';
  LOCATION = 'Location (Max 200 chars)';

  state = {
    showMissingFieldsError: false,
    error: false
  }

  static propTypes = {
    setDialogState: PropTypes.func,
    handleCompletion: PropTypes.func,
    dialogType: PropTypes.string,
    selectedBooking: PropTypes.object,
    open: PropTypes.bool,
    classes: PropTypes.object
  }

  static defaultProps = {
    dialogType: 'Add',
    selectedBooking: {
      name: '',
      location: '',
    }
  };

  nameInput = React.createRef();
  locationInput = React.createRef();

  handleClose = () => this.props.setDialogState(this.props.dialogType, false);

  handleChange = name => event => {
    this.setState({
      showMissingFieldsError: false,
      [name]: event.target.value,
    });
  };

  areFieldsMissing = () => 
    this.nameInput.current.value === '' 
    || this.locationInput.current.value === '';

  handleSubmit = () => {
    if (!this.areFieldsMissing()) {
      this.props.setDialogState(this.props.dialogType, false);
      this.props.handleCompletion({
        name: this.nameInput.current.value, 
        location: this.locationInput.current.value, 
        datetime: moment()
      });
    } else {
      this.setState({showMissingFieldsError: true})
    }
  }

  renderNameTextField = () => (
    <TextField
      autoFocus
      fullWidth
      className="name-field"
      style={{marginBottom: '24px'}}
      margin="normal"
      id="name"
      label={this.BOOKING_NAME}
      type="text"
      defaultValue={this.props.selectedBooking.name}
      inputRef={this.nameInput}
      inputProps={{ maxLength: 50 }}
      />
  );

  renderLocationTextField = () => (
    <TextField
      autoFocus
      multiline
      fullWidth
      rows="4"
      margin="dense"
      id="location"
      label={this.LOCATION}
      type="text"
      defaultValue={this.props.selectedBooking.location}
      inputRef={this.locationInput}
      inputProps={{ maxLength: 200 }}
      />
  );

  renderDialogContent = () => (
    <DialogContent>
      {this.renderNameTextField()}
      {this.renderLocationTextField()}
      <p className={this.state.showMissingFieldsError ? this.props.classes.errorMessage : this.props.classes.hidden}>
        {this.FILL_OUT_ALL_FIELDS}
      </p>
    </DialogContent>
  );

  renderDialogActions = () => (
    <DialogActions>
      <Button onClick={this.handleSubmit} color="primary">
        Confirm
      </Button>
      <Button onClick={this.handleClose} color="secondary">
        Cancel
      </Button>
    </DialogActions>
  );

  render() {
    return (
      <Dialog
      open={this.props.open}
      onClose={this.handleClose}
      onEnter={this.handleEnter}
      aria-labelledby="form-dialog-title">
      <DialogTitle className={this.props.classes.dialogTitle} id="form-dialog-title">{this.DIALOG_TITLE}</DialogTitle>
      {this.renderDialogContent()}
      {this.renderDialogActions()}
    </Dialog>
    );
  }
}

const BookingDialogStyled = withStyles(styles)(BookingDialog);
export default BookingDialogStyled;