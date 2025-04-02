import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import { useMediaQuery } from "@react-hook/media-query";
import { AnimatePresence, motion } from "framer-motion";

import { StyledButton } from "../button/style";
import { OverlayContainer } from "../layout/wrapper/overlay/style";
import { FlexCenter } from "../layout/wrapper/position/style";

import theme from "../../style/theme";

const CONTEXT_MENU_WIDTH = 200;

/**
 * ContextMenu component that provides a dropdown menu with optional alignment.
 */
const ContextMenu = ({ trigger, children, alignRight = false }) => {
    const isMobile = useMediaQuery(`(max-width: ${theme.media.tablet})`);
    const [opened, setOpened] = useState(false);
    const [containerPosition, setContainerPosition] = useState({ top: 0, left: 0 });
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        if (opened) {
            /**
             * Closes the context menu when clicking outside.
             */
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

    /**
     * Handles click on the trigger element, toggling the context menu.
     */
    const handleClick = (event) => {
        setOpened(!opened);
        if (!opened) {
            // Get trigger element's position to position the menu correctly
            const rect = event.currentTarget.getBoundingClientRect();
            setContainerPosition({
                top: rect.bottom + 4,
                left: alignRight ? rect.left : rect.right - CONTEXT_MENU_WIDTH
            });
        }
    };

    return (
        <>
            <div ref={triggerRef} onClick={handleClick}>{trigger}</div>
            {opened && !isMobile ? createPortal(
                <Container
                    onClick={() => setOpened(false)}
                    ref={containerRef}
                    style={{ top: `${containerPosition.top}px`, left: `${containerPosition.left}px` }}
                >
                    {children}
                </Container>,
                document.body
            ) : <BottomSheet children={children} opened={opened} setOpened={setOpened} />}
        </>
    );
};

/**
 * BottomSheet component for mobile view, supporting touch gestures to close.
 */
const BottomSheet = ({ children, opened, setOpened }) => {
    const touchStartY = useRef(0);
    const touchMoveY = useRef(0);
    const threshold = 50; // Minimum swipe distance to close the menu

    /**
     * Captures the start position of the touch event.
     */
    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    /**
     * Updates the touch position as the user moves their finger.
     */
    const handleTouchMove = (e) => {
        touchMoveY.current = e.touches[0].clientY;
    };

    /**
     * Detects if the user swiped down enough to close the menu.
     */
    const handleTouchEnd = () => {
        if (touchMoveY.current - touchStartY.current > threshold) {
            setOpened(false);
        }
    };

    return createPortal(
        <AnimatePresence mode="wait">
            {opened && (
                <OverlayContainer
                    onClick={() => setOpened(false)}
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.2 }}
                >
                    <BottomSheetContainer
                        as={motion.div}
                        key="context-menu"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0, transition: { duration: 0.3 } }}
                        transition={{ duration: 0.3 }}
                    >
                        <FlexCenter>
                            <Toucher
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            />
                        </FlexCenter>
                        {children}
                    </BottomSheetContainer>
                </OverlayContainer>
            )}
        </AnimatePresence>,
        document.body
    );
};

// Styled components

/**
 * Touch indicator for swipe-down gesture in mobile bottom sheet.
 */
const Toucher = styled.div`
    margin: 5px 0 20px 0;
    width: 50px;
    height: 4px;
    background-color: var(--gray-dark);
    border-radius: 3px;
`;

/**
 * Styled container for the desktop context menu.
 */
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

/**
 * Styled container for the bottom sheet menu.
 */
const BottomSheetContainer = styled.div`
    padding: 20px;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: fit-content;
    max-height: 50%;
    overflow: auto;
    border-top-right-radius: var(--bottom-context-menu-radius);
    border-top-left-radius: var(--bottom-context-menu-radius);
    background-color: var(--main-background-color);
    gap: 20px;
`;

/**
 * Styled button for context menu items.
 */
export const ContextMenuItem = styled(StyledButton)`
    padding: 5px 10px;
    width: 100%;
    gap: 20px;
    justify-content: ${(props) => props.justify || "center"};
    border-radius: unset;

    &:hover {
        background-color: var(--gray-light);
    }

    @media (max-width: ${theme.media.tablet}) {
        padding: 16px 24px;
        justify-content: flex-start;
    }
`;

export default ContextMenu;
