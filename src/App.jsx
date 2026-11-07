import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ChinesePracticePage from "./pages/ChinesePracticePage";

// Components used for the initial launch:
import KitPage from "./pages/KitPage"; 


export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        
        {/* --- Launch Routes --- */}
        
        {/* SET 1: Landing page for omedaedu.org/ */}
        <Route path="/" element={<KitPage />} /> 

        {/* SET 2: Dedicated product page for omedaedu.org/storybox */}
        <Route path="/storybox" element={<KitPage />} />
        <Route path="/practice/chinese" element={<ChinesePracticePage />} />

      </Routes>
    </>
  );
}
