import useCSSVariables from "../../../hook/useCSSVariables";
import useApiMutationResponse from "../../../hook/api/useApiMutationResponse";
import {useDeleteModuleFromFolderMutation} from "../api";
import React, {useCallback} from "react";
import ListItem from "../../module/components/listItem";
import ContextMenu, {ContextMenuItem} from "../../../components/menu";
import {RoutingLink, SquareStyledButton} from "../../../components/button/style";
import {DeleteIcon, MoreIcon} from "../../../components/icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import Tooltip from "../../../components/tooltip";
import {paths} from "../../../app/routes";

export default function FolderItem({folderId, module}) {

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

    return (
        <RoutingLink to={paths.module.index.getHref(id)}>
            <ListItem
                key={id}
                name={name}
                termsCount={termsCount}
                author="you"
                action={
                    <ContextMenu
                        trigger={
                            <Tooltip text="More">
                                <SquareStyledButton>
                                    <MoreIcon/>
                                </SquareStyledButton>
                            </Tooltip>
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
        </RoutingLink>
    )
}