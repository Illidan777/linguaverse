/**
 * API configuration and endpoint definitions for managing folders.
 * This module provides queries and mutations for folder-related operations.
 */

// Import necessary API configurations and core API instance
import { API_CONFIG, coreApi } from "../../../api";

/**
 * folderApi - RTK Query API slice for managing folders.
 * Defines queries and mutations for CRUD operations and module assignments.
 */
export const folderApi = coreApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Fetches all folders, optionally filtered by name.
         * @param {string} name - Optional name filter for folders.
         * @returns {object} Query response containing folder list.
         */
        getAllFolders: builder.query({
            query: (name = '') => `${API_CONFIG.folder.contextPath}?name=${name}`,
            providesTags: [API_CONFIG.folder.tags.list],
        }),

        /**
         * Fetches a folder by its unique identifier.
         * @param {number} id - Unique folder ID.
         * @returns {object} Query response containing folder details.
         */
        getFolderById: builder.query({
            query: (id) => `${API_CONFIG.folder.contextPath}/${id}`,
            providesTags: [API_CONFIG.folder.tags.profile],
        }),

        /**
         * Creates a new folder with the specified name.
         * @param {string} name - Name of the new folder.
         * @returns {object} Mutation response containing created folder details.
         */
        createFolder: builder.mutation({
            query: (name) => ({
                url: API_CONFIG.folder.contextPath,
                method: 'POST',
                body: { folderName: name },
            }),
            invalidatesTags: [API_CONFIG.folder.tags.list],
        }),

        /**
         * Deletes a folder by its ID.
         * @param {number} id - Unique folder ID.
         * @returns {object} Mutation response.
         */
        deleteFolder: builder.mutation({
            query: (id) => ({
                url: `${API_CONFIG.folder.contextPath}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [API_CONFIG.folder.tags.list],
        }),

        /**
         * Updates a folder's name.
         * @param {object} params - Update parameters.
         * @param {number} params.id - Folder ID.
         * @param {string} params.name - New folder name.
         * @returns {object} Mutation response.
         */
        updateFolder: builder.mutation({
            query: ({ id, name }) => ({
                url: `${API_CONFIG.folder.contextPath}/${id}`,
                method: 'PUT',
                body: { folderName: name },
            }),
        }),

        /**
         * Adds a module to a specified folder.
         * @param {object} params - Parameters for module assignment.
         * @param {number} params.id - Folder ID.
         * @param {number} params.moduleId - Module ID.
         * @returns {object} Mutation response.
         */
        addModuleToFolder: builder.mutation({
            query: ({ id, moduleId }) => ({
                url: `${API_CONFIG.folder.contextPath}/${id}/add-module/${moduleId}`,
                method: 'PATCH',
            }),
            invalidatesTags: [
                API_CONFIG.folder.tags.list,
                API_CONFIG.folder.tags.profile,
                API_CONFIG.module.tags.list,
                API_CONFIG.module.tags.profile
            ],
        }),

        /**
         * Removes a module from a specified folder.
         * @param {object} params - Parameters for module removal.
         * @param {number} params.id - Folder ID.
         * @param {number} params.moduleId - Module ID.
         * @returns {object} Mutation response.
         */
        deleteModuleFromFolder: builder.mutation({
            query: ({ id, moduleId }) => ({
                url: `${API_CONFIG.folder.contextPath}/${id}/delete-module/${moduleId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [
                API_CONFIG.folder.tags.list,
                API_CONFIG.folder.tags.profile,
                API_CONFIG.module.tags.list,
                API_CONFIG.module.tags.profile
            ],
        }),
    }),
});

// Export auto-generated hooks for API interactions
export const {
    useGetAllFoldersQuery,
    useGetFolderByIdQuery,
    useCreateFolderMutation,
    useDeleteFolderMutation,
    useUpdateFolderMutation,
    useAddModuleToFolderMutation,
    useDeleteModuleFromFolderMutation
} = folderApi;
