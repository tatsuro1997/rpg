"use client"

import { useState, useEffect, useCallback } from 'react'
import { ChartData } from 'chart.js';
import clsx from 'clsx';
import StackedBarChart from "@/components/top/chart/stackedBarChart";
import InputModal from "@/components/top/experience/inputModal";
import { generateChartDataFromRecords } from '@/utils/chartUtils';

const App: React.FC = () => {
  const [records, setRecords] = useState<{ date: string, name: string, value: string }[]>([]);
  const [data, setData] = useState<ChartData<'bar'>>({ labels: [], datasets: [] });

  const handleAddRecord = useCallback((date: string, name: string, value: string) => {
    setRecords((prevRecords) => [...prevRecords, { date, name, value }]);
  }, []);

  useEffect(() => {
    const newData = generateChartDataFromRecords(records);
    setData(newData);
  }, [records]);

  const sortedRecords = [...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className={clsx("min-h-screen p-24 text-center")}>
      <div className={clsx("font-black text-6xl")}>
        WELCOME TO RPG[TOP]
      </div>
      <div className={clsx("font-bold text-2xl")}>
        ようこそ、RPGへ
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
              {new Date(record.date).getFullYear()} - {record.name}: {record.value}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
