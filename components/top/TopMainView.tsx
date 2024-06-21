import { useState, useEffect } from "react";
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
    <div className={clsx("font-bold my-20")}>
      <div className={clsx("mb-4")}>
        <p className={clsx("text-2xl mt-20 floating-text", { visible: textVisible })}>あなたは人生の主人公。</p>
        <p className={clsx("text-xl mt-20 floating-text")}>これまでの経験を可視化してみよう。</p>
        <p className={clsx("text-sm mt-10 floating-text")}>RPGは、人生の豊かさは<br className="sm"/>過去の経験によって大きく変わるという<br className="sm"/>『DIE WITH ZERO』から着想を受けています。</p>
        <p className={clsx("text-sm mt-5 floating-text")}>人生の経験値を可視化し、<br className="sm"/>豊かな人生を共に歩みましょう。</p>
      </div>
    </div>
  )
}

export default MainView;
