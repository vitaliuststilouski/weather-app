import React, {Component} from "react";
import {WeatherList} from "../weather-list/weather-list";
import {ModalWindow} from '../modal-window/modal-window';
import {WeatherService} from '../../services/weather-service/weather-service';

import "./dashboard.css";

interface IState {
    showModal: boolean,
    city: string,
    cityData: any,
};

export class Dashboard extends Component<any, any> {
    state: IState = {
        showModal: false,
        city: '',
        cityData: []
    }

    componentDidMount() {
        const weatherWidgets = localStorage.getItem('weatherWidgets');

        let initialWeatherItems: any = weatherWidgets ?  JSON.parse(weatherWidgets) : [];
        this.setState((prevState: any) => ({
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
            showModal: !this.state.showModal
        })
    }

    tranformTemperature = (temp: number) => {
        return Math.round(temp) > 0 ? `+${Math.round(temp)}`: `-${Math.round(temp)}`;
    }

    onAddCity = (e: any) => {
        e.preventDefault();
        this.setState((prevState: any) => {
            return {showModal: !prevState}
        })

        const weather = new WeatherService();
        let {city} = this.state;

        const setLocalStorage = (cityItem: any) =>  {
            localStorage.setItem('weatherWidgets', JSON.stringify(cityItem))
        }

        weather.getCity(city)
            .then((body) => {
                const {cityData} = this.state;

                const newCity = {
                    cityName: body.name,
                    cityTemperature: this.tranformTemperature(body.main.temp),
                    country: body.sys.country,
                    cityId: body.id
                };

                setLocalStorage([...cityData, newCity]);

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
        const {showModal, cityData} = this.state;

        return (
            <div className="dashboard">
                <h1 className="title">Weather Forecast</h1>
                <div className="add-btn-wrapper">
                    <button className="add-btn"
                            onClick={(): void => this.showModalWindow()}>{cityData.length > 0 ? 'Add City' : 'Select City'}</button>
                </div>
                <ModalWindow onChange={this.onChange} onClose={this.onCloseWindow} onAddCity={this.onAddCity}
                             showModal={showModal}/>
                <WeatherList cityDataList={cityData} onDeleted={this.onDeleteCity}/>
            </div>
        );
    }
}
