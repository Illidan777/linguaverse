// React components and hooks
import {useState} from "react";

/**
 * Custom React hook for managing form data state.
 *
 * @param {Object} initialValues - The initial values of the form fields.
 * @returns {Object} - An object containing:
 *   - formData: The current form state.
 *   - handleChangeFormData: Function to update a specific field.
 *   - setFormData: Function to manually update the form state.
 */
export default function useFormData(initialValues) {
    // State to store form data
    const [formData, setFormData] = useState(initialValues);

    /**
     * Function to handle form field changes.
     *
     * @param {string} field - The name of the field to update.
     * @returns {Function} - A function that accepts a value and updates the corresponding field.
     */
    const handleChangeFormData = (field) => (value) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    return {formData, handleChangeFormData, setFormData};
};