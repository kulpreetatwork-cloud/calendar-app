'use client';

import { useState, useCallback, useEffect } from 'react';
import { formatMonthKey } from '@/utils/dateHelpers';

const STORAGE_KEY = 'calendar_notes';

/**
 * Generate a simple unique ID.
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * Custom hook for notes CRUD with localStorage persistence.
 */
export default function useNotes() {
  const [allNotes, setAllNotes] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAllNotes(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load notes:', e);
    }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage whenever notes change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allNotes));
      } catch (e) {
        console.error('Failed to save notes:', e);
      }
    }
  }, [allNotes, isLoaded]);

  /**
   * Get the storage key for a date or range.
   * For a single date: "2026-04-08"
   * For a range: "range_2026-04-05_2026-04-10"
   */
  const getNoteKey = useCallback((rangeStart, rangeEnd) => {
    if (!rangeStart) return null;
    if (!rangeEnd || rangeStart === rangeEnd) {
      return rangeStart;
    }
    return `range_${rangeStart}_${rangeEnd}`;
  }, []);

  /**
   * Get notes for a specific month.
   */
  const getNotesForMonth = useCallback(
    (year, month) => {
      const monthKey = formatMonthKey(year, month);
      return allNotes[monthKey] || {};
    },
    [allNotes]
  );

  /**
   * Get notes for a specific date or range.
   */
  const getNotesForSelection = useCallback(
    (year, month, rangeStart, rangeEnd) => {
      const monthKey = formatMonthKey(year, month);
      const noteKey = getNoteKey(rangeStart, rangeEnd);
      if (!noteKey) return [];
      const monthNotes = allNotes[monthKey] || {};
      return monthNotes[noteKey] || [];
    },
    [allNotes, getNoteKey]
  );

  /**
   * Check if a specific date has any notes.
   */
  const dateHasNotes = useCallback(
    (year, month, dateKey) => {
      const monthKey = formatMonthKey(year, month);
      const monthNotes = allNotes[monthKey] || {};
      // Check direct date notes
      if (monthNotes[dateKey] && monthNotes[dateKey].length > 0) return true;
      // Check if date is part of any range
      for (const key of Object.keys(monthNotes)) {
        if (key.startsWith('range_')) {
          const parts = key.split('_');
          const start = parts[1];
          const end = parts[2];
          if (dateKey >= start && dateKey <= end && monthNotes[key].length > 0) {
            return true;
          }
        }
      }
      return false;
    },
    [allNotes]
  );

  /**
   * Add a note.
   */
  const addNote = useCallback(
    (year, month, rangeStart, rangeEnd, text) => {
      if (!text.trim()) return;
      const monthKey = formatMonthKey(year, month);
      const noteKey = getNoteKey(rangeStart, rangeEnd);
      if (!noteKey) return;

      const newNote = {
        id: generateId(),
        text: text.trim(),
        createdAt: new Date().toISOString(),
      };

      setAllNotes((prev) => {
        const monthNotes = prev[monthKey] || {};
        const existing = monthNotes[noteKey] || [];
        return {
          ...prev,
          [monthKey]: {
            ...monthNotes,
            [noteKey]: [...existing, newNote],
          },
        };
      });
    },
    [getNoteKey]
  );

  /**
   * Delete a note by ID.
   */
  const deleteNote = useCallback(
    (year, month, rangeStart, rangeEnd, noteId) => {
      const monthKey = formatMonthKey(year, month);
      const noteKey = getNoteKey(rangeStart, rangeEnd);
      if (!noteKey) return;

      setAllNotes((prev) => {
        const monthNotes = prev[monthKey] || {};
        const existing = monthNotes[noteKey] || [];
        const filtered = existing.filter((n) => n.id !== noteId);
        return {
          ...prev,
          [monthKey]: {
            ...monthNotes,
            [noteKey]: filtered,
          },
        };
      });
    },
    [getNoteKey]
  );

  /**
   * Edit a note.
   */
  const editNote = useCallback(
    (year, month, rangeStart, rangeEnd, noteId, newText) => {
      if (!newText.trim()) return;
      const monthKey = formatMonthKey(year, month);
      const noteKey = getNoteKey(rangeStart, rangeEnd);
      if (!noteKey) return;

      setAllNotes((prev) => {
        const monthNotes = prev[monthKey] || {};
        const existing = monthNotes[noteKey] || [];
        const updated = existing.map((n) =>
          n.id === noteId ? { ...n, text: newText.trim() } : n
        );
        return {
          ...prev,
          [monthKey]: {
            ...monthNotes,
            [noteKey]: updated,
          },
        };
      });
    },
    [getNoteKey]
  );

  /**
   * Get all notes for a given month (flat list for display).
   */
  const getAllNotesForMonth = useCallback(
    (year, month) => {
      const monthKey = formatMonthKey(year, month);
      const monthNotes = allNotes[monthKey] || {};
      const result = [];
      for (const [key, notes] of Object.entries(monthNotes)) {
        for (const note of notes) {
          result.push({ ...note, dateKey: key });
        }
      }
      return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    [allNotes]
  );

  return {
    isLoaded,
    getNotesForMonth,
    getNotesForSelection,
    getAllNotesForMonth,
    dateHasNotes,
    addNote,
    deleteNote,
    editNote,
  };
}
