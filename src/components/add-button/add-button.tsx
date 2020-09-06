import React, { Component } from 'react';

import './add-button.css';

export class AddButton extends Component {
    render() {
        return (
            <div className="btn-add-wrapper">
                <button className="btn-add" onClick={() => console.log("Modal icon")}>Add City</button>
            </div>
        )
    }
}




