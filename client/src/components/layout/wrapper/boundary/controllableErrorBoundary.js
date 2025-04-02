/**
 * ControllableErrorBoundary is a component that provides a way to conditionally render
 * an error fallback UI or the child components based on the `hasError` prop.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.hasError - Indicates whether an error has occurred.
 * @param {JSX.Element} props.children - The child components to render when there's no error.
 * @param {JSX.Element} props.fallback - The fallback UI to display when an error occurs.
 *
 * @returns {JSX.Element} The rendered component or fallback UI based on error state.
 */
export default function ControllableErrorBoundary({ hasError, children, fallback }) {

    // Return the fallback UI if there's an error, otherwise render the children.
    if (hasError) {
        return fallback;
    }

    return (
        <>
            {children}
        </>
    );
};
