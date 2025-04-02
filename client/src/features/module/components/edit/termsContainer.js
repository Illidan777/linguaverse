import React, { Fragment } from "react";
import styled from "styled-components";

// Custom hooks for handling API responses
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import useApiQueryResponse from "../../../../hook/api/useApiQueryResponse";

// API functions for creating and fetching terms
import { useCreateTermMutation, useGetModuleTermsQuery } from "../../api";

// Component imports
import TermRow from "./termRow";  // Component to display individual term row
import { AddIcon } from "../../../../components/icon";  // Add icon for buttons

// Styling and UI components
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../../../../components/text";
import { CirclePrimaryButton, StyledButton } from "../../../../components/button/style";
import { FlexCenter, FlexCol } from "../../../../components/layout/wrapper/position/style";

// Boundary components for handling various loading and error states
import LoadingBoundary from "../../../../components/layout/wrapper/boundary/loadingBoundary";
import { BaseFallbackComponent } from "../../../../components/layout/wrapper/boundary/fallback/base";
import ControllableErrorBoundary from "../../../../components/layout/wrapper/boundary/controllableErrorBoundary";
import EmptyContentBoundary from "../../../../components/layout/wrapper/boundary/emptyContentBoundary";

/**
 * Container component for managing and displaying a list of terms.
 * @param {Object} props
 * @param {string} props.moduleId - The ID of the module to fetch terms for.
 * @returns {JSX.Element} The TermsContainer component.
 */
const TermsContainer = ({ moduleId }) => {
    // Mutation for creating a new term
    const [createTerm] = useApiMutationResponse(useCreateTermMutation(), {
        successMessage: "Term has been successfully added to module!",
    });

    // Query for fetching terms of a module
    const queryResult = useGetModuleTermsQuery(moduleId);
    const { data = [], isError, isFetching } = useApiQueryResponse(queryResult);

    /**
     * Handler function to add a new term.
     * @param {string} [orderNumber=''] - The order number for the new term.
     */
    const onAddNewTerm = async (orderNumber = '') => {
        try {
            await createTerm({ id: moduleId, orderNumber });
        } catch (error) {
            console.error("Error adding new term:", error);
        }
    };

    return (
        <FlexCol>
            {/* Loading boundary that displays loading spinner while fetching data */}
            <LoadingBoundary isLoading={isFetching}>
                {/* Error boundary to handle API errors gracefully */}
                <ControllableErrorBoundary hasError={isError} fallback={<BaseFallbackComponent />}>
                    {/* Empty content boundary to display a message when no terms are available */}
                    <EmptyContentBoundary isEmpty={() => data.length === 0}>
                        {data?.map((term, index) => (
                            <Fragment key={index}>
                                {/* Display each term in a TermRow component */}
                                <TermRow termData={term} termsCount={data.length} onAddNewTerm={onAddNewTerm} />
                                {/* Divider and button for adding a new term between rows */}
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
            {/* Button to add a new term at the bottom */}
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

// Styled-components for layout and UI elements
const TermRowDivider = styled(FlexCenter)`
    cursor: pointer;
    height: 20px;

    &:hover {
        button {
            transform: scale(1);
        }
    }
`;

const ImpliedAddNewCardButton = styled(CirclePrimaryButton)`
    position: absolute;
    z-index: var(--z-index-implied-button);
    transform: scale(0);
`;

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
`;

const AddNewTermButtonTitle = styled.span`
    padding: 10px;
    border-bottom: 5px solid var(--sky-darkest);
`;

export default TermsContainer;
