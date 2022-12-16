// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require('axios');

export default async function handler(req, res) {
  // console.log('res:',res.getHeader('X-HEADER'));
 const response=  await axios
  .get('https://thenewssast.com/wp-content/uploads/2022/12/diipng.png', {
    responseType: 'arraybuffer'
  })
  // .then(response => {
   
  // })
  // .catch(ex => {
  //   console.error(ex);
  // });

  const buffer = Buffer.from(response.data, 'base64');
  console.log('img:', buffer);
  res.setHeader('Content-Type', 'image/jpg')
  res.setHeader('title', '')
  res.send(buffer)

  // res.status(200).json({ name: 'John Doe' })
}
