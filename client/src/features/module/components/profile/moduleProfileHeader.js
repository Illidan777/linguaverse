// React and navigation imports
import React from "react";
import { useNavigate } from "react-router";

// Custom hooks and API hooks for handling CSS variables and mutations
import useCSSVariables from "../../../../hook/useCSSVariables";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import { useDeleteModuleMutation } from "../../api";

// Routes configuration
import { paths } from "../../../../app/routes";

// Layout and UI components
import { FlexCol, FlexRow } from "../../../../components/layout/wrapper/position/style";
import Dropdown, { DropDownItem } from "../../../../components/dropdown";
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../../../../components/text";
import { BaseButtonBar, SquareSecondaryButton } from "../../../../components/button/style";
import { DeleteIcon, EditIcon, MoreIcon, PublishIcon } from "../../../../components/icon";
import ContextMenu, { ContextMenuItem } from "../../../../components/menu";
import ModuleEditFolderContextMenu from "./moduleEditFolderContextMenu";
import Tooltip from "../../../../components/tooltip";

/**
 * ModuleProfileHeader component
 * Displays the header for a module profile, including module name, folder options,
 * and actions such as edit, delete, and publish.
 * @param {Object} props - The component props
 * @param {Object} props.moduleData - The module data including id, name, and folders
 * @param {string} props.moduleData.id - The module's ID
 * @param {string} props.moduleData.name - The module's name
 * @param {Array} props.moduleData.folders - The list of folders the module belongs to
 * @returns {JSX.Element} - The rendered component
 */
export default function ModuleProfileHeader({ moduleData: { id, name, folders } }) {
    const navigate = useNavigate();
    const [errorColor] = useCSSVariables(["--error-color"]);

    // Mutation hook for deleting the module
    const [deleteModule] = useApiMutationResponse(useDeleteModuleMutation(), {
        showSuccessToast: true,
        successMessage: "Module has been successfully deleted!",
    });

    /**
     * Handles the deletion of a module.
     * Navigates to the module library after successful deletion.
     */
    const handleDeleteModule = async () => {
        try {
            await deleteModule(id); // Delete the module by its ID
            navigate(paths.library.modules.getHref()); // Redirect to module library after deletion
        } catch (error) {
            console.error("Error deleting module:", error);
        }
    };

    return (
        <FlexRow justify="space-between" align="flex-start">
            <FlexCol gap="20px">
                {/* Dropdown for selecting folders if available */}
                {folders.length > 0 && (
                    <Dropdown onSelect={({ folderId }) => navigate(paths.folder.getHref(folderId))}>
                        {folders.map(({ id, name }) => (
                            <DropDownItem key={id} folderId={id} label={name} selected>
                                {name}
                            </DropDownItem>
                        ))}
                    </Dropdown>
                )}
                {/* Module name display */}
                <StyledText as="h2" size={FONT_SIZES.TITLE_MEDIUM} weight={FONT_WEIGHTS.SUPER_BOLD}>
                    {name}
                </StyledText>
            </FlexCol>
            <BaseButtonBar>
                {/* Tooltip for "Save/edit folder" action */}
                <Tooltip text="Save/edit folder">
                    <ModuleEditFolderContextMenu moduleId={id} folders={folders} />
                </Tooltip>

                {/* Tooltip for "Publish" action */}
                <Tooltip text="Publish">
                    <SquareSecondaryButton disabled>
                        <PublishIcon />
                    </SquareSecondaryButton>
                </Tooltip>

                {/* Tooltip for "Other" actions (edit, delete) */}
                <Tooltip text="Other">
                    <ContextMenu trigger={<SquareSecondaryButton><MoreIcon /></SquareSecondaryButton>}>
                        <ContextMenuItem onClick={() => navigate(paths.module.edit.getHref(id))}>
                            <EditIcon />
                            <StyledText as="span" size={FONT_SIZES.SIMPLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
                                Edit
                            </StyledText>
                        </ContextMenuItem>
                        <ContextMenuItem onClick={handleDeleteModule}>
                            <DeleteIcon />
                            <StyledText
                                as="span"
                                size={FONT_SIZES.SIMPLE_SMALL}
                                weight={FONT_WEIGHTS.SEMI_BOLD}
                                color={errorColor}
                            >
                                Delete
                            </StyledText>
                        </ContextMenuItem>
                    </ContextMenu>
                </Tooltip>
            </BaseButtonBar>
        </FlexRow>
    );
}