import {BaseFallbackComponent} from "./fallback/base";

import emptySrc from "../../../../assets/icons/empty.png"

/**
 * EmptyContentBoundary is a component that conditionally renders a fallback UI
 * when the provided content is empty, or it renders the child components when
 * there is content.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.isEmpty - A function that checks if the content is empty.
 * @param {JSX.Element} props.children - The child components to render when content is not empty.
 *
 * @returns {JSX.Element} The rendered child components or a fallback UI when content is empty.
 */
export default function EmptyContentBoundary({ isEmpty, children }) {

    // Check if the content is empty and return the fallback component.
    if (isEmpty()) {
        return <BaseFallbackComponent iconSrc={emptySrc} text="Empty content" includeBaseActions={false} />;
    }

    // Return the child components if the content is not empty.
    return (
        <>
            {children}
        </>
    );
};
