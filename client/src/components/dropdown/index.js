import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import ContextMenu, { ContextMenuItem } from "../menu";
import { TransparentPrimaryButton } from "../button/style";
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../text";
import { DownArrowIcon } from "../icon";
import { FlexRow } from "../layout/wrapper/position/style";

import useCSSVariables from "../../hook/useCSSVariables";

/**
 * Dropdown component - a custom dropdown menu that shows selected label
 * and allows item selection from a context menu.
 */
const Dropdown = ({ children, onSelect }) => {
    // Fetch the custom CSS variable for button color
    const [buttonColor] = useCSSVariables(["--lavanda-dark"]);

    // State to track the currently selected item label
    const [selectedItemLabel, setSelectedItemLabel] = useState('');

    // Memoize the default label selection based on passed children props
    const defaultSelectedLabel = useMemo(() => {
        const childrenArray = React.Children.toArray(children);
        let defaultLabel = '';

        // Loop through children to find the selected label
        for (let child of childrenArray) {
            const { selected, label } = child.props;
            if (selected) {
                defaultLabel = label;
                break;
            }
        }

        // If no selected label, use the first child's label if available
        if (!defaultLabel && childrenArray.length > 0) {
            defaultLabel = childrenArray[0].props.label;
        }

        return defaultLabel;
    }, [children]); // Only recompute when children change

    // Update selected label when defaultSelectedLabel changes
    useEffect(() => {
        setSelectedItemLabel(defaultSelectedLabel);
    }, [defaultSelectedLabel]);

    // Handle item selection
    const handleSelect = (childProps) => {
        const { label, disabled } = childProps;

        // Only update the label if the item is not disabled
        if (!disabled) {
            setSelectedItemLabel(label); // Update the selected label
            onSelect(childProps); // Pass selected item props to onSelect handler
        }
    };

    return (
        <ContextMenu
            alignRight // Align context menu to the right
            trigger={ // Triggering the dropdown button
                <TransparentPrimaryButton>
                    <FlexRow gap="10px" align="center">
                        {/* Display the selected label */}
                        <StyledText
                            as="span"
                            size={FONT_SIZES.SIMPLE_SMALL}
                            weight={FONT_WEIGHTS.SEMI_BOLD}
                            color={buttonColor}
                        >
                            {selectedItemLabel}
                        </StyledText>
                        <DownArrowIcon color={buttonColor} size="15px" />
                    </FlexRow>
                </TransparentPrimaryButton>
            }
        >
            {/* Map through the children and render them as dropdown items */}
            {React.Children.map(children, child =>
                    React.isValidElement(child) && (
                        // Add click handler to each dropdown item
                        <div onClick={() => handleSelect(child.props)}>
                            {child}
                        </div>
                    )
            )}
        </ContextMenu>
    );
};

// Styled component for dropdown items, extending ContextMenuItem styles
export const DropDownItem = styled(ContextMenuItem)``;

export default Dropdown;
