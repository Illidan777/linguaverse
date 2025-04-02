// React components and hooks
import React from "react";
import toast from "react-hot-toast";

// Custom hooks & API hooks
import useCSSVariables from "../../../../hook/useCSSVariables";
import {useGetModuleTermsQuery, useUpdateTermStatusMutation} from "../../../module/api";
import useApiQueryResponse from "../../../../hook/api/useApiQueryResponse";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";

// UI components
import {FlexCenter} from "../../../../components/layout/wrapper/position/style";
import LoadingBoundary from "../../../../components/layout/wrapper/boundary/loadingBoundary";
import ControllableErrorBoundary from "../../../../components/layout/wrapper/boundary/controllableErrorBoundary";
import {BaseFallbackComponent} from "../../../../components/layout/wrapper/boundary/fallback/base";
import EmptyContentBoundary from "../../../../components/layout/wrapper/boundary/emptyContentBoundary";
import Slider from "../../../../components/slider";
import {SliderNavigationButton} from "../../../../components/slider/style";
import {CheckmarkIcon, CrossIcon, LeftArrowIcon, RightArrowIcon} from "../../../../components/icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import Tooltip from "../../../../components/tooltip";

// FlashCardSlider specific components
import FlashCard from "./flashCard";
import {FlashCardPracticeWrapper} from "./style";

/**
 * Object containing phrases for success and failure progress.
 */
const progressPhrases = {
    success: [
        'Excellent!', 'Brilliant!', 'Good job!', 'Well done!', 'Awesome!',
        'You nailed it!', 'Superb!', 'Keep up the great work!', 'Fantastic!',
        'You are on fire!', 'Way to go!', 'Impressive!', 'You did it!',
    ],
    failure: [
        'No worries, just keep going!', 'Next time will be better!', 'You are the best!',
        'Stay positive, you’re learning!', 'It’s all part of the journey!', 'Every step counts!',
        'Mistakes help you grow!', 'Keep trying, you’ll get it!', 'Learning is a process!',
        'Progress, not perfection!', 'Believe in yourself!', 'You got this!',
    ],
};

/**
 * Gets a random phrase from the specified category (success or failure).
 * @param {string} category - The category of phrases ('success' or 'failure').
 * @returns {string} - A random phrase from the category.
 */
const getRandomPhrase = (category) => {
    const phrases = progressPhrases[category];
    return phrases[Math.floor(Math.random() * phrases.length)];
};

/**
 * FlashCardSlider component - Displays a slider of flashcards for a specific module.
 *
 * @param {Object} props
 * @param {boolean} props.followProgress - Whether to track progress of the user.
 * @param {string} props.moduleId - The ID of the module being studied.
 * @param {React.Ref} props.controlsRef - Reference to the control container for the slider.
 * @param {number} props.initialSlideIndex - The initial slide index.
 * @param {function} props.onFinishSlider - Callback function to handle finishing the slider.
 *
 * @returns {JSX.Element} The rendered FlashCardSlider component.
 */
const FlashCardSlider = ({
                             followProgress,
                             moduleId,
                             controlsRef,
                             initialSlideIndex,
                             onFinishSlider,
                         }) => {
    // Custom hook to retrieve CSS variables for dynamic styling
    const [successColor, errorColor] = useCSSVariables(['--success-color', '--error-color'])

    // Custom hook to retrieve terms by specific module for flashcards slider
    const queryResult = useGetModuleTermsQuery(moduleId);
    const {data = [], isError, isFetching} = useApiQueryResponse(queryResult);

    // Custom hook for handling the response of the updating term (flash card status), user learned term or not
    const [updateTermStatus] = useApiMutationResponse(useUpdateTermStatusMutation(), {
        showSuccessToast: false,
    });

    /**
     * Updates the term's status (learned or nor) and shows a success or failure toast.
     * We update term status on each slide, to save slide position, But if follow progress is enabled, we also track
     * user`s answer. Based on these saved result - we will see result in progress table and chart
     * @param {string} termId - The ID of the term to update.
     * @param {boolean} learned - Whether the term is learned or not.
     * @param {number} currentIndex - The current index of the term.
     */
    const updateStatus = async (termId, learned, currentIndex) => {
        try {
            // Trigger the API mutation
            await updateTermStatus({id: moduleId, termId, learned, currentIndex});

            // If follow progress field is enabled - on each slide we show toast with message accordingly to
            // progress category (success, failure)
            if (followProgress) {
                const toastText = getRandomPhrase(learned ? 'success' : 'failure');
                toast.success(toastText);
            }
        } catch (error) {
            console.error("Error updating term status:", error);
            toast.error("Failed to update term status. Please try again.");
        }
    };

    // map flashcards based on terms within module
    const flashCards = data?.map((item, index) => {
        const {id, term, definition} = item;
        return (
            <FlashCard key={index} id={id} term={term} definition={definition} moduleId={moduleId}/>
        );
    })
    return (
        <FlashCardPracticeWrapper>
            <LoadingBoundary isLoading={isFetching}>
                <ControllableErrorBoundary hasError={isError} fallback={<BaseFallbackComponent/>}>
                    <EmptyContentBoundary isEmpty={() => flashCards.length === 0}>
                        <Slider
                            controlContainer={controlsRef.current}
                            initialActiveSlideIndex={initialSlideIndex}
                            renderControls={(controlsProps) => (
                                <FlashCardsSliderControls
                                    {...controlsProps}
                                    followProgress={followProgress}
                                    approveButtonColor={successColor}
                                    declineButtonColor={errorColor}
                                    updateTermStatus={updateStatus}
                                    onFinishSlider={onFinishSlider}
                                />
                            )}
                        >
                            {flashCards}
                        </Slider>
                    </EmptyContentBoundary>
                </ControllableErrorBoundary>
            </LoadingBoundary>
        </FlashCardPracticeWrapper>
    )
}

/**
 * FlashCardsSliderControls component - Controls for navigating the flashcard slider.
 *
 * @param {Object} props
 * @param {number} props.activeSlideIndex - The current active slide index.
 * @param {number} props.totalSlides - The total number of slides in the slider.
 * @param {function} props.prevSlide - Function to move to the previous slide.
 * @param {function} props.nextSlide - Function to move to the next slide.
 * @param {Object} props.activeSlide - The current active slide.
 * @param {boolean} props.followProgress - Whether to track progress of the user.
 * @param {string} props.approveButtonColor - The color for the approve button.
 * @param {string} props.declineButtonColor - The color for the decline button.
 * @param {function} props.updateTermStatus - Function to update the term status.
 * @param {function} props.onFinishSlider - Callback function when slider is finished.
 *
 * @returns {JSX.Element} The rendered FlashCardsSliderControls component.
 */
const FlashCardsSliderControls = ({
                                      activeSlideIndex,
                                      totalSlides,
                                      prevSlide,
                                      nextSlide,
                                      activeSlide,
                                      followProgress,
                                      approveButtonColor,
                                      declineButtonColor,
                                      updateTermStatus,
                                      onFinishSlider
                                  }) => {
    const {id} = activeSlide?.props || {};

    /**
     * Changes the slide based on the direction (previous or next) and updates the term status.
     * If follow progress enabled - the slider always moves forward and current slide index is saved, and receive value of
     * 'learned' variable, else learned is always false.
     * Trigger finish practice function on the last slide.
     * @param {string} direction - The direction of the slide ('next' or 'prev').
     * @param {boolean} [learned=false] - Whether the term was learned or not.
     */
    const changeSlide = (direction, learned = false) => {
        let newIndex = followProgress ? activeSlideIndex + 1 : activeSlideIndex + (direction === "next" ? 1 : -1);

        if (followProgress || direction === "next") {
            nextSlide();
        } else {
            prevSlide();
        }

        if (activeSlideIndex >= totalSlides - 1) {
            updateTermStatus(id, followProgress ? learned : false, newIndex);
            onFinishSlider();
        } else {
            updateTermStatus(id, followProgress ? learned : false, newIndex);
        }
    };

    return (
        <FlexCenter gap="20px">
            <Tooltip text={followProgress ? "Need to learn" : "Previous term"}>
                {/* Block previous slide button if it is first slide and follow progress disabled, because
                in follow progress mode we move only forward within slides*/}
                <SliderNavigationButton
                    disabled={!followProgress && activeSlideIndex === 0}
                    onClick={() => changeSlide("prev")}
                >
                    {/* If follow progress enabled - show Decline icon. else show previous slide (term) icon*/}
                    {followProgress ? <CrossIcon size="35px" color={declineButtonColor}/> :
                        <LeftArrowIcon size="35px"/>}
                </SliderNavigationButton>
            </Tooltip>
            <StyledText as="span" size={FONT_SIZES.SIMPLE_MEDIUM} weight={FONT_WEIGHTS.SEMI_BOLD}>
                {activeSlideIndex + 1} / {totalSlides}
            </StyledText>
            <Tooltip text={followProgress ? "I know" : "Next term"}>
                {/* Do not block next slide button because on the end on slider we have to receive practice result anyway*/}
                <SliderNavigationButton onClick={() => changeSlide("next", true)}>
                    {/* If follow progress enabled - show Approve(i know) icon. else show next slide (term) icon*/}
                    {followProgress ? <CheckmarkIcon size="35px" color={approveButtonColor}/> :
                        <RightArrowIcon size="25px"/>}
                </SliderNavigationButton>
            </Tooltip>
        </FlexCenter>
    );
};

export default FlashCardSlider;
