'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Link from 'next/link';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [tag]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); 
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearch, tag],
    queryFn: () => getNotes(currentPage, debouncedSearch, tag), 
  });

  const hasNotes = !!(data?.notes && data.notes.length > 0);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <SearchBox 
          value={search} 
          onChange={(value: string) => setSearch(value)}
        />
        
        <Link 
          href="/notes/action/create" 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            borderRadius: '5px', 
            textDecoration: 'none' 
          }}
        >
          + Create Note
        </Link>
      </div>

      {isError && <p style={{ color: 'red' }}>Error loading notes.</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {hasNotes ? <NoteList notes={data.notes} /> : <p>No notes found.</p>}
          
          {hasNotes && (
            <Pagination 
              totalPages={data.totalPages || 1} 
              currentPage={currentPage} 
              onPageChange={(page: number) => setCurrentPage(page)} 
            />
          )}
        </>
      )}
    </div>
  );
}