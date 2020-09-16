import React, {Component, Fragment, MouseEvent, ChangeEvent} from "react";
import {Autocomplete} from '../autocomplete/autocomplete';
import {InputForm} from '../input-form/input-form';
import APICities from '../../services/cities-api/cities-api'

import './add-city-form.css'

interface IAddCityFormProps {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    setCity: (event: MouseEvent<HTMLButtonElement>) => void
}

interface IAddCityFormState {
    value: string,
    showOptions: boolean,
    citiesList: string[]
}

export class AddCityForm extends Component <any, IAddCityFormState> {
    state = {
        value: '',
        showOptions: false,
        citiesList: []
    }

    componentDidMount() {
        APICities.getCities()
            .then((body) => {
                const cityInfo = body.map((cityItem: any) => cityItem.name);
                this.setState( {
                    citiesList: cityInfo
                })
            })
    }

    debounce = (fn: any, delay: number) => {
        let timeoutID: any;
        return function (...args: any) {
            if(timeoutID) {
                clearTimeout(timeoutID)
            }

            timeoutID = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    }

    handleChange = (event: any) => {
        this.setState({
            value: event.target.value,
            showOptions: true
        })

    }

    setCity = (event: any) => {
        this.setState({
            value: event.target.textContent,
            showOptions: false
        })
    };

    render() {

        return (
            <Fragment>
                <InputForm onCityChange={this.handleChange} value={this.state.value}/>
                <Autocomplete value={this.state.value} setCity={this.setCity} options={this.state.citiesList}/>
                <div className="btn-group">
                    <button className="add-btn" onClick={() => this.props.onAddCity(this.state.value)}>Add City</button>
                    <button className="close-btn" onClick={this.props.onCloseWindow}>Close</button>
                </div>
            </Fragment>
        )
    }
} 