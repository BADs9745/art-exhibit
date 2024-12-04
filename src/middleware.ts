import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

// This function can be marked async if using await inside
export async function middleware(request: NextRequest) {
	const isLogin = cookies().get("login_token")?.value as string;
	if (!isLogin) {
		if (
			request.nextUrl.pathname === "/account/signin" ||
			request.nextUrl.pathname === "/account/signup"
		) {
			return NextResponse.next();
		}
		return Response.redirect(new URL("/account/signin", request.url), 302);
	}
	return NextResponse.next();
}

export const config = {
	matcher: "/account/(.*)",
};
