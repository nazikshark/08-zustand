import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Add a new note to your list",
  openGraph: {
    title: "Create Note",
    description: "Add a new note to your list",
    url: "https://notes-app.vercel.app/notes/action/create",
    images: [{ url: "https://notes-app.vercel.app/og-image.png" }],
  },
};

export default function CreateNotePage() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>Create New Note</h1>
      <Suspense fallback={<div>Loading form...</div>}>
        <NoteForm />
      </Suspense>
    </main>
  );
}