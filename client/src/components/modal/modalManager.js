import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {closeModal} from "./modalSlice";
import AddModuleToFolderModal from "../../features/folder/components/modal/addModuleToFolderModal";
import CreateFolderModal from "../../features/folder/components/modal/createFolderModal";
import ModuleSettingsModal from "../../features/module/components/modal/moduleSettingsModal";

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

const ModalManager = () => {
    const dispatch = useDispatch();
    const {activeModal, modalProps} = useSelector((state) => state.modal);

    const close = () => {
        dispatch(closeModal());
    };

    const modal = MODALS[activeModal];

    if (!modal) return null;

    const {component: ModalComponent, tag} = modal;

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
