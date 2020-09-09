import React, {Component} from "react";

import "./fields.css";

export class Fields extends Component<any,any>{


    render() {
        const { cityDataList } = this.props;

        return cityDataList.map((el: any, i: number) => {

            return (
                <div key={i} className="cell">
                    <p>{`City ${el.cityName}`}</p>
                    <p>{`Current Temperature ${el.cityTemperature}`}</p>
                    <button onClick={() => this.props.onDeleted(el.cityId)}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>)
        })
    }
};
