import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import Navbar from "./components/navbar.tsx"
import Cart from "./components/cart.tsx"
import Footer from "./components/footer.tsx"

function Root() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <App
      />
      <Footer/>
    </>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
