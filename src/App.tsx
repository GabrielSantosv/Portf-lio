import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import SiteBackground from "./components/SiteBackground";
import SmoothScroll from "./components/motion/SmoothScroll";
import Cursor from "./components/motion/Cursor";
import ProgressBar from "./components/motion/ProgressBar";
import NoiseOverlay from "./components/motion/NoiseOverlay";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

const supportsViewTransitions = typeof document !== "undefined" && "startViewTransition" in document;

function AnimatedRoutes() {
  const location = useLocation();

  const routes = (
    <Routes location={location}>
      <Route path="/" element={<HomePage />} />
      <Route path="/projetos/:slug" element={<ProjectDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

  if (supportsViewTransitions) return routes;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {routes}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen" style={{ overflowX: "clip" }}>
        <a href="#main" className="skip-link">
          Pular para o conteúdo
        </a>
        <SiteBackground />
        <NoiseOverlay />
        <Cursor />
        <ProgressBar />
        <Navbar />
        <main id="main">
          <AnimatedRoutes />
        </main>
      </div>
    </SmoothScroll>
  );
}
