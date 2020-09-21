import React, { Component, MouseEvent } from 'react';
import './modal-window.scss';

export interface IModalWindowProps {
    onAddCity: (event: MouseEvent<HTMLButtonElement>) => void;
    onCloseWindow: (event: MouseEvent<HTMLButtonElement>) => void;
    showModal: boolean;
}

export class ModalWindow extends Component<IModalWindowProps> {
    render() {
        const { showModal } = this.props;

        if (!showModal) return null;

        return (<div className='modal-window'>
            <form className='modal-window-wrap'>
                <h2 className='modal-window-title'>Select City</h2>
                {this.props.children}
            </form>
        </div>);
    }
}
