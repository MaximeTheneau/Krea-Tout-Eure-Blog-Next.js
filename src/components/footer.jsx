import Link from 'next/link';
import styles from '../styles/Footer.module.scss';

export default function Footer() {
  return (
    <>
      <div className={styles.footer__defensive} />
      <div className={styles.footer}>
        <Link href="httt" target="_blank" rel="noreferrer">
          <i className="icon-facebook" />
        </Link>
        <Link href="{contact.Github}" target="_blank" rel="noreferrer">
          <i className="icon-instagram" />
        </Link>
      </div>
    </>
  );
}
