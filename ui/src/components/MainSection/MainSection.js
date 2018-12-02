import React, { Component } from 'react';
import MaterialTable from '../MaterialTable/MaterialTable';
import LoginContainer from '../../containers/LoginContainer';
import RegisterContainer from '../../containers/RegisterContainer';

class MainSection extends Component {
    render() {
      if (this.props.isLoggedIn && !this.props.isRegistering) {
        return <MaterialTable />
      } else if (!this.props.isRegistering){
        return <LoginContainer/>
      } else {
      return <RegisterContainer />
      }
    }
  }
  
  export default MainSection;
  