import React, { Component } from 'react';
import { Autocomplete } from '../autocomplete/autocomplete';

import './modal-window.css';

export class ModalWindow extends Component<any> {
    onAddCity = (e: any) => {
        e.preventDefault();
        console.log('AA')
    }

    render() {
        if (!this.props.showModal) {
            return null
        }

        return (<div className="modal-window">
                    <form className="modal-window-wrap">
                        <h2 className="modal-window-title">Select City</h2>
                        <Autocomplete         options={[
                                "Papaya",
                                "Persimmon",
                                "Paw Paw",
                                "Prickly Pear",
                                "Peach",
                                "Pomegranate",
                                "Pineapple"]}
                                />
                        <div>
                            <button className="choose-btn" onClick={() => this.onAddCity}> Add City</button>
                            <button className="close-btn" onClick={this.props.onClose}>Close</button>
                        </div>
                    </form>
                </div>)
    }
}