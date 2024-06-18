import { Metadata } from 'next';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { RegisterForm } from '../_components/register-form';

export const metadata: Metadata = {
  title: '新規登録',
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
        <RegisterForm />
      </div>
    </main>
  );
}
