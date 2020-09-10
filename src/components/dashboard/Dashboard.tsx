import React, {Component} from "react";
import {WeatherList} from "../weather-list/weather-list";
import {ModalWindow} from '../modal-window/modal-window';
import {WeatherService} from '../../services/weather-service/weather-searvice';

import "./dashboard.css";

interface IState {
    showModal: boolean,
    city: string,
    cityData: any,
};

export class Dashboard extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onCloseWindow = this.onCloseWindow.bind(this);
        this.onAddCity = this.onAddCity.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    maxId = 0;

    state: IState = {
        showModal: false,
        city: '',
        cityData: []
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
        this.setState((prevState: any) => {
            console.log(prevState)
            return {showModal: !prevState}
        })

        const weather = new WeatherService();
        const {city}: {city: string} = this.state;

        weather.getCity(city)
            .then((body) => {
                const newCity = {
                    cityName: body.name,
                    cityTemperature: body.main.temp,
                    cityId: this.maxId++
                };

                this.setState(({cityData}: { cityData: any }) => {
                    const newCityList = [
                        ...cityData,
                        newCity
                    ];

                    return {
                        cityData: newCityList
                    }

                })
            })
    }

    onChange = (e: any) => {
        this.setState(({
            city: e.currentTarget.value
        }))
    }

    onDeleteCity = (id: number) => {
        this.setState(({cityData}: { cityData: any }) => {
            const cityIdx = cityData.findIndex((el: any) => el.cityId === id);
            const updatedCities = [...cityData.slice(0, cityIdx), ...cityData.slice(cityIdx + 1)];

            return {
                cityData: updatedCities
            };
        })
    }

    render() {
        const {city, showModal,  cityData} = this.state;
        return (
            <div className="dashboard">
                <h1 className="title">Weather Forecast</h1>
                <div className="add-btn-wrapper">
                    <button className="add-btn" onClick={(): void => this.showModalWindow()}>{cityData.length > 0 ? 'Add City' : 'Select City'}</button>
                </div>
                <ModalWindow onChange={this.onChange} onClose={this.onCloseWindow} onAddCity={this.onAddCity}
                             showModal={showModal}/>
                {city ? <WeatherList cityDataList={cityData} onDeleted={this.onDeleteCity}/> : null}
            </div>
        );
    }
}
