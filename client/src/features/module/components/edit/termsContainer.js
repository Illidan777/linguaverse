import React, {Fragment} from "react";
import styled from "styled-components";

import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import useApiQueryResponse from "../../../../hook/api/useApiQueryResponse";
import {useCreateTermMutation, useGetModuleTermsQuery} from "../../api";

import TermRow from "./termRow";
import {AddIcon} from "../../../../components/icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import {CirclePrimaryButton, StyledButton} from "../../../../components/button/style";

import {FlexCenter, FlexCol} from "../../../../components/layout/wrapper/position/style";
import LoadingBoundary from "../../../../components/layout/wrapper/boundary/loadingBoundary";
import {BaseFallbackComponent} from "../../../../components/layout/wrapper/boundary/fallback/base";
import ControllableErrorBoundary from "../../../../components/layout/wrapper/boundary/controllableErrorBoundary";
import EmptyContentBoundary from "../../../../components/layout/wrapper/boundary/emptyContentBoundary";
import Spinner from "../../../../components/spinner/Spinner";

const TermsContainer = ({ moduleId }) => {
    const [createTerm] = useApiMutationResponse(useCreateTermMutation(), {
        successMessage: "Term has been successfully added to module!",
    });
    const queryResult = useGetModuleTermsQuery(moduleId);
    const { data = [], isError, isFetching } = useApiQueryResponse(queryResult);

    const onAddNewTerm = async (orderNumber = '') => {
        try {
            await createTerm({ id: moduleId, orderNumber });
        } catch (error) {
            console.error("Error adding new term:", error);
        }
    };

    return (
        <FlexCol>
            <LoadingBoundary isLoading={isFetching}>
                <ControllableErrorBoundary hasError={isError} fallback={<BaseFallbackComponent />}>
                    <EmptyContentBoundary isEmpty={() => data.length === 0}>
                        {data?.map((term, index) => (
                            <Fragment key={index}>
                                <TermRow termData={term} termsCount={data.length} onAddNewTerm={onAddNewTerm} />
                                {index !== data.length - 1 && (
                                    <TermRowDivider>
                                        <ImpliedAddNewCardButton onClick={() => onAddNewTerm(term.orderNumber + 1)}>
                                            <AddIcon />
                                        </ImpliedAddNewCardButton>
                                    </TermRowDivider>
                                )}
                            </Fragment>
                        ))}
                    </EmptyContentBoundary>
                </ControllableErrorBoundary>
            </LoadingBoundary>
            <AddNewTermButton onClick={() => onAddNewTerm('')}>
                <StyledText as="div" size={FONT_SIZES.SIMPLE_BIG} weight={FONT_WEIGHTS.REGULAR}>
                    <AddNewTermButtonTitle>
                        Add card
                    </AddNewTermButtonTitle>
                </StyledText>
            </AddNewTermButton>
        </FlexCol>
    );
};

const TermRowDivider = styled(FlexCenter)`
    cursor: pointer;
    height: 20px;

    &:hover {
        button {
            transform: scale(1);
        }
    }
`

const ImpliedAddNewCardButton = styled(CirclePrimaryButton)`
    position: absolute;
    z-index: var(--z-index-implied-button);
    transform: scale(0);
`

const AddNewTermButton = styled(StyledButton)`
    cursor: pointer;
    padding: 50px;
    width: 100%;
    background-color: var(--main-background-color);

    &:hover {
        background-color: var(--main-background-color);

        span {
            color: var(--lavanda-dark);
            border-bottom-color: var(--lavanda-dark);
        }
    }
`

const AddNewTermButtonTitle = styled.span`
    padding: 10px;
    border-bottom: 5px solid var(--sky-darkest);
`

export default TermsContainer;