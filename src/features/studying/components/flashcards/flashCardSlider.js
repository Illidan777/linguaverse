import {FlexCenter, FlexCol, FlexRow} from "../../../../components/layout/wrapper/position/style";
import React, {useRef} from "react";
import FlashCard from "./flashCard";
import Toggler from "../../../../components/input/toggler";
import styled from "styled-components";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import useCSSVariables from "../../../../hook/useCSSVariables";
import {BaseButtonBar, CircleStyledButton, SecondaryButton} from "../../../../components/button/style";
import {EditIcon, FullScreenIcon, SettingsIcon, ShuffleIcon} from "../../../../components/icon";
import Slider, {SliderControls} from "../../../../components/slider";

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
    const [coloredText] = useCSSVariables(['--colored-text-main', '--success-color', '--error-color'])
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


export default FlashCardSlider;