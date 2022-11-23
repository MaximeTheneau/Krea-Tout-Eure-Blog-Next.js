
import stylesHeader from '../styles/Header.module.scss';

import Link from 'next/link';

export default function Navbar({ pages }) {
  return (
    <>  
        <nav className={stylesHeader.navbar}>
            <div className={stylesHeader.navbar__container}>
                {
                    pages?.map((page) => (
                        <Link href={page.slug === 'home' ? '/' : `${page.slug}`}> 
                            <span className={stylesHeader.navbar__link}>{page.title}</span>
                        {[page.imgHeader].map((img) => (
                            console.log(img.small)
                        ))}
                        </Link>

                    ))
                        }
            </div>
        </nav>
    </>
    
  )
}

