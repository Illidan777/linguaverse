import {useNavigate, useParams} from "react-router";
import DashboardPageLayout from "../../../components/layout/page";
import React, {useEffect} from "react";
import {useGetModuleByIdQuery} from "../../module/api";
import useApiQueryResponse from "../../../hook/api/useApiQueryResponse";
import ModuleProfileHeader from "../../module/components/profile/moduleProfileHeader";
import ModuleProfileContent from "../../module/components/profile/moduleProfileContent";
import {MODULE_DRAFT_STATUS} from "../../../constants/module";
import {paths} from "../../../app/routes";
import Spinner from "../../../components/spinner/Spinner";

export default function ModuleProfilePage() {

    const {id} = useParams();
    const navigate = useNavigate();

    const queryResult = useGetModuleByIdQuery(id);
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);
    const moduleData = data ? data : {};

    useEffect(() => {
        if (!isFetching && data?.status === MODULE_DRAFT_STATUS) {
            navigate(paths.module.edit.getHref(id));
        }
    }, []);

    // Пока данные загружаются — показываем спиннер
    if (isFetching) {
        return <Spinner />;
    }

    return (
        <DashboardPageLayout
            isError={isError}
            isLoading={isFetching}
            header={<ModuleProfileHeader moduleData={moduleData}/>}
            content={<ModuleProfileContent moduleId={id}/>}
        />
    )
}