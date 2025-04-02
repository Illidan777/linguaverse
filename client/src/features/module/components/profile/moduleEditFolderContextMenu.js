// React and Redux imports
import React from "react";
import { useDispatch } from "react-redux";

// API hooks and custom hooks for query and mutation handling
import {
    useAddModuleToFolderMutation,
    useDeleteModuleFromFolderMutation,
    useGetAllFoldersQuery
} from "../../../folder/api";
import useApiQueryResponse from "../../../../hook/api/useApiQueryResponse";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";

// Modal actions and modal manager
import { openModal } from "../../../../components/modal/modalSlice";
import { MODALS } from "../../../../components/modal/modalManager";

// Context menu and components for the UI
import ContextMenu, { ContextMenuItem } from "../../../../components/menu";
import { AddIcon, CompletedIcon, FolderIcon, SavedIcon, SaveIcon } from "../../../../components/icon";
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../../../../components/text";
import { SquareSecondaryButton } from "../../../../components/button/style";

// Layout and boundary components for error handling and loading states
import LoadingBoundary from "../../../../components/layout/wrapper/boundary/loadingBoundary";
import ControllableErrorBoundary from "../../../../components/layout/wrapper/boundary/controllableErrorBoundary";
import EmptyContentBoundary from "../../../../components/layout/wrapper/boundary/emptyContentBoundary";

/**
 * Context menu component for editing a module's folder assignments
 * @param {Object} props - The props for the component
 * @param {string} props.moduleId - The ID of the module being edited
 * @param {Array} props.folders - A list of folders the module is currently in
 * @returns {JSX.Element} - The rendered context menu component
 */
export default function ModuleEditFolderContextMenu({ moduleId, folders }) {
    const dispatch = useDispatch();

    // Fetch folders and handle API responses
    const queryResult = useGetAllFoldersQuery();
    const { data, isError, isFetching } = useApiQueryResponse(queryResult);

    // Mutation hooks for adding/removing modules to/from folders
    const [addModuleToFolder] = useApiMutationResponse(useAddModuleToFolderMutation(), {
        successMessage: "Module has been successfully added to folder!",
    });

    const [deleteModuleFromFolder] = useApiMutationResponse(useDeleteModuleFromFolderMutation(), {
        successMessage: "Module has been successfully deleted from current folder!",
    });

    /**
     * Handles the action of adding or removing a module from a folder.
     * @param {string} folderId - The ID of the folder to modify
     * @param {boolean} isAlreadyAdded - Flag indicating if the module is already in the folder
     */
    const handleModuleFolderAction = async (folderId, isAlreadyAdded) => {
        try {
            if (isAlreadyAdded) {
                await deleteModuleFromFolder({ id: folderId, moduleId });
            } else {
                await addModuleToFolder({ id: folderId, moduleId });
            }
        } catch (error) {
            console.error(
                `Error ${isAlreadyAdded ? 'removing' : 'adding'} module to folder:`,
                error
            );
        }
    };

    /**
     * Opens the modal to create a new folder
     */
    const handleOpenCreateFolderModal = () => {
        dispatch(openModal({ modalName: MODALS.createFolder.tag }));
    };

    // Map over the folder data to generate context menu items
    const folderItems = data?.map(({ id, name }) => {
        const isAlreadyAdded = folders.some(folder => +folder.id === +id);
        return (
            <ContextMenuItem key={id} justify="flex-start" onClick={() => handleModuleFolderAction(id, isAlreadyAdded)}>
                {isAlreadyAdded ? <CompletedIcon /> : <FolderIcon />}
                <StyledText as="span" size={FONT_SIZES.SIMPLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
                    {name}
                </StyledText>
            </ContextMenuItem>
        );
    });

    return (
        <ContextMenu
            trigger={
                <SquareSecondaryButton>
                    {folders.length === 0 ? <SaveIcon /> : <SavedIcon />}
                </SquareSecondaryButton>
            }
        >
            <LoadingBoundary isLoading={isFetching} spinnerSize="40px">
                <ControllableErrorBoundary hasError={isError}>
                    <EmptyContentBoundary isEmpty={() => data?.length === 0}>
                        <ContextMenuItem justify="flex-start" onClick={handleOpenCreateFolderModal}>
                            <AddIcon size="22px" />
                            <StyledText as="span" size={FONT_SIZES.SIMPLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
                                New folder
                            </StyledText>
                        </ContextMenuItem>
                        {folderItems}
                    </EmptyContentBoundary>
                </ControllableErrorBoundary>
            </LoadingBoundary>
        </ContextMenu>
    );
}
