import { useState, useEffect } from "react";

export default function ReadPage() {
  const [activeLesson, setActiveLesson] = useState(null);
  const [unlocked, setUnlocked] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const lessons = [
    { id: 1, title: "Lesson 1: Hello! 👋", desc: "Learn basic greetings in Chinese.", thumb: "https://placehold.co/600x400?text=Hello", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 2, title: "Lesson 2: Numbers 🔢", desc: "Count from one to ten.", thumb: "https://placehold.co/600x400?text=Numbers", video: "https://www.w3schools.com/html/movie.mp4" },
    { id: 3, title: "Lesson 3: Food 🍜", desc: "Talk about your favorite meals.", thumb: "https://placehold.co/600x400?text=Food", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 4, title: "Lesson 4: Colors 🎨", desc: "Say colors in Chinese.", thumb: "https://placehold.co/600x400?text=Colors", video: "https://www.w3schools.com/html/movie.mp4" },
    { id: 5, title: "Lesson 5: Goodbye 👋", desc: "Say goodbye politely.", thumb: "https://placehold.co/600x400?text=Goodbye", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  ];

  useEffect(() => {
    // lock body scroll when modal open
    document.body.style.overflow = activeLesson ? "hidden" : "auto";
  }, [activeLesson]);

  const handlePlay = (lesson) => {
    if (lesson.id <= unlocked) setActiveLesson(lesson);
  };

  const handleCloseModal = () => {
    setActiveLesson(null);
  };

  const handleLessonComplete = (lessonId) => {
    if (lessonId === unlocked && lessonId < lessons.length) {
      setUnlocked(lessonId + 1);
      setShowConfetti(true);
      setToastMsg(`🎉 Great job! You unlocked Lesson ${lessonId + 1}.`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const progressPercent = ((unlocked - 1) / lessons.length) * 100;

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#d8ecff] via-[#fff8ef] to-[#fff2de] px-6 py-12 font-[Poppins] text-[#333] flex flex-col items-center relative overflow-hidden">
      
      {/* Progress Tracker */}
      <div className="w-full max-w-2xl mb-8 text-center animate-fadeIn">
        <p className="text-sm md:text-base font-semibold text-[#555] mb-2">
          Lesson {unlocked} of {lessons.length}
        </p>
        <div className="w-full h-3 bg-white/80 border border-[#ffd580] rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#ffd580] to-[#ffcb6b] transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-10 animate-fadeIn">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-sm">
          📖 Read & Learn
        </h1>
        <p className="text-base md:text-lg text-[#555]">
          Watch fun lessons and follow Sade & Walee’s Chinese adventures!
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className={`p-5 rounded-2xl shadow-lg border transform transition-all duration-700 ${
              lesson.id <= unlocked
                ? "bg-white hover:-translate-y-2 border-[#ffd580]"
                : "bg-[#f5f5f5] opacity-70 border-[#ddd]"
            } animate-slideUp`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="aspect-video bg-[#ddd] rounded-xl overflow-hidden mb-4 relative">
              {lesson.id <= unlocked ? (
                <>
                  <img
                    src={lesson.thumb}
                    alt={lesson.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handlePlay(lesson)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition"
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl text-[#ffb200] shadow-lg">
                      ▶
                    </div>
                  </button>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-[#777] text-lg">
                  🔒 Locked
                </div>
              )}
            </div>
            <h3 className="text-lg font-bold mb-1">{lesson.title}</h3>
            <p className="text-sm text-[#666] mb-3">{lesson.desc}</p>
            <button
              onClick={() => handlePlay(lesson)}
              disabled={lesson.id > unlocked}
              className={`w-full py-2 rounded-lg font-semibold shadow transition ${
                lesson.id <= unlocked
                  ? "bg-[#ffd580] text-[#333] hover:scale-105"
                  : "bg-[#ddd] text-[#888] cursor-not-allowed"
              }`}
            >
              {lesson.id <= unlocked ? "Start Lesson" : "Locked"}
            </button>
          </div>
        ))}
      </div>

      {/* Modal Player */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-[90%] md:w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 z-50 bg-white/80 backdrop-blur-md text-gray-700 font-bold rounded-full w-9 h-9 flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              ×
            </button>

            <video
              className="w-full rounded-t-2xl"
              src={activeLesson.video}
              controls
              autoPlay
              onEnded={() => handleLessonComplete(activeLesson.id)}
            />

            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{activeLesson.title}</h3>
              <p className="text-sm text-[#666]">{activeLesson.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Confetti + Toast */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40 flex justify-center items-center text-4xl animate-bounce">
          🎉🎊✨
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#fff8e6] text-[#333] px-6 py-3 rounded-full shadow-lg border border-[#ffd580] animate-fadeIn">
          {toastMsg}
        </div>
      )}

      {/* Footer encouragement */}
      <div className="mt-12 text-center text-[#555] text-sm">
        Keep learning! 🌟 You’re doing amazing.
      </div>
    </section>
  );
}
