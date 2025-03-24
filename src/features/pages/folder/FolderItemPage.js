import React, {useCallback, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useDispatch} from "react-redux";

import {paths} from "../../../app/routes";

import useCSSVariables from "../../../hook/useCSSVariables";
import useApiQueryResponse from "../../../hook/api/useApiQueryResponse";
import useApiMutationResponse from "../../../hook/api/useApiMutationResponse";
import {
    useDeleteFolderMutation,
    useDeleteModuleFromFolderMutation,
    useGetFolderByIdQuery,
    useUpdateFolderMutation
} from "../../folder/api";

import DashboardPageLayout from "../../../components/layout/page";
import {FlexCol, FlexRow} from "../../../components/layout/wrapper/position/style";
import EmptyContentBoundary from "../../../components/layout/wrapper/boundary/emptyContentBoundary";

import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {AddIcon, DeleteIcon, MoreIcon, PublishIcon, TimeIcon} from "../../../components/icon";
import ContextMenu, {ContextMenuItem} from "../../../components/menu";
import {BaseButtonBar, SquareSecondaryButton, SquareStyledButton} from "../../../components/button/style";
import HiddenTextArea from "../../../components/input/textArea/hiddenTextArea";
import {openModal} from "../../../components/modal/modalSlice";
import {MODALS} from "../../../components/modal/modalManager";

import ListItem from "../../module/components/listItem";

const FolderItemPage = () => {

    const {id} = useParams();

    const queryResult = useGetFolderByIdQuery(id);
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);

    console.log('Folder item page render')

    const {
        name = 'Unknown folder name',
        updatedAt = 'Unknown folder changed date',
        modules = []
    } = !data ? {} : data;
    const moduleRenderItems = modules.map((module, index) =>
        <ModuleItem key={index} folderId={id} module={module}/>
    )

    return (
        <DashboardPageLayout
            isLoading={isFetching}
            isError={isError}
            header={
                <Header folderId={id} folderName={name} folderUpdatedAt={updatedAt}/>
            }
            content={
                <EmptyContentBoundary isEmpty={() => modules.length === 0}>
                    {moduleRenderItems}
                </EmptyContentBoundary>
            }
        />
    )
}

const ModuleItem = ({folderId, module}) => {

    const {id, name, termsCount} = module;
    const [errorColor] = useCSSVariables(["--error-color"])
    const [deleteModuleFromFolder] = useApiMutationResponse(useDeleteModuleFromFolderMutation(), {
        successMessage: "Module has been successfully deleted from current folder!",
    });

    const onDeleteModuleFromFolder = useCallback(async (moduleId) => {
        try {
            await deleteModuleFromFolder({id: folderId, moduleId});
        } catch (error) {
            console.error("Error adding module to folder:", error);
        }
    }, [])

    return <ListItem
        key={id}
        name={name}
        termsCount={termsCount}
        author="you"
        action={
            <ContextMenu
                trigger={
                    <SquareStyledButton>
                        <MoreIcon/>
                    </SquareStyledButton>
                }
            >
                <ContextMenuItem onClick={() => onDeleteModuleFromFolder(id)}>
                    <DeleteIcon color={errorColor}/>
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
    >
    </ListItem>

}

// todo Input of folder`s name remember old value without page reloading
const Header = ({folderId, folderName: initialFolderName, folderUpdatedAt}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorColor] = useCSSVariables(["--error-color"])

    const [folderName, setFolderName] = useState(initialFolderName);

    const [deleteFolder] = useApiMutationResponse(useDeleteFolderMutation(), {
        successMessage: "Folder has been successfully deleted!",
    });
    const [updateFolder] = useApiMutationResponse(useUpdateFolderMutation(), {
        successMessage: "Folder name has been successfully updated!",
    });

    const onUpdate = async (name) => {
        try {
            await updateFolder({
                id: folderId,
                name: name,
            });
        } catch (error) {
            console.error("Folder updating error!", error);
        }
    };

    const onDelete = async () => {
        try {
            await deleteFolder(folderId);
            navigate(paths.library.folders.getHref());
        } catch (error) {
            console.error("Folder deleting error!", error);
        }
    };

    const handleOpenAddModuleModal = () => {
        dispatch(openModal({
            modalName: MODALS.addModule.tag,
            modalProps: {
                folderId: folderId
            }
        }));
    };

    return (
        <FlexRow justify="space-between" align="flex-start">
            <FlexCol gap="30px">
                <HiddenTextArea
                    value={folderName}
                    onChange={(name) => setFolderName(name)}
                    onBlur={onUpdate}
                >
                    <StyledText
                        as="h2"
                        size={FONT_SIZES.TITLE_MEDIUM}
                        weight={FONT_WEIGHTS.SUPER_BOLD}
                    >
                        {folderName}
                    </StyledText>
                </HiddenTextArea>
                <FlexRow gap="10px">
                    <TimeIcon/>
                    <StyledText
                        as="h2"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Changed at {folderUpdatedAt}
                    </StyledText>
                </FlexRow>
            </FlexCol>
            <BaseButtonBar>
                <SquareSecondaryButton onClick={handleOpenAddModuleModal}>
                    <AddIcon/>
                </SquareSecondaryButton>
                <ContextMenu
                    trigger={
                        <SquareSecondaryButton>
                            <MoreIcon/>
                        </SquareSecondaryButton>
                    }
                >
                    <ContextMenuItem onClick={onDelete}>
                        <DeleteIcon color={errorColor}/>
                        <StyledText
                            as="span"
                            size={FONT_SIZES.SIMPLE_SMALL}
                            weight={FONT_WEIGHTS.SEMI_BOLD}
                            color={errorColor}
                        >
                            Delete
                        </StyledText>
                    </ContextMenuItem>
                    <ContextMenuItem disabled>
                        <PublishIcon/>
                        <StyledText
                            as="span"
                            size={FONT_SIZES.SIMPLE_SMALL}
                            weight={FONT_WEIGHTS.SEMI_BOLD}
                        >
                            Publish
                        </StyledText>
                    </ContextMenuItem>
                </ContextMenu>
            </BaseButtonBar>
        </FlexRow>
    )
}

export default FolderItemPage;