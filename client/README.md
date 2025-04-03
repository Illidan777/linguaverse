# Lingμverse - Front-End (React)

Lingμverse front-end is built using React, styled components, and several modern tools such as Redux, RTK Query, and React Router. This application serves as the user interface for the Lingμverse language-learning platform. It connects to the back-end API and provides the interface for users to engage in language learning exercises.

## Table of Contents

1. [Project Structure](#project-structure)
    - [api](#1-api)
    - [app](#2-app)
    - [assets](#3-assets)
    - [components](#4-components)
    - [constants](#5-constants)
    - [features](#6-features)
    - [hooks](#7-hooks)
    - [store](#8-store)
    - [style](#9-style)
    - [utils](#10-utils)
    - [index.js](#11-indexjs)
    - [public](#12-public)

2. [Styling](#styling)

3. [SEO Configuration](#seo-configuration)

4. [API Communication](#api-communication)

5. [Error Handling](#error-handling)

6. [Layout](#layout)

7. [Development Approach](#development-approach)
    - [Code Reusability](#code-reusability)
    - [Modularity](#modularity)
    - [Error Handling](#error-handling-1)
    - [Responsive Design](#responsive-design)

8. [How to Set Up and Run](#how-to-set-up-and-run)
    - [Prerequisites](#prerequisites)

9. [Available Scripts](#available-scripts)
    - [`npm start`](#npm-start)
    - [`npm test`](#npm-test)
    - [`npm run build`](#npm-run-build)
    - [`npm run eject`](#npm-run-eject)

10. [Configure API (if needed)](#configure-api-if-needed)


## Project Structure

The structure of the React application is designed to be scalable, maintainable, and modular. Below is a breakdown of the project folders and their purpose:

### 1. `api`
This folder contains a singleton instance of the API that manages all the endpoints. Each specific API extends this instance using **RTK Query** to define various endpoints for communication with the back-end.

### 2. `app`
The `app` folder contains:
- **index.js**: The main entry component for the application.
- **routes.js**: The configuration for React Router, which manages page navigation and routing within the app.

### 3. `assets`
This folder stores static assets like images, fonts, and other resources used across the application.

### 4. `components`
This folder contains reusable, non-specific components such as:
- Buttons
- Toolbars
- Progress bars
- Modals
- Menus
- Input fields, etc.

These components are designed to be reused across different parts of the application.

### 5. `constants`
The `constants` folder stores constant values that are used across the application. This includes things like API endpoints, error messages, and other fixed values.

### 6. `features`
The `features` folder contains the core business logic and components of the application, organized by modules.
- Subfolders within `features` represent individual modules or pages of the app.
- Pages and page-specific components are located within their respective module folders.

### 7. `hooks`
This folder contains custom React hooks that encapsulate reusable logic across the application. For example, hooks for fetching data from the API, handling form inputs, etc.

### 8. `store`
This folder contains the Redux store configuration and slices, utilizing **Redux Toolkit** (RTK) to manage global state and data flow in the app.

### 9. `style`
The `style` folder contains global styles, including:
- Importing third-party styles
- Variables for colors, font sizes, etc.
- Global CSS styles like reset, typography, etc.
- Variables for element radius, z-index for stacking context, etc.

### 10. `utils`
This folder contains utility files like `dateUtils.js` for common helper functions that are used throughout the application.

### 11. `index.js`
This is the main entry point for the React application, where the app is initialized and rendered to the DOM.

### 12. `public`
The `public` folder contains:
- `index.html`: The root HTML file that is served to the browser.
- `manifest.json`: Contains metadata about the web application.
- Icons and other static assets.

## Styling

Styling is handled using **Styled Components**, which allows for writing scoped CSS in JavaScript. This enables a modular and component-driven approach to styling, promoting reusability and consistency across the app.

## SEO Configuration

SEO configuration is handled at the page component level to ensure each page has the appropriate meta tags for search engines and social sharing.

## API Communication

The app communicates with the back-end API using **RTK Query** for data fetching and caching. Error handling and loading states are managed globally using Redux and custom error boundaries.

## Error Handling

Error handling is implemented using custom **Error Boundaries** and **Loading** components. All API calls and network requests are wrapped with custom hooks for easier management of state during loading, success, and failure phases.

## Layout

A single layout is applied across all pages, ensuring consistency in design and user experience. The layout is structured to be responsive and adaptable to different screen sizes.

## Development Approach

The application has been built with a focus on:

- **Code Reusability**: Components and business logic are structured to be reused across different parts of the application.
- **Modularity**: The application is divided into features and modules for better maintainability and scalability.
- **Error Handling**: Comprehensive error boundaries and loaders ensure that the user experience is smooth even during failures or slow network requests.
- **Responsive Design**: The UI is responsive and adapts well to different screen sizes using modern CSS practices.

## How to Set Up and Run

### Prerequisites

- Node.js (version >= 16)
- npm (version >= 7) or yarn


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Configure API (if needed)

Ensure that your back-end API is running and accessible by the React app. The API URL may need to be configured in the app depending on your local or production environment.