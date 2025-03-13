import styled from "styled-components";
import {FlexCol, FlexRow, FlexRowCenter} from "../layout/style";
import {CloseIcon} from "../icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../text";
import React from "react";
import {createPortal} from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ title, opened, onClose, children }) => {
    return createPortal(
        <AnimatePresence>
            {opened && (
                <ModalOverlay
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ModalDialog
                        as={motion.div}
                        key="modal-dialog"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
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
                            <ModalClose onClick={onClose}>
                                <CloseIcon />
                            </ModalClose>
                        </ModalHeader>
                        <ModalContent>{children}</ModalContent>
                    </ModalDialog>
                </ModalOverlay>
            )}
        </AnimatePresence>,
        document.body
    );
};

const ModalOverlay = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, .5);
    z-index: 10;
`

const ModalDialog = styled(FlexCol)`
    margin-top: 100px;
    padding: 20px;
    position: relative;
    width: 50%;
    height: fit-content;
    overflow: auto;
    border-radius: var(--base-item-border-radius);
    background-color: white;
    gap: 20px
`

const ModalClose = styled(FlexRowCenter)`
    height: 32px;
    width: 32px;
    position: absolute;
    right: 16px;
    top: 16px;
    z-index: 101;
    cursor: pointer;
`

const ModalHeader = styled(FlexRow)``

const ModalContent = styled(FlexCol)``

export const ModalFooter = styled(FlexRow)`
    margin-top: 20px;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
`

export default Modal;