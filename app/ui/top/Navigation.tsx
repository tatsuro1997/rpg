import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import AppLogo from '@/ui/AppLogo';
import { signOut } from '../../../auth';

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center p-2 bg-gray-800 text-white">
      <div className="flex items-center">
        <Link href="/">
          <AppLogo />
        </Link>
      </div>
      <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button type='submit' className="flex items-center justify-center rounded gap-1 p-1 text-xs">
            <PowerIcon className="w-4" />
            <div className="hidden md:block">ログアウト</div>
          </button>
        </form>
    </nav>
  );
}
