import Slug  from './[slug]'
import { useRouter } from 'next/router';
import Thumbnail from '../src/components/thumbnail';
import stylesThumbnail from '../src/styles/Thumbnail.module.scss';

export default function Index({ thumbnail }) {
  console.log(thumbnail);
  
  return (
    <div className={stylesThumbnail.thumbnail}>
      {
        thumbnail.map((post) => {
          return (
            <div key={post.id} >
              <Thumbnail {...post}/>
            </div>
          )
        })
      }
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

