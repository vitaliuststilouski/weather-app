import React, { Component } from "react";
import { Fields } from "../fields/fields";
import { ModalWindow } from '../modal-window/modal-window';
import { WeatherService } from '../../services/weather-service/weather-searvice';

import "./dashboard.css";

export class Dashboard extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.onCloseWindow = this.onCloseWindow.bind(this);
    this.onAddCity = this.onAddCity.bind(this);
  }

  state = {
      showModal: false,
      cityName: ''
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

  onAddCity = (e: any) => {
    e.preventDefault();
    this.setState((prevState: boolean) => {
      return { showModal: !prevState}
    })

    const weather = new WeatherService();
    const { cityName } = this.state;
    weather.getCity(cityName).then((body) => {
      console.log(body)
    })
  }

  onChange = (e: any) => {
    console.log(e.currentTarget.value);
    // this.setState(({
    //   cityName: e.currentTarget.value
    // }))
  }

  render() {
    return (
      <div className="dashboard">
        <h1 className="title">Weather Forecast</h1>
        <div className="add-btn-wrapper">
          <button className="add-btn" onClick = {():void => this.showModalWindow()}>Select City</button>
        </div>
        <ModalWindow onChange={(e: any) => this.onChange}   onClose={this.onCloseWindow} onAddCity={this.onAddCity} showModal={this.state.showModal}/>
        {/* <Fields /> */}
      </div>
    );
  }
}
