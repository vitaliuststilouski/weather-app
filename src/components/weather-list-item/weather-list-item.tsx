import React from 'react';
import { IWeatherWidget } from '../dashboard/iweather-widget.interface';
import "./weather-list-item.scss";

interface IWeatherListItemProps {
    weatherWidget: IWeatherWidget;
    onDeleted: (cityId: number) => void;
}

export const WeatherListItem: React.FC<IWeatherListItemProps> = ({
    weatherWidget: { cityName, cityTemperature, country, cityId }, onDeleted }) =>
    <div key={cityId} className="cell">
        <p>{`City: ${cityName}, ${country}`}</p>
        <p>{`Current Temperature: ${cityTemperature}`}</p>
        <button onClick={() => onDeleted(cityId)}>
            <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
    </div>;
