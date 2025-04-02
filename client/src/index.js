/**
 * Entry point for the React application.
 *
 * This file sets up the main React DOM rendering process by wrapping the App component
 * in the Redux Provider to ensure the store is available throughout the application.
 *
 * The app's global styles are imported from the './style/index.scss' file.
 *
 * @file index.js
 */

// React components and hooks
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";

// Importing the global styles for the application
import './style/index.scss';

// Importing the root application component
import App from './app';

// Importing the Redux store for global state management
import store from "./store/store";

// Selecting the root element in the DOM where the React app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the application wrapped with Redux Provider
root.render(
      <Provider store={store}> {/* Making the Redux store available to the entire app */}
          <App /> {/* The root component of the application */}
      </Provider>
);
