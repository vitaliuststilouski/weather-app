import React, { Component } from 'react';

import './modal-window.css';

export class ModalWindow extends Component<any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    // state = {
    //     closeModal: true
    // }

    onClose = (e: any) => {
        // this.props.showModal = false;
        this.props.onClose && this.props.onClose(e);
      };

    render() {
        if (!this.props.showModal) {
            return null
        }

        return (<div>
                    <h2>Modal Window</h2>
                    <div>{this.props.children}</div>
                    <div>
                        <button onClick={this.props.onClose}>Close</button>
                    </div>
                </div>)
    }
}