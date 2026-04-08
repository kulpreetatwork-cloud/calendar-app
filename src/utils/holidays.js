/**
 * Static holiday data for calendar markers.
 * Covers major US and Indian holidays.
 * Key format: "MM-DD"
 */

const HOLIDAYS = {
  '01-01': { name: 'New Year\'s Day', emoji: '🎉' },
  '01-14': { name: 'Makar Sankranti', emoji: '🪁' },
  '01-26': { name: 'Republic Day (India)', emoji: '🇮🇳' },
  '02-14': { name: 'Valentine\'s Day', emoji: '💕' },
  '03-08': { name: 'International Women\'s Day', emoji: '👩' },
  '03-17': { name: 'St. Patrick\'s Day', emoji: '☘️' },
  '03-25': { name: 'Holi', emoji: '🎨' },
  '04-01': { name: 'April Fool\'s Day', emoji: '🤡' },
  '04-14': { name: 'Ambedkar Jayanti', emoji: '📘' },
  '04-22': { name: 'Earth Day', emoji: '🌍' },
  '05-01': { name: 'International Workers\' Day', emoji: '🛠️' },
  '05-12': { name: 'Mother\'s Day', emoji: '💐' },
  '06-16': { name: 'Father\'s Day', emoji: '👔' },
  '06-21': { name: 'International Yoga Day', emoji: '🧘' },
  '07-04': { name: 'Independence Day (US)', emoji: '🇺🇸' },
  '08-15': { name: 'Independence Day (India)', emoji: '🇮🇳' },
  '09-05': { name: 'Teachers\' Day (India)', emoji: '📚' },
  '09-22': { name: 'Autumn Equinox', emoji: '🍂' },
  '10-02': { name: 'Gandhi Jayanti', emoji: '🕊️' },
  '10-31': { name: 'Halloween', emoji: '🎃' },
  '11-01': { name: 'Diwali', emoji: '🪔' },
  '11-14': { name: 'Children\'s Day (India)', emoji: '👶' },
  '11-28': { name: 'Thanksgiving (US)', emoji: '🦃' },
  '12-25': { name: 'Christmas', emoji: '🎄' },
  '12-31': { name: 'New Year\'s Eve', emoji: '🥂' },
};

/**
 * Get holiday info for a given date key.
 * @param {string} dateKey - YYYY-MM-DD
 * @returns {object|null} - { name, emoji } or null
 */
export function getHoliday(dateKey) {
  const mmdd = dateKey.substring(5); // "MM-DD"
  return HOLIDAYS[mmdd] || null;
}

/**
 * Get all holidays for a given month.
 * @param {number} month - 0-indexed
 * @returns {Array<{day: number, name: string, emoji: string}>}
 */
export function getHolidaysForMonth(month) {
  const mm = String(month + 1).padStart(2, '0');
  const result = [];
  for (const [key, value] of Object.entries(HOLIDAYS)) {
    if (key.startsWith(mm + '-')) {
      const day = parseInt(key.split('-')[1], 10);
      result.push({ day, ...value });
    }
  }
  return result;
}

export default HOLIDAYS;
