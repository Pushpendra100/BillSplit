import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getDataFromToken } from './helpers/getDataFromToken';
 
export async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname
    const isPublicPath = path === '/' || path === '/signin' || path === '/signup'
    const token = request.cookies.get('token')?.value || '';

    if(isPublicPath && token){
        const user =  await getDataFromToken(request).catch((err)=>{
            console.log("error", err.message);
        })
        console.log(user);
        return NextResponse.redirect(new URL(`/dashboard/${user?.id}`, request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
}
 
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}