// Assets
import notFoundIconSrc from "../../assets/icons/404.png";

// UI Components
import {BaseFallbackComponent} from "../../components/layout/wrapper/boundary/fallback/base";

/**
 * NotFoundPage Component
 * Displays a 404 fallback message when a page is not found.
 *
 * @returns {JSX.Element} Not Found page component
 */
export default function NotFoundPage() {
    return <BaseFallbackComponent iconSrc={notFoundIconSrc} text="Page not found :("/>;
};
