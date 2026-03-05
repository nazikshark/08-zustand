'use client';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { getNotes } from '@/lib/api';
import { use } from 'react';

export default function NotePreviewClient({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { data } = useQuery({ queryKey: ['notes'], queryFn: () => getNotes(1, '') });
  const note = data?.notes.find((n) => n.id === id);

  return (
    <Modal onClose={() => router.back()}>
      <div style={{ padding: '20px', color: 'black' }}>
        {note ? (
          <>
            <h2>{note.title}</h2>
            <p style={{ color: 'gray' }}>Tag: {note.tag}</p>
            <p>{note.content}</p>
          </>
        ) : <p>Loading...</p>}
      </div>
    </Modal>
  );
}