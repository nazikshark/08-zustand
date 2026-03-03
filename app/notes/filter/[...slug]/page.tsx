'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getNotes } from '@/lib/api/notes';
import NoteList from '@/components/NoteList/NoteList';

export default function FilteredNotesPage() {
  const params = useParams();
  const tag = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag],
    queryFn: () => getNotes(1, '', tag),
    enabled: !!tag,
  });

  if (isLoading) return <div>Фільтрація...</div>;
  if (isError) return <div>Помилка завантаження.</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Тег: {tag}</h1>
      <NoteList notes={data?.notes || []} />
    </div>
  );
}