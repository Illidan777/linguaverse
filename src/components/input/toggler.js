import { useState } from "react";
import styled from "styled-components";

const Toggler = ({ onSwitch }) => {
    const [switched, setSwitched] = useState(false);

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
                onChange={() => {}} // Чтоб React не ругался
            />
            <AssemblyToggleSwitchSpan $switched={switched} />
        </AssemblyToggleSwitch>
    );
};

const AssemblyToggleSwitch = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 24px;
    cursor: pointer;
`;

const AssemblyToggleSwitchInput = styled.input`
    height: 0;
    visibility: hidden;
    width: 0;
`;

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
