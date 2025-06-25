import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import Navbar from "./components/navbar.tsx"
import Cart from "./components/cart.tsx"
import Footer from "./components/footer.tsx"
import { CartProvider } from "./context/cartContext.tsx"

function Root() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <CartProvider>
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <App />
        <Footer />
      </CartProvider>
    </>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
