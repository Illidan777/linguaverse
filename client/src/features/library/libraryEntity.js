/**
 * LibraryEntity Component
 *
 * This component displays a list of entities with optional grouping.
 * It includes a search panel for filtering items and supports loading and empty state handling.
 */

import React from "react";
import styled from "styled-components";

// Layout components
import { FlexCol } from "../../components/layout/wrapper/position/style";
import { BottomBorderWrapper } from "../../components/layout/wrapper/hover/style";
import LoadingBoundary from "../../components/layout/wrapper/boundary/loadingBoundary";
import EmptyContentBoundary from "../../components/layout/wrapper/boundary/emptyContentBoundary";

// UI components
import { InputWithIconContainer, SecondaryInput } from "../../components/input/style";
import { RoutingLink } from "../../components/button/style";
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../../components/text";
import { SearchIcon } from "../../components/icon";

// Library-specific components
import {
    LibraryItem,
    LibraryItemContent,
    LibraryItemGroupHeader,
    LibraryItemGroupWrapper,
    LibraryItemHeader
} from "./style";

// Theme
import theme from "../../style/theme";

/**
 * LibraryEntity Component
 *
 * @param {Object} props - Component properties
 * @param {boolean} props.isLoadingItems - Indicates if items are loading
 * @param {Array} props.entityItems - List of entity items
 * @param {Function} props.onSearch - Callback function for search input
 * @param {Function} props.groupBy - Function to group items
 * @param {Function} props.getItemHref - Function to get item URL
 *
 * @returns {JSX.Element} LibraryEntity component
 */
const LibraryEntity = ({
                           isLoadingItems,
                           entityItems,
                           onSearch,
                           groupBy,
                           getItemHref,
                       }) => {
    /**
     * Maps an entity item to a component wrapped in a link.
     *
     * @param {Object} entityItem - The entity item
     * @param {string} entityItem.id - Unique identifier
     * @param {string} entityItem.header - Item header
     * @param {string} entityItem.content - Item content
     * @returns {JSX.Element} Entity item component
     */
    const mapEntityItem = (entityItem) => {
        const { id, header, content } = entityItem;
        return (
            <RoutingLink to={getItemHref(id)} key={id}>
                <LibraryEntityItem header={header} content={content} />
            </RoutingLink>
        );
    };

    let renderItems = [];
    let itemsGap = "10px";

    // Group items if a grouping function is provided
    if (groupBy) {
        itemsGap = "50px";
        const groups = groupBy(entityItems);
        Object.entries(groups).forEach(([group, items], index) => {
            const groupItems = items.map(mapEntityItem);
            renderItems.push(
                <LibraryEntityItemGroup key={index} name={group} items={groupItems} />
            );
        });
    } else {
        renderItems = entityItems.map(mapEntityItem);
    }

    return (
        <FlexCol>
            {/* Search panel */}
            <SearchPanel>
                <InputWithIconContainer right>
                    <SecondaryInput placeholder="Find items" onChange={(e) => onSearch(e.target.value)} />
                    <SearchIcon />
                </InputWithIconContainer>
            </SearchPanel>

            {/* Item list with loading and empty state handling */}
            <Items gap={itemsGap}>
                <LoadingBoundary isLoading={isLoadingItems}>
                    <EmptyContentBoundary isEmpty={() => renderItems.length === 0}>
                        {renderItems}
                    </EmptyContentBoundary>
                </LoadingBoundary>
            </Items>
        </FlexCol>
    );
};

/**
 * LibraryEntityItemGroup Component
 *
 * Displays a group of library items with a header.
 *
 * @param {Object} props - Component properties
 * @param {string} props.name - Group name
 * @param {Array} props.items - List of grouped items
 * @returns {JSX.Element} Grouped library items component
 */
const LibraryEntityItemGroup = ({ name, items }) => {
    return (
        <LibraryItemGroupWrapper>
            <LibraryItemGroupHeader>
                <StyledText as="span" size={FONT_SIZES.SIMPLE_MEDIUM} weight={FONT_WEIGHTS.MEDIUM}>
                    {name}
                </StyledText>
            </LibraryItemGroupHeader>
            {items}
        </LibraryItemGroupWrapper>
    );
};

/**
 * LibraryEntityItem Component
 *
 * Displays an individual library item.
 *
 * @param {Object} props - Component properties
 * @param {string} props.header - Item header
 * @param {string} props.content - Item content
 * @returns {JSX.Element} Library entity item component
 */
const LibraryEntityItem = ({ header, content }) => {
    return (
        <BottomBorderWrapper>
            <LibraryItem>
                <LibraryItemHeader>{header}</LibraryItemHeader>
                <LibraryItemContent>{content}</LibraryItemContent>
            </LibraryItem>
        </BottomBorderWrapper>
    );
};

// Styled Components
const SearchPanel = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: ${theme.media.tablet}) {
        grid-template-columns: 1fr;
    }
`;

const Items = styled(FlexCol)`
    margin-top: 32px;
`;

export default LibraryEntity;
