/**
 * API Configuration and Core API Setup
 *
 * This file defines the base API configuration and initializes the core API using RTK Query.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * API configuration object defining base URLs and endpoint paths.
 */
export const API_CONFIG = {
    /** Base URL for the core API */
    _coreApiBaseUrl: 'http://localhost:8080/api',

    /** Folder-related API paths and cache tags */
    folder: {
        contextPath: '/folder',
        tags: {
            list: 'FolderList',
            profile: 'FolderProfile',
        },
    },

    /** Module-related API paths and cache tags */
    module: {
        contextPath: '/module',
        tags: {
            list: 'Modules',
            profile: 'ModuleProfile',
            terms: 'ModuleTerms',
            practice: 'Practice',
        },
    },
};

/**
 * Core API setup using RTK Query.
 *
 * - Defines `reducerPath` for the API slice.
 * - Configures `fetchBaseQuery` with the base API URL.
 * - Initializes an empty `endpoints` object to be extended elsewhere.
 */
export const coreApi = createApi({
    reducerPath: 'coreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_CONFIG._coreApiBaseUrl,
    }),
    endpoints: () => ({}), // Define endpoints in corresponding feature slices
});
