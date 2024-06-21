import React, { useState } from 'react';
import clsx from 'clsx';
import { BaseExperience, Experience } from '@/types/Experience';
import InputModal from '@/components/top/experience/inputModal';

interface Props {
  sortedExperiences: BaseExperience[] | Experience[];
  onUpdateExperience: (updatedExperience: BaseExperience) => void;
}

const ExperienceList = ({ sortedExperiences, onUpdateExperience }: Props) => {
  const [editingRecord, setEditingRecord] = useState<Experience | null>(null);

  const handleEditClick = (record: Experience) => {
    setEditingRecord(record);
  };

  const handleUpdateRecord = (updatedRecord: BaseExperience) => {
    onUpdateExperience(updatedRecord);
    setEditingRecord(null);
  };

  return (
    <div className={clsx("w-fit p-4 mx-auto border border-gray-400 rounded")}>
      <h3 className={clsx("font-semibold mb-4")}>記録一覧</h3>
      <ul>
        {sortedExperiences.map((record, index) => (
          <li key={index} className={clsx("bg-card py-1 rounded-lg shadow-md mb-2")}>
            <div className={clsx("text-md flex justify-between items-center")}>
              <div>
                <div className={clsx("px-2")}>
                  {new Date(record.date).getFullYear()}
                </div>
                <div className={clsx("px-2")}>
                  {record.title}: {record.point}
                </div>
              </div>
              <button onClick={() => handleEditClick(record)} className={clsx("ml-4 text-sm text-blue-500 underline")}>
                編集
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editingRecord && (
        <InputModal
          addRecord={() => {}} // 編集モードでは使わないので空関数
          existingRecord={editingRecord}
          onUpdateRecord={handleUpdateRecord}
        />
      )}
    </div>
  );
};

export default ExperienceList;
