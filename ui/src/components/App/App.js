import React, { Component } from 'react';
import './App.scss';
import MainSection from '../MainSection/MainSection';

class App extends Component {
  state = {
    headerText: 'Simple Booking Tool',
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            {this.state.headerText}
          </p>
        </header>
        <MainSection />
      </div>
    );
  }
}

export default App;
