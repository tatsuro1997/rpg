'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import {
  ArrowRightIcon,
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@mui/material';
import { lusitana } from '../fonts';

export default function LogInForm() {
  // const [code, action] = useFormState(authenticate, undefined);

  const LogInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" className="mt-4 w-[130px]" aria-disabled={pending}>
        ログイン <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-500" />
      </Button>
    );
  }

  return (
    <form className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-10 pb-4 pt-8 text-sm text-gray-800">
        <h1 className={`${lusitana.className} mb-5 text-1xl`}>
          以下のフォームからログインしてください。
        </h1>
        <div className="w-full">
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
            メールアドレス
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              placeholder="xxx@example.com"
              required
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
            パスワード
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="password"
              type="current-password"
              name="password"
              placeholder="パスワード"
              required
              minLength={8}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <LogInButton />
          {/* {code && (
            <div className="flex h-8 items-end space-x-1">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                Emailかパスワードが不正です。
                {code}
              </p>
            </div>
          )} */}
          <br />
          <div className="text-gray-500 text-xs mt-10">
            アカウントを作成する場合は
            <Link href="/register" className='text-blue-600 hover:underline'>こちら</Link>
          </div>
        </div>
      </div>
    </form>
  );
}
