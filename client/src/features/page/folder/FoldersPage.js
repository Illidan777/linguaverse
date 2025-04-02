/**
 * FoldersPage Component
 *
 * This component displays a list of folders, allowing the user to search and view folder details.
 * It fetches folder data using the `useGetAllFoldersQuery` hook and renders the list of folders.
 * The user can search for folders by name, and the results will be dynamically updated.
 *
 * Props:
 * None
 */

// React components and hooks
import React, {useCallback, useState} from "react";

// Library components
import LibraryEntity from "../../library/libraryEntity";

// Custom hooks
import {useGetAllFoldersQuery} from "../../folder/api";
import useApiQueryResponse from "../../../hook/api/useApiQueryResponse";

// UI components
import {BaseFallbackComponent} from "../../../components/layout/wrapper/boundary/fallback/base";
import ControllableErrorBoundary from "../../../components/layout/wrapper/boundary/controllableErrorBoundary";

// Routing
import {paths} from "../../../app/routes";
import mapFoldersPageItems from "../../folder/components/list/foldersPageContent";

/**
 * FoldersPage is the main container for the list of folders.
 * It includes functionality to search through folders by name.
 */
export default function FoldersPage() {
    // State to hold the search text input by the user
    const [searchText, setSearchText] = useState("");

    // Fetch folders using the search text
    const queryResult = useGetAllFoldersQuery(searchText);
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);

    // Update the search text state
    const onSearch = useCallback((name) => setSearchText(name), [searchText]);

    // Generate the href for each folder
    const getItemHref = (id) => {
        return paths.folder.getHref(id)
    }

    return (
        <ControllableErrorBoundary hasError={isError} fallback={<BaseFallbackComponent/>}>
            <LibraryEntity
                isLoadingItems={isFetching}
                entityItems={mapFoldersPageItems(data)}
                onSearch={onSearch}
                getItemHref={getItemHref}
            />
        </ControllableErrorBoundary>
    );
};