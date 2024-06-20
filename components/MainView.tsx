import { useState, useEffect } from "react";
import Link from 'next/link';
import { Button } from '@mui/material';
import clsx from 'clsx';

const MainView = () => {
  // Add state for handling text visibility
  const [textVisible, setTextVisible] = useState(false);

  // Use effect to handle text visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const textElements = document.querySelectorAll('.floating-text');

      textElements.forEach(element => {
        const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            element.classList.add('visible');
          }
        });
      };

    const typewriterTexts = document.querySelectorAll('.typewriter-text');
    let delay = 0;
    const animationDuration = 4000; // 4 seconds for each typewriter animation

    typewriterTexts.forEach((text, index) => {
      if (!text.classList.contains('visible')) {
        text.classList.add('hidden');
        setTimeout(() => {
          text.classList.remove('hidden');
          text.classList.add('visible');
        }, delay);
        delay += animationDuration; // Increase delay for the next element
      }
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to handle elements already in view

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Make text visible initially (for the typewriter effect)
  useEffect(() => {
    setTextVisible(true);
  }, []);

  return (
    <>
      <div className={clsx("py-10")}>
        <div className={clsx("font-black md:text-6xl text-3xl floating-text")}>
          WELCOME TO RPG
        </div>
        <div className={clsx("font-bold text-sm floating-text")}>
          ようこそ、RPGへ
        </div>
      </div>

      <div className={clsx("font-bold my-20")}>
        <div className={clsx("mb-4")}>
          <p className={clsx("text-2xl mt-20 typewriter-text", { visible: textVisible })}>あなたは人生の主人公。</p>
          <p className={clsx("text-xl mt-20 typewriter-text")}>これまでの経験を可視化して、<br className="sm"/>より豊かな人生にしてみませんか？</p>
          <p className={clsx("text-sm mt-10 typewriter-text")}>RPGは、人生の豊かさは<br className="sm"/>過去の経験によって大きく変わるという<br className="sm"/>『DIE WITH ZERO』から着想を受けています。</p>
          <p className={clsx("text-sm mt-5 typewriter-text")}>人生の経験値を可視化し、<br className="sm"/>豊かな人生を共に歩みましょう。</p>
        </div>
      </div>

      <div className={clsx("font-bold my-10")}>
        <Link href="/register">
          <Button variant="outlined">アカウント登録</Button>
        </Link>
        <p className={clsx("mt-4 floating-text md:text-base text-xs", { visible: textVisible })}>さぁ、アカウント登録をして<br className="sm"/>新しい自分の始まりを体験しましょう。</p>
      </div>
    </>
  )
}

export default MainView;
