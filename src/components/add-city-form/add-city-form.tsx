import React, { Component, Fragment, MouseEvent, ChangeEvent } from 'react';
import { Autocomplete } from '../autocomplete/autocomplete';
import { InputForm } from '../input-form/input-form';
import APICities from '../../services/cities-api/cities-api';
import './add-city-form.scss';

interface IAddCityFormProps {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onCloseWindow: (event: MouseEvent<HTMLButtonElement>) => void;
    setCity: (event: MouseEvent<HTMLButtonElement>) => void;
    onAddCity: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface IAddCityFormState {
    value: any;
    showOptions: boolean;
    citiesList: string[];
}

export class AddCityForm extends Component<any, IAddCityFormState> { // cant' think up type
    state = {
        value: '',
        showOptions: false,
        citiesList: []
    }

    componentDidMount() {
        APICities.getCities()
            .then((body) => {
                const cityInfo = body.map((cityItem: any) => cityItem.name);
                this.setState({
                    citiesList: cityInfo
                });
            });
    }

    handleChange = (event: any) => {
        this.setState({
            value: event.target.value,
            showOptions: true
        });
    }

    setCity = (event: any) => {
        this.setState({
            value: event.target.textContent,
            showOptions: false
        });
    };

    render() {
        return (
            <Fragment>
                <InputForm onCityChange={this.handleChange} value={this.state.value} />
                <Autocomplete value={this.state.value} setCity={this.setCity} options={this.state.citiesList} />
                <div className='btn-group'>
                    <button className='add-btn' onClick={() => this.props.onAddCity(this.state.value)}>Add City</button>
                    <button className='close-btn' onClick={this.props.onCloseWindow}>Close</button>
                </div>
            </Fragment>
        );
    }
}
