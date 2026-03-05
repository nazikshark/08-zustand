import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Add a new note to your list",
};

export default function CreateNotePage() {
  return (
    <main>
      <h1>Create New Note</h1>
      <Suspense fallback={<div>Loading form...</div>}>
        <NoteForm />
      </Suspense>
    </main>
  );
}