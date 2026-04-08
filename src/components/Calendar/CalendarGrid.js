'use client';

import { useEffect, useState, useRef } from 'react';
import { DAY_LABELS } from '@/utils/dateHelpers';
import DayCell from './DayCell';
import styles from './CalendarGrid.module.css';

/**
 * Calendar grid component.
 * Renders day headers and a 7-column grid of DayCell components.
 * Supports flip animation on month change.
 */
export default function CalendarGrid({
  grid,
  rangeStart,
  rangeEnd,
  flipDirection,
  onDateClick,
  dateHasNotes,
  currentYear,
  currentMonth,
}) {
  const [flipClass, setFlipClass] = useState('');
  const prevMonthRef = useRef(`${currentYear}-${currentMonth}`);

  // Trigger flip animation on month change
  useEffect(() => {
    const currentKey = `${currentYear}-${currentMonth}`;
    if (prevMonthRef.current !== currentKey) {
      if (flipDirection === 'next') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFlipClass(styles.flipNext);
      } else if (flipDirection === 'prev') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFlipClass(styles.flipPrev);
      }
      prevMonthRef.current = currentKey;

      const timer = setTimeout(() => setFlipClass(''), 600);
      return () => clearTimeout(timer);
    }
  }, [currentYear, currentMonth, flipDirection]);

  return (
    <div className={styles.gridWrapper}>
      {/* Day of week headers */}
      <div className={styles.dayHeaders}>
        {DAY_LABELS.map((label) => (
          <div key={label} className={styles.dayHeader}>
            {label}
          </div>
        ))}
      </div>

      {/* Animated grid container */}
      <div className={styles.flipContainer}>
        <div className={`${styles.flipContent} ${flipClass}`}>
          <div className={styles.grid} id="calendar-grid">
            {grid.map((cell, index) => (
              <DayCell
                key={cell.dateKey}
                day={cell.day}
                dateKey={cell.dateKey}
                isCurrentMonth={cell.isCurrentMonth}
                isWeekend={cell.isWeekend}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                hasNote={
                  cell.isCurrentMonth &&
                  dateHasNotes(cell.year, cell.month, cell.dateKey)
                }
                onClick={onDateClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
