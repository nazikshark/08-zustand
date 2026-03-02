import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NoteDraft } from '@/types/note';

interface NoteState {
  draft: NoteDraft;
  setDraft: (fields: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      
      setDraft: (fields) =>
        set((state) => ({
          draft: { ...state.draft, ...fields },
        })),
        
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-hub-draft-storage',
    }
  )
);