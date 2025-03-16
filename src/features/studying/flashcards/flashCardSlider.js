import {FlexCenter, FlexCol, FlexRow} from "../../../components/layout/wrapper/position/style";
import React, {useRef} from "react";
import FlashCard from "./flashCard";
import Toggler from "../../../components/input/toggler";
import styled from "styled-components";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import useCSSVariables from "../../../hook/useCSSVariables";
import {BaseButtonBar, CircleStyledButton, SecondaryButton} from "../../../components/button/style";
import {EditIcon, FullScreenIcon, SettingsIcon, ShuffleIcon} from "../../../components/icon";
import Slider, {SliderControls} from "../../../components/slider";

const TERMS = [
    {
        id: 1,
        term: "Adjust",
        definition: "Налаштувати"
    },
    {
        id: 2,
        term: "See",
        definition: "Бачити"
    },
    {
        id: 3,
        term: "Talk",
        definition: "Говорити"
    },
    {
        id: 4,
        term: "Up",
        definition: "Вгору"
    }
]

const FlashCardSlider = () => {
    const [coloredText, successColor, errorColor] = useCSSVariables(['--colored-text-main', '--success-color', '--error-color'])
    const sliderControlsContainerRef = useRef(null);

    const flashCards = TERMS.map((item, index) => {
        const {id, term, definition} = item;
        return (
            <FlashCard key={index} id={id} term={term} definition={definition}/>
        );
    })

    return (
        <FlexCol gap="20px">
            <FlashCardSliderWrapper>
                <Slider renderControls={SliderControls} controlContainer={sliderControlsContainerRef.current}>
                    {flashCards}
                </Slider>
            </FlashCardSliderWrapper>
            <ToolBar>
                <FlexCenter gap="10px">
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_MEDIUM}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                        color={coloredText}
                    >
                        Follow progress
                    </StyledText>
                    <Toggler/>
                </FlexCenter>
                <FlexCenter ref={sliderControlsContainerRef}>
                </FlexCenter>
                <FlexCenter>
                    <BaseButtonBar>
                        <CircleStyledButton>
                            <ShuffleIcon/>
                        </CircleStyledButton>
                        <CircleStyledButton disabled>
                            <SettingsIcon/>
                        </CircleStyledButton>
                        <CircleStyledButton disabled>
                            <FullScreenIcon/>
                        </CircleStyledButton>
                    </BaseButtonBar>

                </FlexCenter>
            </ToolBar>

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

    )
}

const FlashCardSliderWrapper = styled(FlexRow)`
    height: 500px;
`

const ToolBar = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
    align-items: center;
`

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


export default FlashCardSlider;