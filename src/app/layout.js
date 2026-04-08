import './globals.css';

export const metadata = {
  title: 'Interactive Calendar | Wall Calendar Component',
  description:
    'A polished, interactive wall calendar component with day range selection, integrated notes, theme switching, and responsive design. Built with Next.js.',
  keywords: ['calendar', 'interactive', 'wall calendar', 'date range', 'notes', 'next.js'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
