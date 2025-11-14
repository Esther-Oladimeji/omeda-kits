import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./pages/Hero";
import KidsPage from "./pages/KidsPage";
import ReadPage from "./pages/ReadPage";
import PlayPage from "./pages/PlayPage";
import KitPage from "./pages/KitPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/kids/read" element={<ReadPage />} />
        <Route path="/kids/play" element={<PlayPage />} />
        <Route path="/kids/kit" element={<KitPage />} />
      </Routes>
    </>
  );
}