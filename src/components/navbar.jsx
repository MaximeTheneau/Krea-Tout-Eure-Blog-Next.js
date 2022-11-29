import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Navbar.module.scss';

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(false);
  return (
    <nav
      className={styles.navbar}
      onMouseLeave={() => (
        setTimeout(() => {
          setToggleNav(false);
        }, 1000)
      )}
    >
      <div
        aria-hidden="true"
        className={styles.navbar__toggle}
        onClick={() => {
          setToggleNav(!toggleNav);
        }}

      >
        {toggleNav ? (
          <i className="icon-x" />
        ) : (
          <i className="icon-navbar" />
        )}
      </div>
      {toggleNav ? (
        <ul className={styles.navbar__list}>
          <Link href="/">
            <li className={styles['navbar__list-item']}>
              <span className={styles['navbar__list-item-link']}>Accueil</span>
            </li>
          </Link>
          <Link href="/qui-sommes-nous">
            <li className={styles['navbar__list-item']}>
              <span className={styles['navbar__list-item-link']}>Qui-sommes-nous</span>
            </li>
          </Link>
          <Link href="/contact">
            <li className={styles['navbar__list-item']}>
              <span className={styles['navbar__list-item-link']}>Contact</span>
            </li>
          </Link>
        </ul>
      ) : ''}
    </nav>

  );
}
