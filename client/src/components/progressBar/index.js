/**
 * ProgressBar Component
 *
 * A simple progress bar component that visually represents a percentage value.
 */

import styled from "styled-components";

/**
 * ProgressBar Component
 *
 * @param {Object} props - Component props
 * @param {number} props.progress - The progress value as a percentage (0-100)
 */
const ProgressBar = ({ progress }) => {
    return (
        <BarContainer>
            <Progress style={{ width: `${progress}%` }} />
        </BarContainer>
    );
};

/**
 * Container for the progress bar.
 * Ensures the bar has a defined height, background color, and rounded edges.
 */
const BarContainer = styled.div`
    width: 100%;
    height: 3px;
    background-color: var(--gray);
    border-radius: 9999px;
    overflow: hidden;
    z-index: var(--z-index-progress-bar);
`;

/**
 * The inner progress indicator.
 * Dynamically adjusts width based on progress percentage.
 */
const Progress = styled.div`
    height: 100%;
    background-color: var(--lavanda);
    transition: width 0.3s ease-in-out;
`;

export default ProgressBar;
