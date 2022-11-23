
import stylesHeader from '../styles/Header.module.scss';

import Link from 'next/link';

export default function Navbar({ pages }) {

  return (
    <>  
        <nav className={stylesHeader.navbar}>
            <div className={stylesHeader.navbar__container}>
                {
                    pages?.map((page) => (
                        <>
                            <Link href={page.slug == "Bienvenue" ? "/" : page.slug }> 
                                <span className={stylesHeader.navbar__link}>{page.title}</span>
                            </Link>
                        </>


                    ))
                        }
            </div>
        </nav>
    </>
    
  )
}
export async function getStaticProps() {

    const res = await fetch(`http://localhost:8000/api/pages/`)
    const pages = await res.json()
  
    return {props: { pages } }
  }

