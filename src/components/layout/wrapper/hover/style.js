import styled from "styled-components";

export const BottomBorderWrapper = styled.div`
    box-shadow: 0 .125rem .25rem #00000014;
    transition: all .12s cubic-bezier(.47,0,.745,.715);
    border-bottom: .25rem solid #fff0;
    border-radius: var(--base-item-border-radius);
    cursor: pointer;
    position: relative;

    &:hover {
        border-bottom-color: var(--lavanda-lighter);
    }
`