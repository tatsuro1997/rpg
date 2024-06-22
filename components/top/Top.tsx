'use client'

import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import StackedBarChart from "@/components/top/chart/stackedBarChart";
import ModalForm from "@/components/top/experience/modalForm";
import ExperienceList from '@/components/experienceList';
import TopMainView from '@/components/top/TopMainView';
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

  const handleUpdateExperience = (updatedExperience: BaseExperience) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((experience) =>
        experience.date === updatedExperience.date ? updatedExperience : experience
      )
    );
  };

  const sortedExperiences = experiences.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className={clsx("min-h-screen md:p-24 py-10 px-2 text-center")}>
      <TopMainView />

      <div className={clsx("mt-20")}>
        <ModalForm addRecord={handleAddExperience} />
      </div>

      {data.datasets.length >= 1 &&
        <>
          <div className={clsx("py-4")}>
            <StackedBarChart data={data} />
          </div>

          <ExperienceList sortedExperiences={sortedExperiences} onUpdateExperience={handleUpdateExperience} />
        </>
      }
    </main>
  );
};

export default Top;
