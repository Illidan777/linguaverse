import React from "react";
import {useParams} from "react-router";

import DashboardPageLayout from "../../../components/layout/page";

import {useGetModuleByIdQuery} from "../../module/api";
import useApiQueryResponse from "../../../hook/api/useApiQueryResponse";

import ModuleProfileHeader from "../../module/components/profile/moduleProfileHeader";
import ModuleProfileContent from "../../module/components/profile/moduleProfileContent";

import {MODULE_DRAFT_STATUS} from "../../../constants/module";

import {paths} from "../../../app/routes";

export default function ModuleProfilePage() {

    const {id} = useParams();

    const queryResult = useGetModuleByIdQuery(id);
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);
    const moduleData = data ? data : {};

    const meta = (
        <>
            <meta
                name="description"
                content={`Explore the ${moduleData.name} module and learn core terms.`}
            />
            <meta
                name="keywords"
                content="learning module, terms, educational"
            />
            <meta name="robots" content="index, follow" />
            <title>{moduleData.name}</title>
        </>
    );
    return (
        <DashboardPageLayout
            meta={meta}
            isError={isError}
            isLoading={isFetching}
            header={<ModuleProfileHeader moduleData={moduleData}/>}
            content={<ModuleProfileContent moduleId={id}/>}
            redirectCondition={data?.status === MODULE_DRAFT_STATUS}
            redirectTo={paths.module.edit.getHref(id)}
        />
    )
}