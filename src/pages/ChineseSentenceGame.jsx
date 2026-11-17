import { useEffect, useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ITEMS, PEOPLE, VERBS } from "./sentenceChapters";
import "@fontsource/fredoka/500.css";
import "@fontsource/fredoka/600.css";
import "@fontsource/fredoka/700.css";

// Level 1 sentence games — one rule for every chapter:
// read what your buddy says, tap the matching picture.

// Fredoka draws pinyin tone marks (ā ī ǒ è) cleanly.
const FONT = { fontFamily: '"Fredoka", system-ui, sans-serif' };

const CHEERS = ["duì le!", "hěn hǎo!", "tài bàng le!"];
const BURST = ["⭐", "🎉", "✨", "💛", "🌟"];

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function makeBurst() {
  return Array.from({ length: 14 }, () => ({
    x: (Math.random() - 0.5) * 280,
    y: -(Math.random() * 170 + 50),
    rotate: Math.random() * 360,
    emoji: randomItem(BURST),
  }));
}

function Portrait({ who, guide, className = "" }) {
  const person = who === "wo" ? { image: guide.image, color: guide.color, contain: true } : PEOPLE[who];
  return (
    <span className={`flex items-end justify-center overflow-hidden rounded-full border-4 border-white shadow-md ${className}`} style={{ backgroundColor: person.color }}>
      <img src={person.image} alt="" className={person.contain ? "h-[88%] w-[88%] object-contain object-bottom" : "h-full w-full object-cover object-top"} />
    </span>
  );
}

function Scene({ who, item, guide, eaten }) {
  return (
    <span className="relative inline-flex">
      <Portrait who={who} guide={guide} className="h-24 w-24 sm:h-32 sm:w-32" />
      <span className="absolute -bottom-1 -right-5 sm:-right-6">
        <AnimatePresence mode="wait">
          {eaten ? (
            <Motion.span key="yum" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} className="block text-5xl drop-shadow sm:text-6xl">😋</Motion.span>
          ) : (
            <Motion.span key="fruit" exit={{ scale: 0, rotate: 40 }} transition={{ duration: 0.25 }} className="block text-5xl drop-shadow sm:text-6xl">{ITEMS[item].emoji}</Motion.span>
          )}
        </AnimatePresence>
      </span>
    </span>
  );
}

function Plates({ eaten, total, current }) {
  return (
    <div className="flex flex-1 justify-center gap-1 sm:gap-1.5" aria-label={`${eaten.length} of ${total} done`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`flex h-7 w-7 items-center justify-center rounded-full text-base sm:h-8 sm:w-8 ${i < eaten.length ? "bg-white shadow-sm ring-2 ring-[#B8EAD9]" : i === current ? "border-2 border-dashed border-[#8BD2B9] bg-white" : "bg-[#EFEAE1]"}`}
        >
          {i < eaten.length ? (
            <Motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>{ITEMS[eaten[i]].emoji}</Motion.span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

function BigButton({ children, onClick, tone = "green" }) {
  const tones = {
    green: "bg-[#2BB673] text-white shadow-[0_6px_0_#1E8F59] active:translate-y-1 active:shadow-[0_2px_0_#1E8F59]",
    white: "bg-white text-[#1F2A2A] border-2 border-[#E8E3D9] shadow-[0_6px_0_#E8E3D9] active:translate-y-1 active:shadow-[0_2px_0_#E8E3D9]",
  };
  return (
    <button type="button" onClick={onClick} className={`min-h-14 rounded-full px-8 text-xl font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1F2A2A]/20 ${tones[tone]}`}>
      {children}
    </button>
  );
}

export default function ChineseSentenceGame({ chapter, guide, onExit, onNext }) {
  const [screen, setScreen] = useState("intro");
  const [rounds, setRounds] = useState([]);
  const [index, setIndex] = useState(0);
  const [wrong, setWrong] = useState([]);
  const [solved, setSolved] = useState(null);
  const [eaten, setEaten] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [burst, setBurst] = useState(null);
  const [shake, setShake] = useState(null);
  const [cheer, setCheer] = useState(CHEERS[0]);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const round = rounds[index];

  function start() {
    clearTimeout(timer.current);
    setRounds(chapter.rounds.map((item) => ({ ...item, options: shuffle(item.options) })));
    setIndex(0);
    setWrong([]);
    setSolved(null);
    setEaten([]);
    setMistakes(0);
    setStreak(0);
    setBurst(null);
    setScreen("play");
  }

  function choose(option) {
    const key = option.join("-");
    if (solved || wrong.includes(key)) return;

    if (option[0] === round.who && option[1] === round.item) {
      const nextStreak = streak + 1;
      setSolved(key);
      setStreak(nextStreak);
      setEaten((list) => [...list, round.item]);
      setCheer(nextStreak >= 3 ? `${nextStreak} in a row! 🔥` : randomItem(CHEERS));
      setBurst({ key, parts: makeBurst() });
      timer.current = setTimeout(() => {
        if (index + 1 >= rounds.length) {
          try {
            window.localStorage.setItem(`omeda-chinese-sentences-${chapter.id}`, "done");
          } catch {
            // Progress saving is optional.
          }
          setScreen("done");
          return;
        }
        setIndex(index + 1);
        setWrong([]);
        setSolved(null);
        setBurst(null);
      }, 1800);
    } else {
      setWrong((list) => [...list, key]);
      setMistakes((value) => value + 1);
      setStreak(0);
      setShake(`${key}-${mistakes + 1}`);
    }
  }

  // ---------------- Intro ----------------
  if (screen === "intro") {
    return (
      <section className="my-auto py-6 sm:py-10" style={FONT}>
        <div className="mx-auto max-w-xl rounded-[2.25rem] bg-gradient-to-b from-[#FFF4DD] to-white px-5 pb-8 pt-7 text-center shadow-sm ring-1 ring-[#F3E3C3] sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C27C0E]">Level 1 · Chapter {chapter.number}</p>
          <h1 className="mt-1 text-5xl font-bold leading-tight text-[#1F2A2A] sm:text-6xl">{chapter.title}</h1>
          <p className="text-xl font-semibold text-[#8B6422]">{chapter.subtitle}</p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Motion.span animate={{ rotate: [0, -6, 6, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}>
              <Portrait who="wo" guide={guide} className="h-24 w-24" />
            </Motion.span>
            <span className="relative flex flex-col gap-1 rounded-3xl bg-white px-5 py-3 text-left shadow-md">
              <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-white" />
              {chapter.verbs.map((verb, i) => (
                <span key={verb} className={i === 0 ? "text-2xl font-bold" : "text-lg font-semibold text-[#94A3B8]"}>
                  {VERBS[verb].py} = {VERBS[verb].emoji} <span className="text-base font-semibold text-[#94A3B8]">{VERBS[verb].en}</span>
                </span>
              ))}
            </span>
          </div>

          <p className="mt-7 text-lg font-semibold text-[#64748B]">{chapter.whoQuestion}</p>
          <div className="mt-3 flex justify-center gap-4 sm:gap-6">
            {["wo", "mama", "baba"].map((who) => (
              <span key={who} className="flex flex-col items-center gap-1">
                <Portrait who={who} guide={guide} className="h-20 w-20 sm:h-24 sm:w-24" />
                <span className="text-2xl font-bold">{PEOPLE[who].py}</span>
                {who === "wo" ? <span className="-mt-1 text-sm font-semibold text-[#64748B]">me, {guide.name}</span> : null}
              </span>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-center gap-3 rounded-3xl bg-white/80 px-4 py-3 text-lg font-semibold text-[#475569]">
            <span className="text-3xl" aria-hidden="true">👀</span> Read
            <span className="text-2xl text-[#C9BFAE]" aria-hidden="true">→</span>
            <span className="text-3xl" aria-hidden="true">👆</span> Tap the picture
          </div>

          <div className="mt-8">
            <BigButton onClick={start}>Let’s go! ▶</BigButton>
          </div>
        </div>
      </section>
    );
  }

  // ---------------- Done ----------------
  if (screen === "done") {
    const starCount = mistakes <= 1 ? 3 : mistakes <= 4 ? 2 : 1;
    return (
      <section className="my-auto py-6 sm:py-10" style={FONT}>
        <div className="mx-auto max-w-xl rounded-[2.25rem] bg-gradient-to-b from-[#E6F7EF] to-white px-5 pb-9 pt-8 text-center shadow-sm ring-1 ring-[#CDEBDD] sm:px-10">
          <h2 className="text-4xl font-bold sm:text-5xl">{chapter.doneTitle}</h2>
          <p className="mt-1 text-xl font-semibold text-[#0F766E]">{chapter.doneText}</p>

          <Motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -4 }}
            transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.2 }}
            className="relative mx-auto mt-7 flex h-48 w-48 items-center justify-center rounded-full border-[6px] border-dashed border-[#F4C24D] bg-[#FFF8E6] shadow-lg sm:h-56 sm:w-56"
          >
            {chapter.sticker.image ? (
              <img src={chapter.sticker.image} alt="" className="h-36 w-36 object-contain sm:h-44 sm:w-44" />
            ) : (
              <span className="grid grid-cols-2 gap-1 text-6xl sm:text-7xl" aria-hidden="true">{chapter.sticker.emojis.map((emoji) => <span key={emoji}>{emoji}</span>)}</span>
            )}
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#F4C24D] px-4 py-1 text-lg font-bold text-[#5B3B00] shadow">{chapter.sticker.label}</span>
          </Motion.div>

          <p className="mt-8 text-5xl tracking-wide" aria-label={`${starCount} of 3 stars`}>
            {[0, 1, 2].map((i) => (
              <Motion.span key={i} className="inline-block" initial={{ scale: 0 }} animate={{ scale: i < starCount ? 1 : 0.8 }} transition={{ delay: 0.6 + i * 0.25, type: "spring" }}>
                {i < starCount ? "⭐" : "☆"}
              </Motion.span>
            ))}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-1.5">
            {eaten.map((item, i) => <span key={i} className="text-2xl">{ITEMS[item].emoji}</span>)}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {onNext ? <BigButton onClick={onNext}>Next chapter ▶</BigButton> : null}
            <BigButton tone={onNext ? "white" : "green"} onClick={start}>Play again ↻</BigButton>
            <BigButton tone="white" onClick={onExit}>My path</BigButton>
          </div>
        </div>
      </section>
    );
  }

  // ---------------- Play ----------------
  return (
    <section className="py-3 sm:py-6" style={FONT}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <button type="button" onClick={onExit} aria-label="Stop playing" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl text-[#94A3B8] shadow-sm transition hover:text-[#1F2A2A]">✕</button>
          <Plates eaten={eaten} total={rounds.length} current={index} />
        </div>

        {/* Buddy says the sentence */}
        <div className="flex items-center gap-3 sm:gap-5">
          <Motion.span key={`buddy-${index}-${solved ? "yay" : "say"}`} initial={{ y: 0 }} animate={solved ? { y: [0, -16, 0, -8, 0] } : { y: 0 }} transition={{ duration: 0.7 }} className="shrink-0">
            <Portrait who="wo" guide={guide} className="h-20 w-20 sm:h-28 sm:w-28" />
          </Motion.span>
          <Motion.div
            key={`bubble-${index}`}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative flex-1 rounded-[1.75rem] bg-white px-5 py-4 shadow-md ring-1 ring-[#EEE7DC] sm:px-7 sm:py-5"
          >
            <span className="absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 rotate-45 bg-white ring-1 ring-[#EEE7DC] [clip-path:polygon(0_0,0_100%,100%_100%)]" />
            <p className="text-[2rem] font-bold leading-tight text-[#1F2A2A] sm:text-5xl">
              {PEOPLE[round.who].py} {VERBS[ITEMS[round.item].verb].py} {ITEMS[round.item].py}
            </p>
            <AnimatePresence>
              {solved ? (
                <Motion.p key="cheer" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-xl font-bold text-[#2BB673] sm:text-2xl">{cheer} ✨</Motion.p>
              ) : null}
            </AnimatePresence>
          </Motion.div>
        </div>

        <p className="mt-5 text-center text-lg font-semibold text-[#94A3B8]">👆 Tap the right picture</p>

        {/* Picture choices */}
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {round.options.map((option) => {
            const key = option.join("-");
            const isRight = solved === key;
            const isWrong = wrong.includes(key);
            const isShaking = shake?.startsWith(`${key}-`);
            return (
              <Motion.button
                key={`${index}-${key}-${isShaking ? shake : ""}`}
                type="button"
                onClick={() => choose(option)}
                disabled={Boolean(solved) || isWrong}
                initial={isShaking ? false : { opacity: 0, y: 16 }}
                animate={isShaking ? { x: [0, -12, 12, -8, 8, 0] } : isRight ? { scale: [1, 1.06, 1], opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: isShaking ? 0.4 : 0.35 }}
                className={`relative flex h-36 items-center justify-center rounded-[1.75rem] border-4 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1F2A2A]/20 sm:h-52 ${
                  isRight
                    ? "border-[#2BB673] bg-[#E6F7EF]"
                    : isWrong
                      ? "border-[#EEE7DC] bg-[#F6F3EE] opacity-50 grayscale"
                      : solved
                        ? "border-transparent bg-white opacity-40"
                        : "border-white bg-white shadow-md hover:-translate-y-1 hover:border-[#B8EAD9] hover:shadow-lg"
                }`}
              >
                <Scene who={option[0]} item={option[1]} guide={guide} eaten={isRight} />
                {isRight ? <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#2BB673] text-xl font-bold text-white">✓</span> : null}
                {isWrong ? <span className="absolute right-3 top-3 text-3xl">🙈</span> : null}
                {isRight && burst?.key === key ? (
                  <span className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
                    {burst.parts.map((part, i) => (
                      <Motion.span
                        key={i}
                        className="absolute text-2xl"
                        initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                        animate={{ x: part.x, y: part.y, opacity: 0, scale: 1.2, rotate: part.rotate }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                      >
                        {part.emoji}
                      </Motion.span>
                    ))}
                  </span>
                ) : null}
              </Motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {wrong.length > 0 && !solved ? (
            <Motion.p key={`try-${wrong.length}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 text-center text-xl font-bold text-[#C27C0E]">
              Oops! Read again 👀
            </Motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
