import React, { useState } from "react";
import { createPortal } from "react-dom";
import { BaseButtonBar } from "../button/style";
import { LeftArrowIcon, RightArrowIcon } from "../icon";
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../text";
import { SlideItem, SliderNavigationButton, SlidesWrapper } from "./style";
import ProgressBar from "../progressBar";

/**
 * Slider Component
 *
 * A generic slider component that supports custom controls and navigation.
 *
 * Props:
 * - children: Slides to be displayed.
 * - renderControls: Function to render custom controls.
 * - controlContainer: DOM element to render controls to any place you want using a portal.
 * - initialActiveSlideIndex: Index of the initially active slide.
 */
const Slider = ({
                    children,
                    renderControls,
                    controlContainer,
                    initialActiveSlideIndex = 0,
                    ...props
                }) => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(initialActiveSlideIndex);
    const [direction, setDirection] = useState("next");

    const slides = React.Children.toArray(children);
    const totalSlides = slides.length;
    const activeSlide = slides[activeSlideIndex];

    /** Navigate to the previous slide */
    const prevSlide = () => {
        if (activeSlideIndex > 0) {
            setActiveSlideIndex((prev) => prev - 1);
            setDirection("prev");
        }
    };

    /** Navigate to the next slide */
    const nextSlide = () => {
        if (activeSlideIndex < totalSlides - 1) {
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
            {renderControls &&
                controlContainer &&
                createPortal(
                    renderControls({
                        activeSlideIndex,
                        totalSlides,
                        prevSlide,
                        nextSlide,
                        activeSlide,
                    }),
                    controlContainer
                )}
        </SlidesWrapper>
    );
};

/**
 * BaseSliderControls Component
 *
 * Default slider navigation controls including previous and next buttons.
 *
 * Props:
 * - activeSlideIndex: Current slide index.
 * - totalSlides: Total number of slides.
 * - prevSlide: Function to navigate to the previous slide.
 * - nextSlide: Function to navigate to the next slide.
 */
export const BaseSliderControls = ({ activeSlideIndex, totalSlides, prevSlide, nextSlide }) => {
    return (
        <BaseButtonBar>
            <SliderNavigationButton disabled={activeSlideIndex === 0} onClick={prevSlide}>
                <LeftArrowIcon size="35px" />
            </SliderNavigationButton>
            <StyledText as="span" size={FONT_SIZES.SIMPLE_MEDIUM} weight={FONT_WEIGHTS.SEMI_BOLD}>
                {activeSlideIndex + 1} / {totalSlides}
            </StyledText>
            <SliderNavigationButton disabled={activeSlideIndex === totalSlides - 1} onClick={nextSlide}>
                <RightArrowIcon size="35px" />
            </SliderNavigationButton>
        </BaseButtonBar>
    );
};

export default Slider;
