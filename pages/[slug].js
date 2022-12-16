import Head from 'next/head'
import Link from "next/link";
import { useRouter } from 'next/router';

import { getPost, getSlugs } from "../utils/wordpress";

export default function PostPage({ post }) {
  const router = useRouter();
  const fbclid = router.query.fbclid || null;
  if (fbclid) {
    window.location.href = post.link;
  }
  console.log('post page:', post);
  // console.log('post page:', post.yoast_head_json.og_image);
  const og_image = post['yoast_head_json'].og_image || [];
  const urlImage = og_image.length >0 ? og_image[0].url  :'';
  // console.log('post page url:', urlImage);

  return (
    <>
      <Head>
        <title>{post.yoast_head_json.title}</title>
        <meta property="og:title" content={post.yoast_head_json.title} />
         {(og_image.length>0 && <meta property="og:image" content={urlImage} />)}
        <meta property="og:url" content={urlImage} />
        <meta property="og:type" content={post.yoast_head_json.og_type} />
        <meta property="og:description" content={post.yoast_head_json.og_description} />
        <meta property="og:image:width" content="640" class="yoast-seo-meta-tag" />
        <meta property="og:image:height" content="480" class="yoast-seo-meta-tag" />
        <meta property="og:image:type" content="image/jpeg" class="yoast-seo-meta-tag" />
        {fbclid && <script type="text/javascript">location.href ='{post.link}';</script>}
      </Head>
      <div className="container pt-5">
        {
          !fbclid && (
            <h1 className="text-center pb-5">{post.title.rendered}</h1>
          )
        }
        {
          !fbclid && (
            <div className="card-text pb-5" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
          )
        }
        <h1 className="text-center pb-5">{post.title.rendered}</h1> 
      </div>
    </>
  )
}

//hey Next, these are the possible slugs
export async function getStaticPaths(context) {

  const paths = await getSlugs("posts");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: 'blocking'
  }

}

//access the router, get the id, and get the data for that post

export async function getStaticProps(context) {
  const { params, query } = context;
  const post = await getPost(params.slug);
  console.log('post', post);

  return {
    props: {
      post
    },
    revalidate: 20, // In seconds

  }

}
