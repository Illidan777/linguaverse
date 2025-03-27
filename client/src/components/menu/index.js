import styled from "styled-components";
import {StyledButton} from "../button/style";
import React, {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";

const CONTEXT_MENU_WIDTH = 200;

const ContextMenu = ({ trigger, children, alignRight = false }) => {
    const [opened, setOpened] = useState(false);
    const [containerPosition, setContainerPosition] = useState({ top: 0, left: 0 });
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        if (opened) {
            const handleClickOutside = (event) => {
                if (containerRef.current && !containerRef.current.contains(event.target) &&
                    triggerRef.current && !triggerRef.current.contains(event.target)) {
                    setOpened(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [opened]);

    const handleClick = (event) => {
        setOpened(!opened);
        if (!opened) {
            const rect = event.currentTarget.getBoundingClientRect();
            setContainerPosition({
                top: rect.bottom + 4,
                left: alignRight ? rect.left : rect.right - CONTEXT_MENU_WIDTH
            });
        }
    };

    return (
        <>
            <div ref={triggerRef} onClick={handleClick}>
                {trigger}
            </div>

            {opened &&
                createPortal(
                    <Container
                        onClick={() => setOpened(false)}
                        ref={containerRef}
                        style={{ top: `${containerPosition.top}px`, left: `${containerPosition.left}px` }}
                    >
                        {children}
                    </Container>,
                    document.body
                )}
        </>
    );
};

// todo follow the further using of context menu, Implement this comp if there will be a lot of duplicating
// const ContextMenuItem = ({title, icon, color, disabled, onClick}) => {
//
// }

const Container = styled.div`
    position: absolute;
    width: ${CONTEXT_MENU_WIDTH}px;
    padding: 10px 0;
    border-radius: var(--base-item-border-radius);
    overflow-y: auto;
    box-shadow: 0 .25rem 1rem 0 var(--gray-light);
    border: .0625rem solid var(--gray-light);
    background: var(--main-background-color);
    z-index: var(--z-index-context-menu);
`;

export const ContextMenuItem = styled(StyledButton)`
    padding: 5px 10px;
    width: 100%;
    gap: 20px;
    justify-content: ${(props) => props.justify || "center"};
    border-radius: unset;

    &:hover {
        background-color: var(--gray-light);
    }
`;

export default ContextMenu;