import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    console.log('Received registration request');
    const { fullName, email, phone, password } = await request.json();
    console.log('Registration request:', { fullName, email, phone, password });

    // Send registration request to Strapi
    const strapiRes = await axios.post(`${process.env.STRAPI_URL}/api/auth/local/register`, {
      email,
      username: email, // Strapi requires username; use email for simplicity
      password,
      fullName,
      phone
    });

    const { jwt, user } = strapiRes.data;

    // Set the JWT as an HTTP-only cookie
    const response = NextResponse.json({ user });
    response.cookies.set('token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return response;
  } catch (err) {
    const errorMessage =
      err.response?.data?.error?.message || 'Registration failed';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
