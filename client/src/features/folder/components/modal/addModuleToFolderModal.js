/**
 * AddModuleToFolderModal Component
 *
 * This modal allows users to add or remove modules from a specified folder.
 * Users can also create a new module and navigate to its edit page.
 */

import React from "react";
import { useNavigate } from "react-router";

// UI Components
import Modal, { ModalFooter } from "../../../../components/modal";
import Tooltip from "../../../../components/tooltip";

// Styled Buttons
import {
    BaseButtonBar,
    PrimaryButton,
    SquareStyledButton,
    TransparentPrimaryButton
} from "../../../../components/button/style";

// Typography
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../../../../components/text";

// Icons
import { AddIcon, AddIcon2, CompletedIcon } from "../../../../components/icon";

// Layout & Positioning
import { FlexCol, FlexRow } from "../../../../components/layout/wrapper/position/style";

// Boundaries
import LoadingBoundary from "../../../../components/layout/wrapper/boundary/loadingBoundary";
import ControllableErrorBoundary from "../../../../components/layout/wrapper/boundary/controllableErrorBoundary";
import EmptyContentBoundary from "../../../../components/layout/wrapper/boundary/emptyContentBoundary";
import { BaseFallbackComponent } from "../../../../components/layout/wrapper/boundary/fallback/base";

// Components
import ListItem from "../../../module/components/list/listItem";

// Hooks
import useCSSVariables from "../../../../hook/useCSSVariables";
import useApiQueryResponse from "../../../../hook/api/useApiQueryResponse";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";

// API Queries & Mutations
import { useCreateModuleMutation, useGetAllModulesQuery } from "../../../module/api";
import { useAddModuleToFolderMutation, useDeleteModuleFromFolderMutation } from "../../api";

// Routing
import { paths } from "../../../../app/routes";

export default function AddModuleToFolderModal(props) {
    const { onClose, folderId } = props;
    const [darkBaseColor] = useCSSVariables(["--lavanda-dark"]);
    const navigate = useNavigate();

    // API Mutations
    const [createModule] = useApiMutationResponse(useCreateModuleMutation(), {
        showSuccessToast: false
    });
    const [addModuleToFolder] = useApiMutationResponse(useAddModuleToFolderMutation(), {
        successMessage: "Module has been successfully added to current folder!",
    });
    const [deleteModuleFromFolder] = useApiMutationResponse(useDeleteModuleFromFolderMutation(), {
        successMessage: "Module has been successfully deleted from current folder!",
    });

    // Fetch available modules
    const queryResult = useGetAllModulesQuery();
    const { data, isError, isFetching } = useApiQueryResponse(queryResult);

    /**
     * Handles adding/removing a module from the folder.
     */
    const onListItemAction = async (moduleId, isAlreadyAdded) => {
        if (isAlreadyAdded) {
            await onDeleteModuleFromFolder(moduleId);
        } else {
            await onAddModuleToFolder(moduleId);
        }
    };

    /**
     * Removes a module from the folder.
     */
    const onDeleteModuleFromFolder = async (moduleId) => {
        try {
            await deleteModuleFromFolder({ id: folderId, moduleId });
        } catch (error) {
            console.error("Error deleting module from folder:", error);
        }
    };

    /**
     * Adds a module to the folder.
     */
    const onAddModuleToFolder = async (moduleId) => {
        try {
            await addModuleToFolder({ id: folderId, moduleId });
        } catch (error) {
            console.error("Error adding module to folder:", error);
        }
    };

    /**
     * Creates a new module and navigates to its edit page.
     */
    const onCreateModule = async () => {
        try {
            const data = await createModule();
            const { id } = data || {};

            await navigate(paths.module.edit.getHref(id));
            await onListItemAction(id);
        } catch (error) {
            console.error("Module creation error!", error);
        }
    };

    /**
     * Renders the list of available modules.
     */
    const renderItems = data?.map((item) => {
        const { id, name, termsCount, folders } = item;
        const alreadyAddedToFolder = folders.some((folder) => +folder.id === +folderId);

        const onItemNavigate = (e) => {
            e.preventDefault();
            if (!e.target.closest("button")) {
                navigate(paths.module.index.getHref(id));
                onClose();
            }
        };

        return (
            <div key={id} onClick={onItemNavigate}>
                <ListItem
                    name={name}
                    termsCount={termsCount}
                    author="you" // Placeholder for future implementation
                    action={
                        <Tooltip text={alreadyAddedToFolder ? "Remove" : "Add"}>
                            <SquareStyledButton onClick={() => onListItemAction(id, alreadyAddedToFolder)}>
                                {alreadyAddedToFolder ? <CompletedIcon /> : <AddIcon2 />}
                            </SquareStyledButton>
                        </Tooltip>
                    }
                />
            </div>
        );
    });

    /**
     * Footer section with "Ready" button.
     */
    const footer = (
        <BaseButtonBar>
            <PrimaryButton onClick={onClose}>
                <StyledText as="span" size={FONT_SIZES.SIMPLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
                    Ready
                </StyledText>
            </PrimaryButton>
        </BaseButtonBar>
    );

    return (
        <Modal title="Add to folder" footer={footer} {...props}>
            <FlexCol gap="20px">
                <FlexRow justify="flex-end">
                    <TransparentPrimaryButton onClick={onCreateModule}>
                        <AddIcon color={darkBaseColor} />
                        <StyledText as="span" size={FONT_SIZES.SIMPLE_MEDIUM} weight={FONT_WEIGHTS.REGULAR} color={darkBaseColor}>
                            Create
                        </StyledText>
                    </TransparentPrimaryButton>
                </FlexRow>
                <LoadingBoundary isLoading={isFetching}>
                    <ControllableErrorBoundary hasError={isError} fallback={<BaseFallbackComponent />}>
                        <EmptyContentBoundary isEmpty={() => data.length === 0}>{renderItems}</EmptyContentBoundary>
                    </ControllableErrorBoundary>
                </LoadingBoundary>
            </FlexCol>
        </Modal>
    );
}
