import ContextMenu, {ContextMenuItem} from "../menu";
import {TransparentPrimaryButton} from "../button/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../text";
import React, {Children, useEffect, useState} from "react";
import useCSSVariables from "../../hook/useCSSVariables";
import styled from "styled-components";
import {DownArrowIcon} from "../icon";
import {FlexRow} from "../layout/style";

const Dropdown = ({children, onSelect}) => {
    const [buttonColor] = useCSSVariables(["--lavanda-dark"])
    const [selectedItemLabel, setSelectedItemLabel] = useState('');

    useEffect(() => {
        if(!selectedItemLabel) {
            let defaultSelectedLabel = ''
            Children.forEach(children, child => {
                const { selected, label, disabled } = child.props;
                if (selected) {
                    defaultSelectedLabel = label
                }
            })
            if(!defaultSelectedLabel) {
                const firstChild = React.Children.toArray(children)[0]
                const { label } = firstChild.props;
                defaultSelectedLabel = label
            }
            setSelectedItemLabel(defaultSelectedLabel)
        }
    }, [])

    const handleSelect = (childProps) => {
        const {label, disabled} = childProps;

        if(!disabled) {
            setSelectedItemLabel(label);
            onSelect(childProps);
        }
    }

    return (
        <ContextMenu
            alignRight
            trigger={
                <TransparentPrimaryButton
                >
                    <FlexRow gap="10px" align="center">
                        <StyledText
                            as="span"
                            size={FONT_SIZES.SIMPLE_SMALL}
                            weight={FONT_WEIGHTS.SEMI_BOLD}
                            color={buttonColor}
                        >
                            {selectedItemLabel}
                        </StyledText>
                        <DownArrowIcon color={buttonColor} size="15px"/>
                    </FlexRow>
                </TransparentPrimaryButton>
            }
        >
            {Children.map(children, child =>
                React.isValidElement(child) ? (
                    <div onClick={() => handleSelect(child.props)}>
                        {child}
                    </div>
                ) : null
            )}
        </ContextMenu>
    )
}

export const DropDownItem = styled(ContextMenuItem)``

export default Dropdown;