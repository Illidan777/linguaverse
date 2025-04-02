// Libs
import toast from "react-hot-toast";

/**
 * Custom React hook to handle API mutation responses, including success/error notifications.
 *
 * @param {Array} mutation - The mutation result and trigger function array (e.g., from `useMutation`).
 * @param {Object} [options={}] - Configuration options for success and error message handling.
 * @param {boolean} [options.showSuccessToast=true] - Whether to show a success toast notification.
 * @param {string} [options.successMessage="Operation has been proceeded successfully"] - Custom success message.
 * @param {boolean} [options.showErrorToast=true] - Whether to show an error toast notification.
 *
 * @returns {Array} - An array containing:
 *   - `executeMutation`: The function to trigger the mutation with args.
 *   - `mutationResult`: The mutation result object containing status flags and data.
 */
export default function useApiMutationResponse(mutation, options = {}) {
    const [triggerMutation, mutationResult] = mutation;
    const {
        showSuccessToast = true,
        successMessage = "Operation has been proceeded successfully",
        showErrorToast = true
    } = options;

    /**
     * Function to execute the mutation with error handling and success/error notifications.
     *
     * @param {...any} args - Arguments passed to the mutation trigger.
     * @returns {Promise<Object>} - The response body of the successful mutation.
     * @throws {Error} - If the mutation fails, the error is thrown after showing an error toast.
     */
    const executeMutation = async (...args) => {
        try {
            const response = await triggerMutation(...args).unwrap();
            if (showSuccessToast && successMessage) {
                toast.success(successMessage);
            }
            return response.body;
        } catch (error) {
            const message = error?.data?.message || "An occurred unexpected error, please try again later or contact support team.";
            console.error("API Mutation Error:", error);

            if (showErrorToast) {
                toast.error(message);
            }
            throw error;
        }
    };

    return [executeMutation, mutationResult];
};
