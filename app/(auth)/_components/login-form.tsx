'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/form-error';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { logInSchema } from '@/schemas/index';
import { signIn } from '@/actions/login';

export function LogInForm() {
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof logInSchema>) => {
    setError('');

    startTransition(async () => {
      const result = await signIn(values);

      if (!result.isSuccess) {
        setError(result.error.message);
        return;
      }

      toast.success(result.message);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder='rpg@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input placeholder='12345678' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <div className='flex justify-between items-center'>
          <Button type='submit' disabled={isPending}>
            ログイン
          </Button>
          <Link href="/register" className='text-blue-600 text-xs underline'>
            アカウント登録
          </Link>
        </div>
      </form>
    </Form>
  );
}
