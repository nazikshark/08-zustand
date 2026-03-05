import NotePreviewClient from './NotePreview.client';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <NotePreviewClient params={params} />;
}