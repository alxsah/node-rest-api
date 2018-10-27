import React, { Component } from 'react';
import MaterialTable from '../MaterialTable/MaterialTable';
import Login from '../Login/Login';
import Register from '../Register/Register';

class MainSection extends Component {
    state = {
      register: false
    }
    componentDidMount = () => {
      if (localStorage.getItem('loginToken')) {
        this.setState({isLoggedIn: true});
      }
    }

    setLoggedInState = (isLoggedIn) => {
      this.props.handleLogin(isLoggedIn);
    };

    setRegisterState = (flag) => {
      this.setState({register: flag});
    };

    render() {
        if (this.props.isLoggedIn && !this.state.register) {
            return <MaterialTable />
        } else if (!this.state.register){
            return <Login 
              isLoggedIn={this.props.isLoggedIn} 
              handleLogin={this.setLoggedInState}
              handleRegister={this.setRegisterState}
            />
        } else {
          return <Register handleBack={this.setRegisterState}/>
        }

    }
  }
  
  export default MainSection;
  