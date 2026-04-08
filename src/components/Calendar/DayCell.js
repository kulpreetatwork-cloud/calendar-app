'use client';

import { useMemo } from 'react';
import { isToday, isSameDay, isInRange } from '@/utils/dateHelpers';
import { getHoliday } from '@/utils/holidays';
import styles from './DayCell.module.css';

/**
 * Individual day cell in the calendar grid.
 * Handles visual states: today, weekend, holiday, range start/end/between, notes.
 */
export default function DayCell({
  day,
  dateKey,
  isCurrentMonth,
  isWeekend,
  rangeStart,
  rangeEnd,
  hasNote,
  onClick,
}) {
  const today = isToday(dateKey);
  const holiday = useMemo(() => getHoliday(dateKey), [dateKey]);

  const isStart = isSameDay(dateKey, rangeStart);
  const isEnd = isSameDay(dateKey, rangeEnd);
  const isSingle = isStart && isEnd;
  const inRangeBetween =
    !isStart && !isEnd && isInRange(dateKey, rangeStart, rangeEnd);

  // Build class list
  const classNames = [styles.cell];

  if (!isCurrentMonth) {
    classNames.push(styles.overflow);
  } else {
    if (isWeekend) classNames.push(styles.weekend);
    if (today) classNames.push(styles.today);

    if (isSingle) {
      classNames.push(styles.rangeSingle);
    } else if (isStart) {
      classNames.push(styles.rangeStart);
    } else if (isEnd) {
      classNames.push(styles.rangeEnd);
    } else if (inRangeBetween) {
      classNames.push(styles.inRange);
    }
  }

  return (
    <div
      className={classNames.join(' ')}
      onClick={() => onClick(dateKey, isCurrentMonth)}
      role="button"
      tabIndex={isCurrentMonth ? 0 : -1}
      aria-label={`${day}${holiday ? `, ${holiday.name}` : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(dateKey, isCurrentMonth);
        }
      }}
    >
      <span className={styles.dayNumber}>{day}</span>

      <div className={styles.indicators}>
        {holiday && isCurrentMonth && (
          <span className={styles.holidayDot} title={holiday.name} />
        )}
        {hasNote && isCurrentMonth && (
          <span className={styles.noteIndicator}>📌</span>
        )}
      </div>

      {/* Holiday tooltip */}
      {holiday && isCurrentMonth && (
        <div className={styles.tooltip}>
          {holiday.emoji} {holiday.name}
        </div>
      )}
    </div>
  );
}
