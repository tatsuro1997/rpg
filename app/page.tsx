"use client"

import { useState } from 'react'
import { ChartData } from 'chart.js';
import clsx from 'clsx';
import StackedBarChart from "@/ui/stackedBarChart";
import InputModal from "@/ui/experience/inputModal";
import { addRecord } from '@/utils/chartUtils';

const initialData: ChartData<'bar'> = {
  labels: [],
  datasets: [],
};

const App = () => {
  const [data, setData] = useState<ChartData<'bar'>>(initialData);

  return (
    <main className={clsx("min-h-screen p-24 text-center")}>
      <div className={clsx("font-black text-6xl")}>
        WELCOME TO RPG
      </div>
      <div className={clsx("font-bold text-2xl")}>
        ようこそ、RPGへ
      </div>

      <InputModal addRecord={(date, name, value) => addRecord(data, date, name, value, setData)} />

      <div className={clsx("p-4")}>
        <StackedBarChart data={data} />
      </div>
    </main>
  );
}

export default App;
