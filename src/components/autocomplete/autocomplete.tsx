import React, { MouseEvent } from 'react';
import './autocomplete.scss';

interface IAutoCompleteProps {
    value: string;
    setCity: (value: MouseEvent<HTMLLIElement>) => void;
    options: string[];
}

export const Autocomplete: React.FC<IAutoCompleteProps> = ({ options, value, setCity }) => {
    if (!value) {
        return null;
    }

    const filtered = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
    const autoCompleteList = filtered.map((option, index) => {
        return <li className="option" onClick={(value) => setCity(value)} key={index}>{option}</li>;
    });

    return (
        <ul className='options'>{autoCompleteList}</ul>
    );
};
