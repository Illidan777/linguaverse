/**
 * Modal Component
 *
 * This component renders a modal dialog with an overlay. It supports animations,
 * a header with a title, a close button, content, and an optional footer.
 * The modal can be closed by clicking the close button or clicking outside the modal.
 */

import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useMediaQuery } from "@react-hook/media-query";

// Layout and Styling
import { FlexCenter, FlexCol, FlexRow } from "../layout/wrapper/position/style";
import { OverlayContainer } from "../layout/wrapper/overlay/style";
import theme from "../../style/theme";

// Components and Icons
import { CrossIcon } from "../icon";
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../text";

/**
 * Modal Component
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the modal
 * @param {boolean} props.opened - Determines if the modal is open
 * @param {Function} props.onClose - Callback function for closing the modal
 * @param {React.ReactNode} props.footer - Optional footer content
 * @param {React.ReactNode} props.children - Modal body content
 */
const Modal = ({ title, opened, onClose, footer, children }) => {
    const isMobile = useMediaQuery(`(max-width: ${theme.media.tablet})`);
    const [isClosing, setIsClosing] = useState(false);
    const dialogRef = useRef(null);

    /**
     * Handles the closing animation before actually closing the modal.
     */
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300);
    };

    /**
     * Closes the modal when clicking outside the dialog.
     *
     * @param {Event} e - Click event
     */
    const onClickOnOverlay = (e) => {
        e.preventDefault();
        if (dialogRef.current && !dialogRef.current.contains(e.target)) {
            onClose();
        }
    };

    return createPortal(
        <AnimatePresence mode="wait">
            {opened && !isClosing && (
                <OverlayContainer
                    onClick={onClickOnOverlay}
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.2 }}
                >
                    <ModalDialog
                        ref={dialogRef}
                        as={motion.div}
                        key="modal-dialog"
                        initial={{ y: isMobile ? "100%" : -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: isMobile ? "100%" : -50, opacity: 0, transition: { duration: 0.3 } }}
                        transition={{ duration: 0.3 }}
                    >
                        <ModalHeader>
                            <StyledText
                                as="h2"
                                size={FONT_SIZES.TITLE_MEDIUM}
                                weight={FONT_WEIGHTS.SUPER_BOLD}
                            >
                                {title}
                            </StyledText>
                            <ModalClose onClick={handleClose}>
                                <CrossIcon />
                            </ModalClose>
                        </ModalHeader>
                        <ModalContent>{children}</ModalContent>
                        <ModalFooter>{footer}</ModalFooter>
                    </ModalDialog>
                </OverlayContainer>
            )}
        </AnimatePresence>,
        document.body
    );
};

// Styled Components
/** Modal wrapper with responsive styles */
const ModalDialog = styled(FlexCol)`
    margin: 100px 0;
    padding: 20px;
    position: relative;
    width: 50%;
    height: fit-content;
    max-height: 80%;
    overflow: auto;
    border-radius: var(--base-item-border-radius);
    background-color: var(--main-background-color);
    gap: 20px;
    z-index: var(--z-index-modal-dialog);

    @media (max-width: ${theme.media.desktop}) {
        width: 60%;
    }

    @media (max-width: ${theme.media.bigTablet}) {
        width: 80%;
    }

    @media (max-width: ${theme.media.tablet}) {
        padding-top: 70px;
        margin: 0;
        width: 100%;
        max-height: 100%;
        height: 100%;
        border-radius: 0;
        overflow: unset;
    }
`;

/** Close button with absolute positioning */
const ModalClose = styled(FlexCenter)`
    height: 32px;
    width: 32px;
    position: absolute;
    right: 16px;
    top: 16px;
    z-index: var(--z-index-modal-close);
    cursor: pointer;
`;

/** Modal header container */
const ModalHeader = styled(FlexRow)``;

/** Modal body content container */
const ModalContent = styled(FlexCol)`
    overflow-y: auto;
`;

/** Modal footer with top border */
const ModalFooter = styled(FlexRow)`
    margin-top: 20px;
    padding-top: 20px;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid var(--gray-light);
    gap: 10px;
`;

export default Modal;
