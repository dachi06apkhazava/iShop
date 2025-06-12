import React from "react"

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/40 md:hidden"
        onClick={onClose}
      ></div>
      <div
        className={`absolute right-0 top-0 h-full w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-black/10">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          <p>No items in cart.</p>
        </div>
      </div>
    </div>
  )
}

export default Cart
