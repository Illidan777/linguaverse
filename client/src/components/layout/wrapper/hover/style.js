import styled from "styled-components";

/**
 * BottomBorderWrapper is a styled component that creates a div with a subtle box shadow,
 * a bottom border, and hover effects. It is typically used to create interactive elements
 * such as buttons, list items, or other UI elements with a bottom border emphasis.
 *
 * @returns {JSX.Element} A div element with a styled bottom border and hover effects.
 */
export const BottomBorderWrapper = styled.div`
    box-shadow: 0 .125rem .25rem #00000014;
    transition: all .12s cubic-bezier(.47,0,.745,.715);
    border-bottom: .25rem solid #fff0;
    border-radius: var(--base-item-border-radius);
    cursor: pointer;
    position: relative;

    // Hover effect to change the bottom border color on hover
    &:hover {
        border-bottom-color: var(--lavanda-lighter);
    }
`;
