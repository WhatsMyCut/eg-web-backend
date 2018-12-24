import React, { Component } from 'react';
import './App.css';
import Routes from './routes/main';
class App extends Component {
  render() {
    console.log('Displaying Routes');
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;
