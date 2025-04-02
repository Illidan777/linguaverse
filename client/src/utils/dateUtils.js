/**
 * Utility functions for classifying dates based on relative time periods (Today, Yesterday, This Week, etc.)
 *
 * @file dateUtils.js
 */

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

/**
 * Classifies the given date string into a relative time period (Today, Yesterday, This week, etc.)
 *
 * @param {string} stringDate - A string representing the date to classify
 * @returns {string} A string representing the relative time period
 */
export const classifyDate = (stringDate) => {
    const today = new Date(); // Get today's date
    const date = new Date(stringDate); // Convert the string date to a Date object

    // Compare the provided date with today's date
    if (date.setHours(0,0,0,0) === today.setHours(0,0,0,0)) {
        return 'Today';
    } else if (date.setHours(0,0,0,0) === new Date(new Date().setDate(new Date().getDate()-1)).setHours(0,0,0,0)) {
        return 'Yesterday';
    } else if (isDateInThisWeek(date)) {
        return 'This week';
    } else if (isDateInPreviousWeek(date)) {
        return 'Last week';
    } else if (date.getMonth() === today.getMonth()) {
        return 'This month';
    } else if (date.getMonth() < today.getMonth()) {  // If input date in previous month, return the month name with year
        return monthNames[date.getMonth()] + ' ' + date.getFullYear();
    }
}

/**
 * Determines whether a given date is within the current week.
 *
 * @param {Date} date - The date to check
 * @returns {boolean} True if the date is in the current week, otherwise false
 */
const isDateInThisWeek = (date) => {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();

    // get first date of week
    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

    // get last date of week
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

    // if date is equal or within the first and last dates of the week
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
}

/**
 * Determines whether a given date is within the previous week.
 *
 * @param {Date} date - The date to check
 * @returns {boolean} True if the date is in the previous week, otherwise false
 */
const isDateInPreviousWeek = (date) => {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();

    // get first date of previous week
    const firstDayOfPreviousWeek = new Date(todayObj.setDate((todayDate - todayDay) - 7));

    // get last date of previous week
    const lastDayOfPreviousWeek = new Date(firstDayOfPreviousWeek);
    lastDayOfPreviousWeek.setDate(lastDayOfPreviousWeek.getDate() + 7);

    // if date is equal or within the first and last dates of the week
    return date >= firstDayOfPreviousWeek && date <= lastDayOfPreviousWeek;
}

