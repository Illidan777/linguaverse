/**
 * Styled components for the sidebar and navbar in the application.
 * Includes navigation container, sidebar, menu items, and motion-based animations.
 */

// eternal
import styled from "styled-components";
import {motion} from "framer-motion";

// internal
import {TransparentPrimaryButton} from "../../../../../components/button/style";
import theme from "../../../../../style/theme";

/**
 * Navbar container styled component: Defines the sidebar's width and layout,
 * with conditional width based on the 'opened' prop. Includes responsive behavior for tablets.
 */
export const NavbarContainer = styled.nav.withConfig({
    shouldForwardProp: (prop) => prop !== "opened" // Prevents the 'opened' prop from being passed to the DOM
})`
    padding: 10px;
    min-height: 100%;
    width: ${({opened}) => (opened ? 25 : 7)}vh;  // Adjusts the width based on 'opened' state
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    transition: all 0.2s;  // Smooth transition for width changes

    @media (max-width: ${theme.media.tablet}) {
        padding: 0;
        width: 0;  // Hides the navbar on small screens
    }
`;

/**
 * Sidebar icon styled component: Defines a square container for sidebar icons.
 */
export const SideBarIcon = styled.div`
    width: 35px;
    height: 35px;
`

/**
 * Sidebar container styled component: A fixed sidebar with motion animations for opening and closing.
 * Uses framer-motion for animation effects when the sidebar opens or closes.
 */
export const SidebarContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 16rem;
    background-color: var(--white);
    padding: 1rem;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2); 
    z-index: 10000;  // Ensures the sidebar is on top of other elements
`;

/**
 * Menu styled component: Defines the styling for the sidebar menu container.
 * Uses flexbox to display the menu items vertically.
 */
export const Menu = styled.ul`
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
`

/**
 * MenuItem styled component: Defines the style for individual items in the sidebar menu.
 * Inherits from TransparentPrimaryButton and allows for custom background color on hover.
 */
export const MenuItem = styled(TransparentPrimaryButton).withConfig({
    shouldForwardProp: (prop) => prop !== "bg" // Prevents 'bg' prop from being passed to the DOM
})`
    min-width: 100%;
    gap: 20px;
    justify-content: flex-start;

    background-color: ${({bg}) => bg || "inherit"};  // Allows setting a custom background color

    &:hover {
        background-color: ${({bg}) => bg || "inherit"};  // Keeps background color on hover
    }
`;