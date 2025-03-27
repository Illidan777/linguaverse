import React, {useCallback, useState} from "react";
import styled from "styled-components";

import avatar from "../../../assets/img/avatar.jpg";

import {FlexCenter, FlexRow} from "../../../components/layout/wrapper/position/style";
import ControllableErrorBoundary from "../../../components/layout/wrapper/boundary/controllableErrorBoundary";
import {BaseFallbackComponent} from "../../../components/layout/wrapper/boundary/fallback/base";

import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {CoverImage} from "../../../components/image/style";

import {useGetAllModulesQuery} from "../../module/api";
import useApiQueryResponse from "../../../hook/api/useApiQueryResponse";

import LibraryEntity from "../../library/LibraryEntity";

import {classifyDate} from "../../../utils/dateUtils";
import {MODULE_DRAFT_STATUS} from "../../../constants/module";
import {paths} from "../../../app/routes";

const ModulesPage = () => {

    const [searchText, setSearchText] = useState("");

    const queryResult = useGetAllModulesQuery(searchText);
    const {data, isError, isFetching} = useApiQueryResponse(queryResult);

    const onSearch = useCallback((name) => setSearchText(name), [searchText]);

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

    const getItemHref = (id) => {
        return paths.module.index.getHref(id)
    }

    const items = data ? data.map((item) => {
        const {
            id,
            name,
            status,
            termsCount,
            ownerAvatar = avatar, //not implemented yet
            ownerName = 'you', //not implemented yet
            createdAt
        } = item;
        const header = <ModuleItemHeader
            termsCount={termsCount}
            username={ownerName}
            userAvatarSrc={ownerAvatar}
        />;
        const content = <ModuleItemContent name={name} status={status}/>

        return {id, header, content, createdAt};
    }) : [];

    return (
        <ControllableErrorBoundary hasError={isError} fallback={<BaseFallbackComponent/>}>
            <LibraryEntity
                isLoadingItems={isFetching}
                entityItems={items}
                onSearch={onSearch}
                groupBy={groupBy}
                getItemHref={getItemHref}
            />
        </ControllableErrorBoundary>
    )
}

const ModuleItemContent = ({name, status}) => {
    const draftMarker = status === MODULE_DRAFT_STATUS ? '(Draft)' : null
    return (
        <StyledText
            as="span"
            size={FONT_SIZES.SIMPLE_BIG}
            weight={FONT_WEIGHTS.SUPER_BOLD}
        >
            {draftMarker} {name}
        </StyledText>
    )
}

const ModuleItemHeader = ({termsCount, username, userAvatarSrc}) => {
    return (
        <>
            <StyledText
                as="span"
                size={FONT_SIZES.SIMPLE_SMALL}
                weight={FONT_WEIGHTS.SEMI_BOLD}
            >
                {termsCount} terms
            </StyledText>
            <Divider/>
            <ModuleOwnerWrapper>
                <OwnerAvatarWrapper>
                    <CoverImage src={userAvatarSrc} alt={username}/>
                </OwnerAvatarWrapper>
                <div>{username}</div>

            </ModuleOwnerWrapper>
        </>
    )
}


const Divider = styled.div`
    width: 3px;
    max-height: 100%;
    background-color: var(--gray);
`

const ModuleOwnerWrapper = styled(FlexRow)`
    gap: 10px;
`

const OwnerAvatarWrapper = styled(FlexCenter)`
    width: 16px;
    height: 16px;

    img {
        border-radius: 100%;
    }
`

export default ModulesPage;