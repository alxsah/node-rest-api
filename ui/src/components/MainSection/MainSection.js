import React, { Component } from 'react';
import MaterialTable from '../MaterialTable/MaterialTable';
import Login from '../Login/Login';

class MainSection extends Component {
    state = {
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

    render() {
        if (this.state.isLoggedIn) {
            return <MaterialTable />
        } else {
            return <Login isLoggedIn={this.state.isLoggedIn} handleLogin={this.setLoggedInState}/>
        }

    }
  }
  
  export default MainSection;
  