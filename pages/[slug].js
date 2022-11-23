import { useRouter } from "next/router"
import { useEffect } from "react"



export async function getStaticPaths() {

  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:8000/api/pages')
  const posts = await res.json()

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = posts.map((post) => {
    return {params: { slug: post.slug}}})
  // { fallback: false } means other routes should 404
  return { paths, fallback: false, }
  }

export async function getStaticProps({ params }) {

    const res = await fetch(`http://localhost:8000/api/pages/${params.slug}`)
    const page = await res.json()
    console.log(params)
    // Pass post data to the page via props
    return {props: { page } }
}

export default function Slug({ page }) {
    return (
        <div>
            <h1>{page.title}</h1>
            <div>{page.contents}</div>
        </div>
    )
  }