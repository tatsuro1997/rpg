"use client"

import { useState, useEffect, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import clsx from 'clsx';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@mui/material';
import { FormError } from '@/components/form-error';
import { experienceSchema } from '@/schemas';
import { experience } from '@/actions/experience';
import { useSession } from 'next-auth/react';

interface InputModalProps {
  addRecord: (date: string, title: string, point: number) => void;
}

const InputModal: React.FC<InputModalProps> = ({ addRecord }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      userId: session?.user?.id ?? '',
      date: '',
      title: '',
      point: '',
    },
  });

  useEffect(() => {
    if (session?.user?.id) {
      form.setValue('userId', session.user.id);
    }
  }, [session, form]);

  const onSubmit = (values: z.infer<typeof experienceSchema>) => {
    setError('');

    startTransition(async () => {
      const formattedDate = new Date(values.date).toISOString();
      const result = await experience({
        ...values,
        date: formattedDate,
      });

      if (!result.isSuccess) {
        setError(result.error.message);
        return;
      }

      addRecord(values.date, values.title, parseInt(values.point));
      toast.success(result.message);
      handleClose();
    });
  };

  return (
    <>
      <Button
        type='button'
        className={clsx("my-4")}
        onClick={handleClickOpen}
      >
        経験値登録
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                  control={form.control}
                  name='userId'
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Input type='hidden' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>日付</FormLabel>
                      <FormControl>
                        <Input type='date' defaultValue='2020-01-01' { ...field } />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>タイトル</FormLabel>
                      <FormControl>
                        <Input placeholder='記録名' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='point'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>経験ポイント</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder='40, 60, 90, ...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <div className='flex justify-between'>
                  <Button type='submit' disabled={isPending}>
                    経験値登録
                  </Button>
                  <button type='button' onClick={handleClose} className='text-sm'>
                    閉じる
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default InputModal;
