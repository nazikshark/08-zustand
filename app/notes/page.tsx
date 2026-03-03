import { Suspense } from 'react';
import App from '@/components/App/App';

export default function NotesPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </main>
  );
}