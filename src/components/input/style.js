import styled, {css} from "styled-components";

export const StyledInput = styled.input`
    padding: 10px;
    width: 100%;
    border: .125rem solid #0000;
    transition: 0.3s;
    outline: none;
    border-radius: var(--base-item-border-radius);
`

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
`

export const PrimaryInput = styled(StyledInput)`
    background-color: var(--gray-light);

    &:focus {
        border-color: var(--lavanda);
        background-color: transparent;
    }
`

export const SecondaryInput = styled(StyledInput)`
    background-color: white;

    &:focus {
        border-bottom-color: black;
    }
`

export const InputWithIconContainer = styled.div`
    width: 100%;
    position: relative;

    input {
        padding: ${({iconRightPosition}) => iconRightPosition ? '10px' : '10px 37px'};
    }

    svg {
        position: absolute;
        ${({iconRightPosition}) => iconRightPosition ?
                css`
                    right: 10px;
                `
                :
                css`
                    left: 10px
                `
        };
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
    }

`