import React, { ChangeEvent } from 'react';

import './input-form.scss';

interface IInputFormProps {
    value: string;
    onCityChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputForm: React.FC<IInputFormProps> = ({ value, onCityChange }) => {
    return (
        <input
            placeholder='Select City'
            type='text'
            className='search-box'
            value={value}
            onChange={onCityChange}
            autoFocus
        />
    );
};
