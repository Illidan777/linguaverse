import React, {useEffect} from "react";
import {useParams} from "react-router";
import styled from "styled-components";

import {FlexCol, FlexRow} from "../../../../components/layout/wrapper/position/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import {BaseButtonBar, CircleStyledButton} from "../../../../components/button/style";
import {AddIcon, DeleteIcon, DownArrowIcon, SaveDiscIcon, UpArrowIcon} from "../../../../components/icon";
import TextAreaWithCounter from "../../../../components/input/textArea/textAreaWithCounter";

import {useDeleteTermMutation, useUpdateTermMutation} from "../../api";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import useFormData from "../../../../hook/form/useFormData";

const TermRow = ({
                     termData,
                     termsCount,
                     onAddNewTerm
                 }) => {
    const {id: moduleId} = useParams();
    const {formData, setFormData, handleChangeFormData} = useFormData(termData);
    const {id, term, definition, orderNumber} = formData;

    useEffect(() => {
        setFormData(termData)
    }, [termData]);

    const [updateTerm] = useApiMutationResponse(useUpdateTermMutation(), {
        successMessage: "Term has been successfully updated!",
    });

    const [deleteTerm] = useApiMutationResponse(useDeleteTermMutation(), {
        successMessage: "Term has been successfully deleted from module!",
    });

    const onUpdateTerm = async (newOrderNumber = orderNumber) => {
        try {
            await updateTerm({
                id: moduleId,
                termId: id,
                request: {...formData, orderNumber: newOrderNumber}
            });
        } catch (error) {
            console.error("Error updating term:", error);
        }
    };

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
            <TermRowHeader>
                <TermUiContainer>
                    <FlexRow justify="space-between" align="center">
                        <StyledText as="span" size={FONT_SIZES.SIMPLE_BIG} weight={FONT_WEIGHTS.REGULAR}>
                            {orderNumber}
                        </StyledText>
                        <BaseButtonBar>
                            <CircleStyledButton onClick={() => onUpdateTerm()}>
                                <SaveDiscIcon size="20px"/>
                            </CircleStyledButton>
                            <CircleStyledButton onClick={() => onAddNewTerm(orderNumber + 1)}>
                                <AddIcon size="25px"/>
                            </CircleStyledButton>
                            <CircleStyledButton
                                onClick={() => onUpdateTerm(orderNumber - 1)}
                                disabled={orderNumber === 1}
                            >
                                <UpArrowIcon size="20px"/>
                            </CircleStyledButton>
                            <CircleStyledButton
                                onClick={() => onUpdateTerm(orderNumber + 1)}
                                disabled={orderNumber === termsCount}
                            >
                                <DownArrowIcon size="20px"/>
                            </CircleStyledButton>
                            <CircleStyledButton onClick={onDeleteTerm}>
                                <DeleteIcon size="20px"/>
                            </CircleStyledButton>
                        </BaseButtonBar>
                    </FlexRow>
                </TermUiContainer>
            </TermRowHeader>

            <TermUiContainer>
                <FlexRow gap="50px" justify="space-between" align="center">
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
                </FlexRow>
            </TermUiContainer>
        </TermRowWrapper>
    );
};


const TermRowWrapper = styled(FlexCol)`
    width: 100%;
    background-color: var(--main-background-color);
    border-radius: var(--base-item-border-radius);
`

const TermUiContainer = styled.div`
    padding: 12px;
`

const TermRowHeader = styled.div`
    border-bottom: 1px solid var(--gray-light);
`

export default TermRow;