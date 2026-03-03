'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getNotes } from '@/lib/api/notes';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

export default function App() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => getNotes(page, search),
  });

  if (isError) return <div style={{ color: 'red', padding: '20px' }}>Error loading notes</div>;

  return (
    <div style={{ padding: '20px' }}>
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