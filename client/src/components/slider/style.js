/**
 * Styled components for the slider UI.
 * This file contains the styles for the slider wrapper, slide items, and navigation buttons.
 */

// External dependencies
import styled from "styled-components";

// Internal dependencies
import { FlexRow } from "../layout/wrapper/position/style";
import { SecondaryButton } from "../button/style";

/**
 * Wrapper for the slides container.
 * Positions the slides relative to the container and ensures full width.
 */
export const SlidesWrapper = styled(FlexRow)`
    position: relative;
    width: 100%;
`;

/**
 * Slide item with animation effects.
 * Supports `active` and `direction` props for animation control.
 */
export const SlideItem = styled.div.withConfig({
    shouldForwardProp: (prop) => !["active", "direction"].includes(prop)
})`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${({ active }) => (active ? 1 : 0)};
    animation: ${({ active, direction }) =>
            active
                    ? direction === "next"
                            ? "shakeRight 0.3s ease-in-out"
                            : "shakeLeft 0.3s ease-in-out"
                    : "none"};

    /**
     * Animation for shaking the slide to the right.
     */
    @keyframes shakeRight {
        0% {
            transform: translateX(0);
        }
        50% {
            transform: translateX(100px) rotateY(30deg);
        }
        100% {
            transform: translateX(0);
        }
    }

    /**
     * Animation for shaking the slide to the left.
     */
    @keyframes shakeLeft {
        0% {
            transform: translateX(0);
        }
        50% {
            transform: translateX(-100px) rotateY(-30deg);
        }
        100% {
            transform: translateX(0);
        }
    }
`;

/**
 * Styled navigation button for the slider.
 * Uses the `SecondaryButton` component with adjusted styles.
 */
export const SliderNavigationButton = styled(SecondaryButton)`
    padding: 10px;
    border-radius: 40%;
`;
