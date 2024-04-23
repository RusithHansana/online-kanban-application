import React, { useState } from 'react';

import './FormInput.scss';

const FormInput = (props) => {
    //this focused is used to identify whether the user is focusing on the input field
    //then the relevant error message will be shown only for the focused input
    const [focused, setFocused] = useState(false);

    const { label, errorMessage, id, handleChange, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    }

    return (
        <div className="form__input">
            <label>{label}</label>
            <input
                {...inputProps}
                onChange={handleChange}
                onBlur={handleFocus}
                focused={focused.toString()}
            />
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput;