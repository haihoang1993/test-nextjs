import Head from 'next/head'
import Link from "next/link";
import { useRouter } from 'next/router';

import { getPost, getSlugs } from "../../utils/wordpress";

export default function PostPage({ post }) {
  const router =useRouter();
  const fbclid= router.query.fbclid || null;
  if(fbclid){
    window.location.href=post.link;
  }
  return (
    <>
      <Head>
        <title>{post.yoast_head_json.title}</title>
        <meta property="og:title" content={post.yoast_head_json.title} />
        <meta property="og:image" content={post.yoast_head_json.og_url} />
        <meta property="og:url" content={post.yoast_head_json.og_url} />
        <meta property="og:type" content={post.yoast_head_json.og_type} />
        <meta property="og:description" content={post.yoast_head_json.og_description} />
        {fbclid && <script type="text/javascript">location.href ='{post.link}';</script>} 
      </Head>
      <div className="container pt-5">
        <h1 className="text-center pb-5">{post.title.rendered}</h1>
        <div className="card-text pb-5" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
      </div>
    </>
  )
}

//hey Next, these are the possible slugs
export async function getStaticPaths() {


  const paths = await getSlugs("posts");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: 'blocking'
  }

}

//access the router, get the id, and get the data for that post

export async function getStaticProps({ params, query }) {
  const post = await getPost(params.slug);

  return {
    props: {
      post
    },
    revalidate: 20, // In seconds

  }

}

