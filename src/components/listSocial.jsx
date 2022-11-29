import Link from 'next/link';
import styles from '../styles/Article.module.scss';

export default function ListSocial() {
  return (
    <div className={styles['contact-list-social']}>
      <Link href="/test" target="blank">
        <i className="icon-email" />
      </Link>
      <Link href="{contact.Github}" target="_blank">
        <i className="icon-github" />
      </Link>
      <Link href="{contact.Linkedin}" target="_blank">
        <i className="icon-linkedin" />
      </Link>
      <Link href="{contact.twitter}" target="_blank">
        <i className="icon-twitter" />
      </Link>
    </div>

  );
}
