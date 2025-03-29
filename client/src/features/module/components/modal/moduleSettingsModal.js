import Modal from "../../../../components/modal";
import {BaseButtonBar, PrimaryButton} from "../../../../components/button/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import React, {useEffect, useState} from "react";
import {FlexCol} from "../../../../components/layout/wrapper/position/style";
import styled from "styled-components";
import Dropdown, {DropDownItem} from "../../../../components/dropdown";

const ONLY_ME_ACCESS_MODE = 'ONLY_ME_ACCESS_MODE';
const EVERYONE_ACCESS_MODE = 'EVERYONE_ACCESS_MODE';

const ACCESS_MODES = {
    READ: [
        {value: ONLY_ME_ACCESS_MODE, label: "Only me", description: "Only you have access to read this module"},
        {value: EVERYONE_ACCESS_MODE, label: "Everyone", description: "Everyone has access to read this module"}
    ],
    WRITE: [
        {value: ONLY_ME_ACCESS_MODE, label: "Only me", description: "Only you have access to edit this module"}
    ]
};

const getAccessDescription = (mode, type) => {
    const foundMode = ACCESS_MODES[type]?.find(({value}) => value === mode);
    return foundMode ? foundMode.description : "Selected unknown access mode!";
};

const ModuleSettingsModal = (props) => {

    const onSave = () => props.onClose();

    const footer = (
        <BaseButtonBar>
            <PrimaryButton onClick={onSave}>
                <StyledText as="span" size={FONT_SIZES.SIMPLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
                    Save
                </StyledText>
            </PrimaryButton>
        </BaseButtonBar>
    )
    return (
        <Modal
            title="Settings (temporarily not supported)"
            footer={footer}
            {...props} >
            <Wrapper>
                <AccessControlSection type="READ" label="Read" selectedMode={EVERYONE_ACCESS_MODE}/>
                <AccessControlSection type="WRITE" label="Write" selectedMode={ONLY_ME_ACCESS_MODE}/>
            </Wrapper>
        </Modal>
    );
};

const AccessControlSection = ({type, label, selectedMode}) => {
    const [accessDescriptions, setAccessDescriptions] = useState({
        read: "",
        write: ""
    });

    console.log('render')

    //todo  this hook produces one more extra render
    useEffect(() => {
        if(selectedMode) {
            setAccessDescriptions((prev) => ({
                ...prev,
                [type]: getAccessDescription(selectedMode, type)
            }));
        }
    }, []);

    const onSelectAccessMode = (mode, type) => {
        setAccessDescriptions((prev) => ({
            ...prev,
            [type]: getAccessDescription(mode, type)
        }));
    };

    return (

        <FlexCol gap="20px">
            <StyledText as="h3" size={FONT_SIZES.TITLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
                {label}
            </StyledText>
            <Dropdown
                onSelect={(item) => onSelectAccessMode(item.value, type)}>
                {ACCESS_MODES[type].map(({value, label}) => (
                    <DropDownItem
                        key={value}
                        value={value}
                        label={label}
                        selected={value === selectedMode}
                    >
                        {label}
                    </DropDownItem>
                ))}
            </Dropdown>
            <StyledText as="span" size={FONT_SIZES.SIMPLE_SMALL} weight={FONT_WEIGHTS.REGULAR}>
                {accessDescriptions[type]}
            </StyledText>
        </FlexCol>

    )
};

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

export default ModuleSettingsModal;