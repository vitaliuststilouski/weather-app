import React, { Component } from "react";
import { Fields } from "../fields/fields";
import { ModalWindow } from '../modal-window/modal-window';
import { WeatherService } from '../../services/weather-service/weather-searvice';
import "./dashboard.css";


export class Dashboard extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.onCloseWindow = this.onCloseWindow.bind(this);
  }

  state = {
      showModal: false,
  }

  showModalWindow() {
    this.setState({
      showModal: true
    })
  }

  onCloseWindow() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  

  render() {
    const weather = new WeatherService();

    weather.getCheck().then((body) => {
        console.log(body)
    })
    return (
      <div className="dashboard">
        <h1 className="title">Weather Forecast</h1>
        <div className="add-btn-wrapper">
          <button className="add-btn" onClick = {():void => this.showModalWindow()}>Select City</button>
        </div>
        <ModalWindow onClose={this.onCloseWindow} showModal={this.state.showModal}/>
        {/* <Fields /> */}
      </div>
    );
  }
}
