/**
 * Application Routing Configuration
 *
 * This file defines the application's route structure, lazy-loaded components,
 * and dynamic path management.
 */

// React imports for lazy loading and suspense handling
import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router";
import Spinner from "../components/spinner/Spinner";

// Lazy-loaded page components for optimized performance
const HomePage = lazy(() => import("../features/page/home/HomePage"));
const LibraryPage = lazy(() => import("../features/page/library/LibraryPage"));
const NotificationsPage = lazy(() => import("../features/page/notification/NotificationPage"));
const ModulesPage = lazy(() => import("../features/page/module/ModulesPage"));
const ModuleItemPage = lazy(() => import("../features/page/module/ModuleProfilePage"));
const FoldersPage = lazy(() => import("../features/page/folder/FoldersPage"));
const FolderItemPage = lazy(() => import("../features/page/folder/FolderProfilePage"));
const ModuleEditPage = lazy(() => import("../features/page/module/ModuleEditPage"));
const NotFoundPage = lazy(() => import("../features/page/NotFoundPage"));

/**
 * Higher-order component to wrap lazy-loaded components with a fallback spinner.
 *
 * @param {React.ComponentType} Component - The component to wrap.
 * @returns {JSX.Element} Suspense-wrapped component with a loading indicator.
 */
const Loadable = (Component) => (
    <Suspense fallback={<Spinner />}>
        <Component />
    </Suspense>
);

/**
 * Object defining application paths and helper functions to generate URLs dynamically.
 */
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
        },
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

/**
 * Array defining application routes, their corresponding components, and behaviors.
 */
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
                element: <Navigate to={paths.library.modules.path} replace />,
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
