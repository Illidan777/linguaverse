/**
 * ListItem Component
 *
 * This component represents a module item in a list, displaying the module's name, term count, and author.
 * It also accepts an action component (e.g., a button) to perform actions related to the module.
 *
 * Props:
 * - name (string): The name of the module.
 * - termsCount (number): The total number of terms in the module.
 * - author (string): The author of the module.
 * - action (ReactNode): An optional action element (button or link) to perform actions for the module.
 */

import styled from "styled-components";
import {FlexCol, FlexColCenter, FlexRow} from "../../../../components/layout/wrapper/position/style";
import {ModuleIcon} from "../../../../components/icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import React from "react";

/**
 * Module item that displays module information and an optional action component.
 */
const ListItem = ({name, termsCount, author, action}) => {
    return (
        <ModuleItemWrapper>
            <ModuleIconWrapper>
                <ModuleIcon/>
            </ModuleIconWrapper>
            <ModuleItemContent>
                <StyledText
                    as="h2"
                    size={FONT_SIZES.SIMPLE_MEDIUM}
                    weight={FONT_WEIGHTS.SEMI_BOLD}
                >
                    {name}
                </StyledText>
                <StyledText
                    as="span"
                    size={FONT_SIZES.SIMPLE_SMALL}
                    weight={FONT_WEIGHTS.MEDIUM}
                >
                    Module&nbsp;&nbsp;•&nbsp;&nbsp;{termsCount} terms&nbsp;&nbsp;•&nbsp;&nbsp;Author: {author}
                </StyledText>
            </ModuleItemContent>
            {action}
        </ModuleItemWrapper>
    )
};

// Styled Components for layout and styling

/**
 * Wrapper for the module item with horizontal layout.
 */
const ModuleItemWrapper = styled(FlexRow)`
    padding: 15px;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    border-radius: var(--base-item-border-radius);
    cursor: pointer;

    &:hover {
        background-color: var(--second-background-color);
    }
`

/**
 * Content wrapper for module name and additional info.
 */
const ModuleItemContent = styled(FlexCol)`
    flex: 1 1 auto;
    gap: 5px;
`

/**
 * Wrapper for the module icon with centered layout and background color.
 */
const ModuleIconWrapper = styled(FlexColCenter)`
    padding: 10px;
    border-radius: var(--base-item-border-radius);
    background-color: var(--lavanda-lighter);
`

export default ListItem;