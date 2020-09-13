import React, { Component, ChangeEvent, MouseEvent } from "react";
import { WeatherList } from "../weather-list/weather-list";
import { ModalWindow } from '../modal-window/modal-window';
import { AddCityForm } from '../add-city/add-city';
import WeatherService from '../../services/weather-service/weather-service';
import {IWeatherWidget} from './iweather-widget.interface' ;
import { IWeatherItem } from '../../services/weather-service/weather-service.interface'

import "./dashboard.css";


interface IDashboardState {
    showModal: boolean,
    city: string,
    cityData: IWeatherWidget[],
    userInput?: string
};

export class Dashboard extends Component<{}, IDashboardState> {
    state  = {
        showModal: false,
        city: '',
        cityData: []
    }

    componentDidMount() {
        const weatherWidgets = localStorage.getItem('weatherWidgets');

        let initialWeatherItems: any = weatherWidgets ? JSON.parse(weatherWidgets) : []; // any?
        this.setState((prevState) => ({
            ...prevState,
            cityData: initialWeatherItems
        }))

    }

    showModalWindow = () => {
        this.setState({
            city: '',
            showModal: true
        })
    }

    onCloseWindow = () => {
        this.setState({
            showModal: false
        })
    }

    onSelectCity = (e: any) => {
        this.setState({

            userInput: e.currentTarget.textContent
        })

    };

    transformTemperature = (temp: number) => {
        return Math.round(temp) > 0 ? `+${Math.round(temp)}` : `-${Math.round(temp)}`;
    }

    onAddCity = (event: MouseEvent<HTMLButtonElement>) => { // How to define type?
        event.preventDefault()
        let { city } = this.state;
        this.onCloseWindow();

        const setLocalStorage = (cityItem: IWeatherWidget[]) => {
            localStorage.setItem('weatherWidgets', JSON.stringify(cityItem))
        }

        WeatherService.getWeather(city)
            .then((body) => {
                const { cityData } = this.state;

                const newCity = {
                    cityName: body.name,
                    cityTemperature: this.transformTemperature(body.main.temp),
                    country: body.sys.country,
                    cityId: body.id
                };

                setLocalStorage([...cityData, newCity]);

                this.setState(({ cityData }) => {
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

    getInputValue(value: string) {
        console.log(value)
    }

    onChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState(({
            city: event.currentTarget.value
        }))
    }

    onDeleteCity = (id: number) => {
        const parseLocalStorage: IWeatherWidget[] = JSON.parse(localStorage.weatherWidgets);
        const deleteLocalItem = parseLocalStorage.findIndex((el) => el.cityId === id);

        localStorage.setItem('weatherWidgets', JSON.stringify([...parseLocalStorage.slice(0, deleteLocalItem), ...parseLocalStorage.slice(deleteLocalItem + 1)]));

        if (parseLocalStorage.length === 1) {
            localStorage.clear()
        }

        this.setState(({ cityData }) => {
            const cityIdx = cityData.findIndex((el) => el.cityId === id);
            const updatedCities = [...cityData.slice(0, cityIdx), ...cityData.slice(cityIdx + 1)];

            return {
                cityData: updatedCities
            };
        })
    }

    render() {
        const { showModal, cityData } = this.state;

        return (
            <div className="dashboard">
                <h1 className="title">Weather Forecast</h1>
                <div className="add-btn-wrapper">
                    <button className="add-btn"
                        onClick={(): void => this.showModalWindow()}>{cityData.length > 0 ? 'Add City' : 'Select City'}</button>
                </div>
                <ModalWindow onChange={this.onChange} onCloseWindow={this.onCloseWindow} onAddCity={this.onAddCity}
                    showModal={showModal}>
                        <AddCityForm />
                </ModalWindow>

                <WeatherList cityDataList={cityData} onDeleted={this.onDeleteCity} />
            </div>
        );
    }
}
