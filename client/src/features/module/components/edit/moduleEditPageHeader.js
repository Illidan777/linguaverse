// React components and hooks
import React from "react";
import {useNavigate} from "react-router";

// Custom hooks
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import {useActivateModuleMutation, useDeleteModuleMutation, useUpdateModuleMutation} from "../../api";

// Routing
import {paths} from "../../../../app/routes";

// UI components
import {FlexRow} from "../../../../components/layout/wrapper/position/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import WrappableContextMenu from "../../../../components/menu/wrappable";
import Tooltip from "../../../../components/tooltip";
import {PrimaryButton, SecondaryButton, SquareSecondaryButton} from "../../../../components/button/style";
import {DeleteIcon, MoreIcon} from "../../../../components/icon";

// Theme
import theme from "../../../../style/theme";

// Constants
import {MODULE_DRAFT_STATUS} from "../../../../constants/module";

/**
 * ModuleEditPageHeader Component
 * This component renders the header section for the module edit page.
 * It includes buttons for saving, activating, and deleting the module,
 * as well as a context menu for additional actions.
 *
 * @param {Object} formData - The module data being edited.
 */
export default function ModuleEditPageHeader({formData}) {
    // Extract module ID and status from formData
    const {id, status} = formData

    // Initialize navigation hook
    const navigate = useNavigate()

    // Initialize module mutations using RTK auto generated hooks
    const [updateModule] = useApiMutationResponse(useUpdateModuleMutation(), {
        successMessage: "The module was saved successfully!",
    });
    const [deleteModule] = useApiMutationResponse(useDeleteModuleMutation(), {
        successMessage: "The module was successfully deleted!",
    });
    const [activateModule] = useApiMutationResponse(useActivateModuleMutation(), {
        successMessage: "The module was activated successfully and can be accessed for use!",
    });

    /**
     * Handles saving the module.
     * Makes an API call to update the module using the form data.
     */
    const onSaveModule = async () => {
        try {
            await updateModule({
                id,
                request: formData
            });
        } catch (error) {
            console.error("Error saving module:", error); // Log error if saving fails
        }
    }

    /**
     * Handles deleting the module.
     * Makes an API call to delete the module and navigates to the modules list.
     */
    const onDeleteModule = async () => {
        try {
            await deleteModule(id); // Delete the module
            navigate(paths.library.modules.getHref())  // Navigate back to the modules list
        } catch (error) {
            console.error("Error deleting module:", error); // Log error if deletion fails
        }
    }

    /**
     * Handles activating the module.
     * Makes an API call to activate the module.
     */
    const onActivateModule = async () => {
        try {
            await activateModule(id);  // Activate the module
        } catch (error) {
            console.error("Error activating module:", error);  // Log error if activation fails
        }
    }

    return (
        <FlexRow justify="space-between" align="flex-start">
            {/* Page Header */}
            <StyledText as="h2" size={FONT_SIZES.TITLE_MEDIUM} weight={FONT_WEIGHTS.SUPER_BOLD}>
                Edit module
            </StyledText>

            {/* Context Menu for additional actions. Is size of screen less than specified in  wrapThresholdQuery,
            buttons bar will be wrapped to context menu*/}
            <WrappableContextMenu
                wrapThresholdQuery={`(max-width: ${theme.media.mobile})`}
                trigger={
                    <Tooltip text="More">
                        <SquareSecondaryButton>
                            <MoreIcon/>
                        </SquareSecondaryButton>
                    </Tooltip>
                }
            >
                {/* Save Button */}
                <PrimaryButton onClick={onSaveModule}>
                    <StyledText as="span" size={FONT_SIZES.SIMPLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
                        Save
                    </StyledText>
                </PrimaryButton>

                {/* Activate Button (only visible if module is a draft) */}
                {status === MODULE_DRAFT_STATUS && (
                    <SecondaryButton onClick={onActivateModule}>
                        <StyledText as="span" size={FONT_SIZES.SIMPLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
                            Activate
                        </StyledText>
                    </SecondaryButton>
                )}

                {/* Delete Button */}
                <SecondaryButton onClick={onDeleteModule}>
                    <DeleteIcon size="15px"/>
                    <StyledText as="span" size={FONT_SIZES.SIMPLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
                        Delete
                    </StyledText>
                </SecondaryButton>
            </WrappableContextMenu>
        </FlexRow>
    );
};