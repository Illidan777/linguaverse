// React components and hooks
import React, {useState} from "react";
import {useNavigate} from "react-router";

// UI components
import {BaseButtonBar, CircleStyledButton} from "../../../../components/button/style";
import {EditIcon} from "../../../../components/icon";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../components/text";
import Tooltip from "../../../../components/tooltip";

// Routing
import {paths} from "../../../../app/routes";

// Custom hooks
import useCSSVariables from "../../../../hook/useCSSVariables";

// FlashCard specific components
import {
    FlashCardButtonBar,
    FlashCardContent,
    FlashCardDefinition,
    FlashCardWrapper,
    RotateableFlashCard
} from "./style";

/**
 * FlashCard component that represents a single flashcard with term and definition.
 * Allows the user to flip between the term and definition.
 *
 * @param {Object} props - The component props
 * @param {string} props.id - The unique identifier for the flashcard
 * @param {string} props.term - The term on the front side of the flashcard
 * @param {string} props.definition - The definition on the back side of the flashcard
 * @param {string} props.moduleId - The ID of the module this flashcard belongs to
 * @returns {JSX.Element} The rendered flashcard component
 */
export default function FlashCard({id, term, definition, moduleId}) {
    // Initialize navigation hook for routing
    const navigate = useNavigate()

    // Local state for controlling the flip of the term and definition
    const [termFlipped, setTermFlipped] = useState(false);
    const [definitionFlipped, setDefinitionFlipped] = useState(true);

    // Fetch the CSS variable for z-index from the custom hook
    const [zIndex] = useCSSVariables(["--z-index-flash-card"]);

    // Dynamically set zIndex for term and definition based on the flipped state
    const termZindex = termFlipped ? zIndex - 1 : zIndex;
    const definitionZIndex = termFlipped ? zIndex : zIndex - 1;

    /**
     * Switch between the term and definition on click.
     */
    const switchTurns = () => {
        setTermFlipped(!termFlipped)
        setDefinitionFlipped(!definitionFlipped)
    }
    return (
        <FlashCardWrapper>
            {/* Flashcard for the term */}
            <RotateableFlashCard zIndex={termZindex} flipped={termFlipped} onClick={switchTurns}>
                <FlashCardContent>
                    {/* Button bar with the edit option */}
                    <FlashCardButtonBar>
                        <BaseButtonBar>
                            <Tooltip text="Edit">
                                <CircleStyledButton onClick={() => navigate(paths.module.edit.getHref(moduleId))}>
                                    <EditIcon size="17px"/>
                                </CircleStyledButton>
                            </Tooltip>
                        </BaseButtonBar>
                    </FlashCardButtonBar>
                    {/* Display the term */}
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

            {/* Flashcard for the definition */}
            <RotateableFlashCard zIndex={definitionZIndex} flipped={definitionFlipped} onClick={switchTurns}>
                <FlashCardContent>
                    {/* Button bar without an action for now */}
                    <FlashCardButtonBar>
                        <BaseButtonBar>
                            <CircleStyledButton>
                                <EditIcon size="17px"/>
                            </CircleStyledButton>
                        </BaseButtonBar>
                    </FlashCardButtonBar>
                    {/* Display the definition */}
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