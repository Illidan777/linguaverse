// React components and hooks
import React from "react";
import {useParams} from "react-router";

// Layout components
import DashboardPageLayout from "../../../components/layout/page";

// Custom hooks
import {useGetModuleByIdQuery} from "../../module/api";
import useApiQueryResponse from "../../../hook/api/useApiQueryResponse";


// ModuleProfilePage specific components
import ModuleProfileHeader from "../../module/components/profile/moduleProfileHeader";
import ModuleProfileContent from "../../module/components/profile/moduleProfileContent";

// Constants
import {MODULE_DRAFT_STATUS} from "../../../constants/module";

// Routing
import {paths} from "../../../app/routes";

/**
 * ModuleProfilePage Component
 * Displays the profile of a module. Header contains functionality to set up module (change folder, edit. delete).
 * And content contains flashcard practice mode slider and progress table.
 * If the module is in draft status, it redirects to the edit page.
 */
export default function ModuleProfilePage() {

    // Get module id from url params
    const {id} = useParams();

    // Fetch module data
    const queryResult = useGetModuleByIdQuery(id);
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);
    const moduleData = data ? data : {};

    // Metadata for SEO and page structure
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