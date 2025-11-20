import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Components used for the initial launch:
import KitPage from "./pages/KitPage"; 

// Components currently unnecessary for the single-page launch:
// import Hero from "./pages/Hero";
// import KidsPage from "./pages/KidsPage";
// import ReadPage from "./pages/ReadPage";
// import PlayPage from "./pages/PlayPage"; 

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

        {/* --- Future/Unnecessary Routes (Commented Out) --- */}
        
        {/* <Route path="/kids" element={<KidsPage />} /> */}
        {/* <Route path="/kids/read" element={<ReadPage />} /> */}
        {/* <Route path="/kids/play" element={<PlayPage />} /> */}
        {/* <Route path="/kids/kit" element={<KitPage />} /> // Old path replaced by /storybox */}
        
      </Routes>
    </>
  );
}