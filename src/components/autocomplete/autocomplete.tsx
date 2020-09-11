import React, {Component, Fragment} from "react";
import {APICities} from '../../services/cities-api/cities-api'


import './autocomplete.css'


interface IsAutocompleteState {
    activeOption: number,
    filteredOptions: string[],
    showOptions: boolean,
    userInput: string
};

export class Autocomplete extends Component<any> {
    state: IsAutocompleteState = {
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: ''
    };


    getInput = (e: any) => this.props.onInput(e);

    onChange = (e: any) => {
        const {options} = this.props;
        const userInput = e.currentTarget.value;

        this.getInput(e);

        const filteredOptions = options.filter(
            (optionName: any) =>
                optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeOption: 0,
            filteredOptions,
            showOptions: true,
            userInput: e.currentTarget.value
        });
    };

    onClick = (e: any) => {
        this.setState({
            activeOption: 0,
            filteredOptions: [],
            showOptions: false,
            userInput: e.currentTarget.textContent
        })
    };

    formCitiesArray = () => {
        const apiCities = new APICities();

        apiCities.getItems()
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
            console.log('13');
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
            console.log('40');

            if (activeOption === filteredOptions.length - 1) {
                return null;
            }
            this.setState({activeOption: activeOption + 1})
        }
    };


    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {activeOption, filteredOptions, showOptions, userInput}
        } = this;

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
                                <li className={clazzName ? 'option-active' : 'option'} key={optionName}
                                    onClick={onClick}>
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
                    />
                </div>
                {optionList}
            </Fragment>
        )
    }
}