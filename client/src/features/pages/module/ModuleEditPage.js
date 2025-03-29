import React, {useEffect} from "react";
import {useParams} from "react-router";

import DashboardPageLayout from "../../../components/layout/page";
import {FlexCol, FlexRow} from "../../../components/layout/wrapper/position/style";

import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {BaseButtonBar, PrimaryButton, SecondaryButton,} from "../../../components/button/style";
import {SecondaryInput} from "../../../components/input/style";

import useApiQueryResponse from "../../../hook/api/useApiQueryResponse";
import useApiMutationResponse from "../../../hook/api/useApiMutationResponse";
import useFormData from "../../../hook/form/useFormData";
import {useActivateModuleMutation, useGetModuleByIdQuery, useUpdateModuleMutation} from "../../module/api";

import TermsContainer from "../../module/components/edit/termsContainer";
import Toolbar from "../../module/components/edit/moduleToolBar";
import {MODULE_DRAFT_STATUS} from "../../../constants/module";

const ModuleEditPage = () => {
    const {id} = useParams();

    const [updateModule] = useApiMutationResponse(useUpdateModuleMutation(), {
        successMessage: "The module was saved successfully!",
    });
    const [activateModule] = useApiMutationResponse(useActivateModuleMutation(), {
        successMessage: "The module was activated successfully and can be accessed for use!",
    });
    const queryResult = useGetModuleByIdQuery(id);
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);
    const {formData, setFormData, handleChangeFormData} = useFormData({data});

    useEffect(() => {
        setFormData(!data ? {} : data)
    }, [data])

    const onSaveModule = async () => {
        try {
            await updateModule({
                id,
                request: formData
            });
        } catch (error) {
            console.error("Error saving module:", error);
        }
    }

    const onActivateModule = async () => {
        try {
            await activateModule(id);
        } catch (error) {
            console.error("Error activating module:", error);
        }
    }

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
            header={<Header status={formData.status} onSave={onSaveModule} onActivate={onActivateModule}/>}
            content={<Content formData={formData} handleChangeFormData={handleChangeFormData}/>}
        />
    )
}

const Header = ({status, onSave, onActivate}) => {
    return (
        <FlexRow justify="space-between" align="flex-start">
            <StyledText
                as="h2"
                size={FONT_SIZES.TITLE_MEDIUM}
                weight={FONT_WEIGHTS.SUPER_BOLD}
            >
                Edit module
            </StyledText>
            <BaseButtonBar>
                <PrimaryButton onClick={onSave}>
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Save
                    </StyledText>
                </PrimaryButton>
                {status === MODULE_DRAFT_STATUS ?
                    <SecondaryButton onClick={onActivate}>
                        <StyledText
                            as="span"
                            size={FONT_SIZES.SIMPLE_SMALL}
                            weight={FONT_WEIGHTS.SEMI_BOLD}
                        >
                            Activate
                        </StyledText>
                    </SecondaryButton>
                    : null}
            </BaseButtonBar>
        </FlexRow>
    );
};

const Content = ({
                     formData: {
                         id,
                         name,
                         description,
                         terms
                     },
                     handleChangeFormData
                 }) => {

    return (
        <FlexCol gap="20px">
            <SecondaryInput
                placeholder="Name"
                value={name}
                onChange={(e) => handleChangeFormData('name')(e.target.value)}
            />
            <SecondaryInput
                placeholder="Description"
                value={description}
                onChange={(e) => handleChangeFormData('description')(e.target.value)}
            />
            {id && (
                <>
                    <Toolbar moduleId={id}/>
                    <TermsContainer moduleId={id} terms={terms}/>
                </>
            )}
        </FlexCol>
    );
};


export default ModuleEditPage;