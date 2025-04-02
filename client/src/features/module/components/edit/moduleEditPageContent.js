// React components and hooks
import React from "react";

// UI components
import {FlexCol} from "../../../../components/layout/wrapper/position/style";
import {SecondaryInput} from "../../../../components/input/style";

// ModuleEditPageContent specific components
import Toolbar from "./moduleToolBar";
import TermsContainer from "./termsContainer";

/**
 * ModuleEditPageContent Component
 * This component renders the content section for the module edit page.
 * It includes input fields for editing the module's name and description,
 * and if a module ID is provided, it displays a toolbar and the terms container.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.formData - The module data being edited.
 * @param {string} props.formData.id - The ID of the module.
 * @param {string} props.formData.name - The name of the module.
 * @param {string} props.formData.description - The description of the module.
 * @param {Array} props.formData.terms - The terms associated with the module.
 * @param {function} props.handleChangeFormData - A function to handle form data changes.
 */
export default function ModuleEditPageContent({
                                                  formData: {
                                                      id,
                                                      name,
                                                      description,
                                                      terms
                                                  },
                                                  handleChangeFormData
                                              }) {

    return (
        <FlexCol gap="20px">
            {/* Name Input */}
            <SecondaryInput
                placeholder="Name"
                value={name}
                onChange={(e) => handleChangeFormData('name')(e.target.value)}  // Handle name change
            />
            {/* Description Input */}
            <SecondaryInput
                placeholder="Description"
                value={description}
                onChange={(e) => handleChangeFormData('description')(e.target.value)} // Handle description change
            />
            {/* Conditionally render Toolbar and TermsContainer if module ID exists */}
            {id && (
                <>
                    {/* Toolbar for managing the module settings */}
                    <Toolbar moduleId={id}/>

                    {/* Terms container for managing terms associated with the module */}
                    <TermsContainer moduleId={id} terms={terms}/>
                </>
            )}
        </FlexCol>
    );
};