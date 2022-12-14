// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require('axios');

export default function handler(req, res) {
  axios
  .get('https://thenewssast.com/wp-content/uploads/2022/12/diipng.png', {
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

  // res.status(200).json({ name: 'John Doe' })
}
