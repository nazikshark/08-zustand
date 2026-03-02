'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/notes" className={styles.logo}>
        NoteHub 📝
      </Link>
      <nav className={styles.nav}>
        <Link 
          href="/notes/action/create" 
          className={pathname === '/notes/action/create' ? styles.active : ''}
        >
          + New Note
        </Link>
      </nav>
    </header>
  );
}