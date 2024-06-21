import clsx from 'clsx';
import { BaseExperience } from '@/types/Experience'

interface Props {
  sortedExperiences: BaseExperience[];
}

const ExperienceList = ({ sortedExperiences }: Props) => {
  return (
    <div className={clsx("w-fit p-4 mx-auto border border-gray-400 rounded")}>
      <h3 className={clsx("font-semibold mb-4")}>記録一覧</h3>
      <ul>
        {sortedExperiences.map((record, index) => (
          <li key={index} className={clsx("bg-card py-1 rounded-lg shadow-md")}>
            <div className={clsx("text-md flex justify-around")}>
              <div className={clsx("px-2")}>
                {new Date(record.date).getFullYear()}
              </div>
              <div className={clsx("px-2")}>
                {record.title}: {record.point}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceList;
