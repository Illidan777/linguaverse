/**
 * AppNavbar component: Renders the navigation bar (sidebar or top menu) based on the screen size and current state.
 * It includes navigation items (Home, Library, Notifications) and adapts for mobile devices with a collapsible sidebar.
 */

// React components and hooks
import React from "react";
import {useSelector} from "react-redux";
import {useMediaQuery} from "@react-hook/media-query";

// Styling and theme
import theme from "../../../../../style/theme";

// Navbar specific styling
import {Menu, NavbarContainer} from "./style";

// Navbar specific components
import Sidebar from "./sidebar";
import NavMenuItem from "./navItem";

// General components and HOC
import {HomeIcon, LibraryIcon, NotificationIcon} from "../../../../../components/icon";
import withPathBasedSelectableChild from "../../../../../components/hoc/withPathBasedSelectableChild";

// Routing
import {paths} from "../../../../../app/routes";

// Menu items configuration
const MENU_ITEMS = [
    { path: paths.index.getHref(), name: "Home", icon: HomeIcon },
    { path: paths.library.index.getHref(), name: "Library", icon: LibraryIcon },
    { path: paths.notifications.index.getHref(), name: "Notifications", icon: NotificationIcon }
];

/**
 * Main Navbar component that adapts based on screen size.
 * Displays a sidebar for mobile and a top menu for larger screens.
 */
export default function AppNavbar() {
    // Redux state to track navbar visibility
    const openedNavbar = useSelector(state => state.navbar.openedNavbar);

    // Media query hook to check if the screen is mobile-sized
    const isMobile = useMediaQuery(`(max-width: ${theme.media.tablet})`);

    return (
        <aside>
            {/* Main container for the navbar */}
            <NavbarContainer opened={openedNavbar}>
                {/* Mobile-specific sidebar */}
                {isMobile ? (
                    <Sidebar opened={openedNavbar}>
                        {MENU_ITEMS.map((item, index) => {
                            const SelectableItem = withPathBasedSelectableChild(NavMenuItem, item.path);
                            return <SelectableItem key={index} showFull={openedNavbar} {...item} />;
                        })}
                    </Sidebar>
                ) : (
                    <Menu opened={openedNavbar}>
                        {/* Desktop-specific top menu */}
                        {MENU_ITEMS.map((item, index) => {
                            const SelectableItem = withPathBasedSelectableChild(NavMenuItem, item.path);
                            return <SelectableItem key={index} showFull={openedNavbar} {...item} />;
                        })}
                    </Menu>
                )}
            </NavbarContainer>
        </aside>
    );
}