import {FlexCenter, FlexCol} from "../../../../components/layout/wrapper/position/style";
import React, {useRef} from "react";
import Toggler from "../../../../components/input/toggler";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import useCSSVariables from "../../../../hook/useCSSVariables";
import {BaseButtonBar, CircleStyledButton} from "../../../../components/button/style";
import {FullScreenIcon, SettingsIcon, ShuffleIcon} from "../../../../components/icon";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import {useToggleFollowProgressMutation} from "../../../module/api";
import PracticeResult from "../practiceResult";
import FlashCardSlider from "./flashCardSlider";
import {FlashCardPracticeWrapper, ToolBar} from "./style";
import Tooltip from "../../../../components/tooltip";


export default function FlashCardPractice({moduleId, data, finished, onFinishPractice}) {
    const [coloredText] = useCSSVariables(['--colored-text-main', '--success-color', '--error-color'])
    const sliderControlsContainerRef = useRef(null);

    const {
        inProgressTerms,
        learnedTerms,
        followProgress,
        currentTermNumber
    } = data;

    const [toggleFollowProgress] = useApiMutationResponse(useToggleFollowProgressMutation(), {
        successMessage: "Follow progress mode has been activated/deactivated!",
    });

    const onToggleFollowProgress = async () => {
        try {
            await toggleFollowProgress(moduleId);
        } catch (error) {
            console.error("Error toggling follow progress position:", error);
        }
    }

    return (
        <>
            {
                finished ?
                    <FlashCardPracticeWrapper>
                        <PracticeResult inProgressCount={inProgressTerms.length} learnedCount={learnedTerms.length}/>
                    </FlashCardPracticeWrapper> :
                    <FlexCol gap="20px">
                        <FlashCardSlider
                            followProgress={followProgress}
                            moduleId={moduleId}
                            controlsRef={sliderControlsContainerRef}
                            initialSlideIndex={currentTermNumber}
                            onFinishSlider={onFinishPractice}
                        />
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
                                <Tooltip
                                    text="Sort the cards to keep track of what you already know and what you're
                                still learning. Turn off progress tracking if you want to quickly review cards."
                                >
                                    <Toggler initialPosition={followProgress} onSwitch={onToggleFollowProgress}/>
                                </Tooltip>
                            </FlexCenter>
                            <FlexCenter ref={sliderControlsContainerRef}>
                            </FlexCenter>
                            <FlexCenter>
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
                            </FlexCenter>
                        </ToolBar>
                    </FlexCol>
            }
        </>
    )
}