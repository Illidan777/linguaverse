/**
 * Module API Service
 *
 * This service provides API endpoints for managing modules and their related operations.
 * It uses RTK Query for efficient data fetching, caching, and state management.
 */

// Import API configuration and core API instance
import {API_CONFIG, coreApi} from "../../../api";

/**
 * Injects endpoints related to module management into the core API.
 */
export const moduleApi = coreApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Fetch all modules, optionally filtered by name.
         * @param {string} [name=''] - Optional module name filter.
         */
        getAllModules: builder.query({
            query: (name = '') => `${API_CONFIG.module.contextPath}?name=${name}`,
            providesTags: [API_CONFIG.module.tags.list],
        }),

        /**
         * Fetch a module by its ID.
         * @param {string} id - The module ID.
         */
        getModuleById: builder.query({
            query: (id) => `${API_CONFIG.module.contextPath}/${id}`,
            providesTags: [API_CONFIG.module.tags.profile],
        }),

        /**
         * Create a new module.
         */
        createModule: builder.mutation({
            query: () => ({
                url: `${API_CONFIG.module.contextPath}`,
                method: 'POST',
            }),
            invalidatesTags: [API_CONFIG.module.tags.list],
        }),

        /**
         * Delete a module by ID.
         * @param {string} id - The module ID.
         */
        deleteModule: builder.mutation({
            query: (id) => ({
                url: `${API_CONFIG.module.contextPath}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [API_CONFIG.module.tags.list],
        }),

        /**
         * Update a module.
         * @param {string} id - The module ID.
         * @param {Object} request - The update payload.
         */
        updateModule: builder.mutation({
            query: ({id, request}) => ({
                url: `${API_CONFIG.module.contextPath}/${id}`,
                method: 'PUT',
                body: request,
            }),
        }),

        /**
         * Fetch terms for a module.
         * @param {string} id - The module ID.
         */
        getModuleTerms: builder.query({
            query: (id) => `${API_CONFIG.module.contextPath}/${id}/term`,
            providesTags: [API_CONFIG.module.tags.terms],
        }),

        /**
         * Create a new term in a module.
         * @param {string} id - The module ID.
         * @param {string} [orderNumber=''] - The order number for the term.
         */
        createTerm: builder.mutation({
            query: ({id, orderNumber = ''}) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/term?orderNumber=${orderNumber}`,
                method: 'POST',
            }),
            invalidatesTags: [API_CONFIG.module.tags.terms],
        }),

        /**
         * Update a term within a module.
         * @param {string} id - The module ID.
         * @param {string} termId - The term ID.
         * @param {Object} request - The update payload.
         */
        updateTerm: builder.mutation({
            query: ({id, termId, request}) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/term/${termId}`,
                method: 'PUT',
                body: request,
            }),
            invalidatesTags: [API_CONFIG.module.tags.terms],
        }),

        /**
         * Shuffle terms order within module.
         * @param {string} id - The module ID.
         */
        shuffleTerms: builder.mutation({
            query: (id) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/term/shuffle`,
                method: 'PATCH',
            }),
            invalidatesTags: [API_CONFIG.module.tags.terms],
        }),

        /**
         * Activate module. Change status from DRAFT to ACTIVE.
         * @param {string} id - The module ID.
         */
        activateModule: builder.mutation({
            query: (id) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/activate`,
                method: 'PATCH',
            }),
            invalidatesTags: [
                API_CONFIG.module.tags.profile,
                API_CONFIG.module.tags.list,
            ],
        }),

        /**
         * Delete a term from a module.
         * @param {string} id - The module ID.
         * @param {string} termId - The term ID.
         */
        deleteTerm: builder.mutation({
            query: ({id, termId}) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/term/${termId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [API_CONFIG.module.tags.terms],
        }),

        /**
         * Fetch user practice data for a module.
         * @param {string} id - The module ID.
         * @param {string} type - The practice type.
         */
        getModuleUserPractice: builder.query({
            query: ({id, type}) => `${API_CONFIG.module.contextPath}/${id}/practice/${type}`,
            providesTags: [API_CONFIG.module.tags.practice],
        }),

        /**
         * Toggle follow progress for a module.
         * @param {string} id - The module ID.
         */
        toggleFollowProgress: builder.mutation({
            query: (id) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/practice/follow-progress`,
                method: 'PATCH',
            }),
            invalidatesTags: [API_CONFIG.module.tags.practice],
        }),

        /**
         * Update the status of a term in practice.
         * @param {string} id - The module ID.
         * @param {string} termId - The term ID.
         * @param {boolean} learned - Whether the term is learned.
         * @param {number} currentIndex - The current index in practice.
         */
        updateTermStatus: builder.mutation({
            query: ({id, termId, learned, currentIndex}) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/practice/term/${termId}?learned=${learned}&currentIndex=${currentIndex}`,
                method: 'PATCH',
            }),
        }),

        /**
         * Reset practice progress for a module.
         * @param {string} id - The module ID.
         */
        resetPractice: builder.mutation({
            query: (id) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/practice/reset`,
                method: 'PATCH',
            }),
            invalidatesTags: [API_CONFIG.module.tags.practice],
        }),
    }),
});

export const {
    useGetAllModulesQuery,
    useGetModuleByIdQuery,
    useCreateModuleMutation,
    useDeleteModuleMutation,
    useUpdateModuleMutation,
    useGetModuleTermsQuery,
    useCreateTermMutation,
    useUpdateTermMutation,
    useDeleteTermMutation,
    useShuffleTermsMutation,
    useActivateModuleMutation,
    useGetModuleUserPracticeQuery,
    useToggleFollowProgressMutation,
    useUpdateTermStatusMutation,
    useResetPracticeMutation
} = moduleApi;


