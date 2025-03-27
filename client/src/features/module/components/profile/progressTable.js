import styled from "styled-components";
import {FlexCol, FlexRow} from "../../../../components/layout/wrapper/position/style";
import useCSSVariables from "../../../../hook/useCSSVariables";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import {BaseButtonBar, CircleStyledButton} from "../../../../components/button/style";
import {EditIcon} from "../../../../components/icon";

const TermsProgressTable = ({termsCount, inProgressTerms, learnedTerms}) => {
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
                    title="In progress"
                    subtitle="You've started learning these terms. Keep going!"
                    color={errorColor}
                    items={inProgressTerms}
                />
                <StatusSection
                    title="Learned"
                    subtitle="You have mastered these terms well!"
                    color={successColor}
                    items={learnedTerms}
                />
            </AllTermsWrapper>
        </FlexCol>
    )
}

const StatusSection = ({title, subtitle, color, items}) => {
    if (!items || items.length === 0) {
        return null
    }
    const renderItems = items.map((termItem, index) => {
        const {term, definition} = termItem
        return (
            <TermItemWrapper key={index}>
                <StyledText
                    as="span"
                    size={FONT_SIZES.SIMPLE_MEDIUM}
                    weight={FONT_WEIGHTS.REGULAR}
                >
                    {term}
                </StyledText>
                <StyledText
                    as="span"
                    size={FONT_SIZES.SIMPLE_MEDIUM}
                    weight={FONT_WEIGHTS.REGULAR}
                >
                    {definition}
                </StyledText>
                <BaseButtonBar>
                    <CircleStyledButton>
                        <EditIcon/>
                    </CircleStyledButton>
                </BaseButtonBar>
            </TermItemWrapper>
        )
    })
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
`

export default TermsProgressTable;