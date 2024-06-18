import { UserCircleIcon } from '@heroicons/react/24/outline';
import { lusitana } from './fonts';

export default function AppLogo() {
  return (
    <div className={`${lusitana.className} flex flex-row items-center leading-none text-gray-800 gap-2`}>
      <UserCircleIcon className="h-6 w-6" />
      <p className="text-xl">RPG</p>
    </div>
  );
}
