import {useParams} from "react-router";
import DashboardPageLayout from "../../../components/layout/page";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {FlexCol, FlexRow} from "../../../components/layout/wrapper/position/style";
import {BaseButtonBar, RoutingLink, SquareSecondaryButton, StyledLink} from "../../../components/button/style";
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
import React, {useState} from "react";
import ContextMenu, {ContextMenuItem} from "../../../components/menu";
import useCSSVariables from "../../../hook/useCSSVariables";
import {BottomBorderWrapper} from "../../../components/layout/wrapper/hover/style";
import {StudyModeItem, StudyModesWrapper} from "../../studying/style";
import FlashCardSlider from "../../studying/flashcards/flashCardSlider";

const ModuleItemPage = () => {

    const {id} = useParams();
    const [errorColor, textColor] = useCSSVariables(["--error-color", "--colored-text-main"])
    const [termFlipped, setTermFlipped] = useState(false);
    const [definitionFlipped, setDefinitionFlipped] = useState(true);
    const zIndex = 101;

    const termZindex = termFlipped ? zIndex - 1 : zIndex;
    const definitionZIndex = termFlipped ? zIndex : zIndex - 1;

    const switchTurns = () => {
        setTermFlipped(!termFlipped)
        setDefinitionFlipped(!definitionFlipped)
    }
    return (
        <DashboardPageLayout
            header={
                <FlexRow justify="space-between" align="flex-start">
                    <FlexCol gap="20px">

                        <RoutingLink to="/">
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
                                <CardsIcon color={textColor}/>
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
                                <CycleIcon color={textColor}/>
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
                                <ExamIcon color={textColor}/>
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
                                <TetrisIcon color={textColor}/>
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
                                <RocketIcon color={textColor}/>
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
                                <SelectionIcon color={textColor}/>
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


                </FlexCol>
            }
        />
    )
}

export default ModuleItemPage