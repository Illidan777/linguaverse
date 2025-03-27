import React from "react";
import toast from "react-hot-toast";

import {StudyModeItem, StudyModesWrapper} from "./style";

import {BottomBorderWrapper} from "../../../components/layout/wrapper/hover/style";
import {CardsIcon, CycleIcon, ExamIcon, RocketIcon, SelectionIcon, TetrisIcon} from "../../../components/icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";

import useCSSVariables from "../../../hook/useCSSVariables";

export default function PracticeModesPlate() {
    const [coloredText] = useCSSVariables(["--colored-text-main"])

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