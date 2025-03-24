import React from "react";
import {useDispatch} from "react-redux";

import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import {useShuffleTermsMutation} from "../../api";

import {FlexRow} from "../../../../components/layout/wrapper/position/style";
import {BaseButtonBar, CircleSecondaryButton, SecondaryButton} from "../../../../components/button/style";
import {AddIcon, AIAssistIcon, ReverseIcon, SettingsIcon} from "../../../../components/icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";

import {openModal} from "../../../../components/modal/modalSlice";
import {MODALS} from "../../../../components/modal/modalManager";

const Toolbar = ({moduleId}) => {
    const dispatch = useDispatch();
    const [shuffleTerms] = useApiMutationResponse(useShuffleTermsMutation(), {
        successMessage: "Terms in module has been successfully shuffled!",
    });

    const onShuffleTerms = async () => {
        try {
            await shuffleTerms(moduleId);
        } catch (error) {
            console.error("Error shuffling terms in module:", error);
        }
    }

    const handleOpenModuleSettingsModal = () => {
        dispatch(openModal({
            modalName: MODALS.moduleSettings.tag,
        }));
    };

    return (
        <FlexRow justify="space-between">
            <BaseButtonBar>
                <SecondaryButton disabled>
                    <AddIcon size="20px"/>
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Import
                    </StyledText>
                </SecondaryButton>
                <SecondaryButton disabled>
                    <AddIcon size="20px"/>
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Add diagram
                    </StyledText>
                </SecondaryButton>
                <SecondaryButton disabled>
                    <AIAssistIcon/>
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Create from notes
                    </StyledText>
                </SecondaryButton>
            </BaseButtonBar>
            <BaseButtonBar>
                <CircleSecondaryButton onClick={handleOpenModuleSettingsModal}>
                    <SettingsIcon/>
                </CircleSecondaryButton>
                <CircleSecondaryButton onClick={onShuffleTerms}>
                    <ReverseIcon/>
                </CircleSecondaryButton>
            </BaseButtonBar>
        </FlexRow>
    )
}

export default Toolbar;