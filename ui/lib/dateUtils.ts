import * as dateFns from 'date-fns';

export default class DateUtils {
    static getStartDateOfMonth(): Date {
        return dateFns.startOfMonth(new Date());
    }

    static getEndDateOfMonth(): Date {
        return dateFns.endOfMonth(new Date());
    }

    static formatDate(value: any) {
        return dateFns.formatDate(value, 'dd/MM/yyyy HH:mm')
    }

    static formatDateOnly(value: any) {
        return dateFns.formatDate(value, 'dd/MM/yyyy')
    }

    static dateFormatFns(date: any, format: string) {
        return dateFns.format(date, format);
    }

    static isExpired = (date: any) => {
        return !dateFns.isBefore(new Date(), date);
    }

    static isAfter(date: Date, compareDate: Date | string | number) {
        return dateFns.isAfter(date, compareDate)
    }
}