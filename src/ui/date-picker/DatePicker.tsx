import React, { useState, useMemo } from 'react';

import { IconButton, Button as MuiButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {
  Button,
  Modal,
  getInitDate,
  getDayName,
  getMonthName,
  DAYS_SYMBOLS,
  MONTHS_COUNT,
  getDays,
} from '..';

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
  const [activeDate, setActiveDate] = useState(getInitDate(value));

  const onNextMonthClick = () => {
    let month;
    let year: number;

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
    let month;
    let year: number;

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
    let month;
    let year: number;
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
    let month;
    let year: number;
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

  return (
    <Modal className={csx.datePicker}>
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
            <MuiButton key={day} data-idx={day} className={csx.prevDay} onClick={onPrevDayClick}>
              {day}
            </MuiButton>
          ))}
          {days.map((day) => (
            <MuiButton
              key={day}
              data-idx={day}
              className={day === activeDate.day ? csx.activeDay : ''}
              onClick={onDayClick}
            >
              {day}
            </MuiButton>
          ))}
          {nextDays.map((day) => (
            <MuiButton key={day} data-idx={day} className={csx.nextDay} onClick={onNextDayClick}>
              {day}
            </MuiButton>
          ))}
        </div>
      </section>

      <footer>
        <Button theme="primaryTransparent" onClick={onClose}>
          CANCEL
        </Button>
        <Button theme="primaryTransparent" onClick={handleSave}>
          SAVE
        </Button>
      </footer>
    </Modal>
  );
};

export default DatePicker;
