import React from 'react';
import { WeatherListItem } from "../weather-list-item/weather-list-item";
import { IWeatherWidget } from '../dashboard/iweather-widget.interface';

import "./weather-list.scss";

interface IWeatherListProps {
    cityDataList: IWeatherWidget[];
    onDeleted: (cityId: number) => void;
}

export const WeatherList: React.FC<IWeatherListProps> = ({ cityDataList, onDeleted }) =>
    <div className="cellList">
        {cityDataList.map((cityItem, i) =>
            <WeatherListItem key={i} weatherWidget={cityItem} onDeleted={onDeleted} />
        )}
    </div>;
