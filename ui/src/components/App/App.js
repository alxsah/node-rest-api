import React, { Component } from 'react';
import './App.scss';
import MainSectionContainer from '../../containers/MainSectionContainer';
import Button from '@material-ui/core/Button';

class App extends Component {
  state = {
    headerText: 'Simple Booking Tool',
  };

  componentDidMount = () => {
    if (localStorage.getItem('loginToken')) {
      this.props.setLoggedIn(true);
    }
  }

  handleLogout = () => {
    localStorage.removeItem('loginToken');
    this.props.setLoggedIn(false);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="header-text">
            {this.state.headerText}
          </p>
          <Button
            className={this.props.isLoggedIn ? 'logout-button' : 'logout-button hidden'}
            variant="contained" 
            color="primary"
            onClick={this.handleLogout}>
              Log Out
          </Button>
        </header>
        <MainSectionContainer />
      </div>
    );
  }
}

export default App;
