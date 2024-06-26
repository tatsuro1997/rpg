'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '@mui/material';
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
import { registerSchema } from '@/schemas';
import { register } from '@/actions/register';

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError('');

    startTransition(async () => {
      const result = await register(values);

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
          name='nickname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ニックネーム</FormLabel>
              <FormControl>
                <Input placeholder='nickname' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          <Button type='submit' disabled={isPending} variant="outlined">
            アカウントを作成
          </Button>
          <Link href="/login" className='text-blue-600 text-xs underline'>
            ログイン
          </Link>
        </div>

      </form>
    </Form>
  );
}
