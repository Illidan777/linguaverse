import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const API_CONFIG = {
    _coreApiBaseUrl: 'http://localhost:8080/api',
    folder: {
        contextPath: '/folder',
        tags: {
            list: 'FolderList',
            profile: 'FolderProfile',
        },
    },
    module: {
        contextPath: '/module',
        tags: {
            list: 'Modules',
            profile: 'ModuleProfile',
            terms: 'ModuleTerms',
        },
    },
}

export const coreApi = createApi({
    reducerPath: 'coreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_CONFIG._coreApiBaseUrl
    }),
    endpoints: () => ({}),
})


