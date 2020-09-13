import React, { Component, ChangeEvent, MouseEvent } from 'react';
import { Autocomplete } from '../autocomplete/autocomplete';

import './modal-window.css';

interface IModalWindowProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onAddCity: (event: MouseEvent<HTMLButtonElement>) => void;
    onCloseWindow: () => void;
    showModal: boolean;
}


export class ModalWindow extends Component<IModalWindowProps, any> {
    render() {
        const { showModal, onAddCity, onCloseWindow, onChange } = this.props;

        if (!showModal) {
            return null
        }

        return (<div className="modal-window">
            <form className="modal-window-wrap">
                <h2 className="modal-window-title">Select City</h2>
                {/* <Autocomplete onInput={onChange} options={[
                    "Minsk",
                    "London",
                    "Moscow",
                    "Rome",
                    "Grodno"]}
                /> */}
                <button className="close-btn" onClick={onCloseWindow}>Close</button>

                {/* <div className="btn-group"> */}
                    {/* <button className="сonfirm-btn" onClick={onAddCity}> Add City</button> */}
                    {/* <button className="close-btn" onClick={onCloseWindow}>Close</button> */}
                {/* </div> */}
            </form>
        </div>)
    }
}
