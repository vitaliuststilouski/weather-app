import React from 'react';

import './modal-window.scss';

export interface IModalWindowProps {
    onAddCity: (value: string) => void;
    onCloseWindow: () => void;
    showModal: boolean;
}

export const ModalWindow: React.FC<IModalWindowProps> = ({ showModal, children }) => {

    if (!showModal) return null;

    return (<div className='modal-window'>
        <form className='modal-window-wrap'>
            <h2 className='modal-window-title'>Select City</h2>
            {children}
        </form>
    </div>);
};