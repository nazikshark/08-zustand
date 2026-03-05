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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.content.trim()) return;
    mutation.mutate(draft);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft({ title: e.target.value });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDraft({ tag: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft({ content: e.target.value });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        value={draft.title}
        onChange={handleTitleChange}
        required
      />
      <select 
        className={styles.select}
        value={draft.tag} 
        onChange={handleTagChange}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      <textarea
        placeholder="Content"
        className={styles.textarea}
        value={draft.content}
        onChange={handleContentChange}
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