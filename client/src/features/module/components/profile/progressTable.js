// React and styled-components imports
import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

// UI components
import {FlexCol, FlexRowSpaceBetween} from "../../../../components/layout/wrapper/position/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import {BaseButtonBar, CircleStyledButton} from "../../../../components/button/style";
import TextAreaWithCounter from "../../../../components/input/textArea/textAreaWithCounter";
import {EditIcon, SaveDiscIcon} from "../../../../components/icon";

// Custom hooks imports
import useCSSVariables from "../../../../hook/useCSSVariables";
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import {useUpdateTermMutation} from "../../api";
import useFormData from "../../../../hook/form/useFormData";

// Global styles import
import theme from "../../../../style/theme";

/**
 * TermsProgressTable component - Displays the progress of terms within a module.
 * It shows terms that are in progress and those that have been learned.
 * @param {Object} props - Component properties.
 * @param {string} props.moduleId - The ID of the module.
 * @param {number} props.termsCount - Total number of terms in the module.
 * @param {Array} props.inProgressTerms - List of terms currently in progress.
 * @param {Array} props.learnedTerms - List of terms that have been learned.
 * @returns {JSX.Element} Terms progress table UI.
 */
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

/**
 * StatusSection component - Displays a section with a list of terms in a particular status (e.g., in progress or learned).
 * @param {Object} props - Component properties.
 * @param {string} props.moduleId - The ID of the module.
 * @param {string} props.title - Title of the section.
 * @param {string} props.subtitle - Subtitle of the section.
 * @param {string} props.color - Color to be used for the section title.
 * @param {Array} props.items - List of terms in the section.
 * @returns {JSX.Element} Status section UI.
 */
const StatusSection = ({moduleId, title, subtitle, color, items}) => {
    // if terms in section is empty - not render section
    if (!items || items.length === 0) {
        return null
    }
    const renderItems = items.map((term, index) => <Term key={index} moduleId={moduleId} termData={term}/>)
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

/**
 * Term component - Displays a single term with its definition.
 * Allows for editing the term and definition.
 * @param {Object} props - Component properties.
 * @param {string} props.moduleId - The ID of the module.
 * @param {Object} props.termData - The data of the term to be displayed.
 * @returns {JSX.Element} Term UI with editable functionality.
 */
const Term = ({moduleId, termData}) => {
    const termRef = useRef(null)
    const [editMode, setEditMode] = useState(false)
    const [updateTerm] = useApiMutationResponse(useUpdateTermMutation(), {
        successMessage: "Term has been successfully updated!",
    });
    const {formData, setFormData, handleChangeFormData} = useFormData(termData);
    const {id, term, definition} = formData;

    // Update form data when termData changes
    useEffect(() => {
        setFormData(termData)
    }, [termData]);

    // Close edit mode when clicking outside the term
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

    // Update term API request
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
            <TermDefWrapper>
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
            </TermDefWrapper>
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


// Styled components
const AllTermsWrapper = styled(FlexCol)`
    gap: 25px;
    padding: 10px;
    border-radius: var(--base-item-border-radius);
    background-color: var(--second-background-color);
    width: 100%;
`

const TermItemWrapper = styled(FlexRowSpaceBetween)`
    padding: 15px;
    border-radius: var(--base-item-border-radius);
    background-color: var(--main-background-color);
    width: 100%;
`

const TermDefWrapper = styled(FlexRowSpaceBetween)`
    width: 70%;
    gap: 30px;

    @media (max-width: ${theme.media.mobile}) {
        align-items: flex-start;
        flex-direction: column;
    }
`

export default TermsProgressTable;