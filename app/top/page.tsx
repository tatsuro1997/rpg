import { Metadata } from 'next';
import Top from '@/components/top/Top';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { Experience } from '@/types/Experience'

export const metadata: Metadata = {
  title: '経験値登録',
};

const fetchData = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const userId = parseInt(session.user.id);
  const experiences = await db.experience.findMany({
    where: { userId },
    orderBy: { date: 'asc' },
  });

  const serializedExperiences = experiences.map(experience => ({
    ...experience,
    date: experience.date.toISOString(),
  }));

  return serializedExperiences;
}

export default async function TopPage() {
  const initialExperiences = await fetchData();

  if ('redirect' in initialExperiences) {
    return {
      redirect: initialExperiences.redirect,
    };
  }

  return <Top initialExperiences={initialExperiences as Experience[]} />;
}
