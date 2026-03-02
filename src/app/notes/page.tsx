import App from '@/components/App/App';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Мої нотатки | NoteHub',
  description: 'Керуй своїми ідеями та планами на майбутнє',
};

export default function NotesPage() {
  return (
    <main>
      <App />
    </main>
  );
}