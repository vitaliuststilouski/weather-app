import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface PropsApp {
  color: string;
}
class App extends Component<PropsApp> {
  render() {
    return <div>{this.props.color}</div>
  }
}

export default App;
