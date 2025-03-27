import React, {useState} from "react";
import {BaseButtonBar} from "../button/style";
import {LeftArrowIcon, RightArrowIcon} from "../icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../text";
import {createPortal} from "react-dom";
import {SlideItem, SliderNavigationButton, SlidesWrapper} from "./style";
import ProgressBar from "../progressBar";

const Slider = ({
                    children,
                    renderControls,
                    controlContainer,
                    initialActiveSlideIndex = 0,
                    ...props
                }) => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(initialActiveSlideIndex)
    const [direction, setDirection] = useState('next')

    const slides = React.Children.toArray(children);
    const totalSlides = slides.length;
    const activeSlide = slides[activeSlideIndex];

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

    const progress = (activeSlideIndex / (totalSlides - 1)) * 100;
    return (
        <SlidesWrapper>
            <ProgressBar progress={progress} />
            {slides.map((child, index) => (
                <SlideItem key={index} active={activeSlideIndex === index} direction={direction}>
                    {child}
                </SlideItem>
            ))}
            {renderControls && controlContainer && createPortal(
                renderControls({
                    activeSlideIndex,
                    totalSlides: slides.length,
                    prevSlide,
                    nextSlide,
                    activeSlide,
                }),
                controlContainer
            )}
        </SlidesWrapper>
    )
}

// You can create any component for slide controls, but this component must have essential props - activeSlideIndex, totalSlides, prevSlide, nextSlide
export const BaseSliderControls = ({activeSlideIndex, totalSlides, prevSlide, nextSlide}) => {
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

export default Slider;