'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '20px', justifyContent: 'center' }}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          style={{ 
            padding: '5px 10px',
            fontWeight: currentPage === p ? 'bold' : 'normal',
            backgroundColor: currentPage === p ? '#eee' : 'white',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}