import logo from '../../../../assets/icons/logo.png';
import burger from '../../../../assets/icons/burger.png';
import {CoverImage} from "../../../image/style";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {toggleNavbar} from "../navbar/navbarSlice";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../text";
import {RoutingLink, SquarePrimaryButton, StyledButton} from "../../../button/style";
import {InputWithIconContainer, PrimaryInput} from "../../../input/style";
import {FlexRow} from "../../wrapper/position/style";
import {AddIcon, FolderIcon, ModuleIcon, SearchIcon} from "../../../icon";
import React, {useState} from "react";
import ContextMenu, {ContextMenuItem} from "../../../menu";
import CreateFolderModal from "../../../../features/folder/modal/createFolderModal";

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
                <RoutingLink to="/">
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

    const [openedCreateFolderModal, setOpenedCreateFolderModal] = useState(false);

    const onCloseCreateFolderModal = () => {
        setOpenedCreateFolderModal(false);
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
                <ContextMenuItem onClick={() => setOpenedCreateFolderModal(true)}>
                    <FolderIcon/>
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Folder
                    </StyledText>
                </ContextMenuItem>
                <ContextMenuItem>
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
            <CreateFolderModal
                opened={openedCreateFolderModal} onClose={onCloseCreateFolderModal}
            />
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