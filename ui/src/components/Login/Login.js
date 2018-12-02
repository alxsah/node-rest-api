import React, { Component } from 'react';
import './Login.scss';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Component {
  state = {
    usernamePlaceholder: 'Username',
    passwordPlaceholder: 'Password',
    loginFailed: false
  };

  handleUsernameChange = () => event => {
    this.props.setUsername(event.target.value);
  }

  handlePasswordChange = () => event => {
    this.props.setPassword(event.target.value);
  }

  handleClick = (event) => {
    event.preventDefault();
    console.log('props', this.props.username, this.props.password);
    axios.post('http://localhost:3001/login', {
      username: this.props.username,
      password: this.props.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log('success', res);
      localStorage.setItem('loginToken', res.data.token);
      this.props.setLoggedIn(true);

    }).catch((err) => {
      console.log('err', err);
      this.setState({loginFailed: true});
    });
  }

  handleRegister = () => {
    this.props.setRegistering(true);
  }

    render() {
      return (
        <div className="login-container">
          <form className="field-container" onSubmit={this.handleClick}>
            <TextField 
              className="field username-field"
              placeholder={this.state.usernamePlaceholder}
              onChange={this.handleUsernameChange()}
              margin="normal"
            />
            <TextField 
              className="field password-field"
              type="password"
              placeholder={this.state.passwordPlaceholder}
              onChange={this.handlePasswordChange()}
              margin="normal"
            />
            <div className="submit-container">
              <Button
                type="submit"
                className="submit-button"
                variant="contained" 
                color="primary">
                  Log In
              </Button>
            </div>
          </form>
          <p className="register-link" onClick={this.handleRegister}>Don't have an account? Register one here.</p>
          <p className="failure-message">{this.state.loginFailed ? 'Invalid username or password.' : ''}</p>
        </div>
      );
    }
  }
  
  export default Login;
  