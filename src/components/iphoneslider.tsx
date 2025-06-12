import type React from "react"
import { useRef, useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import Screen from '../assets/screen.png'
import Chip from '../assets/chip.jpg'
import Mind from '../assets/mind.jpg'
import Recycle from '../assets/recycle.jpg'
import Security from '../assets/sec.jpg'

interface SlideData {
  id: string
  category: string
  title: string
  description: string
  background: string
  textColor: string
  image: string
}

const slides: SlideData[] = [
  {
    id: "1",
    category: "Innovation",
    title: "Beautiful and durable, by design.",
    description: "Advanced screen protection system with new generation of gorilla glass",
    background: "bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800",
    textColor: "text-white",
    image: Screen,
  },
  {
    id: "2",
    category: "Chip and Battery Life",
    title: "Fast that lasts.",
    description: "A18 Pro chip delivers incredible performance and efficiency",
    background: "bg-gradient-to-br from-amber-900 via-orange-800 to-amber-700",
    textColor: "text-white",
    image: Chip,
  },
  {
    id: "3",
    category: "Peace of mind",
    title: "Helpful features. On and off the grid.",
    description: "Unique safety features allow iPhone to connect to satellite frequencies",
    background: "bg-black/60",
    textColor: "text-white",
    image: Mind,
  },
  {
    id: "4",
    category: "Environment",
    title: "Recycle. Reuse. Repeat.",
    description: "Carbon neutral and made with recycled materials",
    background: "bg-gradient-to-br from-green-50 to-blue-50",
    textColor: "text-gray-900",
    image: Recycle,
  },
  {
    id: "5",
    category: "Privacy",
    title: "Your data. Just yours.",
    description: "Privacy built into everything we do",
    background: "bg-gradient-to-br from-gray-900 to-black",
    textColor: "text-white",
    image: Security,
  },
]

export default function IPhoneSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const checkScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }, [])

  useEffect(() => {
    checkScrollButtons()
    const container = scrollContainerRef.current
    if (container) {
      const handleScroll = () => {
        requestAnimationFrame(checkScrollButtons)
      }
      container.addEventListener("scroll", handleScroll, { passive: true })
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [checkScrollButtons])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  const handleWheel = useCallback((e: WheelEvent) => {
    if (scrollContainerRef.current && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault()
      scrollContainerRef.current.scrollLeft += e.deltaX
    }
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      return () => container.removeEventListener("wheel", handleWheel)
    }
  }, [handleWheel])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      setIsDragging(true)
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
      setScrollLeft(scrollContainerRef.current.scrollLeft)
      scrollContainerRef.current.style.cursor = "grabbing"
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollContainerRef.current) return
      e.preventDefault()
      const x = e.pageX - scrollContainerRef.current.offsetLeft
      const walk = (x - startX) * 1.5
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab"
    }
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (scrollContainerRef.current) {
      setIsDragging(true)
      setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft)
      setScrollLeft(scrollContainerRef.current.scrollLeft)
    }
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !scrollContainerRef.current) return
      const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft
      const walk = (x - startX) * 1.2
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft],
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  return (
    <div className="w-full mt-12 px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto mb-8 pb-12 md:mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
          Get to know{' '}
          <span className="bg-gradient-to-r from-red-500 via-orange-500 via-yellow-400 via-green-400 via-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
            iPhone.
          </span>
        </h1>
      </div>

      <div className="relative w-full">
        <button
          onClick={() => scroll("left")}
          className={`cursor-pointer hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-200 hover:bg-white hover:scale-105 ${
            !canScrollLeft ? "opacity-40 cursor-not-allowed" : "hover:shadow-xl"
          }`}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={() => scroll("right")}
          className={`cursor-pointer hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-200 hover:bg-white hover:scale-105 ${
            !canScrollRight ? "opacity-40 cursor-not-allowed" : "hover:shadow-xl"
          }`}
          disabled={!canScrollRight}
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 cursor-grab select-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex-none w-4 md:w-6" />

          {slides.map((slide) => (
            <div
            key={slide.id}
            className={`flex-none w-80 md:w-96 h-[600px] md:h-[800px] rounded-3xl overflow-hidden relative group transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl will-change-transform ${slide.background}`}
            >
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 bg-center bg-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                backgroundImage: `url(${slide.image})`,
                }}
            />

            {/* Content Layer */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col h-full z-10">
                <div className="space-y-3 md:space-y-4 flex-none">
                <div className={`text-sm md:text-base font-medium opacity-80 ${slide.textColor}`}>
                    {slide.category}
                </div>
                <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold leading-tight ${slide.textColor}`}>
                    {slide.title}
                </h3>
                </div>

                <div className="mt-auto pt-6 flex items-center justify-between">
                <p className={`text-sm md:text-base opacity-80 max-w-xs ${slide.textColor} pr-4`}>
                    {slide.description}
                </p>
                <button
                    className={`flex-none w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 ease-out hover:bg-white/30 hover:scale-110 will-change-transform ${slide.textColor}`}
                >
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                </div>
            </div>

            {/* Optional hover overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none z-20" />
            </div>

          ))}

          <div className="flex-none w-4 md:w-6" />
        </div>
      </div>
    </div>
  )
}
