import { Metadata } from 'next';
import { Suspense } from 'react';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: 'Створити нотатку | NoteHub',
  description: 'Створіть нову нотатку та збережіть свої ідеї.',
};

export default function CreateNotePage() {
  return (
    <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>Створити нову нотатку</h1>
      {/* Огортаємо форму в Suspense, щоб Vercel не сварився на useSearchParams */}
      <Suspense fallback={<div>Завантаження форми...</div>}>
        <NoteForm />
      </Suspense>
    </main>
  );
}