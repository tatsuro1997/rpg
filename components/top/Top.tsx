'use client'

import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import StackedBarChart from "@/components/top/chart/stackedBarChart";
import InputModal from "@/components/top/experience/inputModal";
import { generateChartDataFromExperiences } from '@/utils/chartUtils';
import { ChartData } from 'chart.js';
import { BaseExperience, Experience } from '@/types/Experience'

interface AppProps {
  initialExperiences: Experience[];
}

const Top: React.FC<AppProps> = ({ initialExperiences }) => {
  const [experiences, setExperiences] = useState<BaseExperience[]>(initialExperiences);
  const [data, setData] = useState<ChartData<'bar'>>({ labels: [], datasets: [] });

  const handleAddExperience = useCallback((date: string, title: string, point: number) => {
    setExperiences((prevExperiences) => [...prevExperiences, { date, title, point }]);
  }, []);

  useEffect(() => {
    const newData = generateChartDataFromExperiences(experiences);
    setData(newData);
  }, [experiences]);

  const sortedExperiences = experiences.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className={clsx("min-h-screen p-24 text-center")}>
      <div className={clsx("font-black text-6xl")}>
        WELCOME TO RPG[TOP]
      </div>
      <div className={clsx("font-bold text-2xl")}>
        ようこそ、RPGへ
      </div>

      <InputModal addRecord={handleAddExperience} />

      <div className={clsx("p-4")}>
        <StackedBarChart data={data} />
      </div>

      <div className={clsx("p-4")}>
        <h3>記録一覧</h3>
        <ul>
          {sortedExperiences.map((record, index) => (
            <li key={index}>
              {new Date(record.date).getFullYear()} - {record.title}: {record.point}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Top;
