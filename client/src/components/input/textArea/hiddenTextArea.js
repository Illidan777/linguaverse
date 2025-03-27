import React, {useState} from "react";
import {StyledTextArea} from "../style";
import {TransparentPrimaryButton} from "../../button/style";

const HiddenTextArea = ({
                            maxLength = 200,
                            value,
                            onChange,
                            onBlur,
                            children,
                            ...props
                        }) => {
    const [hidden, setHidden] = useState(true);

    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            onChange?.(e.target.value);
        }
    };

    const handleBlur = (e) => {
        if (e.target.value.length > 0) {
            onBlur?.(e.target.value);
            setHidden(true)
        }
    }

    const renderComponent = hidden ?
        <TransparentPrimaryButton
            onClick={() => setHidden(false)}
        >
            {children}
        </TransparentPrimaryButton> : <StyledTextArea
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            {...props}
        />

    return (
        renderComponent
    )
}

export default HiddenTextArea;