import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const access_token = searchParams.get("access_token");

    console.log("Received Google callback request with access_token:", access_token);

    if (!access_token) {
      return NextResponse.json({ error: "Missing access_token" }, { status: 400 });
    }

    // 1) (Optional) Fetch user info from Google for debugging or usage
    //    Not strictly required for Strapi to work:
    // const googleUserInfo = await axios.get(
    //   `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
    // );
    // console.log("Google user info:", googleUserInfo.data);

    // 2) Call Strapi’s Google callback endpoint (GET request with query param)
    const strapiResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/google/callback?access_token=${access_token}`
    );
    console.log("Strapi response:", strapiResponse.data);

    // 3) Strapi will return the user + JWT if successful
    const { jwt, user } = strapiResponse.data;
    console.log("Strapi user:", user);
    console.log("Strapi JWT:", jwt);

    // 4) Set the JWT as an HTTP-only cookie in Next.js
    //    Then redirect the user to whatever page you want ("/" in this example).
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("token", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    console.error("Error during Google callback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
