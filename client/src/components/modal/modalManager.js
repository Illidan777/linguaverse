/**
 * ModalManager Component
 *
 * This component manages modals dynamically based on the Redux state.
 * It selects the active modal and renders the corresponding modal component.
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux action for closing modals
import { closeModal } from "./modalSlice";

// Import modal components
import AddModuleToFolderModal from "../../features/folder/components/modal/addModuleToFolderModal";
import CreateFolderModal from "../../features/folder/components/modal/createFolderModal";
import ModuleSettingsModal from "../../features/module/components/modal/moduleSettingsModal";

/**
 * Object mapping modal names to their respective components.
 */
export const MODALS = {
    addModule: {
        component: AddModuleToFolderModal,
        tag: 'addModule',
    },
    createFolder: {
        component: CreateFolderModal,
        tag: 'createFolder',
    },
    moduleSettings: {
        component: ModuleSettingsModal,
        tag: 'moduleSettings',
    },
};

/**
 * ModalManager Component
 *
 * This component listens to the Redux store for the active modal and renders it.
 */
const ModalManager = () => {
    const dispatch = useDispatch();
    const { activeModal, modalProps } = useSelector((state) => state.modal);

    // Function to close the modal
    const close = () => {
        dispatch(closeModal());
    };

    // Get the active modal configuration
    const modal = MODALS[activeModal];

    // If no modal is active, return null
    if (!modal) return null;

    const { component: ModalComponent, tag } = modal;

    return (
        <ModalComponent
            {...modalProps}
            opened={true}
            onClose={close}
            tag={tag}
        />
    );
};

export default ModalManager;