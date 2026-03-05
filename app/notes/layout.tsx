import { Suspense } from 'react';
import Header from '@/components/Header/Header';
import SidebarNotes from '@/components/SidebarNotes/SidebarNotes';

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Suspense fallback={<div style={{ width: '200px', padding: '20px' }}>Loading...</div>}>
          <SidebarNotes />
        </Suspense>
        <main style={{ flex: 1, padding: '20px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}