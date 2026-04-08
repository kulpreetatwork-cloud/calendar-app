'use client';

import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import styles from './ThemeSwitcher.module.css';

/**
 * Theme switcher component.
 * Toggles between light, dark, and auto (system) theme modes.
 */
export default function ThemeSwitcher({ mode, onSetTheme }) {
  const options = [
    { key: 'light', icon: <FiSun />, label: 'Light mode' },
    { key: 'dark', icon: <FiMoon />, label: 'Dark mode' },
    { key: 'auto', icon: <FiMonitor />, label: 'System mode' },
  ];

  return (
    <div className={styles.switcher} id="theme-switcher">
      {options.map((opt) => (
        <button
          key={opt.key}
          className={`${styles.option} ${mode === opt.key ? styles.active : ''}`}
          onClick={() => onSetTheme(opt.key)}
          aria-label={opt.label}
          title={opt.label}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
}
