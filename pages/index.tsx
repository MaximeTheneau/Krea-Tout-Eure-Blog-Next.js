import Slug  from './[slug]'
import { useRouter } from 'next/router';

export default function Index({ pageHome }) {

  return (
    <div>
      <h1>{pageHome.title}</h1>
      <p>{pageHome.contents } </p>
      <p>{pageHome.contents2}</p>
    </div>
  )
}

export async function getStaticProps() {

  const res = await fetch(`http://localhost:8000/api/pages/Bienvenue`)
  const pageHome = await res.json()

  return {props: { pageHome } }
}

