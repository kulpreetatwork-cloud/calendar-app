'use client';

import { useEffect } from 'react';
import useCalendar from '@/hooks/useCalendar';
import useNotes from '@/hooks/useNotes';
import useTheme from '@/hooks/useTheme';
import MONTH_IMAGES from '@/utils/monthImages';
import HeroImage from './HeroImage';
import MonthNavigator from './MonthNavigator';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import styles from './Calendar.module.css';

/**
 * Main Calendar orchestrator component.
 * Composes all sub-components and manages state flow.
 */
export default function Calendar() {
  const {
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
  } = useCalendar();

  const {
    isLoaded,
    getNotesForSelection,
    dateHasNotes,
    addNote,
    deleteNote,
    editNote,
  } = useNotes();

  const { mode, setTheme } = useTheme();

  // Get current month's image config
  const monthImage = MONTH_IMAGES[currentMonth];

  // Apply accent color CSS variables when month changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', monthImage.accent);
    root.style.setProperty('--accent-light', monthImage.accentLight);
    root.style.setProperty('--accent-dark', monthImage.accentDark);
    root.style.setProperty('--accent-gradient', monthImage.gradient);
  }, [currentMonth, monthImage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevMonth();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNextMonth();
          break;
        case 'Escape':
          clearSelection();
          break;
        case 't':
        case 'T':
          goToToday();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextMonth, goToPrevMonth, goToToday, clearSelection]);

  // Get notes for the current selection
  const currentNotes = getNotesForSelection(
    currentYear,
    currentMonth,
    rangeStart,
    rangeEnd || rangeStart
  );

  // Note action handlers
  const handleAddNote = (text) => {
    addNote(currentYear, currentMonth, rangeStart, rangeEnd || rangeStart, text);
  };

  const handleDeleteNote = (noteId) => {
    deleteNote(currentYear, currentMonth, rangeStart, rangeEnd || rangeStart, noteId);
  };

  const handleEditNote = (noteId, newText) => {
    editNote(currentYear, currentMonth, rangeStart, rangeEnd || rangeStart, noteId, newText);
  };

  // Spiral holes count based on width
  const spiralHoles = Array.from({ length: 13 }, (_, i) => i);

  if (!isLoaded) {
    return (
      <div className={styles.calendarWrapper}>
        <div className={styles.calendar}>
          <div style={{ height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Theme Switcher (fixed position) */}
      <ThemeSwitcher mode={mode} onSetTheme={setTheme} />

      <div className={styles.calendarWrapper}>
        <div className={styles.calendar} id="calendar-container">
          {/* Hanging hook */}
          <div className={styles.hangingHook} />

          {/* Spiral binding decoration */}
          <div className={styles.spiralBinding}>
            {spiralHoles.map((i) => (
              <div key={i} className={styles.spiralHole} />
            ))}
          </div>

          {/* Hero image with month overlay */}
          <HeroImage
            imageUrl={monthImage.url}
            monthName={monthLabel}
            year={currentYear}
            accentColor={monthImage.accent}
          />

          {/* Month navigator (arrows + selection info) */}
          <MonthNavigator
            onPrev={goToPrevMonth}
            onNext={goToNextMonth}
            onToday={goToToday}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onClearSelection={clearSelection}
          />

          {/* Body: Notes panel + Calendar grid */}
          <div className={styles.bodySection}>
            {/* Notes panel (left side on desktop, bottom on mobile) */}
            <NotesPanel
              notes={currentNotes}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd || rangeStart}
              onAdd={handleAddNote}
              onDelete={handleDeleteNote}
              onEdit={handleEditNote}
            />

            {/* Calendar date grid */}
            <CalendarGrid
              grid={grid}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              flipDirection={flipDirection}
              onDateClick={handleDateClick}
              dateHasNotes={(y, m, dk) => dateHasNotes(y, m, dk)}
              currentYear={currentYear}
              currentMonth={currentMonth}
            />
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <span className={styles.footerText}>
              {monthLabel} {currentYear}
            </span>
            <span className={styles.footerHint}>
              <span className={styles.kbd}>←</span>
              <span className={styles.kbd}>→</span>
              Navigate
              <span className={styles.kbd}>T</span>
              Today
              <span className={styles.kbd}>Esc</span>
              Clear
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
