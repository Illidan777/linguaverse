import { Children } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { BaseButtonBar } from "../button/style";
import ContextMenu, { ContextMenuItem } from "./index";

/**
 * WrappableContextMenu component.
 * A wrapper that conditionally displays a ContextMenu or a BaseButtonBar based on a media query.
 */
export default function WrappableContextMenu({ alignRight, trigger, wrapThresholdQuery, children }) {
    // Check if the screen size matches the wrapThresholdQuery media query
    const wrap = useMediaQuery(wrapThresholdQuery);

    // If the screen size matches the query (i.e., it's "wrappable")
    return wrap ? (
        <ContextMenu alignRight={alignRight} trigger={trigger}>
            {Children.map(children, (child) => (
                // Map through the children and wrap them inside ContextMenuItem components
                child && <ContextMenuItem {...child.props}>{child?.props.children}</ContextMenuItem>
            ))}
        </ContextMenu>
    ) : (
        // If not wrappable, display the children inside BaseButtonBar
        <BaseButtonBar>{children}</BaseButtonBar>
    );
};
