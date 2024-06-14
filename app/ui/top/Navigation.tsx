'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { PowerIcon } from '@heroicons/react/24/outline';
import AppLogo from '../AppLogo';

export default function Navigation() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <nav className="flex justify-between items-center p-2 bg-gray-800 text-white">
        <div className="flex items-center">
          <Link href="/">
            <AppLogo />
          </Link>
        </div>
        <div className='text-xs'>Loading...</div>
      </nav>
    );
  }

  const button = session ? (
    <button
      type="button"
      onClick={() => signOut()}
      className="flex items-center justify-center rounded gap-1 p-1 text-xs">
      <PowerIcon className="w-4" />
      <div className="hidden md:block">ログアウト</div>
    </button>
  ) : (
    <button
      type="button"
      onClick={() => signIn()}
      className="flex items-center justify-center rounded gap-1 p-1 text-xs">
      <PowerIcon className="w-4" />
      <div className="hidden md:block">ログイン</div>
    </button>
  );

  return (
    <nav className="flex justify-between items-center p-2 bg-gray-800 text-white">
      <div className="flex items-center">
        <Link href="/">
          <AppLogo />
        </Link>
      </div>
      {button}
    </nav>
  );
}
