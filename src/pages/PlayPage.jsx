import { useState } from "react";
import WordMatch from "./games/WordMatch";
import ColorMatch from "./games/ColorMatch";
import FoodQuiz from "./games/FoodQuiz";
import GameCard from "./games/GameCard";

export default function PlayPage() {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    {
      id: "word",
      icon: "🀄",
      title: "Word Match",
      desc: "Match English words with their Chinese meanings.",
      component: WordMatch,
    },
    {
      id: "color",
      icon: "🎨",
      title: "Color Match",
      desc: "Learn Chinese colors by pairing names and hues.",
      component: ColorMatch,
    },
    {
      id: "food",
      icon: "🍜",
      title: "Food Quiz",
      desc: "Guess Chinese food names and dishes.",
      component: FoodQuiz,
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#b7e3ff] via-[#fff8ef] to-[#ffeacb] px-6 py-12 font-[Poppins] text-[#333] flex flex-col items-center relative overflow-hidden">
      {/* Floating clouds */}
      <div className="absolute inset-0 bg-[url('/img/clouds-bg.svg')] bg-cover bg-center opacity-20 animate-[float_30s_linear_infinite]" />

      {/* Page header */}
      <div className="text-center mb-10 relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-[#2b3a55] drop-shadow-sm">
          🌈 Play & Explore
        </h1>
        <p className="text-base md:text-lg text-[#555]">
          Choose a challenge and have fun learning!
        </p>
      </div>

      {/* Main area */}
      <div className="relative z-10 w-full max-w-5xl">
        {!activeGame ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {games.map((game) => (
              <GameCard
                key={game.id}
                icon={game.icon}
                title={game.title}
                desc={game.desc}
                onClick={() => setActiveGame(game)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white/90 rounded-3xl shadow-lg border border-[#ffd580] p-6 w-full backdrop-blur-sm relative">
            <button
              onClick={() => setActiveGame(null)}
              className="absolute top-4 left-4 text-[#444] hover:text-[#222] transition text-sm md:text-base"
            >
              ← Back to Game List
            </button>

            <h2 className="text-xl md:text-2xl font-bold text-[#2b3a55] mb-6 text-center">
              {activeGame.title}
            </h2>

            <div key={activeGame.id} className="mt-8">
              <activeGame.component />
            </div>
          </div>
        )}
      </div>

      <footer className="mt-16 text-center text-[#555] text-sm relative z-10">
        Keep exploring and having fun! 🌟
      </footer>
    </section>
  );
}