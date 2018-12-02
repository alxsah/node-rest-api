import React, { Component } from 'react';
import './Register.scss';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Register extends Component {
  state = {
    username: '',
    password: '',
    usernamePlaceholder: 'Enter a username',
    passwordPlaceholder: 'Enter a password',
    failed: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    axios.post('http://localhost:3001/register', {
      username: this.state.username,
      password: this.state.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      this.setState({registered: true, failed: false});
    }).catch((err) => {
      this.setState({registered: true, failed: true});
    });
  }

  handleBack = () => {
    this.props.setRegistering(false);
  }

  render() {
    return (
      <div className="register-container">
        <div className="field-container">
          <TextField 
            className="field username-field"
            value={this.state.usernameFieldValue}
            placeholder={this.state.usernamePlaceholder}
            onChange={this.handleChange('username')}
            margin="normal"
          />
          <TextField 
            className="field password-field"
            type="password"
            value={this.state.passwordFieldValue}
            placeholder={this.state.passwordPlaceholder}
            onChange={this.handleChange('password')}
            margin="normal"
          />
          <div className="submit-container">
            <Button
              className="submit-button"
              variant="contained" 
              color="primary"
              onClick={this.handleSubmit}>
                Register
            </Button>
          </div>
        </div>
        <p className={this.state.registered && !this.state.failed ? 'success-message' : 'hidden'}>Registration successful.</p>
        <p className={this.state.registered && this.state.failed ? 'failure-message' : 'hidden'}>Sorry, registration failed.</p>
        <p className="back-link" onClick={this.handleBack}>Back to Login</p>
      </div>
    )
  }    
}

export default Register;