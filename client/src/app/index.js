/**
 * Main Application Component
 *
 * This file defines the application's routing structure and layout,
 * including error boundaries, global UI components, and modal management.
 */

// React Router imports for handling routing
import { BrowserRouter, useRoutes } from "react-router";
// Error boundary to handle application errors gracefully
import { ErrorBoundary } from "react-error-boundary";

// Styled-components for UI layout styling
import styled from "styled-components";
import { FlexRow } from "../components/layout/wrapper/position/style";

// Third-party UI notifications
import { Toaster } from "react-hot-toast";

// Application layout components
import AppHeader from "../features/page/layout/header";
import AppNavbar from "../features/page/layout/navbar/components";
import { BaseFallbackComponent } from "../components/layout/wrapper/boundary/fallback/base";

// Routing configuration
import { routes } from "./routes";

// Modal manager to handle global modals
import ModalManager from "../components/modal/modalManager";

/**
 * Defines application routes using `useRoutes` hook.
 *
 * @returns {JSX.Element} The configured routes for the application.
 */
function AppRoutes() {
    return useRoutes(routes);
}

/**
 * Main Application Component
 *
 * - Wraps the app in an `ErrorBoundary` to catch runtime errors.
 * - Uses `BrowserRouter` for routing.
 * - Includes `AppHeader`, `AppNavbar`.
 * - Provides a `Toaster` for global notifications.
 * - Provides a `ModalManager` - modal container.
 *
 * @returns {JSX.Element} The application layout and routing structure.
 */
function App() {
    return (
        <ErrorBoundary fallback={<BaseFallbackComponent />}>
            <BrowserRouter>
                <AppHeader />
                <Site>
                    <AppNavbar />
                    <Main>
                        <AppRoutes /> {/* Dynamic routing */}
                    </Main>
                </Site>
                <Toaster />
                <ModalManager />
            </BrowserRouter>
        </ErrorBoundary>
    );
}

const Site = styled(FlexRow)`
    min-height: 100%;
    min-width: 100%;
`;

const Main = styled.main`
    height: 100%;
    width: 100%;
    max-width: 100%;
`;

export default App;
