import React, { useState } from "react";
import styled from "styled-components";

/**
 * Tooltip component that displays a tooltip with a given text when the user hovers over the element.
 * The tooltip is shown with configurable width and height.
 *
 * Props:
 * - text: The content of the tooltip (string).
 * - width: Optional width for the tooltip (string, default is 'unset').
 * - height: Optional height for the tooltip (string, default is 'unset').
 * - children: The element to which the tooltip is attached (React node).
 *
 * State:
 * - visible: Tracks the visibility of the tooltip (boolean).
 *
 * Example usage:
 * <Tooltip text="This is a tooltip" width="200px" height="50px">
 *     <button>Hover me</button>
 * </Tooltip>
 */
const Tooltip = ({ text, width, height, children }) => {
    const [visible, setVisible] = useState(false);

    return (
        <TooltipWrapper
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            <TooltipText visible={visible} width={width} height={height}>{text}</TooltipText>
        </TooltipWrapper>
    );
};

/**
 * Wrapper component for positioning the tooltip relative to the children element.
 */
const TooltipWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

/**
 * Styled component for the tooltip text box. It is absolutely positioned and styled to appear above the child element.
 * @param {object} props - Tooltip visibility, width, and height
 */
const TooltipText = styled.div.withConfig({
    shouldForwardProp: (prop) => !["visible", "width", "height"].includes(prop)
})`
    min-width: 20px;
    max-width: 300px;
    min-height: 20px;
    max-height: 500px;

    width: ${(props) => (props.width ? props.width : "unset")};
    height: ${(props) => (props.height ? props.height : "unset")};

    position: absolute;
    background-color: rgba(0, 0, 0, 0.75);
    color: var(--white);
    padding: 8px 12px;
    border-radius: var(--base-item-border-radius);
    font-size: 14px;
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};
    opacity: ${(props) => (props.visible ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;
    z-index: var(--z-index-tooltip);
`;

export default Tooltip;
