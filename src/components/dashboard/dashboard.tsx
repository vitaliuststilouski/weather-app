import React, { Component } from 'react';
import { WeatherList } from '../weather-list/weather-list';
import { ModalWindow } from '../modal-window/modal-window';
import { AddCityForm } from '../add-city-form/add-city-form';
import WeatherService from '../../services/weather-service/weather-service';
import { IWeatherWidget } from './iweather-widget.interface';
import "./dashboard.scss";

interface IDashboardState {
    showModal: boolean;
    city: string;
    cityData: IWeatherWidget[];
    userInput?: string;
};

export class Dashboard extends Component<{}, IDashboardState> {
    state = {
        showModal: false,
        city: '',
        cityData: []
    }

    componentDidMount() {
        const weatherWidgets = localStorage.getItem('weatherWidgets');
        const initialWeatherItems: any = weatherWidgets ? JSON.parse(weatherWidgets) : []; // any?
        this.setState((prevState) => ({
            ...prevState,
            cityData: initialWeatherItems
        }));
    }

    showModalWindow = () => {
        this.setState({
            city: '',
            showModal: true
        });
    }

    onCloseWindow = () => {
        this.setState({
            showModal: false
        });
    }

    transformTemperature = (temp: number) => {
        return Math.round(temp) > 0 ? `+${Math.round(temp)}` : `-${Math.round(temp)}`;
    }


    onAddCity = (value: any) => {
        this.onCloseWindow();
        const setLocalStorage = (cityItem: IWeatherWidget[]) => localStorage.setItem('weatherWidgets', JSON.stringify(cityItem));

        WeatherService.getWeather(value)
            .then(({ name, main, sys, id }) => {
                const { cityData } = this.state;

                const newCity = {
                    cityName: name,
                    cityTemperature: this.transformTemperature(main.temp),
                    country: sys.country,
                    cityId: id
                };

                setLocalStorage([...cityData, newCity]);

                this.setState(({ cityData }) => {
                    const newCityList = [
                        ...cityData,
                        newCity
                    ];

                    return {
                        cityData: newCityList
                    };
                });
            });
    }

    onDeleteCity = (id: number) => {
        const parseLocalStorage: IWeatherWidget[] = JSON.parse(localStorage.weatherWidgets);
        const deleteLocalItem = parseLocalStorage.findIndex((el) => el.cityId === id);

        localStorage.setItem('weatherWidgets', JSON.stringify([...parseLocalStorage.slice(0, deleteLocalItem), ...parseLocalStorage.slice(deleteLocalItem + 1)]));

        if (parseLocalStorage.length === 1) {
            localStorage.clear();
        }

        this.setState(({ cityData }) => {
            const cityIdx = cityData.findIndex((el) => el.cityId === id);
            const updatedCities = [...cityData.slice(0, cityIdx), ...cityData.slice(cityIdx + 1)];

            return {
                cityData: updatedCities
            };
        });
    }

    render() {
        const { showModal, cityData } = this.state;

        return (
            <div className='dashboard'>
                <h1 className='title'>Weather Forecast</h1>
                <div className='add-btn-wrapper'>
                    <button className='select-btn'
                        onClick={this.showModalWindow}>{cityData.length > 0 ? 'Add City' : 'Select City'}</button>
                </div>
                <ModalWindow onAddCity={this.onAddCity} showModal={showModal} onCloseWindow={this.onCloseWindow}>
                    <AddCityForm onAddCity={this.onAddCity} onCloseWindow={this.onCloseWindow} />
                </ModalWindow>

                <WeatherList cityDataList={cityData} onDeleted={this.onDeleteCity} />
            </div>
        );
    }
}
