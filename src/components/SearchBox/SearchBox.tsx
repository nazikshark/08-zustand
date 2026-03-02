'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    params.set('page', '1'); // При пошуку завжди повертаємо на 1 сторінку
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <input
      type="text"
      placeholder="Search notes..."
      defaultValue={searchParams.get('search')?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      style={{ 
        padding: '10px', 
        width: '100%', 
        borderRadius: '8px', 
        border: '1px solid #ccc' 
      }}
    />
  );
}