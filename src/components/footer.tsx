import { useState } from "react"
import { ChevronDown } from "lucide-react"
import ApplePay from '../assets/Apple_Pay_logo.svg'
import Visa from '../assets/Visa_2021.svg'
import Mastercard from '../assets/Mastercard-logo.svg'
import Paypal from '../assets/PayPal_logo.svg'

const Footer = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({})

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const footerSections = [
    {
      title: "Shop",
      links: ["Mac", "iPad", "iPhone", "AirPods", "MacBook", "Accessories", "Gift Certificates"],
    },
    {
      title: "Services",
      links: ["Trade-in", "Warranty", "Delivery", "Support"],
    },
    {
      title: "About us",
      links: ["Find a Store", "Contact us", "Terms and Conditions of Use", "Confidentiality"],
    },
    {
      title: "For Clients",
      links: ["Loyalty Program", "Blog"],
    },
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="hidden md:grid md:grid-cols-5 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Apple Premium Partner</h3>
            <div className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg">
              <div className="w-6 h-6 rounded mr-2 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-5 fill-current text-gray-800">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              <div className="text-sm">
                <div className="font-medium">Premium</div>
                <div className="text-gray-600">Partner</div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden space-y-1">
          {footerSections.map((section, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <h3 className="font-semibold text-gray-900">{section.title}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openSections[section.title] ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSections[section.title] ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-3 pl-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 block">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="py-6">
            <h3 className="font-semibold text-gray-900 mb-4">Apple Premium Partner</h3>
            <div className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg">
              <div className="w-6 h-6 rounded mr-2 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-5 fill-current text-gray-800">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              <div className="text-sm">
                <div className="font-medium">Premium</div>
                <div className="text-gray-600">Partner</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-12">
            <img src={ApplePay} alt="Apple Pay" className="h-6" />
            <img src={Visa} alt="Visa" className="h-6" />
            <img src={Mastercard} alt="Mastercard" className="h-6" />
            <img src={Paypal} alt="PayPal" className="h-6" />
          </div>

          <p className="text-sm text-gray-500 text-center">
            © 2025 iShop Georgia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
