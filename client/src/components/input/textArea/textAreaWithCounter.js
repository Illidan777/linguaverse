import {FlexCol} from "../../layout/wrapper/position/style";
import {StyledTextArea} from "../style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../text";
import React from "react";
import styled from "styled-components";

const TextAreaWithCounter = ({maxLength = 200, value, onChange, placeholder, ...props}) => {
    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            onChange?.(e.target.value);
        }
    };
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

const Wrapper = styled(FlexCol)`
    width: 100%;
    gap: 10px;
`

export default TextAreaWithCounter;
