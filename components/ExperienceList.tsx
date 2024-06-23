import clsx from 'clsx';
import { BaseExperience, Experience } from '@/types/Experience';
import ModalForm from '@/components/top/experience/ModalForm';

interface Props {
  sortedExperiences: BaseExperience[] | Experience[];
  onUpdateExperience: (updatedExperience: BaseExperience) => void;
}

const ExperienceList = ({ sortedExperiences, onUpdateExperience }: Props) => {
  const handleUpdateRecord = (updatedRecord: BaseExperience) => {
    onUpdateExperience(updatedRecord);
  };

  const experiencesByYear: Record<number, (BaseExperience | Experience)[]> = sortedExperiences.reduce((acc, record) => {
    const year = new Date(record.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(record);
    return acc;
  }, {} as Record<number, (BaseExperience | Experience)[]>);

  const years = Object.keys(experiencesByYear).map(Number);

  return (
    <div className={clsx("w-full p-4 mx-auto border border-gray-400 rounded")}>
      <h3 className={clsx("font-semibold mb-4")}>記録一覧</h3>
      <div className={clsx("block overflow-x-scroll")}>
        <ul className={clsx("flex gap-x-4")}>
          {years.map(year  => (
            <li key={year} className={clsx("mb-4")}>
              <div className={clsx("font-bold text-lg")}>{year}年</div>
              <ul>
                {experiencesByYear[year].map((record: BaseExperience, index: number) => (
                  <li key={index} className={clsx("rounded-lg shadow-md")}>
                    <div className={clsx("text-md flex justify-between items-center")}>
                      <div className={clsx("w-60 px-2")}>
                        {record.title}: {record.point}
                      </div>
                      <ModalForm
                        addRecord={() => {}} // 編集モードでは使わないので空関数
                        existingRecord={record}
                        onUpdateRecord={handleUpdateRecord}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceList;
