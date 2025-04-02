/**
 * AppHeader component: Renders the main header of the application including the logo, menu button, search panel,
 * and user context menu with options for creating modules and folders.
 */

// React components and hooks
import React from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

// Icons
import logo from '../../../../assets/icons/logo.png';
import burger from '../../../../assets/icons/burger.png';

// Components
import {FlexRow} from "../../../../components/layout/wrapper/position/style";
import {CoverImage} from "../../../../components/image/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import {RoutingLink, SquarePrimaryButton, StyledButton} from "../../../../components/button/style";
import ContextMenu, {ContextMenuItem} from "../../../../components/menu";
import {AddIcon, FolderIcon, ModuleIcon, SearchIcon} from "../../../../components/icon";
import {InputWithIconContainer, PrimaryInput} from "../../../../components/input/style";

// Routing
import {paths} from "../../../../app/routes";

// Custom hooks
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import {useCreateModuleMutation} from "../../../module/api";

// Modals and state management
import {MODALS} from "../../../../components/modal/modalManager";
import {toggleNavbar} from "../navbar/state/navbarSlice";
import {openModal} from "../../../../components/modal/modalSlice";

// Theme
import theme from "../../../../style/theme";

/**
 * Main header component.
 * Includes left-side navigation (menu and logo), search bar, and right-side user context menu.
 */
const AppHeader = () => {

    const dispatch = useDispatch();

    return (
        <Header>
            {/* Left side content with menu and logo */}
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
            {/* Search panel */}
            <HeaderSearchPanel>
                <InputWithIconContainer>
                    <PrimaryInput placeholder="Find modules"/>
                    <SearchIcon/>
                </InputWithIconContainer>
            </HeaderSearchPanel>
            {/* Right side content with context menu */}
            <HeaderRightSideContent>
                <HeaderContextMenu/>
            </HeaderRightSideContent>
        </Header>
    )
}

/**
 * Context menu component for adding modules or folders.
 * Provides options for creating modules and folders.
 */
const HeaderContextMenu = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Crete modal apu mutation
    const [createModule] = useApiMutationResponse(useCreateModuleMutation(), {
        showSuccessToast: true,
        successMessage: "Module draft has been successfully created. Fill and activate it to use!",
    });

    // Handles opening create folder modal
    const handleOpenCreateFolderModal = () => {
        dispatch(openModal({
            modalName: MODALS.createFolder.tag,
        }));
    };

    // Handles creating new modal draft and navigating to it after creation
    const onCreateModule = async () => {
        try {
            const data = await createModule();
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

// Styled components for layout and design
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

    @media (max-width: ${theme.media.bigTablet}) {
        display: none;
    }
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