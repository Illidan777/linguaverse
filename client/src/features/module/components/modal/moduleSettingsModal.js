// React and state management hooks
import React, { useEffect, useState } from "react";

// Styled-components and other UI components
import styled from "styled-components";
import Modal from "../../../../components/modal";
import { BaseButtonBar, PrimaryButton } from "../../../../components/button/style";
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../../../../components/text";
import { FlexCol } from "../../../../components/layout/wrapper/position/style";
import Dropdown, { DropDownItem } from "../../../../components/dropdown";

// Constants for access modes
const ONLY_ME_ACCESS_MODE = 'ONLY_ME_ACCESS_MODE';
const EVERYONE_ACCESS_MODE = 'EVERYONE_ACCESS_MODE';

// Access mode configurations for different permissions (READ, WRITE)
const ACCESS_MODES = {
    READ: [
        { value: ONLY_ME_ACCESS_MODE, label: "Only me", description: "Only you have access to read this module" },
        { value: EVERYONE_ACCESS_MODE, label: "Everyone", description: "Everyone has access to read this module" }
    ],
    WRITE: [
        { value: ONLY_ME_ACCESS_MODE, label: "Only me", description: "Only you have access to edit this module" }
    ]
};

/**
 * Returns the description of the selected access mode for a given type (READ/WRITE)
 * @param {string} mode - Selected access mode (e.g., 'ONLY_ME_ACCESS_MODE')
 * @param {string} type - Type of access (e.g., 'READ' or 'WRITE')
 * @returns {string} - Description for the access mode
 */
const getAccessDescription = (mode, type) => {
    const foundMode = ACCESS_MODES[type]?.find(({ value }) => value === mode);
    return foundMode ? foundMode.description : "Selected unknown access mode!";
};

/**
 * Modal component for displaying and configuring module settings
 * @param {object} props - Props passed to the modal component
 */
const ModuleSettingsModal = (props) => {

    // Function to handle the save action
    const onSave = () => props.onClose();

    // Footer content containing the 'Save' button
    const footer = (
        <BaseButtonBar>
            <PrimaryButton onClick={onSave}>
                <StyledText as="span" size={FONT_SIZES.SIMPLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
                    Save
                </StyledText>
            </PrimaryButton>
        </BaseButtonBar>
    );

    return (
        <Modal
            title="Settings (temporarily not supported)"
            footer={footer}
            {...props} >
            <Wrapper>
                <AccessControlSection type="READ" label="Read" selectedMode={EVERYONE_ACCESS_MODE} />
                <AccessControlSection type="WRITE" label="Write" selectedMode={ONLY_ME_ACCESS_MODE} />
            </Wrapper>
        </Modal>
    );
};

/**
 * Section for controlling access permissions (READ/WRITE) for a module
 * @param {object} props - Props for the access control section (type, label, selectedMode)
 */
const AccessControlSection = ({ type, label, selectedMode }) => {
    const [accessDescriptions, setAccessDescriptions] = useState({
        read: "",
        write: ""
    });

    // Effect hook to update the access description when the selected mode changes
    useEffect(() => {
        if (selectedMode) {
            setAccessDescriptions((prev) => ({
                ...prev,
                [type]: getAccessDescription(selectedMode, type)
            }));
        }
    }, [selectedMode, type]);

    // Handler for when an access mode is selected
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
                {ACCESS_MODES[type].map(({ value, label }) => (
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
    );
};

// Wrapper for the modal content layout (grid-based)
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

export default ModuleSettingsModal;
