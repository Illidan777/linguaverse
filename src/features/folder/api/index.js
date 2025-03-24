import {API_CONFIG, coreApi} from "../../../api";

export const folderApi = coreApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFolders: builder.query({
            query: (name = '') => `${API_CONFIG.folder.contextPath}?name=${name}`,
            providesTags: [API_CONFIG.folder.tags.list],
        }),
        getFolderById: builder.query({
            query: (id) => `${API_CONFIG.folder.contextPath}/${id}`,
            providesTags: [API_CONFIG.folder.tags.profile],
        }),
        createFolder: builder.mutation({
            query: (name) => ({
                url: API_CONFIG.folder.contextPath,
                method: 'POST',
                body: {
                    folderName: name
                },
            }),
            invalidatesTags: [API_CONFIG.folder.tags.list],
        }),
        deleteFolder: builder.mutation({
            query: (id) => ({
                url: `${API_CONFIG.folder.contextPath}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [API_CONFIG.folder.tags.list],
        }),
        updateFolder: builder.mutation({
            query: ({id, name}) => ({
                url: `${API_CONFIG.folder.contextPath}/${id}`,
                method: 'PUT',
                body: {
                    folderName: name
                },
            }),
        }),
        addModuleToFolder: builder.mutation({
            query: ({id, moduleId}) => ({
                url: `${API_CONFIG.folder.contextPath}/${id}/add-module/${moduleId}`,
                method: 'PATCH',

            }),
            invalidatesTags: [
                API_CONFIG.folder.tags.list,
                API_CONFIG.folder.tags.profile,
                API_CONFIG.module.tags.list
            ],
        }),
        deleteModuleFromFolder: builder.mutation({
            query: ({id, moduleId}) => ({
                url: `${API_CONFIG.folder.contextPath}/${id}/delete-module/${moduleId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [
                API_CONFIG.folder.tags.list,
                API_CONFIG.folder.tags.profile,
                API_CONFIG.module.tags.list
            ],
        }),
    }),
});

export const {
    useGetAllFoldersQuery,
    useGetFolderByIdQuery,
    useCreateFolderMutation,
    useDeleteFolderMutation,
    useUpdateFolderMutation,
    useAddModuleToFolderMutation,
    useDeleteModuleFromFolderMutation
} = folderApi;

