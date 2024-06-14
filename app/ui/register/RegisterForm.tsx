'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBirthdayCake } from 'react-icons/fa';
import {
  ArrowRightIcon,
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@mui/material';
import { createAccount } from '@/lib/auth';
import { lusitana } from '@/ui/fonts';

export default function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createAccount(email, password);
      // Redirect to login page or show success message
    } catch (err) {
      setError('アカウント登録に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-10 pb-4 pt-8 text-sm text-gray-800">
        <h1 className={`${lusitana.className} mb-5 text-1xl`}>
          以下のフォームからアカウント登録してください。
        </h1>
        <div className="w-full">
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="name">
            ユーザー名
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              name="name"
              type="string"
              placeholder="ユーザー名"
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              name="password"
              placeholder="パスワード"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div className="w-full">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="birthday">
              誕生日
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] px-10 text-sm outline-2 placeholder:text-gray-500"
                id="birthday"
                name="birthday"
                type="date"
                defaultValue="2000-01-01"
                required
              />
              <FaBirthdayCake className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <Button type="submit" className="mt-4 w-[150px]" disabled={loading}>
            アカウント登録 <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-500" />
          </Button>
          {error && (
            <div className="flex h-8 items-end space-x-1">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                {error}
              </p>
            </div>
          )}
          <br />
          <div className="mt-10 flex items-baseline gap-4">
            <p className='text-xs text-gray-500'>
              *すでにアカウントをお持ちの場合<Link href="/login" className='text-blue-600 hover:underline'>ログイン</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
