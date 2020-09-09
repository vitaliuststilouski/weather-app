import React, {Component} from "react";
import {Fields} from "../fields/fields";
import {ModalWindow} from '../modal-window/modal-window';
import {WeatherService} from '../../services/weather-service/weather-searvice';

import "./dashboard.css";

export class Dashboard extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onCloseWindow = this.onCloseWindow.bind(this);
        this.onAddCity = this.onAddCity.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    maxId = 0;

    state = {
        showModal: false,
        cityName: '',
        cityTemperature: '',
        cityId: 0,
        // cityData: [
        //     {cityName: '', cityTemperature: '', cityId: 0}
        // ]
        cityData: [
            {cityName: 'Minsk', cityTemperature: 12, cityId: 1},
            {cityName: 'Moscow', cityTemperature: 15, cityId: 2},
            {cityName: 'Rome', cityTemperature: 10, cityId: 3},
            {cityName: 'Rome', cityTemperature: 4, cityId: 4}
        ]
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
            return {showModal: !prevState}
        })

        const weather = new WeatherService();
        const {cityName} = this.state;
        weather.getCity(this.state.cityName)
            .then((body) => {
                this.setState({
                    cityTemperature: body.main.temp,
                    cityId: ++this.maxId
                })
            })
    }

    onChange = (e: any) => {
        this.setState(({
            cityName: e.currentTarget.value
        }))
    }

    onDeleteCity = (id: number) => {
        this.setState(({ cityData }: {cityData: any}) => {
            const cityIdx = cityData.findIndex((el: any) => el.cityId === id);
            const updatedCities = [...cityData.slice(0, cityIdx), ...cityData.slice(cityIdx + 1)];

            return {
                cityData: updatedCities
            };
        })
    }

    render() {
        const { cityName, cityTemperature} = this.state.cityData[0];
        return (
            <div className="dashboard">
                <h1 className="title">Weather Forecast</h1>
                <div className="add-btn-wrapper">
                    <button className="add-btn" onClick={(): void => this.showModalWindow()}>Select City</button>
                </div>
                <ModalWindow onChange={this.onChange} onClose={this.onCloseWindow} onAddCity={this.onAddCity}
                             showModal={this.state.showModal}/>
                {cityName ? <Fields city={cityName} cityTemperature={cityTemperature} cityDataList={this.state.cityData} onDeleted = {this.onDeleteCity}/> : null}
            </div>
        );
    }
}
