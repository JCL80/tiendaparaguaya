import { UserIcon } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { cookies } from 'next/headers';
import { LinkWithChannel } from '@/ui/atoms/LinkWithChannel';

export async function UserMenuContainer() {
  // Get the JWT from cookies
  const cookieStore = await cookies()
  const jwt = cookieStore.get('token')?.value

  // console.log('JWT from cookies:', jwt);

  let user = null;

  // If JWT exists, fetch user details from Strapi
  if (jwt) {
    try {
      const res = await fetch(`${process.env.STRAPI_URL}/api/users/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (res.ok) {
        user = await res.json();
        console.log('Fetched user:', user);
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  // If user exists, render UserMenu
  if (user) {
    return <UserMenu user={user} />;
  }

  // Otherwise, render the Login link
  return (
    <LinkWithChannel href="/login" className="h-6 w-6 flex-shrink-0">
      <UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
      <span className="sr-only">Log in</span>
    </LinkWithChannel>
  );
}
