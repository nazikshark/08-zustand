import { instance } from './client';
import { Note, NoteDraft } from '@/types/note';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const getNotes = async (page = 1, search = '', tag = ''): Promise<NotesResponse> => {
  const { data } = await instance.get<NotesResponse>('/notes', {
    params: { page, search, tag: tag === 'all' || !tag ? '' : tag, perPage: 6 }
  });
  return data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: NoteDraft): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await instance.delete(`/notes/${id}`);
};