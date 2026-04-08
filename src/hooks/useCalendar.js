'use client';

import { useState, useCallback, useMemo } from 'react';
import { generateMonthGrid, formatDateKey, MONTH_NAMES } from '@/utils/dateHelpers';

/**
 * Custom hook for calendar state management.
 * Handles month navigation, date range selection, and grid generation.
 */
export default function useCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [selectionPhase, setSelectionPhase] = useState('start'); // 'start' | 'end'
  const [flipDirection, setFlipDirection] = useState(null); // 'next' | 'prev'

  // Generate the grid for the current month
  const grid = useMemo(
    () => generateMonthGrid(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  // Navigate to the next month
  const goToNextMonth = useCallback(() => {
    setFlipDirection('next');
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
    // Reset selection on month change
    setRangeStart(null);
    setRangeEnd(null);
    setSelectionPhase('start');
  }, []);

  // Navigate to the previous month
  const goToPrevMonth = useCallback(() => {
    setFlipDirection('prev');
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
    setRangeStart(null);
    setRangeEnd(null);
    setSelectionPhase('start');
  }, []);

  // Go to today's month
  const goToToday = useCallback(() => {
    const now = new Date();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
    setRangeStart(null);
    setRangeEnd(null);
    setSelectionPhase('start');
    setFlipDirection(null);
  }, []);

  // Handle date selection for range
  const handleDateClick = useCallback(
    (dateKey, isCurrentMonth) => {
      if (!isCurrentMonth) return;

      if (selectionPhase === 'start') {
        setRangeStart(dateKey);
        setRangeEnd(null);
        setSelectionPhase('end');
      } else {
        // Ensure start <= end
        if (dateKey < rangeStart) {
          setRangeEnd(rangeStart);
          setRangeStart(dateKey);
        } else if (dateKey === rangeStart) {
          // Same day clicked - single date selection
          setRangeEnd(dateKey);
        } else {
          setRangeEnd(dateKey);
        }
        setSelectionPhase('start');
      }
    },
    [selectionPhase, rangeStart]
  );

  // Clear selection
  const clearSelection = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
    setSelectionPhase('start');
  }, []);

  // Current month/year label
  const monthLabel = MONTH_NAMES[currentMonth];
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  return {
    currentMonth,
    currentYear,
    monthLabel,
    grid,
    rangeStart,
    rangeEnd,
    selectionPhase,
    flipDirection,
    todayKey,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    handleDateClick,
    clearSelection,
  };
}
