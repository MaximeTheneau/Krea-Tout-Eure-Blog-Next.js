import Slug  from './[slug]'
import { useRouter } from 'next/router';

export default function Index({ pageHome, thumbnail }) {
  console.log(thumbnail);
  
  return (
    <div>
      {
        thumbnail.map((item, index) => {
          return (
            <div key={index}>
              {item.title}
            </div>
          )
        })
      }
      <p>{pageHome.contents} </p>
      <p>{pageHome.contents2}</p>
    </div>
  )
}

export async function getStaticProps() {
  const resPost = await fetch(`http://localhost:8000/api/posts/thumbnail`)
  const thumbnail = await resPost.json()
  const res = await fetch(`http://localhost:8000/api/pages/Accueil`)
  const pageHome = await res.json()

  return {props: { pageHome, thumbnail } }
}

