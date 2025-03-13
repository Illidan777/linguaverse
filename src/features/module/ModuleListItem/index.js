import styled from "styled-components";
import {FlexCol, FlexColCenter, FlexRow} from "../../../components/layout/style";
import {ModuleIcon} from "../../../components/icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import React from "react";

const ModuleListItem = ({name, termsCount, author, action}) => {
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

const ModuleItemWrapper = styled(FlexRow)`
    padding: 15px;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    border-radius: var(--base-item-border-radius);
    cursor: pointer;

    &:hover {
        background-color: var(--gray-lighter);
    }
`

const ModuleItemContent = styled(FlexCol)`
    flex: 1 1 auto;
    gap: 5px;
`

const ModuleIconWrapper = styled(FlexColCenter)`
    padding: 10px;
    border-radius: var(--base-item-border-radius);
    background-color: var(--lavanda-lighter);
`

export default ModuleListItem;