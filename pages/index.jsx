import Thumbnail from '../src/components/thumbnail';
import stylesThumbnail from '../src/styles/Thumbnail.module.scss';

export async function getStaticProps() {
  const resBase64 = await fetch('http://localhost:8000/api/placeholder');
  const base64 = await resBase64.json();

  const resPost = await fetch('http://localhost:8000/api/posts/thumbnail');
  const thumbnail = await resPost.json();

  const res = await fetch('http://localhost:8000/api/pages/Accueil');
  const pageHome = await res.json();

  return { props: { pageHome, thumbnail, base64 } };
}

export default function Index({ thumbnail, base64 }) {
  console.log(thumbnail);
  return (
    <div className={stylesThumbnail.thumbnail}>
      {
        thumbnail.map((post) => (
          <Thumbnail key={post.id} {...post} {...base64} />
        ))
      }
    </div>
  );
}
