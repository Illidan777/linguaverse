import styled from "styled-components";
import {FlexRow} from "../layout/wrapper/position/style";
import React, {useState} from "react";
import {BaseButtonBar, SecondaryButton} from "../button/style";
import {LeftArrowIcon, RightArrowIcon} from "../icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../text";
import {createPortal} from "react-dom";

const Slider = ({ children, renderControls, controlContainer }) => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0)
    const [direction, setDirection] = useState('next')

    const slides = React.Children.map(children, (child, index) =>
        <SlideItem key={index} active={activeSlideIndex === index} direction={direction}>
            {child}
        </SlideItem>
    )

    const prevSlide = () => {
        if (activeSlideIndex > 0) {
            setActiveSlideIndex((prev) => prev - 1);
            setDirection("prev");
        }
    };

    const nextSlide = () => {
        if (activeSlideIndex < slides.length - 1) {
            setActiveSlideIndex((prev) => prev + 1);
            setDirection("next");
        }
    };

    return (
        <SlidesWrapper>
            {slides}
            {renderControls && controlContainer && createPortal(
                renderControls({
                    activeSlideIndex,
                    totalSlides: slides.length,
                    prevSlide,
                    nextSlide
                }),
                controlContainer
            )}
        </SlidesWrapper>
    )
}

// You can create any component for slide controls, but this component must have essential props - activeSlideIndex, totalSlides, prevSlide, nextSlide
export const SliderControls = ({ activeSlideIndex, totalSlides, prevSlide, nextSlide }) => {
    return (
        <BaseButtonBar>
            <SliderNavigationButton disabled={activeSlideIndex === 0} onClick={prevSlide}>
                <LeftArrowIcon size="35px"/>
            </SliderNavigationButton>
            <StyledText as="span" size={FONT_SIZES.SIMPLE_MEDIUM} weight={FONT_WEIGHTS.SEMI_BOLD}>
                {activeSlideIndex + 1} / {totalSlides}
            </StyledText>
            <SliderNavigationButton disabled={activeSlideIndex === totalSlides - 1} onClick={nextSlide}>
                <RightArrowIcon size="35px"/>
            </SliderNavigationButton>
        </BaseButtonBar>
    );
};

const SlidesWrapper = styled(FlexRow)`
    position: relative;
    width: 100%;
    height: 500px;
    perspective: 1000px;
`
const SlideItem = styled.div`
    position: absolute;
    flex-shrink: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${({active}) => (active ? 1 : 0)};
    animation: ${({active, direction}) =>
            active
                    ? direction === "next"
                            ? "shakeRight 0.3s ease-in-out"
                            : "shakeLeft 0.3s ease-in-out"
                    : "none"};

    @keyframes shakeRight {
        0% {
            transform: translateX(0);
        }
        50% {
            transform: translateX(100px) rotateY(30deg);
        }
        100% {
            transform: translateX(0);
        }
    }

    @keyframes shakeLeft {
        0% {
            transform: translateX(0);
        }
        50% {
            transform: translateX(-100px) rotateY(-30deg);
        }
        100% {
            transform: translateX(0);
        }
    }
`;

const SliderNavigationButton = styled(SecondaryButton)`
    padding: 10px;
    border-radius: 40%;
`

export default Slider;