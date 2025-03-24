import toast from "react-hot-toast";


const useApiMutationResponse = (mutation, options = {}) => {
    const [triggerMutation, mutationResult] = mutation;
    const {
        showSuccessToast = true,
        successMessage = "Operation has been proceeded successfully",
        showErrorToast = true
    } = options;

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

export default useApiMutationResponse;
