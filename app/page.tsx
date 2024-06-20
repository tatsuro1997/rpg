"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link';
import { ChartData } from 'chart.js';
import { Button } from '@mui/material';
import clsx from 'clsx';
import StackedBarChart from "../components/top/chart/stackedBarChart";
import InputModal from "../components/ui/experience/inputModalSample";
import { generateChartDataFromExperiences } from '../utils/chartUtils';
import { BaseExperience } from '@/types/Experience'

const App: React.FC = () => {
  const [experiences, setExperiences] = useState<BaseExperience[]>([]);
  const [data, setData] = useState<ChartData<'bar'>>({ labels: [], datasets: [] });


  const handleAddRecord = useCallback((date: string, title: string, point: number) => {
    setExperiences((prevRecords) => [...prevRecords, { date, title, point }]);
  }, []);

  useEffect(() => {
    const newData = generateChartDataFromExperiences(experiences);
    setData(newData);
  }, [experiences]);

  const sortedRecords = [...experiences].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className={clsx("min-h-screen p-24 text-center")}>
      <div className={clsx("font-black text-6xl")}>
        WELCOME TO RPG
      </div>
      <div className={clsx("font-bold text-2xl")}>
        ようこそ、RPGへ
      </div>

      <div className={clsx("my-6")}>
        <p className={clsx("mb-4")}>さぁ、アカウント登録をして新しい自分の始まりを体験しましょう。</p>
        <Link href="/register">
          <Button variant="outlined">アカウント登録</Button>
        </Link>
      </div>

      <InputModal addRecord={handleAddRecord} />

      <div className={clsx("p-4")}>
        <StackedBarChart data={data} />
      </div>

      <div className={clsx("p-4")}>
        <h3>記録一覧</h3>
        <ul>
          {sortedRecords.map((record, index) => (
            <li key={index}>
              {new Date(record.date).getFullYear()} - {record.title}: {record.point}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
