// Importing necessary dependencies from React and other libraries
import React, { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

// UI components
import { FlexCol, FlexRow, FlexRowSpaceBetween } from "../../../../components/layout/wrapper/position/style";
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../../../../components/text";
import { BaseButtonBar, CircleStyledButton } from "../../../../components/button/style";
import { AddIcon, DeleteIcon, DownArrowIcon, SaveDiscIcon, UpArrowIcon } from "../../../../components/icon";
import TextAreaWithCounter from "../../../../components/input/textArea/textAreaWithCounter";

// Importing API mutation hooks
import { useDeleteTermMutation, useUpdateTermMutation } from "../../api";

// Importing custom hooks
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import useFormData from "../../../../hook/form/useFormData";

// Importing theme for styling
import theme from "../../../../style/theme";

/**
 * TermRow component
 * This component is responsible for rendering a term in the term list.
 * It allows updating the term, deleting the term, and changing the order of the terms within a module.
 *
 * @param {Object} props - The props for the component
 * @param {Object} props.termData - The data for the term to display and manipulate
 * @param {number} props.termsCount - The total number of terms in the current module
 * @param {function} props.onAddNewTerm - A function to add a new term after the current one
 *
 * @returns {JSX.Element} The rendered component
 */
const TermRow = ({
                     termData,
                     termsCount,
                     onAddNewTerm
                 }) => {
    // Extracting moduleId from the URL parameters
    const { id: moduleId } = useParams();

    // Initializing form data with the termData using the custom hook `useFormData`
    const { formData, setFormData, handleChangeFormData } = useFormData(termData);
    const { id, term, definition, orderNumber } = formData;

    // Effect hook to update form data when `termData` changes
    useEffect(() => {
        setFormData(termData);
    }, [termData]);

    // API mutation hooks for updating and deleting terms
    const [updateTerm] = useApiMutationResponse(useUpdateTermMutation(), {
        successMessage: "Term has been successfully updated!",
    });

    const [deleteTerm] = useApiMutationResponse(useDeleteTermMutation(), {
        successMessage: "Term has been successfully deleted from module!",
    });

    /**
     * Function to update the term's order number and data.
     *
     * @param {number} newOrderNumber - The new order number for the term (default is the current order number)
     */
    const onUpdateTerm = async (newOrderNumber = orderNumber) => {
        try {
            await updateTerm({
                id: moduleId,
                termId: id,
                request: { ...formData, orderNumber: newOrderNumber }
            });
        } catch (error) {
            console.error("Error updating term:", error);
        }
    };

    /**
     * Function to delete the current term.
     */
    const onDeleteTerm = async () => {
        try {
            await deleteTerm({
                id: moduleId,
                termId: id
            });
        } catch (error) {
            console.error("Error deleting term:", error);
        }
    };

    return (
        <TermRowWrapper>
            {/* Term Header Section */}
            <TermRowHeader>
                <TermUiContainer>
                    <FlexRow justify="space-between" align="center">
                        {/* Displaying the order number of the term */}
                        <StyledText as="span" size={FONT_SIZES.SIMPLE_BIG} weight={FONT_WEIGHTS.REGULAR}>
                            {orderNumber}
                        </StyledText>
                        {/* Buttons for actions like save, add, move up, move down, and delete */}
                        <BaseButtonBar>
                            <CircleStyledButton onClick={() => onUpdateTerm()}>
                                <SaveDiscIcon size="20px" />
                            </CircleStyledButton>
                            <CircleStyledButton onClick={() => onAddNewTerm(orderNumber + 1)}>
                                <AddIcon size="25px" />
                            </CircleStyledButton>
                            <CircleStyledButton
                                onClick={() => onUpdateTerm(orderNumber - 1)}
                                disabled={orderNumber === 1}
                            >
                                <UpArrowIcon size="20px" />
                            </CircleStyledButton>
                            <CircleStyledButton
                                onClick={() => onUpdateTerm(orderNumber + 1)}
                                disabled={orderNumber === termsCount}
                            >
                                <DownArrowIcon size="20px" />
                            </CircleStyledButton>
                            <CircleStyledButton onClick={onDeleteTerm}>
                                <DeleteIcon size="20px" />
                            </CircleStyledButton>
                        </BaseButtonBar>
                    </FlexRow>
                </TermUiContainer>
            </TermRowHeader>

            {/* Term Data Input Section */}
            <TermUiContainer>
                <FormContainer>
                    <TextAreaWithCounter
                        placeholder="Term"
                        maxLength={100}
                        value={term}
                        onChange={(value) => handleChangeFormData('term')(value)}
                    />
                    <TextAreaWithCounter
                        placeholder="Definition"
                        maxLength={1800}
                        value={definition}
                        onChange={(value) => handleChangeFormData('definition')(value)}
                    />
                </FormContainer>
            </TermUiContainer>
        </TermRowWrapper>
    );
};

// Styled components for layout and styling
const TermRowWrapper = styled(FlexCol)`
    width: 100%;
    background-color: var(--main-background-color);
    border-radius: var(--base-item-border-radius);
`;

const TermUiContainer = styled.div`
    padding: 12px;
`;

const TermRowHeader = styled.div`
    border-bottom: 1px solid var(--gray-light);
`;

const FormContainer = styled(FlexRowSpaceBetween)`
    gap: 50px;

    @media (max-width: ${theme.media.tablet}) {
        flex-direction: column;
    }
`;

export default TermRow;
