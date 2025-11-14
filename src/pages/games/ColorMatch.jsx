import { useState, useEffect } from "react";

export default function ColorMatch() {
  const colorWords = [
    { zh: "红色", pinyin: "hóng sè", color: "#ff4d4d", en: "Red" },
    { zh: "蓝色", pinyin: "lán sè", color: "#4da6ff", en: "Blue" },
    { zh: "黄色", pinyin: "huáng sè", color: "#ffeb3b", en: "Yellow" },
    { zh: "绿色", pinyin: "lǜ sè", color: "#4caf50", en: "Green" },
    { zh: "黑色", pinyin: "hēi sè", color: "#333333", en: "Black" },
  ];

  const [target, setTarget] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    nextColor();
  }, []);

  const nextColor = () => {
    const random = colorWords[Math.floor(Math.random() * colorWords.length)];
    setTarget(random);
    setFeedback("");
  };

  const handleSelect = (choice) => {
    if (choice.color === target.color) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
      setTimeout(() => nextColor(), 1000);
    } else {
      setFeedback("❌ Try again!");
    }
  };

  return (
    <section className="text-center bg-gradient-to-b from-[#d8ecff] via-[#fff8ef] to-[#fff2de] rounded-3xl shadow-lg border border-[#ffd580] p-6">
      <h2 className="text-2xl font-bold mb-4">🎨 Color Match</h2>
      <p className="text-[#555] mb-6">
        Tap the color that matches: <span className="font-semibold">{target?.zh}</span> ({target?.pinyin})
      </p>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 justify-items-center mb-6">
        {colorWords.map((c) => (
          <button
            key={c.color}
            onClick={() => handleSelect(c)}
            className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-4 border-white shadow-lg hover:scale-110 active:scale-95 transition"
            style={{ backgroundColor: c.color }}
          />
        ))}
      </div>

      {feedback && (
        <div
          className={`text-lg font-semibold mt-3 ${
            feedback.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {feedback}
        </div>
      )}

      <div className="mt-6 text-sm text-[#444]">Score: {score}</div>
    </section>
  );
}