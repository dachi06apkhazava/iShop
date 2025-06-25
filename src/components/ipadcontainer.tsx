import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Pencil from '../assets/pencil.png'
import Keyboard from '../assets/keyboard.png'

export default function IpadContainer() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 lg:px-8 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-16"
        >
          <motion.div variants={itemVariants} className="text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              iPad essentials.
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group cursor-pointer space-y-8"
            >
              <div className="text-center lg:text-left space-y-4">
                <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
                  Apple Pencil
                </h2>
                <p className="text-lg text-gray-600">Dream it up. Jot it down.</p>
                <button className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-lg transition-colors duration-200 inline-flex items-center gap-1">
                  <a href="/store/ipad">Learn more</a>
                  <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
              </div>

              <div className="relative overflow-hidden rounded-2xl">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="aspect-[4/3] relative"
                >
                  <img
                    src={Pencil}
                    alt="Apple Pencil"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group cursor-pointer space-y-8"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="aspect-[4/3] relative"
                >
                  <img
                    src={Keyboard}
                    alt="iPad Keyboard"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </motion.div>
              </div>

              <div className="text-center lg:text-left space-y-4">
                <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
                  Keyboards for iPad
                </h2>
                <p className="text-lg text-gray-600">Type it out. Take it with you.</p>
                <button className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-lg transition-colors duration-200 inline-flex items-center gap-1">
                  <a href="/store/ipad">Learn more</a>
                  <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
