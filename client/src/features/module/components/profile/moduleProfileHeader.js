import React from "react";
import {useNavigate} from "react-router";

import useCSSVariables from "../../../../hook/useCSSVariables";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import {useDeleteModuleMutation} from "../../api";

import {paths} from "../../../../app/routes";

import {FlexCol, FlexRow} from "../../../../components/layout/wrapper/position/style";
import Dropdown, {DropDownItem} from "../../../../components/dropdown";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import {BaseButtonBar, SquareSecondaryButton} from "../../../../components/button/style";
import {DeleteIcon, EditIcon, MoreIcon, PublishIcon} from "../../../../components/icon";
import ContextMenu, {ContextMenuItem} from "../../../../components/menu";

import ModuleEditFolderContextMenu from "./moduleEditFolderContextMenu";
import Tooltip from "../../../../components/tooltip";

export default function ModuleProfileHeader({moduleData: {id, name, folders}}) {
    const navigate = useNavigate();
    const [errorColor] = useCSSVariables(["--error-color"]);

    const [deleteModule] = useApiMutationResponse(useDeleteModuleMutation(), {
        showSuccessToast: true,
        successMessage: "Module has been successfully deleted!",
    });

    const handleDeleteModule = async () => {
        try {
            await deleteModule(id);
        } catch (error) {
            console.error("Error deleting module:", error);
        }
    };

    return (
        <FlexRow justify="space-between" align="flex-start">
            <FlexCol gap="20px">
                {folders.length > 0 && (
                    <Dropdown onSelect={({folderId}) => navigate(paths.folder.getHref(folderId))}>
                        {folders.map(({id, name}) => (
                            <DropDownItem key={id} folderId={id} label={name} selected>
                                {name}
                            </DropDownItem>
                        ))}
                    </Dropdown>
                )}
                <StyledText as="h2" size={FONT_SIZES.TITLE_MEDIUM} weight={FONT_WEIGHTS.SUPER_BOLD}>
                    {name}
                </StyledText>
            </FlexCol>
            <BaseButtonBar>
                <Tooltip text="Save/edit folder">
                    <ModuleEditFolderContextMenu moduleId={id} folders={folders}/>
                </Tooltip>
                <Tooltip text="Publish">
                    <SquareSecondaryButton disabled>
                        <PublishIcon/>
                    </SquareSecondaryButton>
                </Tooltip>
                <Tooltip text="Other">
                    <ContextMenu trigger={<SquareSecondaryButton><MoreIcon/></SquareSecondaryButton>}>
                        <ContextMenuItem onClick={() => navigate(paths.module.edit.getHref(id))}>
                            <EditIcon/>
                            <StyledText as="span" size={FONT_SIZES.SIMPLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
                                Edit
                            </StyledText>
                        </ContextMenuItem>
                        <ContextMenuItem onClick={handleDeleteModule}>
                            <DeleteIcon/>
                            <StyledText as="span" size={FONT_SIZES.SIMPLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}
                                        color={errorColor}>
                                Delete
                            </StyledText>
                        </ContextMenuItem>
                    </ContextMenu>
                </Tooltip>
            </BaseButtonBar>
        </FlexRow>
    );
};