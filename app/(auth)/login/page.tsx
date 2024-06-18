import Link from 'next/link';
import { Metadata } from 'next';
import AppLogo from '@/components/ui/AppLogo';
import { LogInForm } from '../_components/login-form';

export const metadata: Metadata = {
  title: 'ログイン',
};

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Link
          className="b-2 p-5 flex items-end justify-start"
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
