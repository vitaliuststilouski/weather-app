import React from "react";

import './autocomplete.css'

interface AutoCompleteProps {
    value: string,
    setCity: any,
    options: string[]
}

export const Autocomplete: React.FC<AutoCompleteProps> = (props) => {
    const {options, value, setCity} = props;
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