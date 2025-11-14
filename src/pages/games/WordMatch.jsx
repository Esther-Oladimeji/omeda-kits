import { useState, useEffect } from "react";

export default function WordMatch() {
  // LEVEL DATA (only Pinyin)
  const levels = [
    [
      { en: "Hello", zh: "nǐ hǎo" },
      { en: "Thank you", zh: "xiè xiè" },
      { en: "Goodbye", zh: "zài jiàn" },
      { en: "Yes", zh: "shì" },
      { en: "No", zh: "bú shì" },
    ],
    [
      { en: "Rice", zh: "mǐ fàn" },
      { en: "Water", zh: "shuǐ" },
      { en: "Soup", zh: "tāng" },
      { en: "Fish", zh: "yú" },
      { en: "Tea", zh: "chá" },
    ],
    [
      { en: "Red", zh: "hóng sè" },
      { en: "Blue", zh: "lán sè" },
      { en: "Yellow", zh: "huáng sè" },
      { en: "Green", zh: "lǜ sè" },
      { en: "Black", zh: "hēi sè" },
    ],
    [
      { en: "Teacher", zh: "lǎo shī" },
      { en: "Student", zh: "xué shēng" },
      { en: "Book", zh: "shū" },
      { en: "Pen", zh: "bǐ" },
      { en: "School", zh: "xué xiào" },
    ],
    [
      { en: "Family", zh: "jiā tíng" },
      { en: "Friend", zh: "péng yǒu" },
      { en: "Love", zh: "ài" },
      { en: "Happy", zh: "kuài lè" },
      { en: "Thankful", zh: "gǎn ēn" },
    ],
  ];

  const [level, setLevel] = useState(0);
  const [matches, setMatches] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [wrong, setWrong] = useState(false);

  const currentWords = levels[level];
  const [shuffledEnglish, setShuffledEnglish] = useState([]);
  const [shuffledChinese, setShuffledChinese] = useState([]);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  useEffect(() => {
    setShuffledEnglish(shuffleArray(currentWords.map((w) => w.en)));
    setShuffledChinese(shuffleArray(currentWords.map((w) => w.zh)));
    setMatches([]);
    setScore(0);
    setCompleted(false);
  }, [level]);

  const handleSelect = (type, word) => {
    if (!selected) {
      setSelected({ type, word });
    } else if (selected.type !== type) {
      const correctPair = currentWords.find(
        (w) =>
          (w.en === word && w.zh === selected.word) ||
          (w.zh === word && w.en === selected.word)
      );

      if (correctPair) {
        setMatches([...matches, correctPair.en]);
        setScore((prev) => prev + 1);
        setSelected(null);
        if (matches.length + 1 === currentWords.length) {
          setCompleted(true);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 1500);
        }
      } else {
        setWrong(true);
        setTimeout(() => setWrong(false), 400);
        setSelected(null);
      }
    }
  };

  const handleNextLevel = () => {
    if (level < levels.length - 1) {
      setLevel(level + 1);
    } else {
      alert("🏅 You’ve finished all levels! Amazing!");
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center justify-center text-[#333] font-[Poppins]">
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <span
              key={i}
              className="absolute animate-float-slow text-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: ["#ffd580", "#d6f5d6", "#a5d8ff", "#ffb3c1"][i % 4],
              }}
            >
              ✨
            </span>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <p className="font-semibold bg-[#fff5db] px-4 py-1 rounded-full inline-block shadow-sm text-[#333]">
          Level {level + 1} 🥢 | Score: {score}/{currentWords.length}
        </p>
      </div>

      {/* Game Board */}
      <div
        className={`bg-white rounded-2xl shadow-xl border border-[#ffd580] p-6 w-full max-w-4xl grid grid-cols-2 gap-6 transition ${
          wrong ? "animate-shake" : ""
        }`}
      >
        {/* English */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-[#444]">🇬🇧 English</h3>
          <div className="space-y-3">
            {shuffledEnglish.map((en) => (
              <button
                key={en}
                onClick={() => handleSelect("en", en)}
                disabled={matches.includes(en)}
                className={`w-full py-3 rounded-xl font-semibold border transition-all ${
                  matches.includes(en)
                    ? "bg-[#d6f5d6] border-[#8fd48f]"
                    : selected?.word === en
                    ? "bg-[#fff0d4] border-[#ffd580]"
                    : "bg-[#fffaf1] border-[#ffe3a3] hover:scale-105"
                }`}
              >
                {en}
              </button>
            ))}
          </div>
        </div>

        {/* Chinese (Pinyin) */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-[#444]">🇨🇳 Pinyin</h3>
          <div className="space-y-3">
            {shuffledChinese.map((zh) => (
              <button
                key={zh}
                onClick={() => handleSelect("zh", zh)}
                disabled={matches.some((en) =>
                  currentWords.find((w) => w.en === en && w.zh === zh)
                )}
                className={`w-full py-3 rounded-xl font-semibold border transition-all ${
                  matches.some((en) =>
                    currentWords.find((w) => w.en === en && w.zh === zh)
                  )
                    ? "bg-[#d6f5d6] border-[#8fd48f]"
                    : selected?.word === zh
                    ? "bg-[#fff0d4] border-[#ffd580]"
                    : "bg-[#fffaf1] border-[#ffe3a3] hover:scale-105"
                }`}
              >
                {zh}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Completion */}
      {completed && (
        <div className="text-center mt-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-[#444] mb-3">
            🎉 Great job! You finished Level {level + 1}!
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => setLevel(0)}
              className="bg-white border border-[#ffd580] text-[#333] px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              🔁 Play Again
            </button>
            <button
              onClick={handleNextLevel}
              className="bg-[#ffd580] text-[#333] px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
              ▶️ Next Level
            </button>
          </div>
        </div>
      )}
    </section>
  );
}