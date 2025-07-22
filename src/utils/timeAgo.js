import {differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, format} from 'date-fns'

export function getShortTimeAgo (date) {
    const now  = new Date();
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
        return "Invalid date"; // Or return null or a fallback message
    }
    const formattedDate = format(targetDate, 'dd/MM/yyyy')
    const seconds = differenceInSeconds(now, targetDate)
    const minutes = differenceInMinutes(now, targetDate);
    const hours = differenceInHours(now, targetDate);
    const days = differenceInDays(now, targetDate);

    if(seconds < 60) return `${seconds}s`
    if(minutes < 60) return `${minutes}m`;
    if(hours < 24) return `${hours}h`;
    if(days < 7) return `${days}d`
    return formattedDate
}