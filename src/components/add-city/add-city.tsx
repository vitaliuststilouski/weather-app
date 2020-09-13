import React, { Component } from "react";
import { Autocomplete } from '../autocomplete/autocomplete';
import { InputForm } from '../input-form/input-form'

export  class AddCityForm extends Component <any, any> {
    state = {
        value: ''
    }

    setCity = (value: string) => {
        this.setState({
            value: value
        })
    }

    render() {
        console.log(this.props)
        return (
            <form >
                <InputForm name="City" value={this.state.value} onChange={this.setCity} />
                <Autocomplete value={this.state.value} onAddCity={this.props.onAddCity} />
            </form>
        )
    }
} 