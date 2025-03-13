import styled, {css} from "styled-components";
import {Link} from "react-router";
import {FlexRow} from "../layout/style";

export const BASE_HOVER = css`
    &:hover {
        background-color: var(--gray-light);
    }
`

export const RoutingLink = styled(Link)`
    text-decoration: none;
`

export const StyledButton = styled.button`
    position: relative;
    display: flex;
    gap: 5px;
    font: inherit;
    justify-content: center;
    align-items: center;
    width: fit-content;
    cursor: pointer;
    border: .125rem solid #0000;
    border-radius: var(--base-item-border-radius);
    transition: all .12s cubic-bezier(.47, 0, .745, .715);
    background: transparent;
    
    ${BASE_HOVER}
    
    &:disabled {
        opacity: 0.5;
        pointer-events: none;
        cursor: none;
    }
`

export const PaddingStyledButton = styled(StyledButton)`
    padding: 10px;
`

export const OutlinedButton = styled(PaddingStyledButton)`
    border-color: var(--gray);
`

export const PrimaryButton = styled(PaddingStyledButton)`
    background-color: var(--lavanda-light);
    
    span {
        color: white;
    }
    
    &:hover {
        background-color: var(--lavanda);
    }

    &:disabled {
        background-color: var(--gray);
    }
`

export const TransparentPrimaryButton = styled(PaddingStyledButton)`
    
    &:hover {
        background-color: var(--lavanda-lighter);
    }

    &:disabled {
        background-color: var(--gray);
    }
`

export const SecondaryButton = styled(OutlinedButton)`
    background-color: white;
`

const SquareButton = styled.button`
    padding: 5px;
    width: 40px;
    height: 40px;
`;

const CircleButton = styled(SquareButton)`
    border-radius: 100%;
`

export const SquarePrimaryButton = styled(SquareButton).attrs({ as: PrimaryButton })``;
export const SquareSecondaryButton = styled(SquareButton).attrs({ as: SecondaryButton })``;
export const SquareStyledButton = styled(SquareButton).attrs({ as: StyledButton })``;

export const CirclePrimaryButton = styled(CircleButton).attrs({ as: PrimaryButton })``;
export const CircleSecondaryButton = styled(CircleButton).attrs({ as: SecondaryButton })``;
export const CircleStyledButton = styled(CircleButton).attrs({ as: StyledButton })``;

export const BaseButtonBar = styled(FlexRow)`
    gap: 10px;
`

