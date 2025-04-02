// React components and hooks
import React from "react";

// UI components
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import {FlexCenter} from "../../../../components/layout/wrapper/position/style";
import {FolderIcon} from "../../../../components/icon";

/**
 * FolderItemContent Component
 *
 * Renders the content of a folder item, displaying the folder's name and an icon.
 */
const FolderItemContent = ({name}) => {
    return (
        <FlexCenter gap="10px">
            <FolderIcon/>
            <StyledText
                as="span"
                size={FONT_SIZES.SIMPLE_BIG}
                weight={FONT_WEIGHTS.SUPER_BOLD}
            >
                {name}
            </StyledText>
        </FlexCenter>

    )
}

/**
 * FolderItemHeader Component
 *
 * Renders the header of a folder item, displaying the count of modules in the folder.
 */
const FolderItemHeader = ({modulesCount}) => {
    return (
        <>
            <StyledText
                as="span"
                size={FONT_SIZES.SIMPLE_SMALL}
                weight={FONT_WEIGHTS.SEMI_BOLD}
            >
                {modulesCount} objects
            </StyledText>
        </>
    )
}

/**
 * Maps folders array data to UI components
 *
 * @param {Array} data - List of module items
 * @returns {Array} Transformed module data for rendering
 */
export default function mapFoldersPageItems(data) {
    return data ? data.map((item) => {
            const {name, modulesCount, id} = item;
            return {
                id,
                header: <FolderItemHeader modulesCount={modulesCount}/>,
                content: <FolderItemContent name={name}/>,
            };
        })
        : [];
}
