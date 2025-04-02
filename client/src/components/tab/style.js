import styled, {css} from "styled-components";

/**
 * Assembly Tabs Component
 * A styled unordered list for tab navigation.
 */
export const AssemblyTabs = styled.ul`
    display: flex;
`;

/**
 * Assembly Tab Component
 * Represents a single tab with a hover and selection effect.
 * @param {boolean} selected - Indicates if the tab is currently selected.
 */
export const AssemblyTab = styled.li`
    display: flex;
    padding: 10px;
    cursor: pointer;
    position: relative;

    &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 2px;
        background: transparent;
        transition: background 0.2s ease-in-out;
    }

    ${({ selected }) => selected && css`
        &:after {
            background: var(--lavanda);
        }
    `}

    &:hover:after {
        background: var(--lavanda);
    }
`;