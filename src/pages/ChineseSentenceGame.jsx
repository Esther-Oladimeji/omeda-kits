import { useEffect, useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ITEMS, NUMBERS, PEOPLE, TIMES, VERBS } from "./sentenceChapters";

// Chinese sentence games — one rule for every chapter:
// read what your buddy says, tap the matching picture.

// Andika is made for early readers and has every pinyin tone mark (ā ǎ ī ǐ ǖ …).
const FONT = { fontFamily: '"Andika", system-ui, sans-serif' };

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
  const source = who === "wo" ? guide : who === "friend" ? guide.friend : null;
  const person = source ? { image: source.image, color: source.color, contain: true } : PEOPLE[who];
  return (
    <span className={`flex items-end justify-center overflow-hidden rounded-full border-4 border-white shadow-md ${className}`} style={{ backgroundColor: person.color }}>
      <img src={person.image} alt="" className={person.contain ? "h-[88%] w-[88%] object-contain object-bottom" : "h-full w-full object-cover object-top"} />
    </span>
  );
}

function Scene({ who, item, guide, eaten, verb: verbId }) {
  const verb = VERBS[verbId ?? ITEMS[item].verb];
  const content = (
    <AnimatePresence mode="wait">
      {eaten ? (
        <Motion.span key="yum" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} className={`block drop-shadow ${verb.thought ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl"}`}>{verb.reaction}</Motion.span>
      ) : (
        <Motion.span
          key="item"
          exit={{ scale: 0, rotate: 40 }}
          animate={verb.live ? { rotate: [-12, 12, -12], y: [0, -4, 0] } : undefined}
          transition={verb.live ? { repeat: Infinity, duration: 0.9 } : { duration: 0.25 }}
          className={`block drop-shadow ${verb.thought ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl"}`}
        >
          {ITEMS[item].emoji}
        </Motion.span>
      )}
    </AnimatePresence>
  );
  return (
    <span className="relative inline-flex">
      <Portrait who={who} guide={guide} className="h-24 w-24 sm:h-32 sm:w-32" />
      {verb.thought ? (
        // "want": the thing appears in a thought bubble above the person's head.
        <span className="absolute -right-12 -top-4 sm:-right-14">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-[#E8E3D9] sm:h-20 sm:w-20">{content}</span>
          <span className="absolute -bottom-2 left-1 h-3.5 w-3.5 rounded-full bg-white shadow ring-2 ring-[#E8E3D9]" />
          <span className="absolute -bottom-5 -left-1.5 h-2 w-2 rounded-full bg-white shadow ring-2 ring-[#E8E3D9]" />
        </span>
      ) : (
        <span className="absolute -bottom-1 -right-5 sm:-right-6">{content}</span>
      )}
    </span>
  );
}

// zhège / nàge: near = held right on the person (big). far = pointing 👉 along dots to a small thing.
function DistanceScene({ who, item, where, guide, done }) {
  if (where === "near") {
    return (
      <span className="flex w-full items-center justify-start px-5 sm:justify-center sm:px-3">
        <span className="relative inline-flex">
          <Portrait who={who} guide={guide} className="h-24 w-24 sm:h-28 sm:w-28" />
          <span className="absolute -bottom-2 -right-8">
            <AnimatePresence mode="wait">
              {done ? (
                <Motion.span key="yay" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} className="block text-6xl">🥰</Motion.span>
              ) : (
                <Motion.span key="item" exit={{ scale: 0 }} className="block text-6xl drop-shadow sm:text-7xl">{ITEMS[item].emoji}</Motion.span>
              )}
            </AnimatePresence>
          </span>
        </span>
      </span>
    );
  }
  return (
    <span className="flex w-full items-center px-5 sm:px-3">
      <Portrait who={who} guide={guide} className="h-20 w-20 shrink-0" />
      <span className="-ml-1 shrink-0 text-3xl" aria-hidden="true">👉</span>
      <span className="mx-2 flex-1 border-b-[6px] border-dotted border-[#C9BFAE]" />
      <AnimatePresence mode="wait">
        {done ? (
          <Motion.span key="yay" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} className="block shrink-0 text-4xl">🥰</Motion.span>
        ) : (
          <Motion.span key="item" exit={{ scale: 0 }} className="block shrink-0 text-2xl opacity-90">{ITEMS[item].emoji}</Motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// zài + place: a big place with the person standing in front of it.
function PlaceScene({ who, item, guide, done }) {
  return (
    <span className="relative inline-flex h-28 w-40 items-center justify-start sm:h-32 sm:w-44">
      <span className="text-7xl sm:text-8xl" aria-hidden="true">{ITEMS[item].emoji}</span>
      <Motion.span animate={done ? { y: [0, -12, 0] } : { y: 0 }} transition={{ duration: 0.5 }} className="absolute bottom-0 right-0">
        <Portrait who={who} guide={guide} className="h-16 w-16 sm:h-20 sm:w-20" />
      </Motion.span>
      {done ? <Motion.span initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} className="absolute -top-2 right-3 text-3xl">📍</Motion.span> : null}
    </span>
  );
}

// Yesterday / today / tomorrow: three circles, always in the same order, one lit with a sun.
const DAYS = ["zuotian", "jintian", "mingtian"];

function TimeDots({ when, size = "md" }) {
  const dot = size === "lg" ? "h-9 w-9 text-lg" : size === "sm" ? "h-6 w-6 text-xs" : "h-7 w-7 text-sm sm:h-8 sm:w-8";
  return (
    <span className="flex items-center gap-1.5" aria-label={TIMES[when].py}>
      {DAYS.map((day) => (
        <span key={day} className={`flex items-center justify-center rounded-full ${dot} ${day === when ? "bg-[#FFD54F] ring-2 ring-[#F4C24D]" : "bg-[#EFEAE1]"}`}>
          {day === when ? "☀️" : ""}
        </span>
      ))}
    </span>
  );
}

// Time words and "le" share one yellow box, so kids see that zuótiān brings le with it.
function TimePill({ children }) {
  return <span className="whitespace-nowrap rounded-xl bg-[#FFF1C2] px-2 text-[#B7791F]">{children}</span>;
}

// Plain sentence text, e.g. for "Which one?" buttons.
function plainSentence(round, who, item, count) {
  const verb = VERBS[round.verb ?? ITEMS[item].verb];
  const inner = verb.inner ? VERBS[ITEMS[item].verb].py : "";
  return [verb.prefix, PEOPLE[who].py, verb.py, inner, count ? `${NUMBERS[count]} ge` : "", ITEMS[item].py, verb.suffix].filter(Boolean).join(" ");
}

// Counting: the person with 2–5 of the thing in a row.
function CountScene({ who, item, count, guide, done }) {
  return (
    <span className="flex items-center gap-3 px-3">
      <Motion.span animate={done ? { y: [0, -12, 0] } : { y: 0 }} transition={{ duration: 0.5 }} className="shrink-0">
        <Portrait who={who} guide={guide} className="h-16 w-16 sm:h-20 sm:w-20" />
      </Motion.span>
      <span className="grid grid-cols-3 gap-1 text-3xl sm:text-4xl" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <Motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.06 }}>{ITEMS[item].emoji}</Motion.span>
        ))}
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
          className={`flex h-6 w-6 items-center justify-center rounded-full text-sm sm:h-8 sm:w-8 sm:text-base ${i < eaten.length ? "bg-white shadow-sm ring-2 ring-[#B8EAD9]" : i === current ? "border-2 border-dashed border-[#8BD2B9] bg-white" : "bg-[#EFEAE1]"}`}
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

export default function ChineseSentenceGame({ chapter, guide: buddy, friend, onExit, onNext }) {
  const guide = { ...buddy, friend: friend ?? buddy };
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
  const roundVerb = round ? VERBS[round.verb ?? ITEMS[round.item].verb] : null;
  const innerVerb = round && roundVerb.inner ? VERBS[ITEMS[round.item].verb].py : "";

  function start() {
    clearTimeout(timer.current);
    setRounds(chapter.rounds.map((item) => ({ ...item, options: item.options ? shuffle(item.options) : undefined, places: item.places ? shuffle(item.places) : undefined, choices: item.choices ? shuffle(item.choices) : undefined })));
    setIndex(0);
    setWrong([]);
    setSolved(null);
    setEaten([]);
    setMistakes(0);
    setStreak(0);
    setBurst(null);
    setShake(null);
    setScreen("play");
  }

  function choose(option) {
    const key = option.join("-");
    answer(key, option[0] === round.who && option[1] === round.item && option[2] === (round.where ?? round.when ?? round.count));
  }

  // ✅/❌ rounds: does the picture match the sentence?
  function judge(saysYes) {
    const matches = round.show[0] === round.who && round.show[1] === round.item && round.show[2] === round.count;
    answer(saysYes ? "yes" : "no", saysYes === matches);
  }

  function answer(key, correct) {
    if (solved || wrong.includes(key)) return;

    if (correct) {
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
        setShake(null);
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
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C27C0E]">Chapter {chapter.number}</p>
          <h1 className="mt-1 text-5xl font-bold leading-tight text-[#1F2A2A] sm:text-6xl">{chapter.title}</h1>
          <p className="text-xl font-semibold text-[#8B6422]">{chapter.subtitle}</p>

          {chapter.verb || chapter.time || chapter.distance || chapter.counting ? (
          <div className="mt-6 flex items-center justify-center gap-4">
            <Motion.span animate={{ rotate: [0, -6, 6, 0] }} transition={{ repeat: Infinity, duration: 2.4 }} className={chapter.distance || chapter.time || chapter.counting ? "hidden sm:block" : ""}>
              <Portrait who="wo" guide={guide} className="h-24 w-24" />
            </Motion.span>
            {chapter.counting ? (
              // One idea only: counting says èr, two things say liǎng ge.
              <span className="flex w-full max-w-xs flex-col gap-2 rounded-3xl bg-white p-3 shadow-md">
                <span className="flex items-center justify-between rounded-2xl px-4 py-2 text-[#94A3B8]">
                  <span className="text-3xl" aria-hidden="true">🔢</span>
                  <span className="text-2xl font-bold">yī èr sān</span>
                </span>
                <span className="flex items-center justify-between rounded-2xl bg-[#FFF1C2] px-4 py-3 ring-4 ring-[#F4C24D]">
                  <span className="text-4xl" aria-hidden="true">🍎🍎</span>
                  <span className="text-4xl font-bold text-[#B7791F]">liǎng ge</span>
                </span>
              </span>
            ) : chapter.time ? (
              <span className="relative flex gap-2 rounded-3xl bg-white p-3 shadow-md sm:gap-4 sm:p-4">
                <span className="absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 bg-white sm:block" />
                {DAYS.map((day) => (
                  <span key={day} className="flex flex-col items-center gap-1.5 rounded-2xl bg-[#FAF7F0] px-2 py-3">
                    <TimeDots when={day} size="sm" />
                    <span className="text-xl font-bold">{TIMES[day].py}</span>
                    {TIMES[day].le ? <span className="text-lg font-bold"><TimePill>+ le</TimePill></span> : <span className="h-7" />}
                  </span>
                ))}
              </span>
            ) : chapter.distance ? (
              <span className="relative flex flex-col gap-2 rounded-3xl bg-white px-4 py-3 text-left shadow-md sm:px-5">
                <span className="absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 bg-white sm:block" />
                <span className="flex items-center gap-3">
                  <span className="w-[5.5rem] text-3xl font-bold">zhège</span>
                  <span className="flex w-24 items-center text-4xl" aria-hidden="true">🍎</span>
                  <span className="rounded-full bg-[#E6F7EF] px-3 py-0.5 text-lg font-bold text-[#0F766E]">close</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="w-[5.5rem] text-3xl font-bold">nàge</span>
                  <span className="flex w-24 items-center text-2xl" aria-hidden="true">👉<span className="mx-1 flex-1 border-b-[5px] border-dotted border-[#C9BFAE]" /><span className="text-base">🍎</span></span>
                  <span className="rounded-full bg-[#FFF1DC] px-3 py-0.5 text-lg font-bold text-[#C27C0E]">far</span>
                </span>
              </span>
            ) : (
              <span className="relative rounded-3xl bg-white px-5 py-3 text-3xl font-bold shadow-md">
                <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-white" />
                {VERBS[chapter.verb].py} = {VERBS[chapter.verb].emoji}
              </span>
            )}
          </div>
          ) : null}

          {chapter.newWords ? (
            <div className="mt-7">
              <p className="text-lg font-semibold text-[#C27C0E]">✨ New words ✨</p>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                {chapter.newWords.map((id, i) => (
                  <Motion.span
                    key={id}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.08, type: "spring" }}
                    className="flex flex-col items-center rounded-2xl bg-white px-1 py-3 shadow-sm ring-1 ring-[#F3E3C3]"
                  >
                    <span className="text-4xl sm:text-5xl" aria-hidden="true">{ITEMS[id].emoji}</span>
                    <span className="mt-1 text-lg font-bold leading-tight sm:text-xl">{ITEMS[id].py}</span>
                    <span className="text-xs font-semibold text-[#94A3B8] sm:text-sm">{ITEMS[id].en}</span>
                  </Motion.span>
                ))}
              </div>
            </div>
          ) : null}

          {chapter.hideWho ? null : <p className="mt-7 text-lg font-semibold text-[#64748B]">{chapter.whoQuestion}</p>}
          {chapter.hideWho ? null : (
          <div className="mt-3 flex justify-center gap-4 sm:gap-6">
            {["wo", "mama", "baba"].map((who) => (
              <span key={who} className="flex flex-col items-center gap-1">
                <Portrait who={who} guide={guide} className="h-20 w-20 sm:h-24 sm:w-24" />
                <span className="text-2xl font-bold">{PEOPLE[who].py}</span>
                {who === "wo" ? <span className="-mt-1 text-sm font-semibold text-[#64748B]">me, {guide.name}</span> : null}
              </span>
            ))}
          </div>
          )}

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

        {round.ask ? (
          // Question and answer: shénme in the question becomes the thing in the answer (same purple).
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Portrait who="wo" guide={guide} className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" />
              <Motion.div key={`q-${index}`} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-[1.5rem] bg-white px-4 py-3 shadow-md ring-1 ring-[#EEE7DC] sm:px-6">
                <p className="text-[1.75rem] font-bold leading-tight sm:text-4xl">
                  {round.who === "friend" ? "nǐ" : PEOPLE[round.who].py} {VERBS[round.verb ?? ITEMS[round.item].verb].py} <span className="whitespace-nowrap rounded-xl bg-[#EDE7FF] px-2 text-[#6D4AFF]">shénme ?</span>
                </p>
              </Motion.div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Motion.div key={`a-${index}`} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }} className="rounded-[1.5rem] bg-[#F3FBF7] px-4 py-3 shadow-md ring-1 ring-[#CDEBDD] sm:px-6">
                <p className="text-[1.75rem] font-bold leading-tight sm:text-4xl">
                  {round.who === "friend" ? "wǒ" : PEOPLE[round.who].py} {VERBS[round.verb ?? ITEMS[round.item].verb].py} <span className="whitespace-nowrap rounded-xl bg-[#EDE7FF] px-2 text-[#6D4AFF]">{ITEMS[round.item].py}</span>
                </p>
                <AnimatePresence>
                  {solved ? (
                    <Motion.p key="cheer" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-xl font-bold text-[#2BB673] sm:text-2xl">{cheer} ✨</Motion.p>
                  ) : null}
                </AnimatePresence>
              </Motion.div>
              <Motion.span key={`friend-${index}-${solved ? "yay" : "say"}`} animate={solved ? { y: [0, -16, 0, -8, 0] } : { y: 0 }} transition={{ duration: 0.7 }} className="shrink-0">
                <Portrait who="friend" guide={guide} className="h-16 w-16 sm:h-20 sm:w-20" />
              </Motion.span>
            </div>
          </div>
        ) : (
          <>
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
              {round.pick ? "🤔" : (
                <>
                  {roundVerb.prefix ? `${roundVerb.prefix} ` : ""}
                  {round.when ? <><TimePill>{TIMES[round.when].py}</TimePill>{" "}</> : null}
                  {PEOPLE[round.who].py} {roundVerb.py}{round.when && TIMES[round.when].le ? <>{" "}<TimePill>le</TimePill></> : null} {innerVerb ? `${innerVerb} ` : ""}{round.count ? (
                    <>
                      {round.numgap ? (
                        <span className={`inline-block min-w-[4.5rem] rounded-xl border-4 border-dashed px-2 text-center ${solved ? "border-[#2BB673] bg-[#E6F7EF] text-[#0F766E]" : "border-[#C9BFAE] text-transparent"}`}>{solved ? NUMBERS[round.count] : "?"}</span>
                      ) : (
                        <span className="whitespace-nowrap rounded-xl bg-[#FFF1C2] px-2 text-[#B7791F] ring-2 ring-[#F4C24D]">{NUMBERS[round.count]}</span>
                      )}
                      {" ge "}
                    </>
                  ) : null}{round.where ? (round.where === "near" ? "zhège " : "nàge ") : ""}{round.gap ? (
                    <span className={`inline-block min-w-[4.5rem] rounded-xl border-4 border-dashed px-2 text-center ${solved ? "border-[#2BB673] bg-[#E6F7EF] text-[#0F766E]" : "border-[#C9BFAE] text-transparent"}`}>{solved ? ITEMS[round.item].py : "?"}</span>
                  ) : ITEMS[round.item].py}
                  {roundVerb.suffix ? ` ${roundVerb.suffix}` : ""}
                </>
              )}
            </p>
            <AnimatePresence>
              {solved ? (
                <Motion.p key="cheer" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-xl font-bold text-[#2BB673] sm:text-2xl">{cheer} ✨</Motion.p>
              ) : null}
            </AnimatePresence>
          </Motion.div>
        </div>
          </>
        )}

        <p className="mt-5 text-center text-lg font-semibold text-[#94A3B8]">{round.gap || round.numgap ? "🧩 Fill the gap" : round.pick ? "👆 Which one?" : round.map ? "📍 Tap the place" : round.tf ? "✅ or ❌ ?" : "👆 Tap the right picture"}</p>

        {round.map ? (
          // Town map: tap the place, and the person drops into it.
          <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4">
            {round.places.map((place) => {
              const isRight = solved === place;
              const isWrong = wrong.includes(place);
              const isShaking = shake?.startsWith(`${place}-`);
              return (
                <Motion.button
                  key={`${index}-${place}-${isShaking ? shake : ""}`}
                  type="button"
                  onClick={() => answer(place, place === round.item)}
                  disabled={Boolean(solved) || isWrong}
                  initial={isShaking ? false : { opacity: 0, scale: 0.9 }}
                  animate={isShaking ? { x: [0, -12, 12, -8, 8, 0] } : { opacity: 1, scale: 1 }}
                  transition={{ duration: isShaking ? 0.4 : 0.3 }}
                  className={`relative flex h-32 items-center justify-center rounded-[1.75rem] border-4 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1F2A2A]/20 sm:h-44 ${
                    isRight
                      ? "border-[#2BB673] bg-[#E6F7EF]"
                      : isWrong
                        ? "border-[#EEE7DC] bg-[#F6F3EE] opacity-50 grayscale"
                        : solved
                          ? "border-transparent bg-white opacity-40"
                          : "border-white bg-white shadow-md hover:-translate-y-1 hover:border-[#B8EAD9] hover:shadow-lg"
                  }`}
                >
                  <span className="text-6xl sm:text-7xl" aria-hidden="true">{ITEMS[place].emoji}</span>
                  {isRight ? (
                    <Motion.span initial={{ y: -90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }} className="absolute bottom-2 right-2">
                      <Portrait who={round.who} guide={guide} className="h-14 w-14 sm:h-16 sm:w-16" />
                    </Motion.span>
                  ) : null}
                  {isWrong ? <span className="absolute right-2 top-2 text-2xl">🙈</span> : null}
                  {isRight && burst?.key === place ? (
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
        ) : round.numgap ? (
          // liǎng or èr? Two things are always liǎng ge.
          <div className="mt-3 flex flex-col items-center gap-5">
            <Motion.div
              key={`numgap-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={solved ? { scale: [1, 1.05, 1], opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              className={`relative flex h-40 w-full max-w-md items-center justify-center rounded-[1.75rem] border-4 shadow-md sm:h-52 ${solved ? "border-[#2BB673] bg-[#E6F7EF]" : "border-white bg-white"}`}
            >
              <CountScene who={round.who} item={round.item} count={round.count} guide={guide} done={Boolean(solved)} />
              {solved && burst ? (
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
            </Motion.div>
            <div className="flex justify-center gap-4">
              {round.choices.map((choice) => {
                const isRight = solved === choice;
                const isWrong = wrong.includes(choice);
                const isShaking = shake?.startsWith(`${choice}-`);
                return (
                  <Motion.button
                    key={`${index}-${choice}-${isShaking ? shake : ""}`}
                    type="button"
                    onClick={() => answer(choice, choice === "liang")}
                    disabled={Boolean(solved) || isWrong}
                    animate={isShaking ? { x: [0, -12, 12, -8, 8, 0] } : undefined}
                    transition={{ duration: 0.4 }}
                    className={`min-h-20 min-w-[8rem] rounded-[1.75rem] border-4 px-6 text-4xl font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1F2A2A]/20 ${
                      isRight
                        ? "border-[#2BB673] bg-[#E6F7EF] text-[#0F766E]"
                        : isWrong
                          ? "border-[#EEE7DC] bg-[#F6F3EE] text-[#94A3B8] line-through"
                          : solved
                            ? "border-transparent bg-white opacity-40"
                            : "border-white bg-white shadow-md hover:-translate-y-0.5 hover:border-[#B8EAD9]"
                    }`}
                  >
                    {choice === "liang" ? "liǎng" : "èr"}
                  </Motion.button>
                );
              })}
            </div>
          </div>
        ) : round.gap ? (
          // Fill the gap: picture + sentence with a gap, tap the missing word.
          <div className="mt-3 flex flex-col items-center gap-5">
            <Motion.div
              key={`gap-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={solved ? { scale: [1, 1.05, 1], opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              className={`relative flex h-40 w-full max-w-md items-center justify-center rounded-[1.75rem] border-4 shadow-md sm:h-52 ${solved ? "border-[#2BB673] bg-[#E6F7EF]" : "border-white bg-white"}`}
            >
              {round.count ? <CountScene who={round.who} item={round.item} count={round.count} guide={guide} done={Boolean(solved)} /> : <Scene who={round.who} item={round.item} guide={guide} eaten={Boolean(solved)} verb={round.verb} />}
              {solved && burst ? (
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
            </Motion.div>
            <div className="flex flex-wrap justify-center gap-3">
              {round.choices.map((choice) => {
                const isRight = solved === choice;
                const isWrong = wrong.includes(choice);
                const isShaking = shake?.startsWith(`${choice}-`);
                return (
                  <Motion.button
                    key={`${index}-${choice}-${isShaking ? shake : ""}`}
                    type="button"
                    onClick={() => answer(choice, choice === round.item)}
                    disabled={Boolean(solved) || isWrong}
                    animate={isShaking ? { x: [0, -12, 12, -8, 8, 0] } : undefined}
                    transition={{ duration: 0.4 }}
                    className={`min-h-16 min-w-[6.5rem] rounded-[1.5rem] border-4 px-5 text-2xl font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1F2A2A]/20 sm:text-3xl ${
                      isRight
                        ? "border-[#2BB673] bg-[#E6F7EF] text-[#0F766E]"
                        : isWrong
                          ? "border-[#EEE7DC] bg-[#F6F3EE] text-[#94A3B8] line-through"
                          : solved
                            ? "border-transparent bg-white opacity-40"
                            : "border-white bg-white shadow-md hover:-translate-y-0.5 hover:border-[#B8EAD9]"
                    }`}
                  >
                    {ITEMS[choice].py}
                  </Motion.button>
                );
              })}
            </div>
          </div>
        ) : round.pick ? (
          // Which sentence? One picture, two sentences.
          <div className="mt-3 flex flex-col items-center gap-4">
            <Motion.div
              key={`pick-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={solved ? { scale: [1, 1.05, 1], opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              className={`relative flex h-40 w-full max-w-md items-center justify-center rounded-[1.75rem] border-4 shadow-md sm:h-52 ${solved ? "border-[#2BB673] bg-[#E6F7EF]" : "border-white bg-white"}`}
            >
              {round.count ? <CountScene who={round.who} item={round.item} count={round.count} guide={guide} done={Boolean(solved)} /> : <Scene who={round.who} item={round.item} guide={guide} eaten={Boolean(solved)} verb={round.verb} />}
              {solved && burst ? (
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
            </Motion.div>
            <div className="flex w-full max-w-md flex-col gap-3">
              {round.options.map((option) => {
                const key = option.join("-");
                const isRight = solved === key;
                const isWrong = wrong.includes(key);
                const isShaking = shake?.startsWith(`${key}-`);
                return (
                  <Motion.button
                    key={`${index}-${key}-${isShaking ? shake : ""}`}
                    type="button"
                    onClick={() => answer(key, option[0] === round.who && option[1] === round.item)}
                    disabled={Boolean(solved) || isWrong}
                    animate={isShaking ? { x: [0, -12, 12, -8, 8, 0] } : undefined}
                    transition={{ duration: 0.4 }}
                    className={`min-h-16 rounded-[1.5rem] border-4 px-4 py-3 text-2xl font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1F2A2A]/20 sm:text-3xl ${
                      isRight
                        ? "border-[#2BB673] bg-[#E6F7EF] text-[#0F766E]"
                        : isWrong
                          ? "border-[#EEE7DC] bg-[#F6F3EE] text-[#94A3B8] line-through"
                          : solved
                            ? "border-transparent bg-white opacity-40"
                            : "border-white bg-white shadow-md hover:-translate-y-0.5 hover:border-[#B8EAD9]"
                    }`}
                  >
                    {plainSentence(round, option[0], option[1], option[2])}
                  </Motion.button>
                );
              })}
            </div>
          </div>
        ) : round.tf ? (
          // ✅/❌ round: one picture, two big buttons.
          <div className="mt-3 flex flex-col items-center gap-6">
            <Motion.div
              key={`tf-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={solved ? { scale: [1, 1.05, 1], opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              className={`relative flex h-44 w-full max-w-md items-center justify-center rounded-[1.75rem] border-4 shadow-md sm:h-56 ${solved ? "border-[#2BB673] bg-[#E6F7EF]" : "border-white bg-white"}`}
            >
              {round.show[2] ? <CountScene who={round.show[0]} item={round.show[1]} count={round.show[2]} guide={guide} /> : chapter.place ? <PlaceScene who={round.show[0]} item={round.show[1]} guide={guide} /> : <Scene who={round.show[0]} item={round.show[1]} guide={guide} eaten={false} verb={round.verb} />}
              {solved && burst ? (
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
            </Motion.div>
            <div className="flex gap-8">
              {[
                { key: "yes", label: "✓", yes: true, color: "#2BB673", shadow: "#1E8F59" },
                { key: "no", label: "✗", yes: false, color: "#E5484D", shadow: "#B4282D" },
              ].map((button) => {
                const isWrong = wrong.includes(button.key);
                const isShaking = shake?.startsWith(`${button.key}-`);
                const isRight = solved === button.key;
                return (
                  <Motion.button
                    key={`${index}-${button.key}-${isShaking ? shake : ""}`}
                    type="button"
                    aria-label={button.yes ? "Right" : "Wrong"}
                    onClick={() => judge(button.yes)}
                    disabled={Boolean(solved) || isWrong}
                    animate={isShaking ? { x: [0, -12, 12, -8, 8, 0] } : isRight ? { scale: [1, 1.2, 1] } : undefined}
                    transition={{ duration: 0.4 }}
                    className={`flex h-24 w-24 items-center justify-center rounded-full text-5xl font-bold text-white transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1F2A2A]/20 active:translate-y-1 ${isWrong ? "opacity-30 grayscale" : solved && !isRight ? "opacity-30" : ""}`}
                    style={{ backgroundColor: button.color, boxShadow: `0 6px 0 ${button.shadow}` }}
                  >
                    {button.label}
                  </Motion.button>
                );
              })}
            </div>
          </div>
        ) : (
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
                className={`relative flex ${round.when ? "h-44 sm:h-60" : "h-36 sm:h-52"} items-center justify-center rounded-[1.75rem] border-4 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1F2A2A]/20 ${
                  isRight
                    ? "border-[#2BB673] bg-[#E6F7EF]"
                    : isWrong
                      ? "border-[#EEE7DC] bg-[#F6F3EE] opacity-50 grayscale"
                      : solved
                        ? "border-transparent bg-white opacity-40"
                        : "border-white bg-white shadow-md hover:-translate-y-1 hover:border-[#B8EAD9] hover:shadow-lg"
                }`}
              >
                {round.where ? (
                  <DistanceScene who={option[0]} item={option[1]} where={option[2]} guide={guide} done={isRight} />
                ) : round.when ? (
                  <span className="flex flex-col items-center gap-3">
                    <TimeDots when={option[2]} />
                    <Scene who={option[0]} item={option[1]} guide={guide} eaten={isRight} verb={round.verb} />
                  </span>
                ) : round.count ? (
                  <CountScene who={option[0]} item={option[1]} count={option[2]} guide={guide} done={isRight} />
                ) : chapter.place ? (
                  <PlaceScene who={option[0]} item={option[1]} guide={guide} done={isRight} />
                ) : (
                  <Scene who={option[0]} item={option[1]} guide={guide} eaten={isRight} verb={round.verb} />
                )}
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
        )}

        <AnimatePresence>
          {wrong.length > 0 && !solved ? (
            <Motion.p key={`try-${wrong.length}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 text-center text-xl font-bold text-[#C27C0E]">
              {round.numgap && wrong.includes("er") ? `${ITEMS[round.item].emoji}${ITEMS[round.item].emoji} = liǎng ge!` : "Oops! Read again 👀"}
            </Motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
