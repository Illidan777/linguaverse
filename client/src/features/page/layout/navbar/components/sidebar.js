/**
 * Sidebar component: Displays a sidebar that toggles its visibility based on the 'opened' prop.
 * It also listens for clicks outside of the sidebar to automatically close it when necessary.
 */

// React components and hooks
import React, {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {AnimatePresence} from "framer-motion";

// Assets
import burger from "../../../../../assets/icons/burger.png";
import logo from "../../../../../assets/icons/logo.png";

// State
import {toggleNavbar} from "../state/navbarSlice";

// UI components
import {FlexCol, FlexRow} from "../../../../../components/layout/wrapper/position/style";
import {RoutingLink, StyledButton} from "../../../../../components/button/style";
import {CoverImage} from "../../../../../components/image/style";

// Routing
import {paths} from "../../../../../app/routes";

// Navbar specific components
import {Menu, SidebarContainer, SideBarIcon} from "./style";


/**
 * Sidebar component that displays a sliding sidebar with a menu and a logo.
 * Automatically closes the sidebar if clicked outside of it. It uses for mobile.
 *
 * @param {boolean} opened - Indicates if the sidebar is open or closed.
 * @param {ReactNode} children - The menu items or content to be displayed inside the sidebar.
 *
 * @returns {JSX.Element} Sidebar component with a slide-in animation.
 */
export default function Sidebar({opened, children}) {
    const dispatch = useDispatch();
    const sidebarContainerRef = useRef(null);

    // Effect to handle clicks outside of the sidebar to close it
    useEffect(() => {
        if (opened) {
            const handleClickOutside = (event) => {
                if (sidebarContainerRef.current && !sidebarContainerRef.current.contains(event.target)) {
                    dispatch(toggleNavbar())
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [opened]);
    return (

        <AnimatePresence>
            {opened && (
                <SidebarContainer
                    ref={sidebarContainerRef}
                    initial={{x: "-100%", opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    exit={{x: "-100%", opacity: 0}}
                    transition={{duration: 0.3}}
                >
                    <FlexCol gap="20px">
                        {/* Header with a button to toggle the sidebar */}
                        <FlexRow gap="20px">
                            <StyledButton onClick={() => dispatch(toggleNavbar())}>
                                <SideBarIcon size="45">
                                    <CoverImage src={burger} alt="menu"/>
                                </SideBarIcon>
                            </StyledButton>
                            <RoutingLink to={paths.index.getHref()}>
                                <SideBarIcon size="55">
                                    <CoverImage src={logo} alt="logo"/>
                                </SideBarIcon>
                            </RoutingLink>
                        </FlexRow>
                        {/* The menu that will be populated with child elements */}
                        <Menu>
                            {children}
                        </Menu>
                    </FlexCol>
                </SidebarContainer>
            )}
        </AnimatePresence>
    );
};


