import useCSSVariables from "../../../../hook/useCSSVariables";
import {useGetModuleTermsQuery, useUpdateTermStatusMutation} from "../../../module/api";
import useApiQueryResponse from "../../../../hook/api/useApiQueryResponse";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import FlashCard from "./flashCard";
import LoadingBoundary from "../../../../components/layout/wrapper/boundary/loadingBoundary";
import ControllableErrorBoundary from "../../../../components/layout/wrapper/boundary/controllableErrorBoundary";
import {BaseFallbackComponent} from "../../../../components/layout/wrapper/boundary/fallback/base";
import EmptyContentBoundary from "../../../../components/layout/wrapper/boundary/emptyContentBoundary";
import Slider from "../../../../components/slider";
import {BaseButtonBar} from "../../../../components/button/style";
import {SliderNavigationButton} from "../../../../components/slider/style";
import {CheckmarkIcon, CrossIcon, LeftArrowIcon, RightArrowIcon} from "../../../../components/icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import React from "react";
import {FlashCardPracticeWrapper} from "./style";
import Tooltip from "../../../../components/tooltip";
import toast from "react-hot-toast";

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

const getRandomPhrase = (category) => {
    const phrases = progressPhrases[category];
    return phrases[Math.floor(Math.random() * phrases.length)];
};


const FlashCardSlider = ({
                             followProgress,
                             moduleId,
                             controlsRef,
                             initialSlideIndex,
                             onFinishSlider,
                         }) => {
    const [successColor, errorColor] = useCSSVariables(['--success-color', '--error-color'])

    const queryResult = useGetModuleTermsQuery(moduleId);
    const {data = [], isError, isFetching} = useApiQueryResponse(queryResult);
    const [updateTermStatus] = useApiMutationResponse(useUpdateTermStatusMutation(), {
        showSuccessToast: false,
    });
    const updateStatus = async (termId, learned, currentIndex) => {
        try {
            await updateTermStatus({ id: moduleId, termId, learned, currentIndex });

            if (followProgress) {
                const toastText = getRandomPhrase(learned ? 'success' : 'failure');
                toast.success(toastText);
            }
        } catch (error) {
            console.error("Error updating term status:", error);
            toast.error("Failed to update term status. Please try again.");
        }
    };

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
        <BaseButtonBar>
            <Tooltip text={followProgress ? "Need to learn" : "Previous term"}>
                <SliderNavigationButton
                    disabled={!followProgress && activeSlideIndex === 0}
                    onClick={() => changeSlide("prev")}
                >
                    {followProgress ? <CrossIcon size="35px" color={declineButtonColor}/> : <LeftArrowIcon size="35px"/>}
                </SliderNavigationButton>
            </Tooltip>
            <StyledText as="span" size={FONT_SIZES.SIMPLE_MEDIUM} weight={FONT_WEIGHTS.SEMI_BOLD}>
                {activeSlideIndex + 1} / {totalSlides}
            </StyledText>
            <Tooltip text={followProgress ? "I know" : "Next term"}>
                <SliderNavigationButton onClick={() => changeSlide("next", true)}>
                    {followProgress ? <CheckmarkIcon size="35px" color={approveButtonColor}/> :
                        <RightArrowIcon size="25px"/>}
                </SliderNavigationButton>
            </Tooltip>
        </BaseButtonBar>
    );
};

export default FlashCardSlider;
