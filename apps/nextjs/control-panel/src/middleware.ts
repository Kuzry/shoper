import { type NextRequest, NextResponse } from "next/server";
import { verifyShoperSignature } from "@shoper/helpers/shoper";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const urlSearchParams = Object.fromEntries(request.nextUrl.searchParams);

  const params = {
    "admin-id": urlSearchParams["admin-id"],
    "admin-name": urlSearchParams["admin-name"],
    place: urlSearchParams["place"],
    shop: urlSearchParams["shop"],
    timestamp: urlSearchParams["timestamp"],
  };

  if (process.env.NODE_ENV !== "development") {
    verifyShoperSignature(
      process.env.SHOPER_APP_STORE_SECRET ?? "",
      new URLSearchParams(params).toString(),
      request.nextUrl.searchParams.get("admin-hash") ?? ""
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
