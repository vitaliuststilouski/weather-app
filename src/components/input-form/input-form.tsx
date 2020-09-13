import React, { Component, ChangeEvent, MouseEvent } from "react";

export const InputForm = () => {
    return (
            <input
                name="CityName"
                placeholder="Select City"
                type="text"
                className="search-box"
                // onChange={onChange}
                // onKeyDown={onKeyDown}
                // value={userInput}
                autoFocus
            />
    )
}