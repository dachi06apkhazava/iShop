import "./globals.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing"
import Store from "./pages/store"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/store/:category" element={<Store />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
