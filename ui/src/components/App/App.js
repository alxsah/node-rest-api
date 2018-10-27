import React, { Component } from 'react';
import './App.scss';
import MainSection from '../MainSection/MainSection';
import Button from '@material-ui/core/Button';

class App extends Component {
  state = {
    headerText: 'Simple Booking Tool',
    isLoggedIn: false,
  };

  componentDidMount = () => {
    if (localStorage.getItem('loginToken')) {
      this.setState({isLoggedIn: true});
    }
  }

  setLoggedInState = (isLoggedIn) => {
    this.setState({isLoggedIn: isLoggedIn});
  };

  handleLogout = () => {
    localStorage.setItem('loginToken', '');
    this.setState({isLoggedIn: false});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="header-text">
            {this.state.headerText}
          </p>
          <Button
            className={this.state.isLoggedIn ? 'logout-button' : 'logout-button hidden'}
            variant="contained" 
            color="primary"
            onClick={this.handleLogout}>
              Log Out
          </Button>
        </header>
        <MainSection isLoggedIn={this.state.isLoggedIn} handleLogin={this.setLoggedInState}/>
      </div>
    );
  }
}

export default App;
