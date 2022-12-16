import { NextResponse } from "next/server";
const axios = require('axios');
// const BASE_API = 'http://192.168.1.240:3001';
const BASE_API = 'http://haidev.ink';

async function getData(slug) {
    let BASE_URL = (process.env.BASE_URL || 'https://thenewssast.com');
    const urlBase = BASE_API + '/api/post?url=' + BASE_URL + '/' + slug;
    console.log('url base:', urlBase);
    // const urlBase = 'https://api.coindesk.com/v1/bpi/currentprice.json'
    const response = await fetch(urlBase);
    const data = await response.json();
    return data;
}

export default async function middleware(request) {
    const { nextUrl: { search } } = request;

    const urlSearchParams = new URLSearchParams(search);
    const params = Object.fromEntries(urlSearchParams.entries());
    // console.log('====================================');
    // console.log('middleware', request.nextUrl);
    // console.log('middleware', params);
    // console.log('====================================');
    const { fbclid = null, url_img = null } = params;
    const { nextUrl } = request;
    const path = nextUrl.pathname || '';
    const isImg = path.includes('/post');
    // const response = 
    // return NextResponse.next();;

    if (isImg && !fbclid) {
        const temp = path.replace('/post/', '');
        const dat = await getData(temp);
        const { post: { isFakeImg, img } } = dat;
        // console.log('get data:',dat);
        console.log('IMG', isFakeImg);
        if (!isFakeImg) {
            return NextResponse.redirect(new URL('/' + temp, request.url))
        } else {
            // if(!url_img){
            //     return NextResponse.redirect(new URL('/post/' + temp + '?url_img='+img, request.url))
            // }
            // console.log('url_img:',img);
            // const response = NextResponse.next();
            // response.url_img=img;
            // return response;

            try {
                console.log('file:', img);
                // const response = await axios
                //     .get(img, {
                //         responseType: 'arraybuffer'
                //     })
                //     console.log('img2:', response);

                // const buffer = Buffer.from(response.data, 'base64');

                // res.setHeader('Content-Type', 'image/jpg')
                // res.send(buffer)

                // const response = NextResponse.next();
                // response.body.url_img=img;
                // response.url_img = img;
                // return response;

                const res=  new NextResponse(
                    {name:'test'},
                    { status: 200, headers: { 'content-type': 'application/json' } }
                )

                const rd= NextResponse.next({statusText:img});
                // rd.status=300;
                return rd
            } catch (error) {
                console.log('error:', error);
                return new NextResponse(
                    JSON.stringify({ success: true, message: 'authentication failed' }),
                    { status: 200, headers: { 'content-type': 'application/json' } }
                )
            }


        }
    }

    if (fbclid) {
        let BASE_URL = (process.env.BASE_URL || 'https://thenewssast.com');
        if (isImg) {
            const newPath = path.replace('/post', '');
            BASE_URL = BASE_URL + newPath;
        } else {
            BASE_URL = BASE_URL + path;;
        }
        return NextResponse.redirect(new URL(BASE_URL, request.url))
    }

    const response = NextResponse.next();
    return response;
    // return null
}

export const config = {
    matcher: [
        // '/disclaimer', // match a single, specific page
        // '/((?!public|static).*)', // match all paths not starting with 'public' or 'static'
        '/posts/:path*',
        '/:path*',
    ]
}