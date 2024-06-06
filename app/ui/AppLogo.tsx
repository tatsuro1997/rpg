import { UserCircleIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/ui/fonts';

export default function AppLogo() {
  return (
    <div className={`${lusitana.className} flex flex-row items-center leading-none text-white gap-5`}>
      <UserCircleIcon className="h-8 w-8" />
      <p className="text-[30px]">RPG</p>
    </div>
  );
}
