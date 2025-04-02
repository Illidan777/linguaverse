// react components and hooks
import React from "react";

// Libs
import toast from "react-hot-toast";

// PracticeModesPlate specific components
import {StudyModeItem, StudyModesWrapper} from "./style";

// UI components
import {BottomBorderWrapper} from "../../../components/layout/wrapper/hover/style";
import {CardsIcon, CycleIcon, ExamIcon, RocketIcon, SelectionIcon, TetrisIcon} from "../../../components/icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";

// Custom hooks
import useCSSVariables from "../../../hook/useCSSVariables";

/**
 * PracticeModesPlate component renders a list of study modes with interactive icons.
 * Each study mode is wrapped in a styled component and allows users to interact with a specific study mode.
 * Currently, it displays a toast notification when clicked, indicating that the feature is temporarily not supported.
 *
 * @returns {JSX.Element} - The rendered component for practice modes.
 */
export default function PracticeModesPlate() {
    // Fetches the CSS variable for colored text used throughout the component
    const [coloredText] = useCSSVariables(["--colored-text-main"])

    /**
     * Handles the click event for opening a study mode.
     * Displays a toast notification that the functionality is temporarily unavailable.
     */
    const onOpenStudyMode = () => {
        toast.error('This functionality is temporary not supported!')
    }

    return (
        <StudyModesWrapper>
            <BottomBorderWrapper>
                <StudyModeItem onClick={onOpenStudyMode}>
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
                <StudyModeItem onClick={onOpenStudyMode}>
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
                <StudyModeItem onClick={onOpenStudyMode}>
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
                <StudyModeItem onClick={onOpenStudyMode}>
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
                <StudyModeItem onClick={onOpenStudyMode}>
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
                <StudyModeItem onClick={onOpenStudyMode}>
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
    )
}