import StackedBarChart from "@/components/StackedBarChart";

export default function Home() {
  return (
    <main className="min-h-screen p-24 text-center">
      <div className="font-black text-6xl">
        WELCOME TO PRG
      </div>
      <div className="font-bold text-2xl">
        ようこそ、PRGへ
      </div>
      <div className="p-4">
        <StackedBarChart></StackedBarChart>
      </div>
    </main>
  );
}
