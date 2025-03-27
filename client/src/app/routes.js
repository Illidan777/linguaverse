import React, {lazy, Suspense} from "react";
import {Navigate} from "react-router";
import {Spinner} from "react-bootstrap";

const HomePage = lazy(() => import("../features/pages/HomePage"));
const LibraryPage = lazy(() => import("../features/pages/LibraryPage"));
const NotificationsPage = lazy(() => import("../features/pages/NotificationPage"));
const ModulesPage = lazy(() => import("../features/pages/module/ModulesPage"));
const ModuleItemPage = lazy(() => import("../features/pages/module/ModuleProfilePage"));
const FoldersPage = lazy(() => import("../features/pages/folder/FoldersPage"));
const FolderItemPage = lazy(() => import("../features/pages/folder/FolderProfilePage"));
const ModuleEditPage = lazy(() => import("../features/pages/module/ModuleEditPage"));
const NotFoundPage = lazy(() => import("../features/pages/NotFoundPage"));

const Loadable = (Component) => (
    <Suspense fallback={<Spinner/>}>
        <Component/>
    </Suspense>
);

export const paths = {
    index: {
        path: '/',
        getHref: () => '/',
    },
    library: {
        index: {
            path: 'library',
            getHref: () => '/library',
        },
        modules: {
            path: 'modules',
            getHref: () => '/library/modules',
        },
        folders: {
            path: 'folders',
            getHref: () => '/library/folders',
        }
    },
    notifications: {
        index: {
            path: 'notifications',
            getHref: () => '/notifications',
        },
    },
    module: {
        index: {
            path: ':id',
            getHref: (id) => `/${id}`,
        },
        edit: {
            path: ':id/edit',
            getHref: (id) => `/${id}/edit`,
        },
    },
    folder: {
        path: 'library/folders/:id',
        getHref: (id) => `/library/folders/${id}`,
    },
};

export const routes = [
    {
        path: paths.index.path,
        element: Loadable(HomePage),
        index: true,
    },
    {
        path: paths.library.index.path,
        element: Loadable(LibraryPage),
        children: [
            {
                index: true,
                element: <Navigate to={paths.library.modules.path} replace/>,
            },
            {
                path: paths.library.modules.path,
                element: Loadable(ModulesPage),
            },
            {
                path: paths.library.folders.path,
                element: Loadable(FoldersPage),
            },
        ],
    },
    {
        path: paths.module.index.path,
        element: Loadable(ModuleItemPage),
    },
    {
        path: paths.module.edit.path,
        element: Loadable(ModuleEditPage),
    },
    {
        path: paths.folder.path,
        element: Loadable(FolderItemPage),
    },
    {
        path: paths.notifications.index.path,
        element: Loadable(NotificationsPage),
    },
    {
        path: "*",
        element: Loadable(NotFoundPage),
    },
];