import { Metadata } from 'next';
import { Suspense } from 'react';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: 'Створити нотатку | NoteHub',
  description: 'Створіть нову нотатку та збережіть свої ідеї.',
};

// Створюємо маленьку обгортку, щоб бути впевненими, що клієнтська логіка ізольована
function NoteFormWrapper() {
  return <NoteForm />;
}

export default function CreateNotePage() {
  return (
    <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>Створити нову нотатку</h1>
      
      {/* Ключовий момент: Suspense має огортати ВСЕ, що використовує useSearchParams */}
      <Suspense fallback={<div style={{ textAlign: 'center' }}>Завантаження форми...</div>}>
        <NoteFormWrapper />
      </Suspense>
    </main>
  );
}