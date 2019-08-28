import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MainSectionContainer from '../../containers/MainSectionContainer';
import Button from '@material-ui/core/Button';

const styles = () => ({
  app: {
    textAlign: 'center',
    color: 'black',
    background: 'linear-gradient(white, #f2f2f2)',
    height: '100vh'
  },
  appHeader: {
    width: '100vw',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '24px',
    backgroundColor: '#f2f2f2'
  },
  logoutButton: {
    marginRight: '16px',
    '& .hidden': {
      visibility: 'hidden'
    }
  },
  headerText: {
    marginLeft: '16px'
  }
});

class App extends Component {
  state = {
    headerText: 'Simple Booking Tool',
  };
  componentDidMount = () => {
    if (localStorage.getItem('loggedInFlag')) {
      this.props.setLoggedIn(true);
    }
  }

  handleLogout = () => {
    localStorage.removeItem('loggedInFlag');
    this.props.setLoggedIn(false);
  }

  render() {
    return (
      <div className={this.props.classes.app}>
        <header className={this.props.classes.appHeader}>
          <p className={this.props.classes.headerText}>
            {this.state.headerText}
          </p>
          <Button
            className={this.props.isLoggedIn ? this.props.classes.logoutButton : `${this.props.classes.logoutButton} ${this.props.classes.hidden}`}
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

const AppStyled = withStyles(styles)(App)
export default AppStyled;
