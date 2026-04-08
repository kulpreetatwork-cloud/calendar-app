'use client';

import { useState, useEffect, useCallback } from 'react';
import { THEMES } from '@/constants/themes';

const STORAGE_KEY = 'calendar_theme';

/**
 * Custom hook for theme management (light/dark/auto).
 */
export default function useTheme() {
  const [mode, setMode] = useState('light'); // 'light' | 'dark' | 'auto'
  const [resolvedTheme, setResolvedTheme] = useState('light');

  // Resolve auto theme based on system preference
  useEffect(() => {
    if (mode === 'auto') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResolvedTheme(isDark ? 'dark' : 'light');
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResolvedTheme(mode);
    }
  }, [mode]);

  // Apply theme CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    const themeVars = THEMES[resolvedTheme];
    if (themeVars) {
      for (const [key, value] of Object.entries(themeVars)) {
        root.style.setProperty(key, value);
      }
      root.setAttribute('data-theme', resolvedTheme);
    }
  }, [resolvedTheme]);

  // Toggle between modes
  const cycleTheme = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : prev === 'dark' ? 'auto' : 'light';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        console.error('Failed to save theme:', e);
      }
      return next;
    });
  }, []);

  const setTheme = useCallback((newMode) => {
    if (['light', 'dark', 'auto'].includes(newMode)) {
      setMode(newMode);
      try {
        localStorage.setItem(STORAGE_KEY, newMode);
      } catch (e) {
        console.error('Failed to save theme:', e);
      }
    }
  }, []);

  return {
    mode,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
    cycleTheme,
    setTheme,
  };
}
