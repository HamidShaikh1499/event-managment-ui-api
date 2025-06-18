import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = [
    '/home',
    '/users',
    '/template',
    '/vehicle-stats',
    '/yard',
    '/repossession',
    '/finance',
    '/directUpload',
    '/format',
    '/add-on-plus'
];

const unprotectedRoutes = [
    '/login'
];

const constantCookies = {
    token: 'token',
    permissions: 'permissions'
};

// only read permissions
const routePermissions = {
    users: 'user.read',
    template: 'template.read',
    'vehicle-stats': 'vehicleStatus',
    yard: 'yard.read',
    repossession: 'repossession.read',
    finance: 'finance.read',
    directUpload: 'uploadFile.read',
    format: 'uploadFile.read',
    uploadedFile: 'uploadFile.read',
    'add-on-plus': 'uploadFile.read',
};

const get = (obj: any, path: string, defaultValue: any = null) => {
    if (!obj) return null;

    if (!path) return null;

    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || defaultValue
};

export default function middleware(req: NextRequest) {
    // get token
    const token = req.cookies.get(constantCookies.token);

    // get permission & parse
    let permissions: any = req.cookies.get(constantCookies.permissions);
    if (permissions && permissions.value) {
        permissions = JSON.parse(permissions.value);
    }

    // if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    //     const absoluteURL = new URL('/login', req.nextUrl.origin);
    //     return NextResponse.redirect(absoluteURL.toString());
    // }

    // if (token && unprotectedRoutes.includes(req.nextUrl.pathname)) {
    //     const absoluteURL = new URL('/home', req.nextUrl.origin);
    //     return NextResponse.redirect(absoluteURL.toString()); // 307 also works
    // }

    // if (permissions && !req.nextUrl.pathname.includes('_next')) {
    //     const isHasPermissions = get(permissions, get(routePermissions, req.nextUrl.pathname.replaceAll('/', '')));
    //     if (isHasPermissions !== undefined && isHasPermissions !== null) {
    //         const absoluteURL = new URL('/unauthorized', req.nextUrl.origin);
    //         return NextResponse.rewrite(absoluteURL.toString());
    //     }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}
