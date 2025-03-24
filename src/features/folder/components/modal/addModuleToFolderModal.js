import React from "react";
import {useNavigate, useParams} from "react-router";

import Modal, {ModalFooter} from "../../../../components/modal";
import {PrimaryButton, SquareStyledButton, TransparentPrimaryButton} from "../../../../components/button/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import {AddIcon, AddIcon2, CompletedIcon} from "../../../../components/icon";

import {FlexCol, FlexRow} from "../../../../components/layout/wrapper/position/style";
import LoadingBoundary from "../../../../components/layout/wrapper/boundary/loadingBoundary";
import ControllableErrorBoundary from "../../../../components/layout/wrapper/boundary/controllableErrorBoundary";
import EmptyContentBoundary from "../../../../components/layout/wrapper/boundary/emptyContentBoundary";
import {BaseFallbackComponent} from "../../../../components/layout/wrapper/boundary/fallback/base";
import ListItem from "../../../module/components/listItem";

import useCSSVariables from "../../../../hook/useCSSVariables";
import useApiQueryResponse from "../../../../hook/api/useApiQueryResponse";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import {useCreateModuleMutation, useGetAllModulesQuery} from "../../../module/api";
import {useAddModuleToFolderMutation, useDeleteModuleFromFolderMutation} from "../../api";

import {paths} from "../../../../app/routes";

export default function AddModuleToFolderModal(props) {
    const {onClose, folderId} = props;
    const [darkBaseColor] = useCSSVariables(["--lavanda-dark"])

    const navigate = useNavigate()

    const [createModule] = useApiMutationResponse(useCreateModuleMutation(), {
        showSuccessToast: false
    });
    const [addModuleToFolder] = useApiMutationResponse(useAddModuleToFolderMutation(), {
        successMessage: "Module has been successfully added to current folder!",
    });
    const [deleteModuleFromFolder] = useApiMutationResponse(useDeleteModuleFromFolderMutation(), {
        successMessage: "Module has been successfully deleted from current folder!",
    });
    const queryResult = useGetAllModulesQuery();
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);

    const onListItemAction = async (moduleId, isAlreadyAdded) => {
        if( isAlreadyAdded ) {
            await onDeleteModuleToFolder(moduleId)
        } else {
            await onAddModuleToFolder(moduleId)
        }
    }

    const onDeleteModuleToFolder = async (moduleId) => {
        try {
            await deleteModuleFromFolder({id: folderId, moduleId});
        } catch (error) {
            console.error("Error deleting module to folder:", error);
        }
    }

    const onAddModuleToFolder = async (moduleId) => {
        try {
            await addModuleToFolder({id: folderId, moduleId});
        } catch (error) {
            console.error("Error adding module to folder:", error);
        }
    }

    const onCreateModule = async () => {
        try {
            const data = await createModule();
            const {id} = data || {};

            await navigate(paths.module.edit.getHref(id));
            await onListItemAction(id);
        } catch (error) {
            console.error("Module creating error!", error);
        }
    };

    const renderItems = data?.map((item, index) => {
        const {
            id,
            name,
            termsCount,
            folders,

        } = item;

        const alreadyAddedToFolder = folders.some((folder) => +folder.id === +folderId);

        return (
            <ListItem
                key={index}
                name={name}
                termsCount={termsCount}
                author="you" // not implemented yet
                action={
                    <SquareStyledButton
                        onClick={() => onListItemAction(id, alreadyAddedToFolder)}
                    >
                        {alreadyAddedToFolder ? <CompletedIcon/> : <AddIcon2/>}
                    </SquareStyledButton>
                }
            >
            </ListItem>
        )
    })

    return (
        <Modal {...props} title="Add to folder">
            <FlexCol gap="20px">
                <FlexRow justify="flex-end">
                    <TransparentPrimaryButton onClick={onCreateModule}>
                        <AddIcon color={darkBaseColor}/>
                        <StyledText
                            as="span"
                            size={FONT_SIZES.SIMPLE_MEDIUM}
                            weight={FONT_WEIGHTS.REGULAR}
                            color={darkBaseColor}
                        >
                            Create
                        </StyledText>
                    </TransparentPrimaryButton>
                </FlexRow>
                <LoadingBoundary isLoading={isFetching}>
                    <ControllableErrorBoundary hasError={isError} fallback={<BaseFallbackComponent/>}>
                        <EmptyContentBoundary isEmpty={() => data.length === 0}>
                            {renderItems}
                        </EmptyContentBoundary>
                    </ControllableErrorBoundary>
                </LoadingBoundary>
            </FlexCol>
            <ModalFooter>
                <PrimaryButton
                    onClick={onClose}
                >
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Ready
                    </StyledText>
                </PrimaryButton>
            </ModalFooter>
        </Modal>
    )
};