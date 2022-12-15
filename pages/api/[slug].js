import { getPost } from '../../utils/wordpress';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require('axios');

export default async function handler(req, res) {
  console.log('res:',res.getHeader('X-HEADER'));

  console.log('api img:',res.getHeader('URL-IMG'));
  const img_url =res.getHeader('URL-IMG')
  try {
    // const post = await getPost(req.query.slug)
    // const og_image = post.yoast_head_json.og_image || [];
    // const urlImage = og_image.length >0 ? og_image[0].url  :'';
    // console.log('post page url:', urlImage);
    axios
    .get(img_url, {
      responseType: 'arraybuffer'
    })
    .then(response => {
      const buffer = Buffer.from(response.data, 'base64');
      console.log('img:', buffer);
      res.setHeader('Content-Type', 'image/jpg')
      res.send(buffer)
    })
    .catch(ex => {
      console.error(ex);
    });
  } catch (error) {
    res.status(501).json({
      error:error.toString()
    })
  }


  // res.status(200).json({ name: res.getHeader('URL-IMG') })
}
