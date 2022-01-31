export const passedTime = (transaction) => {
    let startTime = new Date(transaction.updated_at);
    let endTime = new Date();

    // time difference in ms
    let timeDiff = endTime.getTime() - startTime.getTime();
    // strip the ms
    timeDiff /= 1000;

    // get seconds
    let seconds = Math.round(timeDiff % 60);

    // remove seconds from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get minutes
    let minutes = Math.round(timeDiff % 60);

    // remove minutes from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get hours
    let hours = Math.round(timeDiff % 24);

    // remove hours from the date
    timeDiff = Math.floor(timeDiff / 24);

    let days = timeDiff;
    let totalHours = hours + (days * 24); // add days to hours
    if (minutes === 0) {
        return seconds + "s"
    } else if (totalHours === 0) {
        return minutes + "m";
    } else if (days === 0) {
        return totalHours + "h";
    } else if (days < 7) {
        return days + "d"
    } else if (days < 365) {
        return Math.floor(days / 7) + "w";
    } else return Math.floor(days / 365) + "y";
}