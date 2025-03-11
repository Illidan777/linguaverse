import styled, {css} from "styled-components";

export const PrimaryStyledInput = styled.input`
    padding: 10px;
    background-color: var(--gray-light);
    width: 100%;
    border: .125rem solid #0000;
    outline: none;
    transition: 0.3s;
    border-radius: var(--base-item-border-radius);

    &:focus {
        border-color: var(--lavanda);
        background-color: white;
    }
`

export const SecondaryStyledInput = styled(PrimaryStyledInput)`
    background-color: white;
    transition: unset;

    &:focus {
        border-color: #0000 #0000 black #0000;
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