import {useParams} from "react-router";
import DashboardPageLayout from "../../../components/layout/page";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {FlexCol, FlexRow} from "../../../components/layout/wrapper/position/style";
import {
    BaseButtonBar,
    CircleStyledButton,
    RoutingLink,
    SquareSecondaryButton,
    StyledLink
} from "../../../components/button/style";
import {
    AddIcon,
    CardsIcon,
    CompletedIcon,
    CycleIcon,
    DeleteIcon,
    EditIcon,
    ExamIcon,
    FolderIcon,
    MoreIcon,
    PublishIcon,
    RocketIcon,
    SaveIcon,
    SelectionIcon,
    TetrisIcon
} from "../../../components/icon";
import React from "react";
import ContextMenu, {ContextMenuItem} from "../../../components/menu";
import useCSSVariables from "../../../hook/useCSSVariables";
import {BottomBorderWrapper} from "../../../components/layout/wrapper/hover/style";
import {StudyModeItem, StudyModesWrapper} from "../../studying/components/style";
import FlashCardSlider from "../../studying/components/flashcards/flashCardSlider";
import styled from "styled-components";
import {paths} from "../../../app/routes";

const ModuleItemPage = () => {

    const {id} = useParams();
    const [errorColor, successColor, coloredText] = useCSSVariables(["--error-color", "--colored-text-main", '--success-color'])

    return (
        <DashboardPageLayout
            header={
                <FlexRow justify="space-between" align="flex-start">
                    <FlexCol gap="20px">

                        <RoutingLink to={paths.index.getHref()}>
                            <StyledLink>
                                <FolderIcon/>
                                <StyledText
                                    as="span"
                                    size={FONT_SIZES.SIMPLE_MEDIUM}
                                    weight={FONT_WEIGHTS.SEMI_BOLD}
                                >
                                    Test
                                </StyledText>
                            </StyledLink>
                        </RoutingLink>


                        <StyledText
                            as="h2"
                            size={FONT_SIZES.TITLE_MEDIUM}
                            weight={FONT_WEIGHTS.SUPER_BOLD}
                        >
                            UP - 2 (sentence start / linker)
                        </StyledText>
                    </FlexCol>
                    <BaseButtonBar>
                        <ContextMenu
                            trigger={
                                <SquareSecondaryButton>
                                    <SaveIcon/>
                                </SquareSecondaryButton>
                            }
                        >
                            <ContextMenuItem justify="flex-start">
                                <AddIcon size="22px"/>
                                <StyledText
                                    as="span"
                                    size={FONT_SIZES.SIMPLE_SMALL}
                                    weight={FONT_WEIGHTS.SEMI_BOLD}
                                >
                                    New folder
                                </StyledText>
                            </ContextMenuItem>
                            <ContextMenuItem justify="flex-start">
                                <FolderIcon/>
                                <StyledText
                                    as="span"
                                    size={FONT_SIZES.SIMPLE_SMALL}
                                    weight={FONT_WEIGHTS.SEMI_BOLD}
                                >
                                    Some folder
                                </StyledText>
                            </ContextMenuItem>
                            <ContextMenuItem justify="flex-start">
                                <CompletedIcon/>
                                <StyledText
                                    as="span"
                                    size={FONT_SIZES.SIMPLE_SMALL}
                                    weight={FONT_WEIGHTS.SEMI_BOLD}
                                >
                                    Some folder 2
                                </StyledText>
                            </ContextMenuItem>
                        </ContextMenu>

                        <SquareSecondaryButton disabled>
                            <PublishIcon/>
                        </SquareSecondaryButton>
                        <ContextMenu
                            trigger={
                                <SquareSecondaryButton>
                                    <MoreIcon/>
                                </SquareSecondaryButton>
                            }
                        >
                            <ContextMenuItem>
                                <EditIcon/>
                                <StyledText
                                    as="span"
                                    size={FONT_SIZES.SIMPLE_SMALL}
                                    weight={FONT_WEIGHTS.SEMI_BOLD}
                                >
                                    Edit
                                </StyledText>
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <DeleteIcon/>
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

                    </BaseButtonBar>
                </FlexRow>
            }
            content={
                <FlexCol gap="50px">
                    <StudyModesWrapper>
                        <BottomBorderWrapper>
                            <StudyModeItem>
                                <CardsIcon color={coloredText}/>
                                <StyledText
                                    as="span"
                                    size={FONT_SIZES.SIMPLE_MEDIUM}
                                    weight={FONT_WEIGHTS.SEMI_BOLD}
                                >
                                    Cards
                                </StyledText>
                            </StudyModeItem>
                        </BottomBorderWrapper>
                        <BottomBorderWrapper>
                            <StudyModeItem>
                                <CycleIcon color={coloredText}/>
                                <StyledText
                                    as="span"
                                    size={FONT_SIZES.SIMPLE_MEDIUM}
                                    weight={FONT_WEIGHTS.SEMI_BOLD}
                                >
                                    Memorization
                                </StyledText>
                            </StudyModeItem>
                        </BottomBorderWrapper>
                        <BottomBorderWrapper>
                            <StudyModeItem>
                                <ExamIcon color={coloredText}/>
                                <StyledText
                                    as="span"
                                    size={FONT_SIZES.SIMPLE_MEDIUM}
                                    weight={FONT_WEIGHTS.SEMI_BOLD}
                                >
                                    Exam
                                </StyledText>
                            </StudyModeItem>
                        </BottomBorderWrapper>
                        <BottomBorderWrapper>
                            <StudyModeItem>
                                <TetrisIcon color={coloredText}/>
                                <StyledText
                                    as="span"
                                    size={FONT_SIZES.SIMPLE_MEDIUM}
                                    weight={FONT_WEIGHTS.SEMI_BOLD}
                                >
                                    Blocks
                                </StyledText>
                            </StudyModeItem>
                        </BottomBorderWrapper>
                        <BottomBorderWrapper>
                            <StudyModeItem>
                                <RocketIcon color={coloredText}/>
                                <StyledText
                                    as="span"
                                    size={FONT_SIZES.SIMPLE_MEDIUM}
                                    weight={FONT_WEIGHTS.SEMI_BOLD}
                                >
                                    Blast
                                </StyledText>
                            </StudyModeItem>
                        </BottomBorderWrapper>
                        <BottomBorderWrapper>
                            <StudyModeItem>
                                <SelectionIcon color={coloredText}/>
                                <StyledText
                                    as="span"
                                    size={FONT_SIZES.SIMPLE_MEDIUM}
                                    weight={FONT_WEIGHTS.SEMI_BOLD}
                                >
                                    Selection
                                </StyledText>
                            </StudyModeItem>
                        </BottomBorderWrapper>
                    </StudyModesWrapper>
                    <FlashCardSlider/>
                    <FlexCol gap="35px">
                        <StyledText
                            as="span"
                            size={FONT_SIZES.SIMPLE_MEDIUM}
                            weight={FONT_WEIGHTS.SEMI_BOLD}
                        >
                            Terms in module (10)
                        </StyledText>
                        <AllTermsWrapper>
                            <StyledText
                                as="span"
                                size={FONT_SIZES.TITLE_SMALL}
                                weight={FONT_WEIGHTS.SEMI_BOLD}
                                color={errorColor}
                            >
                                Studied (9)
                            </StyledText>
                            <StyledText
                                as="span"
                                size={FONT_SIZES.SIMPLE_MEDIUM}
                                weight={FONT_WEIGHTS.REGULAR}
                            >
                                You've started learning these terms. Keep going!
                            </StyledText>
                            <FlexCol gap="10px">
                                <TermItemWrapper>
                                    <StyledText
                                        as="span"
                                        size={FONT_SIZES.SIMPLE_MEDIUM}
                                        weight={FONT_WEIGHTS.REGULAR}
                                    >
                                        Original
                                    </StyledText>
                                    <StyledText
                                        as="span"
                                        size={FONT_SIZES.SIMPLE_MEDIUM}
                                        weight={FONT_WEIGHTS.REGULAR}
                                    >
                                        Translation
                                    </StyledText>
                                    <BaseButtonBar>
                                        <CircleStyledButton>
                                            <EditIcon/>
                                        </CircleStyledButton>
                                    </BaseButtonBar>
                                </TermItemWrapper>
                                <TermItemWrapper>
                                    <StyledText
                                        as="span"
                                        size={FONT_SIZES.SIMPLE_MEDIUM}
                                        weight={FONT_WEIGHTS.REGULAR}
                                    >
                                        Original
                                    </StyledText>
                                    <StyledText
                                        as="span"
                                        size={FONT_SIZES.SIMPLE_MEDIUM}
                                        weight={FONT_WEIGHTS.REGULAR}
                                    >
                                        Translation
                                    </StyledText>
                                    <BaseButtonBar>
                                        <CircleStyledButton>
                                            <EditIcon/>
                                        </CircleStyledButton>
                                    </BaseButtonBar>
                                </TermItemWrapper>
                                <TermItemWrapper>
                                    <StyledText
                                        as="span"
                                        size={FONT_SIZES.SIMPLE_MEDIUM}
                                        weight={FONT_WEIGHTS.REGULAR}
                                    >
                                        Original
                                    </StyledText>
                                    <StyledText
                                        as="span"
                                        size={FONT_SIZES.SIMPLE_MEDIUM}
                                        weight={FONT_WEIGHTS.REGULAR}
                                    >
                                        Translation
                                    </StyledText>
                                    <BaseButtonBar>
                                        <CircleStyledButton>
                                            <EditIcon/>
                                        </CircleStyledButton>
                                    </BaseButtonBar>
                                </TermItemWrapper>


                            </FlexCol>

                            <StyledText
                                as="span"
                                size={FONT_SIZES.TITLE_SMALL}
                                weight={FONT_WEIGHTS.SEMI_BOLD}
                                color={successColor}
                            >
                                Learned (9)
                            </StyledText>
                            <StyledText
                                as="span"
                                size={FONT_SIZES.SIMPLE_MEDIUM}
                                weight={FONT_WEIGHTS.REGULAR}
                            >
                                You have mastered these terms well!
                            </StyledText>
                            <FlexCol gap="10px">
                                <TermItemWrapper>
                                    <StyledText
                                        as="span"
                                        size={FONT_SIZES.SIMPLE_MEDIUM}
                                        weight={FONT_WEIGHTS.REGULAR}
                                    >
                                        Original
                                    </StyledText>
                                    <StyledText
                                        as="span"
                                        size={FONT_SIZES.SIMPLE_MEDIUM}
                                        weight={FONT_WEIGHTS.REGULAR}
                                    >
                                        Translation
                                    </StyledText>
                                    <BaseButtonBar>
                                        <CircleStyledButton>
                                            <EditIcon/>
                                        </CircleStyledButton>
                                    </BaseButtonBar>
                                </TermItemWrapper>
                            </FlexCol>


                        </AllTermsWrapper>

                    </FlexCol>


                </FlexCol>
            }
        />
    )
}

const AllTermsWrapper = styled(FlexCol)`
    gap: 25px;
    padding: 10px;
    border-radius: var(--base-item-border-radius);
    background-color: var(--second-background-color);
    width: 100%;
`

const TermItemWrapper = styled(FlexRow)`
    padding: 15px;
    border-radius: var(--base-item-border-radius);
    background-color: var(--main-background-color);
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

export default ModuleItemPage