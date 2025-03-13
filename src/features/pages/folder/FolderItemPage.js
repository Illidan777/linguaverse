import {useParams} from "react-router";
import DashboardPageLayout from "../../../components/layout";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {FlexCol, FlexRow} from "../../../components/layout/style";
import {BaseButtonBar, SquareSecondaryButton, SquareStyledButton} from "../../../components/button/style";
import React, {useState} from "react";
import {AddIcon, DeleteIcon, MoreIcon, PublishIcon, TimeIcon} from "../../../components/icon";
import ContextMenu, {ContextMenuItem} from "../../../components/menu";
import useCSSVariables from "../../../hook/useCSSVariables";
import ModuleListItem from "../../module/ModuleListItem";
import AddModuleToFolderModal from "../../../components/modal/AddModuleToFolderModal";


const FolderItemPage = () => {

    const {id} = useParams();
    const [errorColor] = useCSSVariables(["--error-color"])
    const [addModuleModalOpened, setAddModuleModalOpened] = useState(false);

    const onCloseAddModuleModal = () => {
        setAddModuleModalOpened(false);
    }

    return (
        <DashboardPageLayout
            header={
                <FlexRow justify="space-between" align="flex-start">
                    <FlexCol gap="30px">
                        <StyledText
                            as="h2"
                            size={FONT_SIZES.TITLE_MEDIUM}
                            weight={FONT_WEIGHTS.SUPER_BOLD}
                        >
                            Current folder
                        </StyledText>
                        <FlexRow gap="10px">
                            <TimeIcon/>
                            <StyledText
                                as="h2"
                                size={FONT_SIZES.SIMPLE_SMALL}
                                weight={FONT_WEIGHTS.SEMI_BOLD}
                            >
                                Changed at 26.02.25
                            </StyledText>
                        </FlexRow>
                    </FlexCol>
                    <BaseButtonBar>
                        <SquareSecondaryButton onClick={() => setAddModuleModalOpened(true)}>
                            <AddIcon/>
                        </SquareSecondaryButton>
                        <ContextMenu
                            trigger={
                                <SquareSecondaryButton>
                                    <MoreIcon/>
                                </SquareSecondaryButton>
                            }
                        >
                            <ContextMenuItem>
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

                    <AddModuleToFolderModal
                        opened={addModuleModalOpened}
                        onClose={onCloseAddModuleModal}
                    />
                </FlexRow>
            }
            content={
                <>
                    <ModuleListItem
                        name="Ad1"
                        termsCount="10"
                        author="you"
                        action={
                            <ContextMenu
                                trigger={
                                    <SquareStyledButton>
                                        <MoreIcon/>
                                    </SquareStyledButton>
                                }
                            >
                                <ContextMenuItem>
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
                    </ModuleListItem>
                </>
            }
        />
    )
}

export default FolderItemPage;