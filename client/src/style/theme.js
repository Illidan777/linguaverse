/**
 * Theme configuration object for responsive design.
 *
 * This object defines the breakpoints for different screen sizes used in the app's CSS for responsive
 * design. Each size corresponds to a media query breakpoint, allowing the app's layout to adjust based
 * on the user's device width.
 *
 * @file theme.js
 */

const theme = {
    media: {
        /**
         * Mobile devices (max width: 480px)
         * @type {string}
         */
        mobile: "480px",

        /**
         * Tablet devices (max width: 576px)
         * @type {string}
         */
        tablet: "576px",

        /**
         * Larger tablet devices (max width: 768px)
         * @type {string}
         */
        bigTablet: "768px",

        /**
         * Laptop devices (max width: 992px)
         * @type {string}
         */
        laptop: "992px",

        /**
         * Desktop devices (max width: 1200px)
         * @type {string}
         */
        desktop: "1200px",
    },
};

export default theme;