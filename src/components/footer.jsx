import Link from 'next/link';
import styles from '../styles/Footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <ul className="">
        <li>
          <Link href="/" prefetch={false}>
            Kréa Tout Eure
          </Link>
        </li>
        <li>
          <Link href="/qui-sommes-nous" prefetch={false}>
            Qui sommes-nous ?
          </Link>
        </li>
        <li>
          <Link href="/mentions-legales" prefetch={false}>
            Mentions légales
          </Link>
        </li>
        <li>
          <Link href="/contact" prefetch={false}>
            Formulaire de contact
          </Link>
        </li>
        <li className={styles['navbar__720__list-item']}>
          <Link href="https://www.facebook.com/people/Kreatouteure/100064816565302/" target="_blank" rel="noreferrer">
              <i className="icon-facebook" />
              {' '}
              Facebook
          </Link>
        </li>
      </ul>
    </div>
  );
}

