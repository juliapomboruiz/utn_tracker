import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UTN ISI · Tracker',
  description: 'Plan 2023 — Ingeniería en Sistemas de Información',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, background: '#060c14', color: '#c8d8e8',
        fontFamily: "-apple-system,'Segoe UI',Helvetica,Arial,sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
