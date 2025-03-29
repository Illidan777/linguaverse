import styled from "styled-components";
import {FlexCol, FlexRow} from "../../../../components/layout/wrapper/position/style";
import useCSSVariables from "../../../../hook/useCSSVariables";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import {BaseButtonBar, CircleStyledButton} from "../../../../components/button/style";
import {EditIcon, SaveDiscIcon} from "../../../../components/icon";
import React, {useEffect, useRef, useState} from "react";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import {useUpdateTermMutation} from "../../api";
import useFormData from "../../../../hook/form/useFormData";
import TextAreaWithCounter from "../../../../components/input/textArea/textAreaWithCounter";

const TermsProgressTable = ({moduleId, termsCount, inProgressTerms, learnedTerms}) => {
    const [errorColor, successColor] = useCSSVariables(["--error-color", '--success-color'])
    return (
        <FlexCol gap="35px">
            <StyledText
                as="span"
                size={FONT_SIZES.SIMPLE_MEDIUM}
                weight={FONT_WEIGHTS.SEMI_BOLD}
            >
                Terms progress table (Count in module - {termsCount})
            </StyledText>
            <AllTermsWrapper>
                <StatusSection
                    moduleId={moduleId}
                    title="In progress"
                    subtitle="You've started learning these terms. Keep going!"
                    color={errorColor}
                    items={inProgressTerms}
                />
                <StatusSection
                    moduleId={moduleId}
                    title="Learned"
                    subtitle="You have mastered these terms well!"
                    color={successColor}
                    items={learnedTerms}
                />
            </AllTermsWrapper>
        </FlexCol>
    )
}

const StatusSection = ({moduleId, title, subtitle, color, items}) => {
    if (!items || items.length === 0) {
        return null
    }
    const renderItems = items.map((term, index) => <Term key={index} moduleId={moduleId} termData={term} />)
    return (
        <>
            <StyledText
                as="span"
                size={FONT_SIZES.TITLE_SMALL}
                weight={FONT_WEIGHTS.SEMI_BOLD}
                color={color}
            >
                {title} ({items.length})
            </StyledText>
            <StyledText
                as="span"
                size={FONT_SIZES.SIMPLE_MEDIUM}
                weight={FONT_WEIGHTS.REGULAR}
            >
                {subtitle}
            </StyledText>
            <FlexCol gap="10px">
                {renderItems}
            </FlexCol>
        </>
    )
}

const Term = ({moduleId, termData}) => {
    const termRef = useRef(null)
    const [editMode, setEditMode] = useState(false)
    const [updateTerm] = useApiMutationResponse(useUpdateTermMutation(), {
        successMessage: "Term has been successfully updated!",
    });
    const {formData, setFormData, handleChangeFormData} = useFormData(termData);
    const {id, term, definition} = formData;

    useEffect(() => {
        setFormData(termData)
    }, [termData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (termRef.current && !termRef.current.contains(event.target)) {
                setEditMode(false);
            }
        };

        if (editMode) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [editMode]);

    const onUpdateTerm = async () => {
        try {
            await updateTerm({
                id: moduleId,
                termId: id,
                request: {...formData}
            });
            setEditMode(false)
        } catch (error) {
            console.error("Error updating term:", error);
        }
    };


    return (
        <TermItemWrapper ref={termRef}>
            {editMode ?
                <TextAreaWithCounter
                    placeholder="Term"
                    maxLength={100}
                    value={term}
                    onChange={(value) => handleChangeFormData('term')(value)}
                />
                :
                <StyledText
                    as="span"
                    size={FONT_SIZES.SIMPLE_MEDIUM}
                    weight={FONT_WEIGHTS.REGULAR}
                >
                    {term}
                </StyledText>
            }
            {editMode ?
                <TextAreaWithCounter
                    placeholder="Definition"
                    maxLength={1800}
                    value={definition}
                    onChange={(value) => handleChangeFormData('definition')(value)}
                />
                :
                <StyledText
                    as="span"
                    size={FONT_SIZES.SIMPLE_MEDIUM}
                    weight={FONT_WEIGHTS.REGULAR}
                >
                    {term}
                </StyledText>
            }
            <BaseButtonBar>
                {editMode && (
                    <CircleStyledButton onClick={onUpdateTerm}>
                        <SaveDiscIcon/>
                    </CircleStyledButton>
                )}
                <CircleStyledButton onClick={() => setEditMode(prev => !prev)}>
                    <EditIcon/>
                </CircleStyledButton>
            </BaseButtonBar>
        </TermItemWrapper>
    )
}

const AllTermsWrapper = styled(FlexCol)`
    gap: 25px;
    padding: 10px;
    border-radius: var(--base-item-border-radius);
    background-color: var(--second-background-color);
    width: 100%;
`

const TermItemWrapper = styled(FlexRow)`
    padding: 15px;
    border-radius: var(--base-item-border-radius);
    background-color: var(--main-background-color);
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`

export default TermsProgressTable;