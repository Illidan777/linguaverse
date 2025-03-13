import Modal, {ModalFooter} from "../index";
import {PrimaryInput} from "../../input/style";
import {PrimaryButton} from "../../button/style";
import React, {useState} from "react";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../text";

export default function CreateFolderModal(props) {

    const [folderName, setFolderName] = useState("");

    const onCreateFolder = () => {
        props.onClose()
        setFolderName("")
    }

    return (
        <Modal {...props} title="Create new folder">
            <PrimaryInput
                placeholder="Name"
                onChange={(e) => {
                    setFolderName(e.target.value)
                }}
                value={folderName}
            />
            <ModalFooter>
                <PrimaryButton
                    disabled={folderName.length === 0}
                    onClick={onCreateFolder}
                >
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Create folder
                    </StyledText>
                </PrimaryButton>
            </ModalFooter>
        </Modal>
    )
};