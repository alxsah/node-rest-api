import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import config from '../../config.json';

const endpoint = `http://${config[process.env.NODE_ENV].hostname}:${config[process.env.NODE_ENV].port}/login`;

const styles = () => ({
  loginContainer: {
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
  failureMessage: {
    color: 'red'
  },
  registerLink: {
    marginTop: '16px',
    fontSize: '14px',
    color: 'black',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
});

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
    axios.post(endpoint, {
      username: this.props.username,
      password: this.props.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log('success');
      localStorage.setItem('loginToken', res.data.token);
      this.props.setLoggedIn(true);

    }).catch(err => {
      console.log('err', err);
      this.setState({loginFailed: true});
    });
  }

  handleRegister = () => {
    this.props.setRegistering(true);
  }

    render() {
      return (
        <div className={this.props.classes.loginContainer}>
          <form className={this.props.classes.fieldContainer} onSubmit={this.handleClick}>
            <TextField 
              className={this.props.classes.usernameField}
              placeholder={this.state.usernamePlaceholder}
              onChange={this.handleUsernameChange()}
              margin="normal"
            />
            <TextField 
              className={this.props.classes.passwordField}
              type="password"
              placeholder={this.state.passwordPlaceholder}
              onChange={this.handlePasswordChange()}
              margin="normal"
            />
            <div className={this.props.classes.submitContainer}>
              <Button
                type="submit"
                className={this.props.classes.submitButton}
                variant="contained" 
                color="primary">
                  Log In
              </Button>
            </div>
          </form>
          <p className={this.props.classes.registerLink} onClick={this.handleRegister}>Don't have an account? Register one here.</p>
          <p className={this.props.classes.failureMessage}>{this.state.loginFailed ? 'Invalid username or password.' : ''}</p>
        </div>
      );
    }
  }
  const LoginStyled = withStyles(styles)(Login)
  export default LoginStyled;
  