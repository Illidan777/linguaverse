import React from "react";
import {useParams} from "react-router";

import useApiQueryResponse from "../../../hook/api/useApiQueryResponse";
import {useGetFolderByIdQuery} from "../../folder/api";

import DashboardPageLayout from "../../../components/layout/page";
import EmptyContentBoundary from "../../../components/layout/wrapper/boundary/emptyContentBoundary";

import FolderItem from "../../folder/components/folderItem";
import FolderProfileHeader from "../../folder/components/folderProfileHeader";


export default function FolderProfilePage() {

    const {id} = useParams();

    const queryResult = useGetFolderByIdQuery(id);
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);

    const {
        name = 'Unknown folder name',
        updatedAt = 'Unknown folder changed date',
        modules = []
    } = !data ? {} : data;
    const moduleRenderItems = modules.map((module, index) =>
        <FolderItem key={index} folderId={id} module={module}/>
    )

    return (
        <DashboardPageLayout
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