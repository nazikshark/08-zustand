'use client';

import { use } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

export default function NotesClient({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();

  const tag = slug[0] || 'all';
  const pageFromSlug = Number(slug[1]) || 1;
  const search = searchParams.get('search') || '';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag, pageFromSlug, search],
    queryFn: () => getNotes(pageFromSlug, search, tag),
  });

  if (isError) return <div style={{ color: 'red' }}>Error loading notes</div>;

  return (
    <div>
      <SearchBox />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <NoteList notes={data?.notes || []} />
          <Pagination totalPages={data?.totalPages || 1} />
        </>
      )}
    </div>
  );
}