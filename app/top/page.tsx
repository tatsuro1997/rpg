import { Metadata } from 'next';
import Top from '@/components/top/Top';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { Experience } from '@/types/Experience'

export const metadata: Metadata = {
  title: '経験値登録',
};

const fetchUserId = async (): Promise<string> => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error('User is not authenticated');
  }

  return session.user.id;
}

const fetchExperiences = async (userId: number) => {
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
  const userId = await fetchUserId();
  const userIdInt = parseInt(userId);
  const initialExperiences = await fetchExperiences(userIdInt);

  return <Top initialExperiences={initialExperiences as Experience[]} userId={userId} />;
}
