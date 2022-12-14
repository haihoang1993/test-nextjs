import Head from 'next/head'

import { getEvents, getPosts } from '../utils/wordpress';
import styles from '../styles/Home.module.css'

import Post from "../components/Post";
import Event from "../components/Event";

export default function Home({posts, events}) {

  // const jsxPosts = posts.map(post => {
  //   const featuredMedia = post['_embedded']['wp:featuredmedia'][0];
  //   return (
  //     <Post post={post} featuredMedia={featuredMedia} key={post.id}/>
  //   )
  // });


  return (
    <>
      <Head>
        <title>Blog</title> 
        <meta name="description" content="Keep up to date with the latest trends in tech" />
        <link rel="icon" href="/favicon.ico" />
        {/* You can add more metadata here, like open graph tags for social media, etc */}
      </Head>

      <div className="container pt-5">
        <div className="row">
          <div className="col-lg-12">
            <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>


        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
          </div>
        </div>
      </div>
    </>
  )

}

export async function getStaticProps({ params }) {

  const posts = await getPosts();
  const events = await getEvents();
  return {
    props: {
     posts,
     events
    },
    revalidate: 10, // In seconds
  }

}
