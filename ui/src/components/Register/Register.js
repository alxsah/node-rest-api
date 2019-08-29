import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import config from '../../config';

const endpoint = `http://${config[process.env.NODE_ENV].hostname}:${config[process.env.NODE_ENV].port}/register`;

const styles = () => ({
  registerContainer: {
    height: '75vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  usernameField: {
    margin: '16px 8px'
  },
  passwordField: {
    margin: '16px 8px'
  },
  submitContainer: {
    display: 'block'
  },
  submitButton: {
    margin: '16px 0'
  },
  successMessage: {
    color: 'green'
  },
  failureMessage: {
    color: 'red'
  },
  backLink: {
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  hidden: {
    display: 'none'
  }

});

class Register extends Component {

  REGISTRATION_SUCCESSFUL = 'Registration successful.';
  USERNAME_EXISTS = 'A user already exists with that name.';
  REGISTRATION_FAILED = 'Sorry, registration failed.';
  BACK_TO_LOGIN = 'Back to Login';

  state = {
    username: '',
    password: '',
    usernamePlaceholder: 'Enter a username',
    passwordPlaceholder: 'Enter a password',
    responseCode: 0,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    axios.post(endpoint, {
      username: this.state.username,
      password: this.state.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState({registered: true, responseCode: res.status});
    }).catch(err => {
      this.setState({registered: true, responseCode: err.response.status});
    });
  }

  handleBack = () => {
    this.props.setRegistering(false);
  }

  getSuccessMessageClass = () =>
    this.state.registered && this.state.responseCode === 200 
      ? this.props.classes.successMessage : this.props.classes.hidden;
  
  getFailureMessageClass = () =>
  this.state.registered && this.state.responseCode !== 200 
    ? this.props.classes.failureMessage : this.props.classes.hidden;
  
  render() {
    return (
      <div className={this.props.classes.registerContainer}>
        <div className={this.props.classes.fieldContainer}>
          <TextField 
            className={this.props.classes.usernameField}
            value={this.state.usernameFieldValue}
            placeholder={this.state.usernamePlaceholder}
            onChange={this.handleChange('username')}
            margin="normal"
          />
          <TextField 
            className={this.props.classes.passwordField}
            type="password"
            value={this.state.passwordFieldValue}
            placeholder={this.state.passwordPlaceholder}
            onChange={this.handleChange('password')}
            margin="normal"
          />
          <div className={this.props.classes.submitContainer}>
            <Button
              className={this.props.classes.submitButton}
              variant="contained" 
              color="primary"
              onClick={this.handleSubmit}>
                Register
            </Button>
          </div>
        </div>
        <p className={this.getSuccessMessageClass()}>{this.REGISTRATION_SUCCESSFUL}</p>
        <p className={this.getFailureMessageClass()}>
          {
            this.state.responseCode === 409 ? this.USERNAME_EXISTS : this.REGISTRATION_FAILED
          }
        </p>
        <p className={this.props.classes.backLink} onClick={this.handleBack}>{this.BACK_TO_LOGIN}</p>
      </div>
    )
  }    
}

const RegisterStyled = withStyles(styles)(Register);
export default RegisterStyled;