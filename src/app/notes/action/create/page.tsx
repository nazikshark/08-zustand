'use client';

import { Suspense } from 'react';
import NoteForm from '@/components/NoteForm/NoteForm';

function CreateNoteContent() {
  return (
    <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>Створити нову нотатку</h1>
      <NoteForm />
    </main>
  );
}

export default function CreateNotePage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>Завантаження форми...</div>}>
      <CreateNoteContent />
    </Suspense>
  );
}