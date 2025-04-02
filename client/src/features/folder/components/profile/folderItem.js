/**
 * FolderItem Component
 *
 * This component represents a module inside a folder. It allows users to navigate to the module
 * and provides an option to delete the module from the folder.
 */

import React, { useCallback, useRef } from "react";
import { useNavigate } from "react-router";

// Hooks
import useCSSVariables from "../../../../hook/useCSSVariables";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import { useDeleteModuleFromFolderMutation } from "../../api";

// Components
import ListItem from "../../../module/components/list/listItem";
import ContextMenu, { ContextMenuItem } from "../../../../components/menu";
import Tooltip from "../../../../components/tooltip";

// Styled Components
import { SquareStyledButton } from "../../../../components/button/style";
import { DeleteIcon, MoreIcon } from "../../../../components/icon";
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../../../../components/text";

// Constants
import { paths } from "../../../../app/routes";

/**
 * FolderItem Component
 *
 * @param {Object} props - Component props
 * @param {string} props.folderId - ID of the folder
 * @param {Object} props.module - Module data
 * @param {string} props.module.id - Module ID
 * @param {string} props.module.name - Module name
 * @param {number} props.module.termsCount - Number of terms in the module
 */
export default function FolderItem({ folderId, module }) {
    const { id, name, termsCount } = module;
    const [errorColor] = useCSSVariables(["--error-color"]);
    const navigate = useNavigate();
    const contextMenuRef = useRef(null);

    // Mutation hook for deleting a module from a folder
    const [deleteModuleFromFolder] = useApiMutationResponse(useDeleteModuleFromFolderMutation(), {
        successMessage: "Module has been successfully deleted from current folder!",
    });

    /**
     * Handles module deletion from the folder.
     * @param {string} moduleId - ID of the module to be deleted
     */
    const onDeleteModuleFromFolder = useCallback(async (moduleId) => {
        try {
            await deleteModuleFromFolder({ id: folderId, moduleId });
        } catch (error) {
            console.error("Error deleting module from folder:", error);
        }
    }, [folderId, deleteModuleFromFolder]);

    /**
     * Navigates to the module page unless the context menu is clicked.
     * @param {Event} e - Click event
     */
    const onItemNavigate = (e) => {
        e.preventDefault();
        if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
            navigate(paths.module.index.getHref(id));
        }
    };

    return (
        <div onClick={onItemNavigate}>
            <ListItem
                key={id}
                name={name}
                termsCount={termsCount}
                author="you"
                action={
                    <ContextMenu
                        trigger={
                            <Tooltip text="More">
                                <SquareStyledButton ref={contextMenuRef}>
                                    <MoreIcon />
                                </SquareStyledButton>
                            </Tooltip>
                        }
                    >
                        <ContextMenuItem onClick={() => onDeleteModuleFromFolder(id)}>
                            <DeleteIcon color={errorColor} />
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
                }
            />
        </div>
    );
}