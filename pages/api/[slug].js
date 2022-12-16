import { getPost } from '../../utils/wordpress';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require('axios');

export default async function handler(req, res) {

  const {url_img} =req.query;
  // const url_img=req.client._httpMessage.statusMessage || ''
  try {
    axios
    .get(url_img, {
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

  // console.log('req:', req);


  // res.status(200).json({ name: res.getHeader('x-img')|| ' null'})
}


export const config = {
  type: 'experimental-background',
}