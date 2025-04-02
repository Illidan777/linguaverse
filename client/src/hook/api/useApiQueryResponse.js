// React components and hooks
import {useEffect, useMemo} from "react";

// Libs
import toast from "react-hot-toast";

/**
 * Custom React hook to process API query responses and handle success/error messages.
 *
 * @param {Object} queryResult - The API query result containing data and status flags.
 * @param {Object} [options={}] - Configuration options for handling success and error messages.
 * @param {boolean} [options.showSuccessToast=false] - Whether to show a success toast notification.
 * @param {string} [options.successMessage="Operation has been proceeded successfully"] - Custom success message.
 * @param {boolean} [options.showErrorToast=true] - Whether to show an error toast notification.
 *
 * @returns {Object} - Processed response data and query status indicators:
 *   - `data`: Parsed response data (or `null` if no data is available).
 *   - `isError`: Boolean flag indicating whether an error occurred.
 *   - `isFetching`: Boolean flag indicating whether the request is in progress.
 *   - `isSuccess`: Boolean flag indicating whether the request was successful.
 *   - `errorMessage`: Extracted error message if an error occurred.
 */
export default function useApiQueryResponse(queryResult, options = {}) {
    const {
        showSuccessToast = false,
        successMessage = "Operation has been proceeded successfully",
        showErrorToast = true
    } = options;

    const {data, error, isError, isFetching, isSuccess} = queryResult;

    /**
     * Memoized parsed data extraction.
     * Returns `null` if no data is available.
     */
    const parsedData = useMemo(() => {
        if (!data) return null;
        return data.body;
    }, [data]);

    useEffect(() => {
        if (showSuccessToast && successMessage) {
            toast.success(successMessage);
        }
        if (isError && error) {
            const message = error?.data?.message || "An occurred unexpected error, please try again later or contact support team.";
            console.error("API Query Error:", error);
            if (showErrorToast) {
                toast.error(message);
            }
        }
    }, [isError, error, options.showErrorToast]);

    return {
        data: parsedData,
        isError,
        isFetching,
        isSuccess,
        errorMessage: error?.data?.message || null,
    };
};
