import React, {Component, Fragment, ChangeEvent, MouseEvent} from "react";
import {APICities} from '../../services/cities-api/cities-api'


import './autocomplete.css'


interface IAutocompleteState {
    activeOption: number,
    filteredOptions: string[],
    showOptions: boolean,
    userInput: string | null
};

export class Autocomplete extends Component<any, IAutocompleteState> {
    
    state = {
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: ''
    };


    getInput = (event: ChangeEvent<HTMLInputElement>) => this.props.onInput(event);

    onChange = (event: ChangeEvent<HTMLInputElement>) => {

        const {options} = this.props;
        const userInput = event.currentTarget.value;

        this.getInput(event);

        const filteredOptions = options.filter(
            (optionName: string) =>
                optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeOption: 0,
            filteredOptions,
            showOptions: true,
            userInput: event.currentTarget.value
        });
    };

    onSelectCity = (e: MouseEvent<HTMLLIElement>) => {
        this.setState({
            activeOption: 0,
            filteredOptions: [],
            showOptions: false,
            userInput: e.currentTarget.textContent
        })


    };

    formCitiesArray = () => {
        const apiCities = new APICities();

        apiCities.getCities()
            .then((body) => {
                body.map((el: any) => console.log(el.name, el.country ))
            })
    }

    Debounce = (fn: any, delay: any) => {
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

    onKeyDown = (e: any) => {
        const {activeOption, filteredOptions} = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeOption: 0,
                showOptions: false,
                userInput: filteredOptions[activeOption]
            });
        } else if (e.keyCode === 38) {
            console.log('38');

            if (activeOption === 0) {
                return null;
            }
            this.setState({activeOption: activeOption - 1});
        } else if (e.keyCode === 40) {

            if (activeOption === filteredOptions.length - 1) {
                return null;
            }
            this.setState({activeOption: activeOption + 1})
        }
    };

    onPassValue = () => {
        console.log(this.state.userInput)
    }


    render() {
        const {onChange, onSelectCity, onKeyDown } = this;
        const  {activeOption, filteredOptions, showOptions, userInput} = this.state;

        let optionList;

        if (showOptions && userInput) {
            if (filteredOptions.length) {
                optionList = (
                    <ul className="options">
                        {filteredOptions.map((optionName: string, index: number) => {
                            let clazzName;
                            if (index === activeOption) {
                                clazzName = 'option-active'
                            }
                            return (
                                <li className={clazzName ? 'option-active' : 'option'} key={index}
                                    onClick={onSelectCity}>
                                    {optionName}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                optionList = (
                    <div className="no-options">
                        <em>No City</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <div className="search">
                    <input
                        placeholder="Select City"
                        type="text"
                        className="search-box"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={userInput}
                        autoFocus
                    />
                </div>
                {optionList}
            </Fragment>
        )
    }
}