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
  initialPage: number;
}

export default function NotesClient({ tag, initialPage }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Скидаємо стейт при зміні тегу в URL
  useEffect(() => {
    setCurrentPage(initialPage);
  }, [tag, initialPage]);

  // Дебаунс логіка
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); 
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag, currentPage, debouncedSearch],
    queryFn: () => getNotes(currentPage, debouncedSearch, tag),
  });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <SearchBox 
          value={search} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} 
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
          <NoteList notes={data?.notes || []} />
          <Pagination 
            totalPages={data?.totalPages || 1} 
            currentPage={currentPage} 
            onPageChange={(page: number) => setCurrentPage(page)} 
          />
        </>
      )}
    </div>
  );
}