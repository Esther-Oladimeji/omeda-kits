import { useState } from "react";

export default function FoodQuiz() {
  const questions = [
    {
      question: "🍚 Which of these means Rice?",
      options: ["面条 (miàn tiáo)", "米饭 (mǐ fàn)", "鸡蛋 (jī dàn)", "包子 (bāo zi)"],
      answer: "米饭 (mǐ fàn)",
    },
    {
      question: "🍜 Which means Noodles?",
      options: ["面条 (miàn tiáo)", "鱼 (yú)", "汤 (tāng)", "水 (shuǐ)"],
      answer: "面条 (miàn tiáo)",
    },
    {
      question: "🍵 Which means Tea?",
      options: ["饭 (fàn)", "汤 (tāng)", "茶 (chá)", "肉 (ròu)"],
      answer: "茶 (chá)",
    },
    {
      question: "🍗 Which means Chicken?",
      options: ["鸡肉 (jī ròu)", "鱼 (yú)", "水 (shuǐ)", "米饭 (mǐ fàn)"],
      answer: "鸡肉 (jī ròu)",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Wrong!");
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setFeedback("");
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  return (
    <section className="text-center bg-gradient-to-b from-[#fef6e4] via-[#fff8ef] to-[#ffeacb] rounded-3xl shadow-lg border border-[#ffd580] p-6">
      <h2 className="text-2xl font-bold mb-4">🍜 Food Quiz</h2>

      {!finished ? (
        <>
          <p className="text-[#444] font-semibold mb-6">{questions[current].question}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {questions[current].options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="bg-white border border-[#ffd580] rounded-xl px-4 py-3 hover:bg-[#fff3d9] transition active:scale-95"
              >
                {opt}
              </button>
            ))}
          </div>

          {feedback && (
            <p
              className={`font-semibold ${
                feedback.includes("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {feedback}
            </p>
          )}
        </>
      ) : (
        <div className="mt-6">
          <h3 className="text-xl font-bold text-[#444] mb-2">🎉 You’re done!</h3>
          <p className="text-[#555]">Final Score: {score}/{questions.length}</p>
        </div>
      )}
    </section>
  );
}