import React, {useCallback, useState} from "react";

import LibraryEntity from "../../library/LibraryEntity";

import {useGetAllFoldersQuery} from "../../folder/api";

import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {FolderIcon} from "../../../components/icon";
import {FlexCenter} from "../../../components/layout/wrapper/position/style";
import {BaseFallbackComponent} from "../../../components/layout/wrapper/boundary/fallback/base";
import ControllableErrorBoundary from "../../../components/layout/wrapper/boundary/controllableErrorBoundary";

import useApiQueryResponse from "../../../hook/api/useApiQueryResponse";

const FoldersPage = () => {
    const [searchText, setSearchText] = useState("");

    const queryResult = useGetAllFoldersQuery(searchText);
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);

    const onSearch = useCallback((name) => setSearchText(name), [searchText]);

    const items = data
        ? data.map((item) => {
            const {name, modulesCount, id} = item;
            return {
                id,
                header: <FolderItemHeader modulesCount={modulesCount}/>,
                content: <FolderItemContent name={name}/>,
            };
        })
        : [];

    return (
        <ControllableErrorBoundary hasError={isError} fallback={<BaseFallbackComponent/>}>
            <LibraryEntity isLoadingItems={isFetching} entityItems={items} onSearch={onSearch}/>
        </ControllableErrorBoundary>
    );
};

const FolderItemContent = ({name}) => {
    return (
        <FlexCenter gap="10px">
            <FolderIcon/>
            <StyledText
                as="span"
                size={FONT_SIZES.SIMPLE_BIG}
                weight={FONT_WEIGHTS.SUPER_BOLD}
            >
                {name}
            </StyledText>
        </FlexCenter>

    )
}

const FolderItemHeader = ({modulesCount}) => {
    return (
        <>
            <StyledText
                as="span"
                size={FONT_SIZES.SIMPLE_SMALL}
                weight={FONT_WEIGHTS.SEMI_BOLD}
            >
                {modulesCount} objects
            </StyledText>
        </>
    )
}


export default FoldersPage;