"use client"

import { Button } from '@/ui/common/Button';
import clsx from 'clsx';

export const InputModal = () => {
  const showInputModalHandler = () => {
    console.log("OPEN IMPUT MODAL!!!");
  }

  return (
    <Button
      className={clsx('mx-auto')}
      onClick={showInputModalHandler}
    >
      経験値登録
    </Button>
  )
}

export default InputModal;
