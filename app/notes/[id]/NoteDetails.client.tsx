'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api';

export default function NoteDetailsClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  });

  if (isLoading) return <p>Loading note...</p>;
  if (!note) return <p>Note not found</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{note.title}</h1>
      <p><strong>Tag:</strong> {note.tag}</p>
      <div style={{ marginTop: '20px' }}>{note.content}</div>
    </div>
  );
}