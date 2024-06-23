"use client"

import { useState, useEffect, useCallback } from 'react'
import { ChartData } from 'chart.js';
import clsx from 'clsx';
import StackedBarChart from "@/components/top/chart/StackedBarChart";
import ModalFormSample from "@/components/main/experience/ModalFormSample";
import ExperienceList from '@/components/ExperienceList';
import { generateChartDataFromExperiences } from '@/utils/chartUtils';
import { BaseExperience } from '@/types/Experience'
import MainView from '@/components/main/MainView';

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
    <main className={clsx("min-h-screen md:p-24 py-10 px-2 text-center")}>
      <MainView />

      <div className={clsx("mt-20")}>
        <ModalFormSample addRecord={handleAddRecord} />
        <div className={clsx("mt-2")}>
          <p className={clsx("text-sm")}>経験値登録を試してみることができます。</p>
          <p className={clsx("text-xs")}>*ログインしていない場合は登録したデータは保存されません。</p>
        </div>
      </div>

      {data.datasets.length >=1 &&
        <>
          <div className={clsx("py-4")}>
            <StackedBarChart data={data} />
          </div>

          <ExperienceList
            sortedExperiences={sortedRecords}
            onUpdateExperience={() => { }} // 未ログインでは更新させないので空関数
          />
        </>
      }
    </main>
  );
}

export default App;
