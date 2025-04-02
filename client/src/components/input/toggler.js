/**
 * Toggler Component
 *
 * A simple switch toggle component that allows users to enable or disable a state.
 *
 * Props:
 * @param {function} onSwitch - Callback function triggered when the switch state changes
 * @param {boolean} initialPosition - Initial toggle state (default: false)
 */

import { useState } from "react";
import styled from "styled-components";

const Toggler = ({ onSwitch, initialPosition = false }) => {
    // State to manage toggle switch
    const [switched, setSwitched] = useState(initialPosition);

    /**
     * Handles toggle state changes.
     * Updates local state and triggers the onSwitch callback with the new state.
     */
    const handleToggle = () => {
        const newState = !switched;
        setSwitched(newState);
        if (onSwitch) onSwitch(newState);
    };

    return (
        <AssemblyToggleSwitch onClick={handleToggle} $switched={switched}>
            <AssemblyToggleSwitchInput
                type="checkbox"
                checked={switched}
                onChange={() => {}} // Prevents React warning about uncontrolled input
            />
            <AssemblyToggleSwitchSpan $switched={switched} />
        </AssemblyToggleSwitch>
    );
};

// Styled component for the toggle container
const AssemblyToggleSwitch = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 24px;
    cursor: pointer;
`;

// Hidden input for accessibility
const AssemblyToggleSwitchInput = styled.input`
    height: 0;
    visibility: hidden;
    width: 0;
`;

// Styled span representing the switch
const AssemblyToggleSwitchSpan = styled.span`
    width: 34px;
    height: 14px;
    border-radius: 8px;
    background-color: ${({ $switched }) => ($switched ? "var(--lavanda)" : "var(--gray)")};
    position: relative;
    transition: background-color 0.2s ease;

    &:after {
        content: "";
        position: absolute;
        top: -3px;
        left: ${({ $switched }) => ($switched ? "16px" : "0")};
        width: 20px;
        height: 20px;
        background: var(--white);
        border-radius: 50%;
        box-shadow: 0 1px 1px #00000024, 0 2px 1px #0000001f, 0 1px 3px #0003;
        transition: left 0.2s ease;
    }
`;

export default Toggler;
