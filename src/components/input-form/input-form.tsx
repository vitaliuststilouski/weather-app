import React, {ChangeEvent} from "react";

import './input-form.css'

interface  IInputFormProps {
    value: string,
    onCityChange: (event: ChangeEvent<HTMLInputElement>) => void,

}



export const InputForm: React.FC<IInputFormProps> = (props: any) => {

    return (
            <input
                placeholder="Select City"
                type="text"
                className="search-box"
                value={props.value}
                onChange={props.onCityChange}
                autoFocus
            />
        )
}