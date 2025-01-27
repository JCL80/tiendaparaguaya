'use client';

import { Fragment } from 'react';
import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import { UserInfo } from './components/UserInfo';
import { UserAvatar } from './components/UserAvatar';
import { LinkWithChannel } from '@/ui/atoms/LinkWithChannel';

type Props = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: { url: string };
  };
};

export function UserMenu({ user }: Props) {
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/logout', { method: 'GET' });
      if (res.ok) {
        console.log('Logout successful');
        // Refresh the page or redirect to the login page
        window.location.reload(); // Refresh the UI to reflect the logged-out state
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative flex rounded-full bg-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800">
        <span className="sr-only">Open user menu</span>
        <UserAvatar user={user} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-neutral-200 bg-white py-1 text-start shadow ring-1 ring-neutral-200 ring-opacity-5 focus:outline-none">
          <UserInfo user={user} />
          <div className="flex flex-col px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <LinkWithChannel
                  href="/listadedeseos"
                  className={clsx(
                    active && 'bg-neutral-100',
                    'block px-4 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-700'
                  )}
                >
                  Mi lista de deseos
                </LinkWithChannel>
              )}
            </Menu.Item>
          </div>
          <div className="flex flex-col px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <form onSubmit={handleLogout}>
                  <button
                    type="submit"
                    className={clsx(
                      active && 'bg-neutral-100',
                      'block px-4 py-2 text-start text-sm font-medium text-neutral-500 hover:text-neutral-700'
                    )}
                  >
                    Cerrar sesión
                  </button>
                </form>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
