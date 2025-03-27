
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {useState} from "react";

import useCSSVariables from "../../../hook/useCSSVariables";
import useApiMutationResponse from "../../../hook/api/useApiMutationResponse";
import {useDeleteFolderMutation, useUpdateFolderMutation} from "../api";

import {paths} from "../../../app/routes";

import {FlexCol, FlexRow} from "../../../components/layout/wrapper/position/style";
import HiddenTextArea from "../../../components/input/textArea/hiddenTextArea";
import {AddIcon, DeleteIcon, MoreIcon, PublishIcon, TimeIcon} from "../../../components/icon";
import {BaseButtonBar, SquareSecondaryButton} from "../../../components/button/style";
import ContextMenu, {ContextMenuItem} from "../../../components/menu";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";

import {MODALS} from "../../../components/modal/modalManager";
import {openModal} from "../../../components/modal/modalSlice";
import Tooltip from "../../../components/tooltip";

// todo Input of folder`s name remember old value without page reloading
const FolderProfileHeader = ({folderId, folderName: initialFolderName, folderUpdatedAt}) => {

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
                <Tooltip text="Change folder name">
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
                </Tooltip>
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
                <Tooltip text="Add module">
                    <SquareSecondaryButton onClick={handleOpenAddModuleModal}>
                        <AddIcon/>
                    </SquareSecondaryButton>
                </Tooltip>
                <ContextMenu
                    trigger={
                        <Tooltip text="More">
                            <SquareSecondaryButton>
                                <MoreIcon/>
                            </SquareSecondaryButton>
                        </Tooltip>
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

export default FolderProfileHeader;