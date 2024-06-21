"use client"

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Button } from '@mui/material';
import { Dialog, DialogContent } from '@mui/material';
import { experienceSchema } from '@/schemas';

interface InputModalProps {
  addRecord: (date: string, title: string, point: number) => void;
}

const InputModal: React.FC<InputModalProps>  = ({ addRecord }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      userId: '',
      date: '',
      title: '',
      point: '',
    },
  });

  const onSubmit = (values: z.infer<typeof experienceSchema>) => {
    addRecord(values.date, values.title, parseInt(values.point));
    handleClose();
  };

  return (
    <>
      <Button
        className={clsx("my-4")}
        variant="outlined"
        onClick={handleClickOpen}>
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
                <div className='flex justify-between'>
                  <button type='button' onClick={handleClose} className='text-sm'>
                    閉じる
                  </button>
                  <Button type='submit'>
                    経験値登録
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

export default InputModal;
