import React, {Component, Fragment} from "react";
import {WeatherListItem} from "../weather-list-item/weather-list-item";
import "./weather-list.css";

export class WeatherList extends Component<any, any> {
    render() {
        const {cityDataList} = this.props;
        const cityElements = cityDataList.map((el: any, i: number): JSX.Element => {
            const {...cityProps} = el;
            return (
                <Fragment key={i}>
                    <WeatherListItem {...cityProps} onDeleted={this.props.onDeleted}/>
                </Fragment>
            )
        });

        return (
            <div className="cellList">
                {cityElements}
            </div>
        )
    }
};