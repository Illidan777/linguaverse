import Modal, {ModalFooter} from "../index";
import {PrimaryButton} from "../../button/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../text";
import React, {useState} from "react";
import {FlexCol} from "../../layout/style";
import styled from "styled-components";
import Dropdown, {DropDownItem} from "../../dropdown";

const ONLY_ME_ACCESS_MODE = 'ONLY_ME_ACCESS_MODE';
const EVERYONE_ACCESS_MODE = 'EVERYONE_ACCESS_MODE';

const ModuleSettingsModal = (props) => {

    const [readAccessDescription, setReadAccessDescription] = useState("");
    const [writeAccessDescription, setWriteAccessDescription] = useState("");

    const onSelectReadAccessMode = (item) => {
        const {value} = item;

        switch (value) {
            case ONLY_ME_ACCESS_MODE: {
                setReadAccessDescription('Only you have access to read this module')
                break;
            }
            case EVERYONE_ACCESS_MODE: {
                setReadAccessDescription('Everyone has access to read this module')
                break;
            }
            default: {
                setReadAccessDescription('Selected unknown access mode!')
            }
        }
    }

    const onSelectWriteAccessMode = (item) => {
        const {value} = item;

        switch (value) {
            case ONLY_ME_ACCESS_MODE: {
                setWriteAccessDescription('Only you have access to edit this module')
                break;
            }
            default: {
                setWriteAccessDescription('Selected unknown access mode!')
            }
        }
    }

    const onSave = () => {
        props.onClose()
    }
    return (
        <Modal {...props} title="Settings (temporarly not supported)">
            <Wrapper>
                <FlexCol gap="20px">
                    <StyledText
                        as="h3"
                        size={FONT_SIZES.TITLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Read
                    </StyledText>
                    <Dropdown
                        onSelect={onSelectReadAccessMode}
                    >
                        <DropDownItem value={EVERYONE_ACCESS_MODE} label="Everyone">
                            Everyone
                        </DropDownItem>
                        <DropDownItem value={ONLY_ME_ACCESS_MODE} label="Only me">
                            Only me
                        </DropDownItem>
                    </Dropdown>
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.REGULAR}
                    >
                        {readAccessDescription}
                    </StyledText>
                </FlexCol>
                <FlexCol gap="20px">
                    <StyledText
                        as="h3"
                        size={FONT_SIZES.TITLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Write
                    </StyledText>
                    <Dropdown
                        onSelect={onSelectWriteAccessMode}
                    >
                        <DropDownItem value={ONLY_ME_ACCESS_MODE} label="Only me">
                            Only me
                        </DropDownItem>
                    </Dropdown>
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.REGULAR}
                    >
                        {writeAccessDescription}
                    </StyledText>
                </FlexCol>
            </Wrapper>
            <ModalFooter>
                <PrimaryButton
                    onClick={onSave}
                >
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Save
                    </StyledText>
                </PrimaryButton>
            </ModalFooter>
        </Modal>
    )
};

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

export default ModuleSettingsModal;