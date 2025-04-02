// React components and hooks
import React, {useEffect} from "react";
import {useParams} from "react-router";

// Layout components
import DashboardPageLayout from "../../../components/layout/page";

// Hooks
import useApiQueryResponse from "../../../hook/api/useApiQueryResponse";
import useFormData from "../../../hook/form/useFormData";
import {useGetModuleByIdQuery} from "../../module/api";

// ModuleEditPage specific components
import ModuleEditPageHeader from "../../module/components/edit/moduleEditPageHeader";
import ModuleEditPageContent from "../../module/components/edit/moduleEditPageContent";

/**
 * ModuleEditPage Component
 * This component renders the page for editing a module.
 * It includes fetching the module data by ID, managing form data,
 * and rendering the page layout with a header and content.
 */
export default function ModuleEditPage() {
    // Retrieve the module ID from the URL parameters
    const {id} = useParams();

    // Fetch the module data by ID using the API hook nad handle response using custom hook
    const queryResult = useGetModuleByIdQuery(id);
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);

    // Form data management
    const {formData, setFormData, handleChangeFormData} = useFormData({data});

    // Set form data when the module data changes (useEffect ensures this happens only when 'data' changes)
    useEffect(() => {
        setFormData(!data ? {} : data)
    }, [data])

    // Meta tags for SEO and page information
    const meta = (
        <>
            <meta
                name="description"
                content={`Edit the ${formData.name} module.`}
            />
            <meta
                name="keywords"
                content="learning module, terms, educational"
            />
            <meta name="robots" content="index, follow"/>
            <title>{`Edit - ${formData.name}`}</title>
        </>
    );
    return (
        <DashboardPageLayout
            meta={meta}
            isLoading={isFetching}
            isError={isError}
            grayBackground
            header={<ModuleEditPageHeader formData={formData}/>}
            content={<ModuleEditPageContent formData={formData} handleChangeFormData={handleChangeFormData}/>}
        />
    )
}