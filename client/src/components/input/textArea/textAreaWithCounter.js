/**
 * TextAreaWithCounter Component
 *
 * This component renders a textarea with a character counter. The counter displays
 * the number of characters entered relative to the maximum allowed.
 *
 * Props:
 * @param {number} maxLength - Maximum allowed characters (default: 200)
 * @param {string} value - The current value of the textarea
 * @param {function} onChange - Callback function triggered when the value changes
 * @param {string} placeholder - Placeholder text for the textarea
 * @param {object} props - Additional props passed to the textarea
 */

import React from "react";
import styled from "styled-components";

// Layout & Styling
import { FlexCol } from "../../layout/wrapper/position/style";
import { StyledTextArea } from "../style";
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../../text";

const TextAreaWithCounter = ({ maxLength = 200, value, onChange, placeholder, ...props }) => {
    /**
     * Handles change in textarea input.
     * Ensures the value does not exceed the maximum length before triggering onChange.
     *
     * @param {Object} e - Event object
     */
    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            onChange?.(e.target.value);
        }
    };

    // Display counter only if value is not empty
    const counter = value.length > 0 ? `(${value.length} / ${maxLength})` : null;

    return (
        <Wrapper>
            <StyledTextArea
                className="p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={handleChange}
                {...props}
            />
            <StyledText
                as="span"
                size={FONT_SIZES.SIMPLE_SMALL}
                weight={FONT_WEIGHTS.REGULAR}
            >
                {placeholder} {counter}
            </StyledText>
        </Wrapper>
    );
};

// Styled component for layout
const Wrapper = styled(FlexCol)`
    width: 100%;
    gap: 10px;
`;

export default TextAreaWithCounter;
