'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNoteStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api';
import styles from './NoteForm.module.css';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.content.trim()) return;
    mutation.mutate(draft);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        value={draft.title}
        onChange={(e) => setDraft({ title: e.target.value })}
        required
      />
      <select 
        className={styles.select}
        value={draft.tag} 
        onChange={(e) => setDraft({ tag: e.target.value })}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Health">Health</option>
      </select>
      <textarea
        placeholder="Content"
        className={styles.textarea}
        value={draft.content}
        onChange={(e) => setDraft({ content: e.target.value })}
        required
      />
      <div className={styles.actions}>
        <button 
          type="submit" 
          className={styles.button} 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Saving...' : 'Save'}
        </button>
        <button 
          type="button" 
          className={styles.cancelButton} 
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}