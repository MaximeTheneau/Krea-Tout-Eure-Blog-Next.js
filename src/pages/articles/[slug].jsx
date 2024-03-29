import PropTypes from 'prop-types';
import Head from 'next/head';
import ImagePost from '../../components/imagePost';
import styles from '../../styles/Article.module.scss';

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const res = await fetch('https://back.krea-tout-eure.fr/api/posts');
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://back.krea-tout-eure.fr/api/posts/${params.slug}`);
  const post = await res.json();

  return { props: { post } };
}

export default function Slug({ post }) {
  const descriptionMeta = post.contents === null
    ? `Articles de blog ${post.title}`
    : post.contents.substring(0, 155).replace(/[\r\n]+/gm, '');

  const handleChangeShareSocial = (e) => {
    const social = e.target.value;
    if (social === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=https://krea-tout-eure.fr/articles/${post.slug}`, '_blank');
    } else if (social === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=https://krea-tout-eure.fr/articles/${post.slug}`, '_blank');
    } else if (social === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://krea-tout-eure.fr/articles/${post.slug}`, '_blank');
    } else if (social === 'pinterest') {
      window.open(`https://pinterest.com/pin/create/button/?url=https://krea-tout-eure.fr/articles/${post.slug}`, '_blank');
    } else if (social === 'email') {
      window.open(`mailto:?subject=${post.title}&body=https://krea-tout-eure.fr/articles/${post.slug}`, '_blank');
    }
  };
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content="https://krea-tout-eure.fr" />
        <meta property="og:image" content={post.imgPost.path} />
        <script type="application/ld+json">
          {`{
            "@context":"https://schema.org/",
            "@type":"NewsArticle",
            "name":"${post.title}",
            "about": "${descriptionMeta}",
            "author": { "@type": "Person", "name": "Kréa Tout Eure :'Assos" },
            "datePublished": "${post.createdAt}",
            "dateModified": "${post.updatedAt}",
            "description": "${descriptionMeta}",
            "headline": "${post.title}",
            "image": [
              "${post.imgPost.path}",
              "${post.imgPost2 === null ? '' : post.imgPost2.path}",
              "${post.imgPost3 === null ? '' : post.imgPost3.path}",
              "${post.imgPost4 === null ? '' : post.imgPost4.path}"
            ],
            "inLanguage": "French",
            "mainEntityOfPage": "https://krea-tout-eure.fr",
            "publisher": { "@id": "Kréa Tout Eure" },
            "sourceOrganization": "Kréa Tout Eure :'Assosiation",
            "url": "https://krea-tout-eure.fr/articles/${post.slug}"
          }
    `}

        </script>
      </Head>

      <main className={`card ${styles.posts}`}>
        <div>
          <h1>{post.title}</h1>
          <div className={styles.posts__images}>
            <ImagePost {...post} />
          </div>
          <div className={styles.posts__contents}>
            <p>{post.contents}</p>
            <h2>{post.subtitle}</h2>
            <p>{post.contents2}</p>
          </div>
        </div>
        <div className={styles.posts__contents__social}>
          <select onChange={(e) => handleChangeShareSocial(e)} className="select">
            <option value="---">Partager sur ...</option>
            <option value="facebook" data-icon="icon-facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">Linkedin</option>
            <option value="pinterest">Pinterest</option>
            <option value="email">Email</option>
          </select>
        </div>
      </main>
    </>
  );
}

Slug.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
    contents2: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    imgPost: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }),
    imgPost2: PropTypes.shape({
      path: PropTypes.string,
    }),
    imgPost3: PropTypes.shape({
      path: PropTypes.string,
    }),
    imgPost4: PropTypes.shape({
      path: PropTypes.string,
    }),
  }).isRequired,
};
