import styled from "styled-components";
import {FlexCol, FlexRow} from "../../components/layout/style";

export const LibraryItemWrapper = styled.div`
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

export const LibraryItem = styled(FlexCol)`
    padding: 12px 20px;
    background-color: white;
    border-radius: var(--base-item-border-radius);
    gap: 10px;
`

export const LibraryItemHeader = styled(FlexRow)`
    gap: 15px
`

export const LibraryItemContent = styled(FlexRow)`
`

export const LibraryItemGroupWrapper = styled(FlexCol)`
    gap: 10px;
`

export const LibraryItemGroupHeader = styled.div`
    display: inline-flex;
    align-items: center;

    &:after {
        content: '';
        display: inline-block;
        width: 100%;
        height: 1px;
        background-color: var(--gray);
        margin-left: 8px;
    }
`;