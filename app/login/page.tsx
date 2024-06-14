import { Metadata } from 'next';
import LogInForm from '../ui/login/LogInForm';
import AppLogo from '../ui/AppLogo';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ログイン',
};

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Link
          className="mb-2 p-5 flex items-end justify-start"
          href="/"
        >
          <div className="w-auto text-white md:w-40">
            <AppLogo />
          </div>
        </Link>
        <LogInForm />
      </div>
    </main>
  );
}
