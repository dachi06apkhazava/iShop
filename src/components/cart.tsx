import React from "react"
import { useCart } from "../context/cartContext"
import { Trash2 } from "lucide-react"
import { useEffect } from "react"

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useCart()
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [isOpen])

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <div
        className={`absolute right-0 top-0 h-full w-full md:w-[400px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="flex justify-between items-center px-6 py-4 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-lg shadow-sm bg-white"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover shadow-sm"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    ${item.price}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm font-medium"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 transition"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="px-6 py-4 shadow-inner space-y-3">
            <div className="flex justify-between text-lg font-medium text-gray-800">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              onClick={() => alert("Checkout not implemented yet")}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
