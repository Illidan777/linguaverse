import {BaseButtonBar, CircleStyledButton} from "../../../components/button/style";
import {EditIcon} from "../../../components/icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import React, {useState} from "react";
import {FlexCol, FlexColCenter, FlexRow} from "../../../components/layout/wrapper/position/style";
import styled from "styled-components";

const FlashCard = ({id, term, definition}) => {
    const [termFlipped, setTermFlipped] = useState(false);
    const [definitionFlipped, setDefinitionFlipped] = useState(true);
    const zIndex = 101;

    const termZindex = termFlipped ? zIndex - 1 : zIndex;
    const definitionZIndex = termFlipped ? zIndex : zIndex - 1;

    const switchTurns = () => {
        setTermFlipped(!termFlipped)
        setDefinitionFlipped(!definitionFlipped)
    }
    return (
        <FlashCardWrapper>
            <RotateableFlashCard zIndex={termZindex} flipped={termFlipped} onClick={switchTurns}>
                <FlashCardContent>
                    <FlashCardButtonBar>
                        <BaseButtonBar>
                            <CircleStyledButton>
                                <EditIcon size="17px"/>
                            </CircleStyledButton>
                        </BaseButtonBar>
                    </FlashCardButtonBar>
                    <FlashCardDefinition>
                        <StyledText
                            as="h2"
                            size={FONT_SIZES.TITLE_MEDIUM}
                            weight={FONT_WEIGHTS.SUPER_BOLD}
                        >
                            {term}
                        </StyledText>
                    </FlashCardDefinition>
                </FlashCardContent>
            </RotateableFlashCard>
            <RotateableFlashCard zIndex={definitionZIndex} flipped={definitionFlipped} onClick={switchTurns}>
                <FlashCardContent>
                    <FlashCardButtonBar>
                        <BaseButtonBar>
                            <CircleStyledButton>
                                <EditIcon size="17px"/>
                            </CircleStyledButton>
                        </BaseButtonBar>
                    </FlashCardButtonBar>
                    <FlashCardDefinition>
                        <StyledText
                            as="h2"
                            size={FONT_SIZES.TITLE_MEDIUM}
                            weight={FONT_WEIGHTS.SUPER_BOLD}
                        >
                            {definition}
                        </StyledText>
                    </FlashCardDefinition>
                </FlashCardContent>
            </RotateableFlashCard>

        </FlashCardWrapper>
    )
}

const FlashCardWrapper = styled(FlexRow)`
    position: relative;
    height: 100%;
    width: 100%;
`

const RotateableFlashCard = styled(FlexCol)`
    cursor: pointer;
    z-index: ${({zIndex}) => zIndex};
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    animation: ${({flipped}) => (flipped ? "flipOut" : "flipIn")} 0.4s ease-in-out forwards;

    @keyframes flipIn {
        0% {
            transform: rotateX(180deg);
        }
        100% {
            transform: rotateX(360deg);
        }
    }

    @keyframes flipOut {
        0% {
            transform: rotateX(0deg);
        }
        100% {
            transform: rotateX(180deg);
        }
    }
`

const FlashCardContent = styled.div`
    display: grid;
    grid-gap: 16px 0;
    gap: 16px 0;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto 1fr;

    padding: 24px 32px;
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow: 0 .5rem 2rem 0 var(--gray-light);
    border-radius: var(--base-item-border-radius);
`

const FlashCardButtonBar = styled.div`
    grid-row: 1;
    grid-column: 3;
    justify-self: end;
    z-index: 201;
`

const FlashCardDefinition = styled(FlexColCenter)`
    grid-row: 1 / span 3;
    grid-column: 1 / span 3;
    min-height: 0;
    position: relative;
    overflow: auto;
`

export default FlashCard;