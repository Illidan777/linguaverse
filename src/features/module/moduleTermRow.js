import React, {useEffect, useState} from "react";
import {FlexCol, FlexRow} from "../../components/layout/wrapper/position/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../components/text";
import {BaseButtonBar, CircleStyledButton} from "../../components/button/style";
import {AddIcon, DeleteIcon, DownArrowIcon, UpArrowIcon} from "../../components/icon";
import TextAreaWithCounter from "../../components/input/textArea";
import styled from "styled-components";

const TermRow = ({ term: initialTerm, definition: initialDefinition, orderNumber }) => {
    const [term, setTerm] = useState(initialTerm || "");
    const [definition, setDefinition] = useState(initialDefinition || "");

    useEffect(() => {
        setTerm(initialTerm || "");
    }, [initialTerm]);

    useEffect(() => {
        setDefinition(initialDefinition || "");
    }, [initialDefinition]);

    // const debouncedUpdate = useCallback(
    //     debounce((updatedTerm, updatedDefinition) => {
    //         onUpdate?.(updatedTerm, updatedDefinition);
    //     }, 500),
    //     []
    // );

    const handleTermChange = (value) => {
        setTerm(value);
        // debouncedUpdate(e.target.value, definition);
    };

    const handleDefinitionChange = (value) => {
        setDefinition(value);
        // debouncedUpdate(term, e.target.value);
    };

    return (
        <TermRowWrapper>
            <TermRowHeader>
                <TermUiContainer>
                    <FlexRow justify="space-between" align="center">
                        <StyledText
                            as="span"
                            size={FONT_SIZES.SIMPLE_BIG}
                            weight={FONT_WEIGHTS.REGULAR}
                        >
                            {orderNumber}
                        </StyledText>
                        <BaseButtonBar>
                            <CircleStyledButton>
                                <AddIcon size="25px" />
                            </CircleStyledButton>
                            <CircleStyledButton>
                                <UpArrowIcon size="20px" />
                            </CircleStyledButton>
                            <CircleStyledButton>
                                <DownArrowIcon size="20px" />
                            </CircleStyledButton>
                            <CircleStyledButton>
                                <DeleteIcon size="20px" />
                            </CircleStyledButton>
                        </BaseButtonBar>
                    </FlexRow>
                </TermUiContainer>
            </TermRowHeader>

            <div>
                <TermUiContainer>
                    <FlexRow gap="50px" justify="space-between" align="center">
                        <TextAreaWithCounter
                            placeholder="Term"
                            maxLength={100}
                            value={term}
                            onChange={handleTermChange}
                        />
                        <TextAreaWithCounter
                            placeholder="Definition"
                            maxLength={1800}
                            value={definition}
                            onChange={handleDefinitionChange}
                        />
                    </FlexRow>
                </TermUiContainer>
            </div>
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