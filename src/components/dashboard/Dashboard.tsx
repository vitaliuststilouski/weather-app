import React, { Component } from 'react';
import Fields from '../fields/fields';
import './Dashboard.css';



class Dashboard extends Component{



  render() {
    return (
      <div className="dashboard">
        <h1>Weather Forecast</h1>
        <button>Add City</button>
        <Fields fields={16}/>
      </div>
    )
  }
}

export default Dashboard;
