/**
 * FlashCardPractice Component
 *
 * This component represents the FlashCard practice functionality of the application.
 * It allows users to interact with a set of flashcards, track progress, and control the display of the cards.
 * It manages the presentation of a flashcard slider and provides various tools like toggling the follow progress mode.
 *
 * @component
 */

// React components and hooks
import React, {useRef} from "react";

// UI components
import {FlexCol} from "../../../../components/layout/wrapper/position/style";
import Toggler from "../../../../components/input/toggler";
import Tooltip from "../../../../components/tooltip";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import {BaseButtonBar, CircleStyledButton} from "../../../../components/button/style";
import {FullScreenIcon, SettingsIcon, ShuffleIcon} from "../../../../components/icon";

// Custom hooks & API
import useCSSVariables from "../../../../hook/useCSSVariables";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import {useToggleFollowProgressMutation} from "../../../module/api";

// FlashCardPractice specific components
import PracticeResult from "../practiceResult";
import FlashCardSlider from "./flashCardSlider";
import {
    FlashCardPracticeWrapper,
    FollowProgressContainer,
    SliderControlsContainer,
    SliderToolsContainer,
    ToolBar
} from "./style";

/**
 * FlashCardPractice - A component that allows users to practice flashcards, view results, and toggle progress tracking.
 *
 * @param {Object} props - The component props
 * @param {string} props.moduleId - The ID of the module being practiced
 * @param {Object} props.data - The data object containing in-progress terms, learned terms, and follow progress
 * @param {boolean} props.finished - Boolean flag indicating if the practice session is finished
 * @param {function} props.onFinishPractice - Callback function to handle when the practice session is finished
 *
 * @returns {JSX.Element} The rendered FlashCardPractice component
 */
export default function FlashCardPractice({moduleId, data, finished, onFinishPractice}) {
    // Custom hook to retrieve CSS variables for dynamic styling
    const [coloredText] = useCSSVariables(['--colored-text-main', '--success-color', '--error-color'])

    // Reference for controlling slider interactions
    const sliderControlsContainerRef = useRef(null);

    // Destructuring data object for terms and progress information
    const {
        inProgressTerms,
        learnedTerms,
        followProgress,
        currentTermNumber
    } = data;

    // Custom hook for handling the response of the follow progress API mutation
    const [toggleFollowProgress] = useApiMutationResponse(useToggleFollowProgressMutation(), {
        successMessage: "Follow progress mode has been activated/deactivated!",
    });

    /**
     * onToggleFollowProgress - Handles the toggling of the follow progress mode.
     * This function triggers the mutation to toggle the follow progress state for the given module.
     */
    const onToggleFollowProgress = async () => {
        try {
            // Trigger the API mutation to toggle follow progress
            await toggleFollowProgress(moduleId);
        } catch (error) {
            // Log any errors encountered during the toggle action
            console.error("Error toggling follow progress position:", error);
        }
    }

    return (
        <>
            {
                finished ? (
                        <FlashCardPracticeWrapper>
                            {/* Render practice result summary when practice is finished */}
                            <PracticeResult
                                inProgressCount={inProgressTerms.length}
                                learnedCount={learnedTerms.length}
                            />
                        </FlashCardPracticeWrapper>
                    )
                 : (
                        <FlexCol gap="20px">
                            {/* Render the flashcard slider and toolbar while in progress */}
                            <FlashCardSlider
                                followProgress={followProgress}
                                moduleId={moduleId}
                                controlsRef={sliderControlsContainerRef}
                                initialSlideIndex={currentTermNumber}
                                onFinishSlider={onFinishPractice}
                            />
                            <ToolBar>
                                <FollowProgressContainer>
                                    {/* Display and toggle the follow progress state */}
                                    <StyledText
                                        as="span"
                                        size={FONT_SIZES.SIMPLE_MEDIUM}
                                        weight={FONT_WEIGHTS.SEMI_BOLD}
                                        color={coloredText}
                                    >
                                        Follow progress
                                    </StyledText>
                                    <Tooltip
                                        width="300px"
                                        height="80px"
                                        text="Sort the cards to keep track of what you already know and what you're
                                still learning. Turn off progress tracking if you want to quickly review cards."
                                    >
                                        <Toggler initialPosition={followProgress} onSwitch={onToggleFollowProgress}/>
                                    </Tooltip>
                                </FollowProgressContainer>
                                {/* Slider control container (next slide, prev slide, progress tracking) */}
                                <SliderControlsContainer ref={sliderControlsContainerRef}>
                                </SliderControlsContainer>
                                <SliderToolsContainer>
                                    <BaseButtonBar>
                                        <Tooltip text="Shuffle (not implemented)">
                                            <CircleStyledButton>
                                                <ShuffleIcon/>
                                            </CircleStyledButton>
                                        </Tooltip>
                                        <Tooltip text="Settings (not implemented)">
                                            <CircleStyledButton disabled>
                                                <SettingsIcon/>
                                            </CircleStyledButton>
                                        </Tooltip>
                                        <Tooltip text="Full screen (not implemented)">
                                            <CircleStyledButton disabled>
                                                <FullScreenIcon/>
                                            </CircleStyledButton>
                                        </Tooltip>
                                    </BaseButtonBar>
                                </SliderToolsContainer>
                            </ToolBar>
                        </FlexCol>
                    )
            }
        </>
    )
}