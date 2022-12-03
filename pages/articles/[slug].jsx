import ImagePost from '../../src/components/imagePost';
import styles from '../../src/styles/Article.module.scss';

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:8000/api/posts');
  const posts = await res.json();

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:8000/api/posts/${params.slug}`);
  const post = await res.json();

  const resBase64 = await fetch('http://localhost:8000/api/placeholder');
  const base64 = await resBase64.json();
  // Pass post data to the page via props
  return { props: { post, base64 } };
}

export default function Slug({ post, base64 }) {
  return (
    <>
      <header>
        <h1>{post.title}</h1>
      </header>
      <div className={styles.posts}>
        <div className={styles.posts__images}>
          <ImagePost {...post} {...base64} />
        </div>
        <div className={styles.posts__contents}>
          <p>{post.contents}</p>
          <h2>{post.subtitle}</h2>
          <p>{post.contents2}</p>
        </div>
      </div>
    </>
  );
}
