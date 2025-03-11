import {useParams} from "react-router";
import DashboardPageLayout from "../../../components/layout";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import styled from "styled-components";
import {FlexCol, FlexColCenter, FlexRow} from "../../../components/layout/style";
import {SquareSecondaryButton, SquareStyledButton} from "../../../components/button/style";
import React from "react";
import {AddIcon, DeleteIcon, ModuleIcon, MoreIcon, PublishIcon, TimeIcon} from "../../../components/icon";
import ContextMenu, {ContextMenuItem} from "../../../components/menu";
import useCSSVariables from "../../../hook/useCSSVariables";

const FolderItemPage = () => {

    const {id} = useParams();
    const [errorColor] = useCSSVariables(["--error-color"])

    return (
        <DashboardPageLayout
            header={
                <ItemHeaderWrapper>
                    <ItemHeader>
                        <StyledText
                            as="h2"
                            size={FONT_SIZES.TITLE_MEDIUM}
                            weight={FONT_WEIGHTS.SUPER_BOLD}
                        >
                            Current folder
                        </StyledText>
                        <FlexRow gap="10px">
                            <SquareSecondaryButton>
                                <AddIcon/>
                            </SquareSecondaryButton>
                            <ContextMenu
                                trigger={
                                    <SquareSecondaryButton>
                                        <MoreIcon/>
                                    </SquareSecondaryButton>
                                }
                            >
                                <ContextMenuItem>
                                    <DeleteIcon color={errorColor}/>
                                    <StyledText
                                        as="span"
                                        size={FONT_SIZES.SIMPLE_SMALL}
                                        weight={FONT_WEIGHTS.SEMI_BOLD}
                                        color={errorColor}
                                    >
                                        Delete
                                    </StyledText>
                                </ContextMenuItem>
                                <ContextMenuItem disabled>
                                    <PublishIcon/>
                                    <StyledText
                                        as="span"
                                        size={FONT_SIZES.SIMPLE_SMALL}
                                        weight={FONT_WEIGHTS.SEMI_BOLD}
                                    >
                                        Publish
                                    </StyledText>
                                </ContextMenuItem>
                            </ContextMenu>
                        </FlexRow>


                    </ItemHeader>
                    <FlexRow gap="10px">
                        <TimeIcon/>
                        <StyledText
                            as="h2"
                            size={FONT_SIZES.SIMPLE_SMALL}
                            weight={FONT_WEIGHTS.SEMI_BOLD}
                        >
                            Changed at 26.02.25
                        </StyledText>
                    </FlexRow>
                </ItemHeaderWrapper>
            }
            content={
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
                            AD-1
                        </StyledText>
                        <StyledText
                            as="span"
                            size={FONT_SIZES.SIMPLE_SMALL}
                            weight={FONT_WEIGHTS.MEDIUM}
                        >
                            Module&nbsp;&nbsp;•&nbsp;&nbsp;10 terms&nbsp;&nbsp;•&nbsp;&nbsp;Author: you
                        </StyledText>
                    </ModuleItemContent>
                    <ContextMenu
                        trigger={
                            <SquareStyledButton>
                                <MoreIcon/>
                            </SquareStyledButton>
                        }
                    >
                        <ContextMenuItem>
                            <DeleteIcon color={errorColor}/>
                            <StyledText
                                as="span"
                                size={FONT_SIZES.SIMPLE_SMALL}
                                weight={FONT_WEIGHTS.SEMI_BOLD}
                                color={errorColor}
                            >
                                Delete
                            </StyledText>
                        </ContextMenuItem>
                    </ContextMenu>

                </ModuleItemWrapper>

            }
        />
    )
}

const ItemHeaderWrapper = styled(FlexCol)`
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
`

const ItemHeader = styled(FlexRow)`
    justify-content: space-between;
    width: 100%;
`

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

export default FolderItemPage;