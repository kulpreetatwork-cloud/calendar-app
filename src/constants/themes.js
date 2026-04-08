/**
 * Theme configuration for light, dark, and auto modes.
 */

export const THEMES = {
  light: {
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f8f9fa',
    '--bg-tertiary': '#f0f2f5',
    '--bg-card': '#ffffff',
    '--bg-hover': 'rgba(0, 0, 0, 0.04)',
    '--text-primary': '#1a1a2e',
    '--text-secondary': '#555770',
    '--text-tertiary': '#8e8ea0',
    '--text-muted': '#b0b0c0',
    '--border-color': '#e4e4e7',
    '--border-light': '#f0f0f2',
    '--shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
    '--shadow-md': '0 4px 12px rgba(0, 0, 0, 0.08)',
    '--shadow-lg': '0 8px 30px rgba(0, 0, 0, 0.12)',
    '--shadow-xl': '0 20px 60px rgba(0, 0, 0, 0.15)',
    '--notes-bg': '#fffef5',
    '--notes-line': '#e8e4d4',
    '--overlay-bg': 'rgba(255, 255, 255, 0.85)',
  },
  dark: {
    '--bg-primary': '#0f0f1a',
    '--bg-secondary': '#1a1a2e',
    '--bg-tertiary': '#222240',
    '--bg-card': '#1a1a2e',
    '--bg-hover': 'rgba(255, 255, 255, 0.06)',
    '--text-primary': '#eaeaf0',
    '--text-secondary': '#a0a0b8',
    '--text-tertiary': '#6e6e85',
    '--text-muted': '#4a4a5e',
    '--border-color': '#2a2a40',
    '--border-light': '#222238',
    '--shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
    '--shadow-md': '0 4px 12px rgba(0, 0, 0, 0.4)',
    '--shadow-lg': '0 8px 30px rgba(0, 0, 0, 0.5)',
    '--shadow-xl': '0 20px 60px rgba(0, 0, 0, 0.6)',
    '--notes-bg': '#1a1a2e',
    '--notes-line': '#2a2a40',
    '--overlay-bg': 'rgba(15, 15, 26, 0.85)',
  },
};

export default THEMES;
