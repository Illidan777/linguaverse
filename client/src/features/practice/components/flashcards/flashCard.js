import {BaseButtonBar, CircleStyledButton} from "../../../../components/button/style";
import {EditIcon} from "../../../../components/icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import React, {useState} from "react";
import {useNavigate} from "react-router";
import {paths} from "../../../../app/routes";
import {
    FlashCardButtonBar,
    FlashCardContent,
    FlashCardDefinition,
    FlashCardWrapper,
    RotateableFlashCard
} from "./style";
import Tooltip from "../../../../components/tooltip";
import useCSSVariables from "../../../../hook/useCSSVariables";

export default function FlashCard({id, term, definition, moduleId}) {
    const navigate = useNavigate()
    const [termFlipped, setTermFlipped] = useState(false);
    const [definitionFlipped, setDefinitionFlipped] = useState(true);
    const [zIndex] = useCSSVariables(["--z-index-flash-card"]);

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
                            <Tooltip text="Edit">
                                <CircleStyledButton onClick={() => navigate(paths.module.edit.getHref(moduleId))}>
                                    <EditIcon size="17px"/>
                                </CircleStyledButton>
                            </Tooltip>
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