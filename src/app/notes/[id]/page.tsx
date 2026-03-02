'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api/notes';

export default function NoteDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
  });

  if (isLoading) return <div>Завантаження нотатки...</div>;
  if (isError) return <div>Нотатку не знайдено.</div>;

  return (
    <article style={{ maxWidth: '600px' }}>
      <button 
        onClick={() => router.back()} 
        style={{ marginBottom: '20px', cursor: 'pointer' }}
      >
        ← Назад
      </button>
      <header>
        <span style={{ background: '#eee', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
          {note?.tag}
        </span>
        <h1 style={{ margin: '15px 0' }}>{note?.title}</h1>
      </header>
      <p style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{note?.content}</p>
    </article>
  );
}