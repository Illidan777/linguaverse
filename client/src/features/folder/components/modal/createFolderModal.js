/**
 * CreateFolderModal Component
 *
 * This component provides a modal interface for creating a new folder.
 * It includes an input field for the folder name and a submit button.
 */

import React, { useState } from "react";

// UI Components
import Modal from "../../../../components/modal";
import { PrimaryInput } from "../../../../components/input/style";
import { BaseButtonBar, PrimaryButton } from "../../../../components/button/style";
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../../../../components/text";

// Hooks
import useApiMutationResponse from "../../../../hook/api/useApiMutationResponse";
import { useCreateFolderMutation } from "../../api";

/**
 * CreateFolderModal Component
 *
 * Props:
 * @param {Object} props - React component props
 * @param {Function} props.onClose - Function to close the modal
 *
 * @returns {JSX.Element} The CreateFolderModal component
 */
export default function CreateFolderModal(props) {
    const { onClose } = props
    // State for folder name input
    const [folderName, setFolderName] = useState("");

    // API mutation hook for creating a folder
    const [createFolder] = useApiMutationResponse(useCreateFolderMutation(), {
        showSuccessToast: true,
        successMessage: "Folder has been successfully created!",
    });

    /**
     * Handles folder creation.
     * Calls API mutation and closes modal on success.
     */
    const onCreateFolder = async () => {
        try {
            await createFolder(folderName);
            onClose();
        } catch (error) {
            console.error("Folder creating error!", error);
        }
    };

    // Modal footer with action button
    const footer = (
        <BaseButtonBar>
            <PrimaryButton disabled={folderName.length === 0} onClick={onCreateFolder}>
                <StyledText as="span" size={FONT_SIZES.SIMPLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
                    Create folder
                </StyledText>
            </PrimaryButton>
        </BaseButtonBar>
    );

    return (
        <Modal title="Create new folder" footer={footer} {...props}>
            <PrimaryInput
                placeholder="Name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
            />
        </Modal>
    );
}