/**
 * Date utility functions for the calendar component.
 */

/**
 * Get the number of days in a given month.
 * @param {number} year
 * @param {number} month - 0-indexed (0 = January)
 * @returns {number}
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of the week the month starts on.
 * Returns 0 = Monday ... 6 = Sunday (ISO week).
 * @param {number} year
 * @param {number} month - 0-indexed
 * @returns {number}
 */
export function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  // Convert from Sunday=0 to Monday=0
  return day === 0 ? 6 : day - 1;
}

/**
 * Format a date as YYYY-MM-DD string.
 * @param {number} year
 * @param {number} month - 0-indexed
 * @param {number} day
 * @returns {string}
 */
export function formatDateKey(year, month, day) {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

/**
 * Format a month key as YYYY-MM.
 * @param {number} year
 * @param {number} month - 0-indexed
 * @returns {string}
 */
export function formatMonthKey(year, month) {
  const m = String(month + 1).padStart(2, '0');
  return `${year}-${m}`;
}

/**
 * Parse a YYYY-MM-DD string into a Date object.
 * @param {string} dateKey
 * @returns {Date}
 */
export function parseDateKey(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/**
 * Check if two date keys represent the same day.
 * @param {string|null} a
 * @param {string|null} b
 * @returns {boolean}
 */
export function isSameDay(a, b) {
  if (!a || !b) return false;
  return a === b;
}

/**
 * Check if a dateKey falls between start and end (inclusive).
 * @param {string} dateKey
 * @param {string|null} start
 * @param {string|null} end
 * @returns {boolean}
 */
export function isInRange(dateKey, start, end) {
  if (!start || !end) return false;
  return dateKey >= start && dateKey <= end;
}

/**
 * Check if a dateKey is today.
 * @param {string} dateKey
 * @returns {boolean}
 */
export function isToday(dateKey) {
  const now = new Date();
  const todayKey = formatDateKey(now.getFullYear(), now.getMonth(), now.getDate());
  return dateKey === todayKey;
}

/**
 * Get a human-readable date string.
 * @param {string} dateKey - YYYY-MM-DD
 * @returns {string}
 */
export function formatDateReadable(dateKey) {
  const date = parseDateKey(dateKey);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Generate the grid data for a month, including overflow days.
 * Each cell: { day, month, year, dateKey, isCurrentMonth, isWeekend }
 * @param {number} year
 * @param {number} month - 0-indexed
 * @returns {Array<object>}
 */
export function generateMonthGrid(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells = [];

  // Previous month overflow
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const dayOfWeek = (firstDay - 1 - i) % 7;
    cells.push({
      day,
      month: prevMonth,
      year: prevYear,
      dateKey: formatDateKey(prevYear, prevMonth, day),
      isCurrentMonth: false,
      isWeekend: dayOfWeek === 5 || dayOfWeek === 6,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const idx = cells.length;
    const dayOfWeek = idx % 7;
    cells.push({
      day,
      month,
      year,
      dateKey: formatDateKey(year, month, day),
      isCurrentMonth: true,
      isWeekend: dayOfWeek === 5 || dayOfWeek === 6,
    });
  }

  // Next month overflow to complete the grid (up to 42 cells = 6 rows)
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const remaining = 42 - cells.length;

  for (let day = 1; day <= remaining; day++) {
    const idx = cells.length;
    const dayOfWeek = idx % 7;
    cells.push({
      day,
      month: nextMonth,
      year: nextYear,
      dateKey: formatDateKey(nextYear, nextMonth, day),
      isCurrentMonth: false,
      isWeekend: dayOfWeek === 5 || dayOfWeek === 6,
    });
  }

  return cells;
}

/**
 * Month names array.
 */
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Day labels for the calendar header.
 */
export const DAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
