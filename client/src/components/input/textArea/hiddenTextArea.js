/**
 * HiddenTextArea Component
 *
 * This component renders a hidden text area that can be revealed by clicking a button.
 * Once revealed, it allows text input and hides again when blurred.
 *
 * Props:
 * @param {number} maxLength - Maximum allowed characters (default: 200)
 * @param {string} value - The current value of the textarea
 * @param {function} onChange - Callback function triggered when the value changes
 * @param {function} onBlur - Callback function triggered when the textarea loses focus
 * @param {ReactNode} children - The content inside the button when the textarea is hidden
 * @param {object} props - Additional props passed to the textarea
 */

import React, { useState } from "react";

// Styling Components
import { StyledTextArea } from "../style";
import { TransparentPrimaryButton } from "../../button/style";

const HiddenTextArea = ({ maxLength = 200, value, onChange, onBlur, children, ...props }) => {
    // State to toggle visibility of the textarea
    const [hidden, setHidden] = useState(true);

    /**
     * Handles input changes.
     * Ensures the value does not exceed the maximum length before triggering onChange.
     *
     * @param {Object} e - Event object
     */
    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            onChange?.(e.target.value);
        }
    };

    /**
     * Handles blur event.
     * If input has a value, it triggers onBlur and hides the textarea.
     *
     * @param {Object} e - Event object
     */
    const handleBlur = (e) => {
        if (e.target.value.length > 0) {
            onBlur?.(e.target.value);
            setHidden(true);
        }
    };

    return hidden ? (
        <TransparentPrimaryButton onClick={() => setHidden(false)}>
            {children}
        </TransparentPrimaryButton>
    ) : (
        <StyledTextArea value={value} onChange={handleChange} onBlur={handleBlur} {...props} />
    );
};

export default HiddenTextArea;
