import {useEffect, useMemo} from "react";
import toast from "react-hot-toast";

const useApiQueryResponse = (queryResult, options = {}) => {
    const {
        showSuccessToast = false,
        successMessage = "Operation has been proceeded successfully",
        showErrorToast = true
    } = options;

    const {data, error, isError, isFetching, isSuccess} = queryResult;

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

export default useApiQueryResponse;
