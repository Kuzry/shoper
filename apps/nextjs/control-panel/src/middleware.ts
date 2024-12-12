import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const responseFetch = await fetch(
    process.env.BILLING_API_VERIFY_SHOP_ACCESS_URL ?? "",
    {
      method: "POST",
      body: JSON.stringify(
        Object.fromEntries(new URLSearchParams(request.nextUrl.searchParams))
      ),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseBody = await responseFetch.json();

  if (!responseBody.success) {
    return Response.redirect(new URL("/error", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|error).*)"],
};
