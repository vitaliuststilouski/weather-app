import React, { Component } from 'react';
import { WeatherList } from '../weather-list/weather-list';
import { ModalWindow } from '../modal-window/modal-window';
import { AddCityForm } from '../add-city-form/add-city-form';
import WeatherService from '../../services/weather-service/weather-service';
import { IWeatherWidget } from './iweather-widget.interface';

import "./dashboard.scss";

interface IDashboardState {
    showModal: boolean;
    cityData: IWeatherWidget[];
    userInput?: string;
};

export class Dashboard extends Component<{}, IDashboardState> {
    state = {
        showModal: false,
        cityData: []
    }

    componentDidMount() {
        const InitialWeatherWidgets = localStorage.getItem('weatherWidgets');

        const weatherWidgests: IWeatherWidget[] = InitialWeatherWidgets ? JSON.parse(InitialWeatherWidgets) : [];

        this.setState({ cityData: weatherWidgests });
    }

    onToggleModalWindow = () => {
        this.setState((prevState) => ({
            showModal: !prevState.showModal
        }));
    }

    transformTemperature = (temp: number) => {
        return Math.round(temp) > 0 ? `+${Math.round(temp)}` : `-${Math.round(temp)}`;
    }

    onAddCity = (value: string) => {
        this.onToggleModalWindow();
        const setLocalStorage = (cityItems: IWeatherWidget[]) => localStorage.setItem('weatherWidgets', JSON.stringify(cityItems));

        WeatherService.getWeather(value)
            .then(({ name, main, sys, id }) => {

                const newCity = {
                    cityName: name,
                    cityTemperature: this.transformTemperature(main.temp),
                    country: sys.country,
                    cityId: id
                };

                const cityData = [...this.state.cityData, newCity];

                setLocalStorage(cityData);

                this.setState({ cityData });
            });
    }

    onDeleteCity = (id: number) => {
        const weatherWidgets: IWeatherWidget[] = this.state.cityData
            .filter((el: IWeatherWidget) => el.cityId !== id);

        localStorage.setItem('weatherWidgets', JSON.stringify(weatherWidgets));

        this.setState({ cityData: weatherWidgets });
    }

    render() {
        const { showModal, cityData } = this.state;

        return (
            <div className='dashboard'>
                <h1 className='title'>Weather Forecast</h1>
                <div className='add-btn-wrapper'>
                    <button className='select-btn'
                        onClick={this.onToggleModalWindow}>{cityData.length > 0 ? 'Add City' : 'Select City'}</button>
                </div>
                <ModalWindow onAddCity={this.onAddCity} showModal={showModal} onCloseWindow={this.onToggleModalWindow}>
                    <AddCityForm onAddCity={this.onAddCity} onCloseWindow={this.onToggleModalWindow} />
                </ModalWindow>

                <WeatherList cityDataList={cityData} onDeleted={this.onDeleteCity} />
            </div>
        );
    }
}
