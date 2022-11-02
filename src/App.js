import './App.css';
import InputForm from'./inputForm';
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="App">
        <InputForm></InputForm>
      </div>
    );
  }
}

export default App;
