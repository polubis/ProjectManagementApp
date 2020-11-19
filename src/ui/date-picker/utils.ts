import { V } from 'utils';

import { DatePicker } from 'ui';

export const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const DAYS_SYMBOLS = DAYS.map((day) => day.slice(0, 3));

export const DAYS_COUNT = DAYS.length;

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const MONTHS_COUNT = MONTHS.length;

export const getDayName = ({
  year,
  month,
  day,
}: {
  day: number;
  month: number;
  year: number;
}) => {
  const date = new Date(year, month - 1, day);

  return DAYS[date.getDay()];
};

export const getNow = () => {
  const now = new Date();

  return {
    day: +String(now.getDate()).padStart(2, '0'),
    month: +String(now.getMonth() + 1).padStart(2, '0'),
    year: now.getFullYear(),
  };
};

export const getInitDate = (value: string) => {
  if (V.date(false)(value).invalid) {
    return getNow();
  }

  const [day, month, year] = value.split('/').map((v) => +v);

  return { day, month, year };
};

export const getMonthName = (month: number) => {
  return MONTHS[month - 1];
};

export const getDaysInMonth = ({ year, month }: DatePicker.Date) => {
  return new Date(year, month, 0).getDate();
};

export const getLastDayOfMonth = ({ year, month }: DatePicker.Date) => {
  return new Date(year, month, 0).getDay();
};

export const getDays = (date: DatePicker.Date) => {
  const DAYS_LIMIT = 42;

  const prevMonthDate = { ...date, month: date.month - 1 };

  const prevMonthDays = getDaysInMonth(prevMonthDate);

  const prevDays = Array.from(
    { length: getLastDayOfMonth(prevMonthDate) },
    (_, i) => prevMonthDays - i
  ).reverse();

  const days = Array.from({ length: getDaysInMonth(date) }, (_, i) => i + 1);

  const nextDays = Array.from(
    { length: DAYS_LIMIT - prevDays.length - days.length },
    (_, i) => i + 1
  );

  return {
    prevDays,
    days,
    nextDays,
  };
};
