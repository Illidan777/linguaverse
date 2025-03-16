import styled from "styled-components";
import React from "react";

import {FlexCol, FlexRow} from "../../components/layout/wrapper/position/style";
import {InputWithIconContainer, SecondaryInput} from "../../components/input/style";
import {
    LibraryItem,
    LibraryItemContent,
    LibraryItemGroupHeader,
    LibraryItemGroupWrapper,
    LibraryItemHeader
} from "./style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../components/text";
import {SearchIcon} from "../../components/icon";
import {RoutingLink} from "../../components/button/style";
import {useLocation} from "react-router";
import {BottomBorderWrapper} from "../../components/layout/wrapper/hover/style";

const LibraryEntity = ({entityItems, onSearch, groupBy}) => {

    const {pathname} = useLocation();

    const mapEntityItem = (entityItem) => {
        const {id, header, content} = entityItem;
        return (
            <RoutingLink to={`${pathname}/${id}`} key={id}>
                <LibraryEntityItem key={id} header={header} content={content}/>
            </RoutingLink>
        )
    }

    let renderItems = []
    let itemsGap = "10px"
    if (groupBy) {
        itemsGap = "50px"
        const groups = groupBy(entityItems);
        for (const group in groups) {
            const groupItems = groups[group].map(mapEntityItem)
            renderItems.push(
                <LibraryEntityItemGroup name={group} items={groupItems}/>
            )
        }
    } else {
        renderItems = entityItems.map(mapEntityItem)
    }

    return (
        <FlexCol>
            <SearchPanel>
                <InputWithIconContainer iconRightPosition>
                    <SecondaryInput placeholder="Find items" onChange={onSearch}/>
                    <SearchIcon/>
                </InputWithIconContainer>
            </SearchPanel>
            <Items gap={itemsGap}>
                {renderItems}
            </Items>
        </FlexCol>
    )
}


const LibraryEntityItemGroup = ({name, items}) => {
    return (
        <LibraryItemGroupWrapper>
            <LibraryItemGroupHeader>
                <StyledText
                    as="span"
                    size={FONT_SIZES.SIMPLE_MEDIUM}
                    weight={FONT_WEIGHTS.MEDIUM}
                >
                    {name}
                </StyledText>
            </LibraryItemGroupHeader>
            {items}
        </LibraryItemGroupWrapper>
    )
}

const LibraryEntityItem = ({header, content}) => {
    return (
        <BottomBorderWrapper>
            <LibraryItem>
                <LibraryItemHeader>
                    {header}
                </LibraryItemHeader>
                <LibraryItemContent>
                    {content}
                </LibraryItemContent>
            </LibraryItem>
        </BottomBorderWrapper>
    )
}

const SearchPanel = styled(FlexRow)`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const Items = styled(FlexCol)`
    margin-top: 32px;
`

export default LibraryEntity;