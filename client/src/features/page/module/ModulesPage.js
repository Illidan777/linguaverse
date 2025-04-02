/**
 * ModulesPage Component
 *
 * This component is responsible for displaying a list of modules. It supports
 * searching and groups modules based on their creation date. Data is fetched
 * from the API, and an error boundary ensures graceful handling of errors.
 */

// React components and hooks
import React, {useCallback, useState} from "react";

// Layout & UI Components
import ControllableErrorBoundary from "../../../components/layout/wrapper/boundary/controllableErrorBoundary";
import {BaseFallbackComponent} from "../../../components/layout/wrapper/boundary/fallback/base";

// API & Hooks
import {useGetAllModulesQuery} from "../../module/api";
import useApiQueryResponse from "../../../hook/api/useApiQueryResponse";

// Entities & Utilities
import LibraryEntity from "../../library/libraryEntity";
import {classifyDate} from "../../../utils/dateUtils";

// Routing
import {paths} from "../../../app/routes";

// Mappers
import mapModulePageItems from "../../module/components/list/modulesPageContent";

/**
 * ModulesPage Component
 * @returns {JSX.Element} The rendered component
 */
export default function ModulesPage() {

    // State for search text input
    const [searchText, setSearchText] = useState("");

    // Fetch modules based on search input
    const queryResult = useGetAllModulesQuery(searchText);
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);

    /**
     * Handles search input changes
     * @param {string} name - The search text
     */
    const onSearch = useCallback((name) => setSearchText(name), [searchText]);

    /**
     * Groups module items by their creation date category
     * @param {Array} items - List of module items
     * @returns {Object} Grouped module items
     */
    const groupBy = (items) => {
        return items.reduce((acc, item) => {
            const {createdAt} = item;
            const groupBy = classifyDate(createdAt)
            if (!acc[groupBy]) {
                acc[groupBy] = [];
            }
            acc[groupBy].push(item);
            return acc;
        }, {});
    }

    /**
     * Generates item URL for navigation
     * @param {string} id - The module ID
     * @returns {string} The generated URL
     */
    const getItemHref = (id) => {
        return paths.module.index.getHref(id)
    }

    return (
        <ControllableErrorBoundary hasError={isError} fallback={<BaseFallbackComponent/>}>
            <LibraryEntity
                isLoadingItems={isFetching}
                entityItems={mapModulePageItems(data)}
                onSearch={onSearch}
                groupBy={groupBy}
                getItemHref={getItemHref}
            />
        </ControllableErrorBoundary>
    )
}