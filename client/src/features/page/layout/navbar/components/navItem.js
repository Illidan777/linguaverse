// React components, hooks
import {useDispatch} from "react-redux";

// Custom hooks
import useCSSVariables from "../../../../../hook/useCSSVariables";

// UI components
import {RoutingLink} from "../../../../../components/button/style";
import {MenuItem} from "./style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../../components/text";

// State
import {toggleNavbar} from "../state/navbarSlice";

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
export default function NavMenuItem({
                                        path,
                                        icon,
                                        name,
                                        showFull,
                                        selected
                                    }) {
    const dispatch = useDispatch();
    const selectedItemsColors = useCSSVariables(["--colored-text-main", "--lavanda-lighter"])
    const [text, background] = selected
        ? selectedItemsColors
        : [null, null];
    console.log(selected)
    console.log(path)

    // If navbar opened (showFull == true), then show icon and name of menu item, else show only icon
    return (
        <li>
            <RoutingLink to={path}>
                <MenuItem
                    bg={background}
                    onClick={() => dispatch(toggleNavbar())}
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