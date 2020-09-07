import React, { Component } from 'react';

import './modal-window.css';

export class ModalWindow extends Component<any> {
    render() {
        if (!this.props.showModal) {
            return null
        }

        return (<div className="modal-window">
                    <div className="modal-window-wrap">
                        <h2 className="modal-window-title">Modal Window</h2>
                        <p className="content">
                            Lorem ipsum dolor sit amet, consectetur 
                        </p>
                        <div>
                            <button className="close-btn" onClick={this.props.onClose}>Close</button>
                        </div>
                    </div>
                </div>)
    }
}