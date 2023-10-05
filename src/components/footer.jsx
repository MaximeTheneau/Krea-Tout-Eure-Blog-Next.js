import Link from 'next/link';
import styles from '../styles/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Site réalisé par
      <Link href="https://theneau-maxime.fr" target="_blank"> Maxime Theneau</Link>
    </footer>
  );
}
