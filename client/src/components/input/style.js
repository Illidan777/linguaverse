/**
 * Styled Input Components
 *
 * This file contains styled components for various input elements used throughout the application.
 */

import styled, { css } from "styled-components";

/**
 * Basic input styling.
 */
export const StyledInput = styled.input`
        padding: 10px;
        width: 100%;
        border: .125rem solid #0000;
        transition: 0.3s;
        outline: none;
        border-radius: var(--base-item-border-radius);
`;

/**
 * Styled textarea with additional focus effect.
 */
export const StyledTextArea = styled.textarea`
        padding: 10px;
        width: 100%;
        border: .125rem solid #0000;
        transition: 0.3s;
        outline: none;
        border-radius: var(--base-item-border-radius);
        resize: none;
        border-bottom: 2px solid black;

        &:focus {
                border-bottom-color: var(--sky-darkest);
        }
`;

/**
 * Primary input style with background color changes on focus.
 */
export const PrimaryInput = styled(StyledInput)`
        background-color: var(--gray-light);

        &:focus {
                border-color: var(--lavanda);
                background-color: transparent;
        }
`;

/**
 * Secondary input style with different background color.
 */
export const SecondaryInput = styled(StyledInput)`
        background-color: var(--main-background-color);

        &:focus {
                border-bottom-color: black;
        }
`;

/**
 * Container for inputs with icons, allowing positioning of the icon on the left or right.
 *
 * Props:
 * @param {boolean} right - Determines if the icon is positioned on the right (default is left).
 */
export const InputWithIconContainer = styled.div.withConfig({
        shouldForwardProp: (prop) => prop !== "right"
})`
        width: 100%;
        position: relative;

        input {
                padding: ${({ right }) => (right ? '10px' : '10px 37px')};
        }

        svg {
                position: absolute;
                ${({ right }) =>
                    right ?
                        css`
                                right: 10px;
                        `
                        :
                        css`
                                left: 10px;
                        `
                };
                top: 50%;
                transform: translateY(-50%);
                pointer-events: none;
        }
`;
