import React from "react";
import {useDispatch} from "react-redux";

import {
    useAddModuleToFolderMutation,
    useDeleteModuleFromFolderMutation,
    useGetAllFoldersQuery
} from "../../../folder/api";
import useApiQueryResponse from "../../../../hook/api/useApiQueryResponse";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";

import {openModal} from "../../../../components/modal/modalSlice";
import {MODALS} from "../../../../components/modal/modalManager";

import ContextMenu, {ContextMenuItem} from "../../../../components/menu";
import {AddIcon, CompletedIcon, FolderIcon, SavedIcon, SaveIcon} from "../../../../components/icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import {SquareSecondaryButton} from "../../../../components/button/style";

import LoadingBoundary from "../../../../components/layout/wrapper/boundary/loadingBoundary";
import ControllableErrorBoundary from "../../../../components/layout/wrapper/boundary/controllableErrorBoundary";
import EmptyContentBoundary from "../../../../components/layout/wrapper/boundary/emptyContentBoundary";

export default function ModuleEditFolderContextMenu({moduleId, folders}) {
    const dispatch = useDispatch();

    const queryResult = useGetAllFoldersQuery();
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);

    const [addModuleToFolder] = useApiMutationResponse(useAddModuleToFolderMutation(), {
        successMessage: "Module has been successfully added to folder!",
    });

    const [deleteModuleFromFolder] = useApiMutationResponse(useDeleteModuleFromFolderMutation(), {
        successMessage: "Module has been successfully deleted from current folder!",
    });

    const handleModuleFolderAction = async (folderId, isAlreadyAdded) => {
        try {
            isAlreadyAdded
                ? await deleteModuleFromFolder({id: folderId, moduleId})
                : await addModuleToFolder({id: folderId, moduleId});
        } catch (error) {
            console.error(
                `Error ${isAlreadyAdded ? 'removing' : 'adding'} module to folder:`,
                error
            );
        }
    };

    const handleOpenCreateFolderModal = () => {
        dispatch(openModal({modalName: MODALS.createFolder.tag}));
    };

    const folderItems = data?.map(({id, name}) => {
        const isAlreadyAdded = folders.some(folder => +folder.id === +id);
        return (
            <ContextMenuItem key={id} justify="flex-start" onClick={() => handleModuleFolderAction(id, isAlreadyAdded)}>
                {isAlreadyAdded ? <CompletedIcon/> : <FolderIcon/>}
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
                    {folders.length === 0 ? <SaveIcon/> : <SavedIcon/>}
                </SquareSecondaryButton>
            }
        >
            <LoadingBoundary isLoading={isFetching} spinnerSize="40px">
                <ControllableErrorBoundary hasError={isError}>
                    <EmptyContentBoundary isEmpty={() => data?.length === 0}>
                        <ContextMenuItem justify="flex-start" onClick={handleOpenCreateFolderModal}>
                            <AddIcon size="22px"/>
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
};