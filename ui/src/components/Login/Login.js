import React, { Component } from 'react';
import './Login.scss';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Component {
  state = {
    username: '',
    password: '',
    usernamePlaceholder: 'Username',
    passwordPlaceholder: 'Password',
    loginFailed: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick = () => {
    axios.post('http://localhost:3001/login', {
      username: this.state.username,
      password: this.state.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res, this.props.handleLogin);
      localStorage.setItem('loginToken', res.data.token);
      this.props.handleLogin(true);

    }).catch((err) => {
      this.setState({loginFailed: true});
    });
  }

  handleRegister = () => {
    this.props.handleRegister(true);
  }

    render() {
      return (
        <div className="login-container">
          <form className="field-container" onSubmit={this.handleClick}>
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
  