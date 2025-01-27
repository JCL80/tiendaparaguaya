import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Clear the JWT cookie by setting it to an expired state
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0), // Expire immediately
  });

  return response;
}
