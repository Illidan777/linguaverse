import styled from "styled-components";

/**
 * OverlayContainer is a styled component that creates a full-screen overlay
 * with a semi-transparent background. It is commonly used for modals, dialogs, or other overlay UI elements.
 *
 * @returns {JSX.Element} A div element styled as an overlay container.
 */
export const OverlayContainer = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: var(--z-index-overlay);
`;