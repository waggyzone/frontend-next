import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("test", req);

  return NextResponse.next();
}

export const config = { matcher: "/((?!.*\\.|api\\/).*)" };
