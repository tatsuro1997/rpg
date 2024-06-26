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
import { Button, Dialog, DialogContent } from '@mui/material';
import { FormError } from '@/components/form-error';
import { experienceSchema } from '@/schemas';
import { createExperience, updateExperience } from '@/actions/experience';
import { useSession } from 'next-auth/react';
import { BaseExperience, Experience } from '@/types/Experience';
import { auth } from '@/auth';

interface ModalFormProps {
  addRecord: (date: string, title: string, point: number) => void;
  existingRecord?: Experience;
  onUpdateRecord?: (updatedRecord: BaseExperience) => void;
  userId?: string;
}

const ModalForm: React.FC<ModalFormProps> = ({ addRecord, existingRecord, onUpdateRecord, userId }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const { data: session, status } = useSession();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      userId: userId?? '',
      date: existingRecord?.date ? new Date(existingRecord.date).toISOString().slice(0, 10) : '',
      title: existingRecord?.title ?? '',
      point: existingRecord?.point.toString() ?? '',
    },
  });

  useEffect(() => {
    if (userId) {
      form.setValue('userId', userId);
    }
  }, [userId, form]);

  const onSubmit = (values: z.infer<typeof experienceSchema>) => {
    setError('');

    startTransition(async () => {
      const formattedDate = new Date(values.date).toISOString();
      let result;

      if (existingRecord) {
        result = await updateExperience(existingRecord.id as number, {
          ...values,
          date: formattedDate,
        });
      } else {
        result = await createExperience({
          ...values,
          date: formattedDate,
        });
      }

      if (!result.isSuccess) {
        setError(result.error.message);
        return;
      }

      if (existingRecord && onUpdateRecord) {
        onUpdateRecord({
          ...existingRecord,
          date: values.date,
          title: values.title,
          point: parseInt(values.point),
        });
      } else {
        addRecord(values.date, values.title, parseInt(values.point));
      }

      toast.success(result.message);
      handleClose();
    });
  };

  return (
    <>
      <Button
        type='button'
        className={clsx("md:my-4 my-2")}
        variant="outlined"
        onClick={handleClickOpen}
      >
        {existingRecord ? '編集' : '経験値登録'}
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
                        <Input type='date' { ...field } />
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
                  <button type='button' onClick={handleClose} className='text-xs'>
                    閉じる
                  </button>
                  <Button type='submit' disabled={isPending}>
                    {existingRecord ? '更新' : '経験値登録'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalForm;
