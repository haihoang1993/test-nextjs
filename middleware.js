import { NextResponse } from "next/server";

export default function middleware(request) {
    const { nextUrl: { search } } = request;

    const urlSearchParams = new URLSearchParams(search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log('====================================');
    console.log('middleware',request.nextUrl );
    console.log('middleware', params);
    console.log('====================================');
    const {fbclid=null} = params;
    if(fbclid){
        const BASE_URL =  (process.env.BASE_URL || 'https://thenewssast.com') + request.nextUrl.pathname
        return NextResponse.redirect(new URL(BASE_URL, request.url))
    }
    // return NextResponse.redirect(new URL('https://www.google.com/', request.url))

    return NextResponse.next()
    // return null
}

export const config = {
    matcher: [
        // '/disclaimer', // match a single, specific page
        // '/((?!public|static).*)', // match all paths not starting with 'public' or 'static'
        '/posts/:path*',
        // '/about/:path*',
    ]
}