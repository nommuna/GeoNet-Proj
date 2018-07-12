import React, { Component } from 'react';
import Username from './Username';
import Title from './Title';
import Month from './Month';
import InfoChart from './InfoChart';
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Title/>
        <Username>
          <Month/>
          <InfoChart/>
        </Username>
      </div>
    );
  }
}


export default App;
