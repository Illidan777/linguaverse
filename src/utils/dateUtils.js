const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const classifyDate = (stringDate) => {
    const today = new Date();
    const date = new Date(stringDate);

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
    } else if (date.getMonth() < today.getMonth()) {
        return monthNames[date.getMonth()] + ' ' + date.getFullYear();
    }
}

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

