import styled from "styled-components";
import {FlexCol, FlexRow} from "../../components/layout/wrapper/position/style";

export const LibraryItem = styled(FlexCol)`
    padding: 12px 20px;
    background-color: var(--main-background-color);
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