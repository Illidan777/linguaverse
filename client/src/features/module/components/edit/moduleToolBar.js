/**
 * Toolbar Component
 *
 * This component renders a toolbar with buttons for actions like opening a module settings modal,
 * shuffling terms on module edit page.
 *
 * @param {Object} props - Component properties
 * @param {string} props.moduleId - The ID of the current module
 *
 * @returns {JSX.Element} Toolbar component
 */

import React from "react";
import { useDispatch } from "react-redux";

// Custom hooks and API hooks
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import { useShuffleTermsMutation } from "../../api";

// UI components
import { FlexRowSpaceBetween } from "../../../../components/layout/wrapper/position/style";
import { BaseButtonBar, CircleSecondaryButton, SecondaryButton } from "../../../../components/button/style";
import { AddIcon, AIAssistIcon, ReverseIcon, SettingsIcon } from "../../../../components/icon";
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../../../../components/text";

// Modal management
import { openModal } from "../../../../components/modal/modalSlice";
import { MODALS } from "../../../../components/modal/modalManager";

// Styling
import theme from "../../../../style/theme";

// Context menu and Tooltip
import WrappableContextMenu from "../../../../components/menu/wrappable";
import Tooltip from "../../../../components/tooltip";

/**
 * Handles the shuffling of terms and other settings actions in a module.
 *
 * @async
 * @function onShuffleTerms
 * @throws {Error} If the shuffle terms mutation fails
 */
export default function Toolbar({ moduleId }) {
    const dispatch = useDispatch();
    const [shuffleTerms] = useApiMutationResponse(useShuffleTermsMutation(), {
        successMessage: "Terms in module have been successfully shuffled!",
    });

    /**
     * Shuffles the terms in the module using the API mutation hook.
     *
     * @returns {Promise<void>} A promise that resolves when terms are shuffled
     */
    const onShuffleTerms = async () => {
        try {
            await shuffleTerms(moduleId);
        } catch (error) {
            console.error("Error shuffling terms in module:", error);
        }
    };

    /**
     * Opens the module settings modal.
     */
    const handleOpenModuleSettingsModal = () => {
        dispatch(openModal({
            modalName: MODALS.moduleSettings.tag,
        }));
    };

    return (
        <FlexRowSpaceBetween>
            {/* Wrappable context menu with additional actions */}
            <WrappableContextMenu
                alignRight
                wrapThresholdQuery={`(max-width: ${theme.media.bigTablet})`}
                trigger={
                    <Tooltip text="More">
                        <CircleSecondaryButton>
                            <AddIcon />
                        </CircleSecondaryButton>
                    </Tooltip>
                }
            >
                {/* Disabled buttons for additional actions */}
                <SecondaryButton disabled>
                    <AddIcon size="20px" />
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Import
                    </StyledText>
                </SecondaryButton>
                <SecondaryButton disabled>
                    <AddIcon size="20px" />
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Add diagram
                    </StyledText>
                </SecondaryButton>
                <SecondaryButton disabled>
                    <AIAssistIcon />
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Create from notes
                    </StyledText>
                </SecondaryButton>
            </WrappableContextMenu>

            {/* Base button bar with settings and shuffle buttons */}
            <BaseButtonBar>
                <CircleSecondaryButton onClick={handleOpenModuleSettingsModal}>
                    <SettingsIcon />
                </CircleSecondaryButton>
                <CircleSecondaryButton onClick={onShuffleTerms}>
                    <ReverseIcon />
                </CircleSecondaryButton>
            </BaseButtonBar>
        </FlexRowSpaceBetween>
    );
}