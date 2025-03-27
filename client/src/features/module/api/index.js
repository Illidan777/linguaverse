import {API_CONFIG, coreApi} from "../../../api";

export const moduleApi = coreApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllModules: builder.query({
            query: (name = '') => `${API_CONFIG.module.contextPath}?name=${name}`,
            providesTags: [API_CONFIG.module.tags.list],
        }),
        getModuleById: builder.query({
            query: (id) => `${API_CONFIG.module.contextPath}/${id}`,
            providesTags: [API_CONFIG.module.tags.profile],
        }),
        createModule: builder.mutation({
            query: () => ({
                url: `${API_CONFIG.module.contextPath}`,
                method: 'POST'
            }),
            invalidatesTags: [API_CONFIG.module.tags.list],
        }),
        deleteModule: builder.mutation({
            query: (id) => ({
                url: `${API_CONFIG.module.contextPath}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [API_CONFIG.module.tags.list],
        }),
        updateModule: builder.mutation({
            query: ({id, request}) => ({
                url: `${API_CONFIG.module.contextPath}/${id}`,
                method: 'PUT',
                body: request
            }),
        }),
        getModuleTerms: builder.query({
            query: (id) => `${API_CONFIG.module.contextPath}/${id}/term`,
            providesTags: [API_CONFIG.module.tags.terms],
        }),
        createTerm: builder.mutation({
            query: ({id, orderNumber = ''}) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/term?orderNumber=${orderNumber}`,
                method: 'POST',
            }),
            invalidatesTags: [API_CONFIG.module.tags.terms],
        }),
        updateTerm: builder.mutation({
            query: ({id, termId, request}) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/term/${termId}`,
                method: 'PUT',
                body: request,
            }),
            invalidatesTags: [API_CONFIG.module.tags.terms],
        }),
        deleteTerm: builder.mutation({
            query: ({id, termId}) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/term/${termId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [API_CONFIG.module.tags.terms],
        }),
        shuffleTerms: builder.mutation({
            query: (id) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/term/shuffle`,
                method: 'PATCH',
            }),
            invalidatesTags: [API_CONFIG.module.tags.terms],
        }),
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
        getModuleUserPractice: builder.query({
            query: ({id, type}) => `${API_CONFIG.module.contextPath}/${id}/practice/${type}`,
            providesTags: [API_CONFIG.module.tags.practice],
        }),
        toggleFollowProgress: builder.mutation({
            query: (id) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/practice/follow-progress`,
                method: 'PATCH',
            }),
            invalidatesTags: [API_CONFIG.module.tags.practice],
        }),
        updateTermStatus: builder.mutation({
            query: ({ id, termId, learned, currentIndex }) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/practice/term/${termId}?learned=${learned}&currentIndex=${currentIndex}`,
                method: 'PATCH',
            }),
        }),
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


