import { NextResponse } from "next/server";

// const BASE_API = 'http://192.168.1.240:3001';
const BASE_API = 'http://haidev.ink';

async function getData(slug) {
    let BASE_URL = (process.env.BASE_URL || 'https://thenewssast.com');
    const urlBase = BASE_API+'/api/post?url=' + BASE_URL + '/' + slug;
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
    const { fbclid = null } = params;
    const { nextUrl } = request;
    const path = nextUrl.pathname || '';
    const isImg = path.includes('/api');

    if (isImg && !fbclid) {
        const temp = path.replace('/api/', '');
        const dat = await getData(temp);
        const { post: { isFakeImg, img } } = dat;
        // console.log('get data:',dat);
        console.log('IMG',isFakeImg);
        if (!isFakeImg) {
            return NextResponse.redirect(new URL('/' + temp, request.url))
        } else {
            const response = NextResponse.next();
            response.headers.append('URL-IMG', img);
            response.headers.append('X-HEADER', img);

            return response;
        }
    }

    if (fbclid) {
        let BASE_URL = (process.env.BASE_URL || 'https://thenewssast.com');
        if (isImg) {
            const newPath = path.replace('/api', '');
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