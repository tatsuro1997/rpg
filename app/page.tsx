import StackedBarChart from "@/ui/stackedBarChart";
import InputModal from "@/ui/experience/inputModal";
import clsx from 'clsx';

export default function Home() {
  return (
    <main className={clsx("min-h-screen p-24 text-center")}>
      <div className={clsx("font-black text-6xl")}>
        WELCOME TO RPG
      </div>
      <div className={clsx("font-bold text-2xl")}>
        ようこそ、RPGへ
      </div>
      <div className={clsx("p-4")}>
        <InputModal/>
      </div>
      <div className={clsx("p-4")}>
        <StackedBarChart></StackedBarChart>
      </div>
    </main>
  );
}
