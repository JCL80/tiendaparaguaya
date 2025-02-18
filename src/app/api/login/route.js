import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    console.log("**** Login request being called: ****");
    const { email, password } = await request.json();

    // Send login request to Strapi
    const strapiRes = await axios.post(`${process.env.STRAPI_URL}/api/auth/local`, {
      identifier: email,
      password,
    });

    const { jwt, user } = strapiRes.data;

    // Set the JWT as an HTTP-only cookie
    const response = NextResponse.json({ user });
    response.cookies.set('token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    console.log('Login successful:', user);

    return response;
  } catch (err) {
    const errorMessage =
      err.response?.data?.error?.message || 'Login failed';
      console.log('Login failed:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
