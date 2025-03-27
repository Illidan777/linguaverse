import styled from "styled-components";
import {FlexCol, FlexColCenter, FlexRow} from "../../../../components/layout/wrapper/position/style";

export const FlashCardWrapper = styled(FlexRow)`
    position: relative;
    height: 100%;
    width: 100%;
`

export const RotateableFlashCard = styled(FlexCol)`
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

export const FlashCardContent = styled.div`
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

export const FlashCardButtonBar = styled.div`
    grid-row: 1;
    grid-column: 3;
    justify-self: end;
    z-index: 201;
`

export const FlashCardDefinition = styled(FlexColCenter)`
    grid-row: 1 / span 3;
    grid-column: 1 / span 3;
    min-height: 0;
    position: relative;
    overflow: auto;
`

export const FlashCardPracticeWrapper = styled(FlexRow)`
    height: 500px;
    width: 100%;
    justify-content: space-between;
`

export const ToolBar = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
    align-items: center;
`