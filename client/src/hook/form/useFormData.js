import {useState} from "react";

export default function useFormData(initialValues) {
    const [formData, setFormData] = useState(initialValues);

    const handleChangeFormData = (field) => (value) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    return {formData, handleChangeFormData, setFormData};
};