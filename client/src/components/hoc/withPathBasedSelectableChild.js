import {useLocation} from "react-router";
import {paths} from "../../app/routes";

/**
 * Higher-Order Component (HOC) that enhances a component with route-based selection.
 *
 * This HOC determines whether the wrapped component should be marked as "selected"
 * based on the current browser location (`pathname`). If the given `path` matches
 * the current `pathname`, the `selected` prop is passed to the component.
 *
 * @param {React.ComponentType} SelectableItemComponent - The component to be wrapped.
 * @param {string} path - The base path to determine selection.
 * @returns {React.FC} - A new component that wraps `SelectableItemComponent` with selection logic.
 */
export default function withPathBasedSelectableChild(SelectableItemComponent, path) {
    return (props) => {
        const {pathname} = useLocation();

        // Determines if the current item matches the current route
        const selected = path === paths.index.getHref()
            ? pathname === paths.index.getHref()
            : pathname.startsWith(path);

        return <SelectableItemComponent
            selected={selected}
            {...props}
        />
    }
}