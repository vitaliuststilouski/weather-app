import React, { Component } from "react";
import { Fields } from "../fields/fields";
import { AddButton } from '../add-button/add-button';
import { ModalWindow } from '../modal-window/modal-window';
import "./dashboard.css";



export class Dashboard extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.onCloseWindow = this.onCloseWindow.bind(this);
  }

  state = {
      showModal: false,
  }


  showModalWindow() {
    this.setState({
      showModal: true
    })
  }

  onCloseWindow() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {
    return (
      <div className="dashboard">
        <h1 className="title">Weather Forecast</h1>
        {/* <AddButton /> */}
        <button onClick = {():void => this.showModalWindow()}>Add City</button>

        <ModalWindow onClose={this.onCloseWindow} showModal={this.state.showModal}/>
        <div className="fields">
        {/* <Fields /> */}
        </div>
      </div>
    );
  }
}
