import {useEffect, useState} from "react";

const useCSSVariables = (variableNames) => {
    const [values, setValues] = useState(() =>
        variableNames.map((name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim())
    );

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        setValues(variableNames.map((name) => rootStyles.getPropertyValue(name).trim()));
    }, [JSON.stringify(variableNames)]); // Зависимость от сериализованного массива

    return values;
};


 export default useCSSVariables;