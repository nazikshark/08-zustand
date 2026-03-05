import type { Metadata } from "next";
import { getNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await getNoteById(id);
  return {
    title: `Note: ${note?.title || "Details"}`,
    description: `Details for note ${id}`,
  };
}

export default function Page({ params }: Props) {
  return <NoteDetailsClient params={params} />;
}