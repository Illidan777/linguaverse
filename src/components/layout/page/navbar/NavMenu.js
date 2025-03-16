import styled, {css} from "styled-components";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../text";
import {PaddingStyledButton, RoutingLink, TransparentPrimaryButton} from "../../../button/style";
import {LibraryIcon, HomeIcon, NotificationIcon} from "../../../icon";
import useCSSVariables from "../../../../hook/useCSSVariables";
import withPathBasedSelectableChild from "../../../hoc/withPathBasedSelectableChild";

// Menu item dictionary: navigation path, option label name and svg icon React Component
const MENU_ITEMS = [
    {
        path: "/",
        name: "Home",
        icon: HomeIcon,
    },
    {
        path: "/library",
        name: "Library",
        icon: LibraryIcon,
    },
    {
        path: "/notification",
        name: "Notifications",
        icon: NotificationIcon,
    }
]

/**
 * Navigation Menu Component
 *
 * This component renders navigation menu with menu items inside navigation bar. Each menu item
 * can display an icon and a name. The menu items adapt based on whether the navbar
 * is opened or collapsed.
 *
 * Props:
 * @param {boolean} openedNavbar - Determines if the navbar is expanded or collapsed.
 *
 */
const NavMenu = ({openedNavbar}) => {
    const items = MENU_ITEMS.map((item, index) => {
        const SelectableItem = withPathBasedSelectableChild(NavMenuItem, item.path);
        return (
            <SelectableItem
                key={index}
                showFull={openedNavbar}
                {...item}
            />
        );
    });
    return (
        <Menu>
            {items}
        </Menu>
    );
};

/**
 * NavMenuItem Component
 * Represents a single menu item.
 *
 * Props:
 * @param {string} path - The route path for navigation.
 * @param {React.Component} icon - The icon component to be displayed.
 * @param {string} name - The label of the menu item.
 * @param {boolean} showFull - Determines if the label should be visible.
 * @param {Object} selectedItemColor - Contains color props for selected items.
 */
const NavMenuItem = ({
                         path,
                         icon,
                         name,
                         showFull,
                         selected
                     }) => {
    const selectedItemsColors = useCSSVariables(["--colored-text-main", "--lavanda-lighter"])
    const [text, background] = selected
        ? selectedItemsColors
        : [null, null];
    return (
        <li>
            <RoutingLink to={path}>
                <MenuItem
                    showFull={showFull}
                    bgColor={background}
                >
                    {icon({color: text})}
                    {showFull && (
                        <StyledText
                            as="span"
                            size={FONT_SIZES.SIMPLE_SMALL}
                            weight={FONT_WEIGHTS.REGULAR}
                            color={text}
                        >
                            {name}
                        </StyledText>
                    )}
                </MenuItem>
            </RoutingLink>
        </li>
    )
}

const Menu = styled.ul`
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
`

const MenuItem = styled(TransparentPrimaryButton)`
    min-width: 100%;
    gap: 20px;
    justify-content: flex-start;
    
    // if color props received - use it for bg and hover (selected item),
    // otherwise inherit bg-color and hover from parent component
    background-color: ${({ bgColor }) => bgColor || "inherit"};

    &:hover {
        background-color: ${({ bgColor }) => bgColor || "inherit"};
    }

`;

export default NavMenu;