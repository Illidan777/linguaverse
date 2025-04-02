import styled from "styled-components";

// Layout components
import {FlexCenter, FlexCol, FlexColCenter, FlexRow} from "../../../../components/layout/wrapper/position/style";

// Theme configuration
import theme from "../../../../style/theme";

// Wrapper for the FlashCard component, using FlexRow for horizontal alignment
export const FlashCardWrapper = styled(FlexRow)`
    position: relative;
    height: 100%;
    width: 100%;
`
// Rotateable FlashCard component that switches between front and back using CSS animations
export const RotateableFlashCard = styled(FlexCol).withConfig({
    shouldForwardProp: (prop) => !["zIndex", "flipped"].includes(prop) // Avoid passing zIndex and flipped props to DOM
})`
    cursor: pointer;
    z-index: ${({zIndex}) => zIndex}; // Dynamically set z-index based on prop
    backface-visibility: hidden; // Prevents flashcards from being visible while flipped
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    animation: ${({flipped}) => (flipped ? "flipOut" : "flipIn")} 0.4s ease-in-out forwards;  // Conditional animation based on flipped state

    // Keyframes for flip-in and flip-out animations
    @keyframes flipIn {
        0% {
            transform: rotateX(180deg);
        }
        100% {
            transform: rotateX(360deg);
        }
    }

    @keyframes flipOut {
        0% {
            transform: rotateX(0deg);
        }
        100% {
            transform: rotateX(180deg);
        }
    }
`

// Content area of the FlashCard with padding, white background, and a shadow effect
export const FlashCardContent = styled(FlexCol)`
    padding: 24px 32px;
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow: 0 .5rem 2rem 0 var(--gray-light); // Light gray shadow
    border-radius: var(--base-item-border-radius); // Consistent border-radius for rounded corners
`

// Button bar for FlashCard, positioned at the top right corner
export const FlashCardButtonBar = styled(FlexRow)`
    justify-content: flex-end;
    z-index: var(--z-index-flash-card-button-bar); // Ensures button bar is above other elements
`

// Definition section of the FlashCard with centered content
export const FlashCardDefinition = styled(FlexColCenter)`
    padding: 150px;
    position: relative;
    overflow: auto; // Allows scrolling if content overflows
`

// Wrapper for the FlashCard practice section, with space between elements
export const FlashCardPracticeWrapper = styled(FlexRow)`
    min-height: 500px;
    width: 100%;
    justify-content: space-between;
`

// Toolbar component with gap between items and responsive design for tablets
export const ToolBar = styled(FlexRow)`
    gap: 20px;
    @media (max-width: ${theme.media.bigTablet}) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

// Container for following progress in the practice section
export const FollowProgressContainer = styled(FlexCenter)`
    gap: 10px;
    width: 33%; // Each container takes up one-third of the width
    @media (max-width: ${theme.media.bigTablet}) {
        order: 2;  // Reverses order on smaller screens
    }
`

// Container for slider controls in the practice section
export const SliderControlsContainer = styled(FlexCenter)`
    width: 33%;
    @media (max-width: ${theme.media.bigTablet}) {
        order: 1;  // Moves to the first position on smaller screens
    }
`

// Container for slider tools in the practice section
export const SliderToolsContainer = styled(FlexCenter)`
    width: 33%;
    @media (max-width: ${theme.media.bigTablet}) {
        order: 3;  // Moves to the third position on smaller screens
    }
`