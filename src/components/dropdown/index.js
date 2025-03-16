import ContextMenu, {ContextMenuItem} from "../menu";
import {TransparentPrimaryButton} from "../button/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../text";
import React, {useEffect, useMemo, useState} from "react";
import useCSSVariables from "../../hook/useCSSVariables";
import styled from "styled-components";
import {DownArrowIcon} from "../icon";
import {FlexRow} from "../layout/wrapper/position/style";

const Dropdown = ({children, onSelect}) => {
    const [buttonColor] = useCSSVariables(["--lavanda-dark"]);
    const [selectedItemLabel, setSelectedItemLabel] = useState('');

    const defaultSelectedLabel = useMemo(() => {
        const childrenArray = React.Children.toArray(children);
        let defaultLabel = '';

        for (let child of childrenArray) {
            const {selected, label} = child.props;
            if (selected) {
                defaultLabel = label;
                break;
            }
        }

        if (!defaultLabel && childrenArray.length > 0) {
            defaultLabel = childrenArray[0].props.label;
        }

        return defaultLabel;
    }, [children]);

    useEffect(() => {
        setSelectedItemLabel(defaultSelectedLabel);
    }, [defaultSelectedLabel]);

    const handleSelect = (childProps) => {
        const {label, disabled} = childProps;

        if (!disabled) {
            setSelectedItemLabel(label);
            onSelect(childProps);
        }
    };

    return (
        <ContextMenu alignRight trigger={
            <TransparentPrimaryButton>
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
        }>
            {React.Children.map(children, child =>
                    React.isValidElement(child) && (
                        <div onClick={() => handleSelect(child.props)}>
                            {child}
                        </div>
                    )
            )}
        </ContextMenu>
    );
};

export const DropDownItem = styled(ContextMenuItem)``

export default Dropdown;