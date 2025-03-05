import { NextRequest, NextResponse } from "next/server";
import { middleId } from "./app/page";

export function middleware(req: NextRequest) {
    let userName: string = ""
    let id: any = middleId
    const url = req.nextUrl.clone()

    if (id == 13) {
        url.pathname = "/admin"
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/:path*"
};