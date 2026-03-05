import NotesClient from './Notes.client';

export default function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  return <NotesClient params={params} />;
}