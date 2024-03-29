import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { getEvents, getPosts } from '../../utils/wordpress';
import { useRouter } from 'next/router';



export default function Home({ baseUrl, error }) {
  const router = useRouter();
  console.log('router obj', router.query.fbclid);
  const link = 'https://vercel.com/new'
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
  
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2> Base URL:  &rarr;</h2>
            <p>{baseUrl}</p>
            <p></p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Check Base URL &rarr;</h2>
            <p>{(error ? 'Check is error':'Check Successful')}</p>
          </a>


        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps({ query }) {
  // console.log('====================================');
  // console.log('process.env.BASE_URL', process.env.BASE_URL);
  // console.log('====================================');
  let posts = [];
  let events = [];
  let error=false;
  try {
    posts = await getPosts();
    events = await getEvents();
  } catch (err) {
    posts=[];
    events=[];
    error=true;
  }
  console.log('test:', error);

  return {
    props: {
      posts,
      events,
      baseUrl: process.env.BASE_URL ?? 'http://error.com',
      error
    },
    revalidate: 10, // In seconds
  }

}
