import Modal, {ModalFooter} from "../../../components/modal";
import {PrimaryInput} from "../../../components/input/style";
import {PrimaryButton} from "../../../components/button/style";
import React, {useState} from "react";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";

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