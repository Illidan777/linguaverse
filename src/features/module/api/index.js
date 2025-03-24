import {API_CONFIG, coreApi} from "../../../api";

export const moduleApi = coreApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllModules: builder.query({
            query: (name = '') => `${API_CONFIG.module.contextPath}?name=${name}`,
            providesTags: ['Modules'],
        }),
        getModuleById: builder.query({
            query: (id) => `${API_CONFIG.module.contextPath}/${id}`,
            providesTags: ['ModuleInfo'],
        }),
        createModule: builder.mutation({
            query: () => ({
                url: '',
                method: 'POST'
            }),
            invalidatesTags: ['Modules'],
        }),
        deleteModule: builder.mutation({
            query: (id) => ({
                url: `${API_CONFIG.module.contextPath}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Modules'],
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
            providesTags: ['ModuleTerms'],
        }),
        createTerm: builder.mutation({
            query: ({id, orderNumber = ''}) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/term?orderNumber=${orderNumber}`,
                method: 'POST',
            }),
            invalidatesTags: ['ModuleTerms'],
        }),
        updateTerm: builder.mutation({
            query: ({id, termId, request}) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/term/${termId}`,
                method: 'PUT',
                body: request,
            }),
            invalidatesTags: ['ModuleTerms'],
        }),
        deleteTerm: builder.mutation({
            query: ({id, termId}) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/term/${termId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ModuleTerms'],
        }),
        shuffleTerms: builder.mutation({
            query: (id) => ({
                url: `${API_CONFIG.module.contextPath}/${id}/term/shuffle`,
                method: 'PATCH',
            }),
            invalidatesTags: ['ModuleTerms'],
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
} = moduleApi;

