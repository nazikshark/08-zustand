import type { Metadata } from "next";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] || "all";
  return {
    title: `Notes: ${tag}`,
    description: `Filtered notes by tag ${tag}`,
  };
}

export default function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  return (
    <NotesClient params={params} />
  );
}