// Importing the Spinner component to show a loading indicator.
import Spinner from "../../../spinner/Spinner";

/**
 * LoadingBoundary is a component that conditionally renders a loading spinner
 * when the content is loading, or it renders the child components once loading is complete.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isLoading - A flag indicating whether the content is loading.
 * @param {string} [props.spinnerSize='medium'] - The size of the loading spinner (optional).
 * @param {JSX.Element} props.children - The child components to render when loading is complete.
 *
 * @returns {JSX.Element} A loading spinner when `isLoading` is true, or the child components when loading is complete.
 */
export default function LoadingBoundary({ isLoading, spinnerSize = 'medium', children }) {
    // Return the Spinner component if content is loading.
    if (isLoading) {
        return <Spinner size={spinnerSize} />;
    }

    // Return the child components if the content is not loading.
    return <>{children}</>;
}
