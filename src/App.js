import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import CargoPage from './pages/CargoPage/CargoPage';
import HomePage from './pages/HomePage/HomePage';
import MarketPage from './pages/MarketPage/MarketPage';
import PredictPage from './pages/PredictPage/PredictPage';
function App() {
  const pageVariants = {
    in: {
      opacity: 1,
      // x: 0,
      // rotate: "0deg",
      transform: "perspective(100px) translateZ(0px)",
      transition: {
        duration: 0.7
      }

    },
    out: {
      opacity: 0.3,
      // x: "-100%",
      // rotate: "200deg",
      transform: "perspective(100px) translateZ(-10px)",
      transition: {
        duration: 0.7
      }
    },
    exit: {
      transform: "perspective(100px) translateZ(20px)",
      opacity: 0,
      transition: {
        duration: 0.7
      }
    }
  }

  const pageTransition = {
    type: "spring",
    stiffness: 100
  }
  const location = useLocation()
  return (
      <div className="container">
        <div className="grid-container">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage variants={pageVariants} transition={pageTransition} />} />
              <Route path="/predict" element={<PredictPage variants={pageVariants} transition={pageTransition} />} />
              <Route path="/market" element={<MarketPage variants={pageVariants} transition={pageTransition} />} />
              <Route path="/cargo" element={<CargoPage variants={pageVariants} transition={pageTransition} />} />
              <Route path="/aboutus" element={<AboutUsPage variants={pageVariants} transition={pageTransition} />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
  );
}

export default App;
