/**
 * Spinner Component
 * A simple animated SVG spinner wrapped in a flex container.
 */

import styled from "styled-components";
import { FlexCenter } from "../layout/wrapper/position/style";

/**
 * Styled SVG for the spinner.
 * Adjusts width, height, and rotation animation.
 */
const StyledSpinner = styled.svg`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    animation: rotate 2s linear infinite;
    transform-origin: center;

    /**
     * Defines the rotation animation for the spinner.
     */
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

/**
 * Spinner component.
 * @param {string} size - Size of the spinner (default: "200px").
 */
const Spinner = ({ size = "200px" }) => {
    return (
        <FlexCenter>
            <StyledSpinner xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 200 200">
                <path fill="#9dc2fb" stroke="#b16bef" strokeWidth="4"
                      d="m148 84.7 13.8-8-10-17.3-13.8 8a50 50 0 0 0-27.4-15.9v-16h-20v16A50 50 0 0 0 63 67.4l-13.8-8-10 17.3 13.8 8a50 50 0 0 0 0 31.7l-13.8 8 10 17.3 13.8-8a50 50 0 0 0 27.5 15.9v16h20v-16a50 50 0 0 0 27.4-15.9l13.8 8 10-17.3-13.8-8a50 50 0 0 0 0-31.7Zm-47.5 50.8a35 35 0 1 1 0-70 35 35 0 0 1 0 70Z" />
            </StyledSpinner>
        </FlexCenter>
    );
};

export default Spinner;
