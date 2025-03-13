import Modal, {ModalFooter} from "../index";
import {PrimaryButton, SquareStyledButton, TransparentPrimaryButton} from "../../button/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../text";
import React, {useState} from "react";
import {FlexCol, FlexRow} from "../../layout/style";
import ModuleListItem from "../../../features/module/ModuleListItem";
import {AddIcon, AddIcon2, CompletedIcon} from "../../icon";
import useCSSVariables from "../../../hook/useCSSVariables";

export default function AddModuleToFolderModal(props) {
    const [selected, setSelected] = useState(false);
    const [darkBaseColor] = useCSSVariables(["--lavanda-dark"])

    return (
        <Modal {...props} title="Add to folder">
            <FlexCol gap="20px">

                <FlexRow justify="flex-end">
                    <TransparentPrimaryButton>
                        <AddIcon color={darkBaseColor}/>
                        <StyledText
                            as="span"
                            size={FONT_SIZES.SIMPLE_MEDIUM}
                            weight={FONT_WEIGHTS.REGULAR}
                            color={darkBaseColor}
                        >
                            Create
                        </StyledText>
                    </TransparentPrimaryButton>
                </FlexRow>

                <ModuleListItem
                    name="Ad1"
                    termsCount="10"
                    author="you"
                    action={
                        <SquareStyledButton onClick={() => setSelected(!selected)}>
                            {selected ? <CompletedIcon/> : <AddIcon2/>}
                        </SquareStyledButton>
                    }
                >
                </ModuleListItem>
                <ModuleListItem
                    name="Ad2"
                    termsCount="30"
                    author="you"
                    action={
                        <SquareStyledButton onClick={() => setSelected(!selected)}>
                            {selected ? <CompletedIcon/> : <AddIcon2/>}
                        </SquareStyledButton>
                    }
                >
                </ModuleListItem>
            </FlexCol>
            <ModalFooter>
                <PrimaryButton
                    onClick={props.onClose}
                >
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Ready
                    </StyledText>
                </PrimaryButton>
            </ModalFooter>
        </Modal>
    )
};