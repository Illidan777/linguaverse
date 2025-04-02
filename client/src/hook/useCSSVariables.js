// React components and hooks
import {useEffect, useState} from "react";

/**
 * Custom React hook to retrieve CSS variable values.
 *
 * @param {string[]} variableNames - An array of CSS variable names (e.g., '--primary-color').
 * @returns {string[]} - An array of values corresponding to the given CSS variables.
 */
export default function useCSSVariables(variableNames) {
    // State to hold the values of the provided CSS variables
    const [values, setValues] = useState(() =>
        variableNames.map((name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim())
    );

    useEffect(() => {
        // Fetch updated values from CSS variables on component mount or when variableNames change
        const rootStyles = getComputedStyle(document.documentElement);
        setValues(variableNames.map((name) => rootStyles.getPropertyValue(name).trim()));
    }, [JSON.stringify(variableNames)]); // Ensuring effect re-runs when variableNames change

    return values;
};