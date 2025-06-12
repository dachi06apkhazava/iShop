import { useRef, useState, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';
import iMac from '../assets/mac.mp4';

function MacBanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const lastScrollY = useRef(0);

  const togglePause = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isDesktop = window.innerWidth >= 1024;

      if (!isDesktop) return;

      if (currentScrollY > lastScrollY.current) {
        setScrolledDown(true);
      } else if (currentScrollY < lastScrollY.current) {
        setScrolledDown(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between mt-12 items-center px-8 py-6 max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">iMac</h1>
        <button className="rounded-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white px-5 py-2 transition">
          See in Store
        </button>
      </div>
      <div
        className={`relative h-[800px] overflow-hidden  mx-auto transition-all duration-700 ease-in-out ${
          scrolledDown ? 'lg:w-[93vw] lg:rounded-2xl' : 'w-full rounded-none'
        }`}
      >
        <video
          ref={videoRef}
          src={iMac}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover will-change-transform"
        />
        <button
          onClick={togglePause}
          className="cursor-pointer absolute bottom-4 right-4 z-10 bg-gray-300/60 text-gray-800 p-2 rounded-full hover:bg-gray-400 transition"
        >
          {isPaused ? (
            <Play size={20} className="fill-current text-gray-800" />
          ) : (
            <Pause size={20} className="fill-current text-gray-800" />
          )}
        </button>
      </div>
    </div>
  );
}

export default MacBanner;
