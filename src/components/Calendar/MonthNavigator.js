'use client';

import { FiChevronLeft, FiChevronRight, FiCalendar, FiX } from 'react-icons/fi';
import { formatDateReadable } from '@/utils/dateHelpers';
import styles from './MonthNavigator.module.css';

/**
 * Navigation bar for the calendar.
 * Shows prev/next arrows, today button, and selected range info.
 */
export default function MonthNavigator({
  onPrev,
  onNext,
  onToday,
  rangeStart,
  rangeEnd,
  onClearSelection,
}) {
  const hasSelection = rangeStart !== null;
  const isSingleDate = rangeStart && rangeStart === rangeEnd;
  const isRange = rangeStart && rangeEnd && rangeStart !== rangeEnd;

  const getSelectionLabel = () => {
    if (isSingleDate) {
      return formatDateReadable(rangeStart);
    }
    if (isRange) {
      return `${formatDateReadable(rangeStart)} — ${formatDateReadable(rangeEnd)}`;
    }
    if (rangeStart && !rangeEnd) {
      return `${formatDateReadable(rangeStart)} → Select end date`;
    }
    return null;
  };

  return (
    <div className={styles.navigator}>
      <div className={styles.navGroup}>
        <button
          className={styles.navButton}
          onClick={onPrev}
          aria-label="Previous month"
          id="btn-prev-month"
        >
          <FiChevronLeft />
        </button>
        <button
          className={styles.navButton}
          onClick={onNext}
          aria-label="Next month"
          id="btn-next-month"
        >
          <FiChevronRight />
        </button>
        <button
          className={styles.todayButton}
          onClick={onToday}
          aria-label="Go to today"
          id="btn-today"
        >
          <FiCalendar size={14} />
          <span>Today</span>
        </button>
      </div>

      {hasSelection && (
        <div className={styles.selectionInfo}>
          <span>{getSelectionLabel()}</span>
          <button
            className={styles.clearButton}
            onClick={onClearSelection}
            aria-label="Clear selection"
            id="btn-clear-selection"
          >
            <FiX />
          </button>
        </div>
      )}
    </div>
  );
}
