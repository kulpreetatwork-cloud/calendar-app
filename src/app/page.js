'use client';

import Calendar from '@/components/Calendar/Calendar';

/**
 * Main page — renders the Interactive Calendar component.
 */
export default function Home() {
  return (
    <main className="app-container">
      <h1 className="sr-only">Interactive Wall Calendar</h1>
      <Calendar />
    </main>
  );
}
