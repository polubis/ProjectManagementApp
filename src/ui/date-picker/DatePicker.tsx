import React, { useState, useMemo } from 'react';

import { IconButton, Button } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { usePortal } from 'utils';

import { getInitDate, getDayName, getMonthName, DAYS_SYMBOLS, MONTHS_COUNT, getDays } from '..';

import csx from './DatePicker.scss';

namespace DatePicker {
  export interface Date {
    year: number;
    month: number;
    day: number;
  }

  export interface Props {
    value: string;
    onClose(): void;
    onSave(date: Date): void;
  }
}

const DatePicker = ({ value, onClose, onSave }: DatePicker.Props) => {
  const render = usePortal();

  const [activeDate, setActiveDate] = useState(getInitDate(value));

  const onNextMonthClick = () => {
    let month, year: number;

    if (activeDate.month + 1 > MONTHS_COUNT) {
      month = 1;
      year = activeDate.year + 1;
    } else {
      month = activeDate.month + 1;
      year = activeDate.year;
    }

    setActiveDate({ day: 1, month, year });
  };

  const onPrevMonthClick = () => {
    let month, year: number;

    if (activeDate.month - 1 < 1) {
      month = MONTHS_COUNT;
      year = activeDate.year - 1;
    } else {
      month = activeDate.month - 1;
      year = activeDate.year;
    }

    setActiveDate({ day: 1, month, year });
  };

  const onPrevDayClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let month, year: number;
    const day = +e.currentTarget.getAttribute('data-idx');

    if (activeDate.month - 1 < 1) {
      month = MONTHS_COUNT;
      year = activeDate.year - 1;
    } else {
      month = activeDate.month - 1;
      year = activeDate.year;
    }

    setActiveDate({ year, month, day });
  };

  const onDayClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const day = +e.currentTarget.getAttribute('data-idx');
    setActiveDate({ ...activeDate, day });
  };

  const onNextDayClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let month, year: number;
    const day = +e.currentTarget.getAttribute('data-idx');

    if (activeDate.month + 1 > MONTHS_COUNT) {
      month = 1;
      year = activeDate.year + 1;
    } else {
      month = activeDate.month + 1;
      year = activeDate.year;
    }

    setActiveDate({ year, month, day });
  };

  const handleSave = () => {
    onSave(activeDate);
    onClose();
  };

  const { day, month, year } = activeDate;

  const { prevDays, days, nextDays } = useMemo(() => getDays(activeDate), [activeDate]);

  return render(
    <div className={csx.datePickerWrapper}>
      <div className={csx.datePicker}>
        <header>
          <span>{year}</span>
          <span>
            {getDayName(activeDate)}, {getMonthName(month)} {day}
          </span>
        </header>

        <section>
          <div className={csx.yearPicker}>
            <IconButton onClick={onPrevMonthClick}>
              <ChevronLeftIcon />
            </IconButton>
            <span>{year}</span>
            <IconButton onClick={onNextMonthClick}>
              <ChevronRightIcon />
            </IconButton>
          </div>

          <div className={csx.dayPicker}>
            {DAYS_SYMBOLS.map((symbol) => (
              <div key={symbol}>{symbol}</div>
            ))}
            {prevDays.map((day) => (
              <Button key={day} data-idx={day} className={csx.prevDay} onClick={onPrevDayClick}>
                {day}
              </Button>
            ))}
            {days.map((day) => (
              <Button
                key={day}
                data-idx={day}
                className={day === activeDate.day ? csx.activeDay : ''}
                onClick={onDayClick}
              >
                {day}
              </Button>
            ))}
            {nextDays.map((day) => (
              <Button key={day} data-idx={day} className={csx.nextDay} onClick={onNextDayClick}>
                {day}
              </Button>
            ))}
          </div>
        </section>

        <footer>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </footer>
      </div>
    </div>
  );
};

export default DatePicker;
