/**
 * FolderProfilePage Component
 *
 * This component renders the profile page for a folder, including folder details such as its name,
 * update date, and associated modules. It fetches data using the `useGetFolderByIdQuery` hook and
 * displays a loading indicator or error messages if needed.
 *
 * Props:
 * None
 */

// React components and hooks
import React from "react";
import {useParams} from "react-router";

// Custom hooks
import useApiQueryResponse from "../../../hook/api/useApiQueryResponse";
import {useGetFolderByIdQuery} from "../../folder/api";

// Layout components
import DashboardPageLayout from "../../../components/layout/page";
import EmptyContentBoundary from "../../../components/layout/wrapper/boundary/emptyContentBoundary";

// Folder specific components
import FolderItem from "../../folder/components/profile/folderItem";
import FolderProfileHeader from "../../folder/components/profile/folderProfileHeader";


/**
 * FolderProfilePage is a container component that fetches and displays information about a folder.
 * It uses the folder ID from the URL parameters to fetch the folder details and modules.
 */
export default function FolderProfilePage() {

    // Retrieve the folder ID from the URL parameters
    const {id} = useParams();

    // Fetch folder data using the custom query hook
    const queryResult = useGetFolderByIdQuery(id);
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);

    // Destructure the folder data, providing defaults if not available
    const {
        name = 'Unknown folder name',
        updatedAt = 'Unknown folder changed date',
        modules = []
    } = !data ? {} : data;

    // Map the modules to render FolderItem components
    const moduleRenderItems = modules.map((module, index) =>
        <FolderItem key={index} folderId={id} module={module}/>
    )

    // Define the meta tags for SEO
    const meta = (
        <>
            <meta
                name="description"
                content={`Edit the ${name} folder.`}
            />
            <meta
                name="keywords"
                content="learning module, terms, educational, folder"
            />
            <meta name="robots" content="index, follow" />
            <title>{name}</title>
        </>
    );


    // Render the FolderProfilePage layout
    return (
        <DashboardPageLayout
            meta={meta}
            isLoading={isFetching}
            isError={isError}
            header={
                <FolderProfileHeader folderId={id} folderName={name} folderUpdatedAt={updatedAt}/>
            }
            content={
                <EmptyContentBoundary isEmpty={() => modules.length === 0}>
                    {moduleRenderItems}
                </EmptyContentBoundary>
            }
        />
    )
}