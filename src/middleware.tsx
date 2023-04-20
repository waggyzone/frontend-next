// export { default } from "next-auth/middleware";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    if (request.nextUrl.pathname.startsWith("/admin") && request.nextauth.token?.role !== "admin") {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    }

    // return NextResponse.next(false);
    // if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "user")
    //   return NextResponse.rewrite(new URL("/auth/login?message=You Are Not Authorized!", req.url));
  },
  {
    callbacks: {
      authorized: () => {
        // console.log(token.req.signal.aborted);
        return true;
      },
    },
  }
);

export const config = { matcher: ["/((?!.*\\.|api\\/).*)", "/admin/:path*"] };
