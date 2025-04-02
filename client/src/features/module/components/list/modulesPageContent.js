// React components and hooks
import React from "react";

// Constants
import {MODULE_DRAFT_STATUS} from "../../../../constants/module";

//UI components
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import avatar from "../../../../assets/img/avatar.jpg";
import {CoverImage} from "../../../../components/image/style";
import styled from "styled-components";
import {FlexCenter, FlexRow} from "../../../../components/layout/wrapper/position/style";

/**
 * ModuleItemContent Component
 * Renders the module name with an optional draft marker.
 *
 * @param {Object} props
 * @param {string} props.name - Module name
 * @param {string} props.status - Module status
 * @returns {JSX.Element} Styled module content
 */
const ModuleItemContent = ({name, status}) => {
    const draftMarker = status === MODULE_DRAFT_STATUS ? '(Draft)' : null
    return (
        <StyledText
            as="span"
            size={FONT_SIZES.SIMPLE_BIG}
            weight={FONT_WEIGHTS.SUPER_BOLD}
        >
            {draftMarker} {name}
        </StyledText>
    )
}

/**
 * ModuleItemHeader Component
 * Displays module metadata including terms count and owner info.
 *
 * @param {Object} props
 * @param {number} props.termsCount - Number of terms in the module
 * @param {string} props.username - Owner's name
 * @param {string} props.userAvatarSrc - Owner's avatar URL
 * @returns {JSX.Element} Module header with metadata
 */
const ModuleItemHeader = ({termsCount, username, userAvatarSrc}) => {
    return (
        <>
            <StyledText
                as="span"
                size={FONT_SIZES.SIMPLE_SMALL}
                weight={FONT_WEIGHTS.SEMI_BOLD}
            >
                {termsCount} terms
            </StyledText>
            <Divider/>
            <ModuleOwnerWrapper>
                <OwnerAvatarWrapper>
                    <CoverImage src={userAvatarSrc} alt={username}/>
                </OwnerAvatarWrapper>
                <div>{username}</div>

            </ModuleOwnerWrapper>
        </>
    )
}

/**
 * Maps module array data to UI components
 *
 * @param {Array} data - List of module items
 * @returns {Array} Transformed module data for rendering
 */
export default function mapModulePageItems(data) {
    return data ? data.map((item) => {
        const {
            id,
            name,
            status,
            termsCount,
            ownerAvatar = avatar, // Default avatar (not implemented yet)
            ownerName = 'you', // Default owner name (not implemented yet)
            createdAt
        } = item;
        const header = <ModuleItemHeader
            termsCount={termsCount}
            username={ownerName}
            userAvatarSrc={ownerAvatar}
        />;
        const content = <ModuleItemContent name={name} status={status}/>

        return {id, header, content, createdAt};
    }) : [];
}

/**
 * Styled divider element
 */
const Divider = styled.div`
    width: 3px;
    max-height: 100%;
    background-color: var(--gray);
`

/**
 * Wrapper for module owner details
 */
const ModuleOwnerWrapper = styled(FlexRow)`
    gap: 10px;
`

/**
 * Wrapper for the owner avatar image
 */
const OwnerAvatarWrapper = styled(FlexCenter)`
    width: 16px;
    height: 16px;

    img {
        border-radius: 100%;
    }
`
