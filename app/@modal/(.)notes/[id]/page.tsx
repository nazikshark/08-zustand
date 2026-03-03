'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { getNotes } from '@/lib/api/notes';
import { use } from 'react';

export default function NoteModal({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const { data } = useQuery({
    queryKey: ['notes'],
    queryFn: () => getNotes(1, ''),
  });

  const note = data?.notes.find((n) => n.id === id);

  return (
    <Modal onClose={() => router.back()}>
      <div style={{ padding: '20px', color: 'black' }}>
        {note ? (
          <>
            <h2 style={{ marginBottom: '10px' }}>{note.title}</h2>
            <p style={{ marginBottom: '20px', color: 'gray' }}>Tag: {note.tag}</p>
            <div style={{ lineHeight: '1.6' }}>{note.content}</div>
          </>
        ) : (
          <p>Loading note details...</p>
        )}
      </div>
    </Modal>
  );
}