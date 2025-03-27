import styled from "styled-components";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

import logo from '../../../../assets/icons/logo.png';
import burger from '../../../../assets/icons/burger.png';

import {FlexRow} from "../../wrapper/position/style";

import {CoverImage} from "../../../image/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../text";
import {RoutingLink, SquarePrimaryButton, StyledButton} from "../../../button/style";
import ContextMenu, {ContextMenuItem} from "../../../menu";
import {AddIcon, FolderIcon, ModuleIcon, SearchIcon} from "../../../icon";
import {InputWithIconContainer, PrimaryInput} from "../../../input/style";

import {toggleNavbar} from "../navbar/state/navbarSlice";

import {paths} from "../../../../app/routes";

import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import {useCreateModuleMutation} from "../../../../features/module/api";

import CreateFolderModal from "../../../../features/folder/components/modal/createFolderModal";
import {openModal} from "../../../modal/modalSlice";
import {MODALS} from "../../../modal/modalManager";

const AppHeader = () => {

    const dispatch = useDispatch();

    return (
        <Header>
            <HeaderLeftSideContent>
                <StyledButton onClick={() => dispatch(toggleNavbar())}>
                    <HeaderLeftSideContentItemWrapper size="45">
                        <CoverImage src={burger} alt="menu"/>
                    </HeaderLeftSideContentItemWrapper>
                </StyledButton>
                <RoutingLink to={paths.index.getHref()}>
                    <HeaderLeftSideContentItemWrapper size="55">
                        <CoverImage src={logo} alt="logo"/>
                        <StyledText as="h1" size={FONT_SIZES.TITLE_SMALL} weight={FONT_WEIGHTS.REGULAR}>
                            Lingμverse
                        </StyledText>
                    </HeaderLeftSideContentItemWrapper>
                </RoutingLink>
            </HeaderLeftSideContent>
            <HeaderSearchPanel>
                <InputWithIconContainer>
                    <PrimaryInput placeholder="Find modules"/>
                    <SearchIcon/>
                </InputWithIconContainer>
            </HeaderSearchPanel>
            <HeaderRightSideContent>
                <HeaderContextMenu/>
            </HeaderRightSideContent>
        </Header>
    )
}

const HeaderContextMenu = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [createModule] = useApiMutationResponse(useCreateModuleMutation(), {
        showSuccessToast: true,
        successMessage: "Module draft has been successfully created. Fill and activate it to use!",
    });

    const handleOpenCreateFolderModal = () => {
        dispatch(openModal({
            modalName: MODALS.createFolder.tag,
        }));
    };

    const onCreateModule = async () => {
        try {
            const data = await createModule();
            console.log(data)
            const {id} = !data ? {} : data;

            navigate(paths.module.edit.getHref(id));
        } catch (error) {
            console.error("Module creating error!", error);
        }
    }

    return (
        <>
            <ContextMenu
                trigger={
                    <SquarePrimaryButton>
                        <AddIcon color="white"/>
                    </SquarePrimaryButton>
                }
            >
                <ContextMenuItem onClick={handleOpenCreateFolderModal}>
                    <FolderIcon/>
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Folder
                    </StyledText>
                </ContextMenuItem>
                <ContextMenuItem onClick={onCreateModule}>
                    <ModuleIcon/>
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Module
                    </StyledText>
                </ContextMenuItem>
            </ContextMenu>
        </>
    )
}

const Header = styled.header`
    padding: 17px 10px;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const HeaderContentWrapper = styled(FlexRow)`
    gap: 10px;
    height: 100%;
    align-items: center;
`

const HeaderLeftSideContent = styled(HeaderContentWrapper)`
    width: 20%;
`

const HeaderSearchPanel = styled(HeaderContentWrapper)`
    width: 40%;
    justify-content: center;
`

const HeaderRightSideContent = styled(HeaderContentWrapper)`
    width: 10%;
    justify-content: flex-end;
`

const HeaderLeftSideContentItemWrapper = styled.div`
    padding: 7px;
    display: flex;
    align-items: center;
    gap: 20px;
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
`

export default AppHeader;