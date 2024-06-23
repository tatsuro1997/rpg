'use client'

import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { ChartData } from 'chart.js';
import StackedBarChart from "@/components/top/chart/StackedBarChart";
import ModalForm from "@/components/top/experience/ModalForm";
import ExperienceList from '@/components/ExperienceList';
import TopMainView from '@/components/top/TopMainView';
import { generateChartDataFromExperiences } from '@/utils/chartUtils';
import { Experience } from '@/types/Experience'

interface AppProps {
  initialExperiences: Experience[];
  userId?: string;
}

const Top: React.FC<AppProps> = ({ initialExperiences, userId }) => {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [data, setData] = useState<ChartData<'bar'>>({ labels: [], datasets: [] });

  const handleAddExperience = useCallback((date: string, title: string, point: number) => {
    setExperiences((prevExperiences) => [...prevExperiences, { date, title, point }]);
  }, []);

  useEffect(() => {
    const newData = generateChartDataFromExperiences(experiences);
    setData(newData);
  }, [experiences]);

  const handleUpdateExperience = (updatedExperience: Experience) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((experience) =>
        experience.id === updatedExperience.id ? updatedExperience : experience
      )
    );
  };

  const sortedExperiences = experiences.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className={clsx("min-h-screen md:p-24 py-10 px-2 text-center")}>
      <TopMainView />

      <div className={clsx("mt-20")}>
        <ModalForm addRecord={handleAddExperience} userId={userId} />
      </div>

      {data.datasets.length >= 1 &&
        <>
          <div className={clsx("py-4 mb-10 block overflow-x-scroll")}>
            <div className="min-w-[900px]">
              <StackedBarChart data={data} />
            </div>
          </div>

          <ExperienceList sortedExperiences={sortedExperiences} onUpdateExperience={handleUpdateExperience} />
        </>
      }
    </main>
  );
};

export default Top;
