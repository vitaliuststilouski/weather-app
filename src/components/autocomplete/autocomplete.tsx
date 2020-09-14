import React, {Component} from "react";

import './autocomplete.css'

interface AutoCompleteProps {
    value: string,
    setCity: any
    options: any[]
}

export class Autocomplete extends Component<AutoCompleteProps> {
    render() {
        const {options, value, setCity} = this.props;
        if (!value) {
            return null
        }

        const filtered = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
        const autoCompleteList = filtered.map((option, index) => {
            return <li onClick={setCity} key={index}>{option}</li>
        })

        return (
            <ul className="options">{autoCompleteList}</ul>
        )
    }
}