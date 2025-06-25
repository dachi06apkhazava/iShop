import { useEffect, useRef, useState } from "react"
import Airpod4 from '../assets/airpods4.png'
import Airpod4N from '../assets/podNoise.png'
import Pro2 from '../assets/pro2.png'
import Max from '../assets/max.png'

interface Product {
  id: string
  name: string
  subtitle?: string
  description: string
  price: string
  image: string
}

const products: Product[] = [
  {
    id: "airpods-4",
    name: "AirPods 4",
    description: "The next evolution of sound and comfort.",
    price: "$129",
    image: Airpod4,
  },
  {
    id: "airpods-4-anc",
    name: "AirPods 4",
    subtitle: "Active Noise Cancellation",
    description: "The next evolution of sound, comfort, and noise control.",
    price: "$179",
    image: Airpod4N,
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    description: "Pro-level Active Noise Cancellation and a breakthrough in hearing health.",
    price: "$249",
    image: Pro2,
  },
  {
    id: "airpods-max",
    name: "AirPods Max",
    description: "The ultimate over-ear listening experience.",
    price: "$549",
    image: Max,
  },
]

export default function AirPodsComparison() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`py-16 px-4 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Which AirPods are
            <br />
            right for you?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`bg-white rounded-2xl p-6 text-center transition-all duration-300 h-[540px] flex flex-col ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)", // subtle bottom shadow
              }}
            >
              <div className="mb-6 flex justify-center">
                <div className="w-48 h-48 flex items-center justify-center">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col flex-grow justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm font-medium text-gray-700 mb-2 min-h-[1.25rem]">
                      {product.subtitle || <span>&nbsp;</span>}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed h-[4.5rem] flex items-center justify-center">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4">
                  <p className="text-2xl font-semibold text-gray-900 mb-4">{product.price}</p>

                  <div className="space-y-3">
                    <a href="/store/airpods">
                      <button className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200">
                        Buy
                      </button>
                    </a>
                    <button className="w-full flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 group h-10">
                        <span className="cursor-pointer inline-block">Learn more</span>
                        <svg
                            className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
