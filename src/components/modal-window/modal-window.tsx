import React, { Component } from 'react';
import './modal-window.scss';

export interface IModalWindowProps {
    onAddCity: (value: string) => void;
    onCloseWindow: () => void;
    showModal: boolean;
}

// TODO: REACT.FC
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
