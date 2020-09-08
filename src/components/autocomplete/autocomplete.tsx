import React, { Component, Fragment } from "react";

import './autocomplete.css'

type State = {
    activeOption: number,
    filteredOptions: any,
    showOptions: boolean,
    userInput: string
};

export class Autocomplete extends Component<any>{

    state: State = {
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: ''
    };

    onChange = (e: any) => {
        const { options } = this.props;
        const userInput = e.currentTarget.value;

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

    onKeyDown = (e: any) => {
        const { activeOption, filteredOptions } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeOption: 0,
                showOptions: false,
                userInput: filteredOptions[activeOption]
            });
        } else if (e.keyCode === 38) {
            if (activeOption === 0 ) {
                return null;
            }
            this.setState({activeOption: activeOption - 1});
        } else if (e.keyCode === 40) {
            if (activeOption === filteredOptions.length - 1) {
                return null;
            }
            this.setState({ activeOption: activeOption + 1 })
        }
    };


    render() {

        const {
            onChange,
            onClick,
            onKeyDown,
            state: { activeOption, filteredOptions, showOptions, userInput } 
        } = this;

        let optionList;

        if (showOptions && userInput) {
            if(filteredOptions.length) {
                optionList = (
                    <ul className="options"> 
                    { filteredOptions.map((optionName: string, index: number) => {
                        let clazzName;
                        if ( index === activeOption ) {
                            clazzName = 'option-active'
                        }
                        return (
                            <li className = {clazzName ? 'option-active' : 'option'} key={optionName} onClick={onClick}>
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
                     <input placeholder= "Select City"
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