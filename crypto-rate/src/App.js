import React, { Component } from 'react';
import './App.css';//renderowanie
import Crypto from './Crypto';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Crypto />
      </div>
    );
  }
}

export default App;
