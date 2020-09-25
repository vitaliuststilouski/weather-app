import React from 'react';

import './autocomplete.scss';

interface IAutoCompleteProps {
    value: string;
    setCity: (value: string) => void;
    options: string[];
}

export const Autocomplete: React.FC<IAutoCompleteProps> = ({ options, value, setCity }) => {
    if (!value) {
        return null;
    }

    const filteredOptions = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));

    return (
        <ul className='options'>{
            filteredOptions.map((option, index) => <li key={index} className="option" onClick={() => setCity(option)}>{option}</li>)
        }</ul>
    );
};
