import React from "react";
import { WeatherListItem } from "../weather-list-item/weather-list-item";
import { IWeatherWidget } from '../dashboard/iweather-widget.interface';

import "./weather-list.css";

interface IWeatherListProps {
    cityDataList: IWeatherWidget[],
    onDeleted: (cityId: number) => void;
}

export const WeatherList: React.FC<IWeatherListProps> = ({cityDataList, onDeleted}) => {
    const cityElements = cityDataList.map((cityItem, i) =>
        <WeatherListItem key={i} weatherWidget={cityItem} onDeleted={onDeleted} />
    );

    return (
        <div className="cellList">
            {cityElements}
        </div>
    )
}