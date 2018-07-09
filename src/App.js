import React, { Component } from 'react';
import Username from './Username';
import Title from './Title';
import Month from './Month';
import logo from './logo.svg';
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Title/>
        <Username/>
        <Month/>
      </div>
    );
  }
}


export default App;
