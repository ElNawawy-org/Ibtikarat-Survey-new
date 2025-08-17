import { useState, useRef, useEffect, FC } from 'react';
import { TProps } from './type';
import styles from './style.module.css';
import { ArrowDownIcon } from './icons/arrow-down-icon';
import { ArrowLeftIcon } from './icons/arrow-left-icon';
import { ArrowRightIcon } from './icons/arrow-right-icon';
import { CalendarIcon } from './icons/calendar-icon';

/**
 * Formats a given date into "YYYY/MM/DD" format.
 */
const formatDate: (date: Date | null) => string = date => {
  return date
    ? `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}/${String(date.getDate()).padStart(2, '0')}`
    : 'Provide a valid date';
};

/**
 * Date range picker component.
 *
 * @example
 *  <DateRangePicker
 *      range={range}
 *      onChange={(range) => console.log(range.startDate, range.endDate)}
 *      label="Select Date Range"
 *      placeholder="YYYY/MM/DD"
 *      clearTitle="Clear"
 *  />
 */

export const DateRangePicker: FC<TProps> = ({
  range,
  onChange,
  calendarIcon,
  label,
  placeholder,
  clearTitle,
  nextIcon,
  previousIcon,
}) => {
  const startDate = range?.startDate;
  const endDate = range?.endDate;

  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const pickerRef = useRef<HTMLDivElement>(null);

  /**
   * Closes the calendar when clicking outside the component.
   */
  useEffect(() => {
    const handleClickOutside: (event: MouseEvent) => void = event => {
      if (
        pickerRef.current &&
        event.target instanceof Node &&
        !pickerRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Handles date selection.
   */
  const handleDateClick: (date: Date) => void = date => {
    if (!startDate || (startDate && endDate)) {
      onChange({ startDate: date, endDate: null });
    } else if (startDate && !endDate && date >= startDate) {
      onChange({ startDate, endDate: date });
      setShowCalendar(false);
    }
  };

  /** Clears the selected date range. */
  const clearDate = () => {
    onChange({ startDate: null, endDate: null });
  };

  /**
   * Generates the days for the current month.
   * The list of days includes empty slots for alignment.
   */
  const generateDays: () => Array<Date | null> = () => {
    const days = [];
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const startDay = firstDayOfMonth.getDay(); // Sunday = 0

    // Previous month's empty spots
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Current month's days
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      days.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      );
    }

    return days;
  };

  /**
   * Checks if a given date is selected.
   */
  const isSelected: (date: Date) => boolean = date =>
    date.toDateString() === startDate?.toDateString() ||
    date.toDateString() === endDate?.toDateString();

  /**
   * Checks if a given date is the start date.
   */
  const isStartDate: (date: Date) => boolean = date =>
    date.toDateString() === startDate?.toDateString();

  /**
   * Checks if a given date is the end date.
   */
  const isEndDate: (date: Date) => boolean = date =>
    date.toDateString() === endDate?.toDateString();

  /**
   * Checks if a given date is within the selected range.
   */
  const isInRange: (date: Date) => boolean = date =>
    date > (startDate as Date) && date < (endDate as Date);

  return (
    <div
      className={styles.container}
      ref={pickerRef}
    >
      <button
        className={styles.button}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <span className={styles.content}>
          {calendarIcon || <CalendarIcon />}

          <span className={styles.date}>
            <span className={styles.label}>{label}</span>

            <span>
              {startDate ? formatDate(startDate) : placeholder} -{' '}
              {endDate ? formatDate(endDate) : placeholder}
            </span>
          </span>
        </span>

        <ArrowDownIcon />
      </button>

      {showCalendar && (
        <div className={styles.calendar}>
          <div className={styles.header}>
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1,
                    1
                  )
                )
              }
            >
              {previousIcon || <ArrowLeftIcon />}
            </button>
            <span>
              {currentMonth.toLocaleDateString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1,
                    1
                  )
                )
              }
            >
              {nextIcon || <ArrowRightIcon />}
            </button>
          </div>
          <div className={styles.weekdays}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className={styles.days}>
            {generateDays().map((date, index) => {
              const isToday =
                date && date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={index}
                  className={`${styles.day} ${
                    date && isSelected(date) ? styles.selected : ''
                  } ${isToday ? styles.today : ''}  ${
                    date && isStartDate(date) ? styles.start : ''
                  } ${date && isEndDate(date) ? styles.end : ''} ${
                    date && isInRange(date) ? styles.inRange : ''
                  }`}
                  onClick={() => date && handleDateClick(date)}
                >
                  {date ? date.getDate() : ''}
                </div>
              );
            })}
          </div>

          <button
            className={styles.clearButton}
            onClick={clearDate}
          >
            {clearTitle}
          </button>
        </div>
      )}
    </div>
  );
};
