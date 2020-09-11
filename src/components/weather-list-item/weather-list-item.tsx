import React, {Component} from "react";
import "./weather-list-item.css";

export class WeatherListItem extends Component<any, any> {
    render() {
        const {cityName, cityTemperature, country, cityId} = this.props;

        return (
            <div key={cityId} className="cell">
                <p>{`City: ${cityName}, ${country}`}</p>
                <p>{`Current Temperature: ${cityTemperature}`}</p>
                <button onClick={() => this.props.onDeleted(cityId)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>)
    }
};
