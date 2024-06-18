import { PropsWithChildren } from 'react';
import { Noto_Sans_JP } from 'next/font/google';

const font = Noto_Sans_JP({ subsets: ['latin'], weight: ['600'] });

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className='container flex flex-col h-full justify-center gap-x-12 py-4 lg:py-6'>
      {children}
    </main>
  );
};

export default AuthLayout;
