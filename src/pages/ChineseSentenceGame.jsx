import { useEffect, useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, ArrowDown, Sun, Clock3 } from "lucide-react";
import { ITEMS, NUMBERS, PEOPLE, TIMES, VERBS } from "./sentenceChapters";

// Chinese sentence games — one rule for every chapter:
// read what your buddy says, tap the matching picture.

// Andika is made for early readers and has every pinyin tone mark (ā ǎ ī ǐ ǖ …).
const FONT = { fontFamily: '"Andika", system-ui, sans-serif' };

const CHEERS = ["duì le!", "hěn hǎo!", "tài bàng le!"];
const ANSWER_TINTS = ["bg-[#FFF8E8]", "bg-[#EAF7F2]", "bg-[#F0F4FB]", "bg-[#FFF0E8]"];
const CONFETTI_COLORS = ["#2BB673", "#F4C24D", "#F5A66A", "#A7D9C6", "#E9B5C8"];
const CONFETTI_SHAPES = ["dot", "dash", "spark"];
const FRUIT_SPRITE_SHEET = "/games/fruit/fruit-sprites.png";

function SuccessBadge({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M24 1.5 28 8l7.5-2-2 7.5 6.5 4-7.5 2-1 7.5-5-6-6 5-.5-7.5-7-3.5 6.5-4.5L18 3l6 4.5z" fill="#F4C24D" />
      <circle cx="24" cy="27" r="17" fill="#E6F7EF" stroke="#2BB673" strokeWidth="3" />
      <path d="m16.5 27 5 5 10-11" fill="none" stroke="#1E8F59" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      <circle cx="42" cy="34" r="2.5" fill="#F4C24D" />
    </svg>
  );
}

function StarShape({ filled }) {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
      <path d="m24 3 6.2 12.6 13.9 2-10 9.8 2.4 13.8L24 34.7 11.5 41.2l2.4-13.8-10-9.8 13.9-2z" fill={filled ? "#F4C24D" : "#F1EEE7"} stroke={filled ? "#D9A92D" : "#D8D3C8"} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

function ItemArt({ itemId, className = "" }) {
  const item = ITEMS[itemId];
  if (itemId === "clock") return <Clock3 className={`h-[1em] w-[1em] ${className}`} strokeWidth={2} aria-hidden="true" />;
  if (!item?.image) return <span className={className}>{item?.py ?? ""}</span>;
  const image = item.image;
  if (image.src) {
    return (
      <span className={`inline-flex h-[1em] w-[1em] shrink-0 items-center justify-center align-middle ${className}`} aria-hidden="true">
        <img src={image.src} alt="" draggable="false" className="h-full w-full object-contain object-bottom" />
      </span>
    );
  }
  const columns = image.cols ?? 3;
  const rows = image.rows ?? 2;

  return (
    <span className={`relative inline-block h-[1em] w-[1em] shrink-0 overflow-hidden align-middle ${className}`} aria-hidden="true">
      <img
        src={image.sheet ?? FRUIT_SPRITE_SHEET}
        alt=""
        draggable="false"
        className="absolute max-w-none"
        style={{ width: `${columns * 100}%`, height: `${rows * 100}%`, left: `-${image.col * 100}%`, top: `-${image.row * 100}%` }}
      />
    </span>
  );
}

function WordTiles({ words }) {
  if (!words?.length) return null;
  const columns = words.length <= 3 ? "grid-cols-3" : words.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3";
  return (
    <div className={`mt-4 grid ${columns} gap-2`}>
      <div className="col-span-full flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7F2] px-3 py-1 text-sm font-bold text-[#0F766E]">
          Look &amp; say
          <Motion.span
            aria-hidden="true"
            animate={{ y: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex items-center justify-center text-[#0F766E]"
          >
            <ArrowDown size={16} strokeWidth={2.5} />
          </Motion.span>
        </span>
      </div>
      {words.map((id, index) => (
        <Motion.div
          key={id}
          initial={{ y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.045, type: "spring", stiffness: 220, damping: 18 }}
          className="flex min-w-0 flex-col items-center rounded-2xl bg-white/90 px-1.5 py-2 shadow-sm ring-1 ring-[#EEE7DC]"
        >
          <span className="flex h-12 w-full items-center justify-center text-4xl sm:h-14 sm:text-5xl"><ItemArt itemId={id} /></span>
          <span className="mt-1 w-full truncate text-center text-sm font-bold text-[#1F2A2A] sm:text-base">{ITEMS[id].py}</span>
          <span className="w-full truncate text-center text-[0.68rem] font-medium text-[#64748B] sm:text-xs">{ITEMS[id].en}</span>
        </Motion.div>
      ))}
    </div>
  );
}

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
    color: randomItem(CONFETTI_COLORS),
    shape: randomItem(CONFETTI_SHAPES),
  }));
}

function Confetti({ parts }) {
  return (
    <span className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
      {parts.map((part, i) => (
        <Motion.span
          key={i}
          className="absolute"
          style={{
            width: part.shape === "dash" ? 7 : 10,
            height: part.shape === "dash" ? 13 : 10,
            borderRadius: part.shape === "dot" ? "9999px" : "2px",
            backgroundColor: part.color,
            clipPath: part.shape === "spark" ? "polygon(50% 0%, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0% 50%, 38% 38%)" : undefined,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
          animate={{ x: part.x, y: part.y, opacity: 0, scale: 1.2, rotate: part.rotate }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      ))}
    </span>
  );
}

function RoundInstruction({ round, guide, stepKey }) {
  const instruction = round.greeting === "reply"
    ? { label: "Say hello back!" }
    : round.greeting === "ask"
      ? { label: "Ask: “What’s your name?”" }
      : round.greeting === "answer"
        ? { label: "Tell them your name!" }
        : round.greeting === "speak"
          ? { label: "Your turn—say your name!" }
          : round.clock === "read"
    ? { label: "Read the clock. Say the time." }
    : round.clock === "set"
      ? { label: "Set the clock to match." }
      : round.clock === "talk"
        ? { label: "Say the answer. Then choose it." }
        : round.gap || round.numgap
    ? { label: "Fill the missing word" }
    : round.pick
      ? { label: "Choose the matching sentence" }
      : round.map
        ? { label: "Find the place" }
        : round.tf
          ? { label: "Does the picture match?" }
          : { label: "Read the sentence above. Tap the matching picture." };
  return (
    <Motion.div
      key={stepKey}
      initial={{ y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="mx-auto mt-5 flex w-full items-center gap-3 rounded-3xl border-2 border-[#F2D89A] bg-[#FFF5D9] px-4 py-3.5 text-left text-base font-bold text-[#654D19] shadow-[0_4px_0_#F2D89A] sm:gap-4 sm:px-5 sm:py-4 sm:text-lg"
    >
      <Motion.span
        aria-hidden="true"
        initial={{ x: -8, scale: 0.8, rotate: -7 }}
        animate={{ x: 0, scale: [0.8, 1.08, 1], rotate: [-7, 3, 0] }}
        transition={{ type: "spring", stiffness: 340, damping: 18 }}
        className="shrink-0"
      >
        <Portrait who="friend" guide={guide} className="h-12 w-12 border-[3px] border-white shadow-sm sm:h-14 sm:w-14" />
      </Motion.span>
      <span className="min-w-0 leading-snug">{instruction.label}</span>
    </Motion.div>
  );
}

function TryAgainMark() {
  return <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF1E8] text-xl font-bold leading-none text-[#C45D47]" aria-label="Try again">×</span>;
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
        <Motion.span key="yay" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} className={`block drop-shadow ${verb.thought ? "h-12 w-12 sm:h-14 sm:w-14" : "h-16 w-16 sm:h-20 sm:w-20"}`}><SuccessBadge className="h-full w-full" /></Motion.span>
      ) : (
        <Motion.span
          key="item"
          exit={{ scale: 0, rotate: 40 }}
          animate={verb.live ? { rotate: [-12, 12, -12], y: [0, -4, 0] } : undefined}
          transition={verb.live ? { repeat: Infinity, duration: 0.9 } : { duration: 0.25 }}
          className={`block drop-shadow ${verb.thought ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl"}`}
        >
          <ItemArt itemId={item} />
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

// zhège / nàge: near = held right on the person (big). far = farther away.
function DistanceScene({ who, item, where, guide, done }) {
  if (where === "near") {
    return (
      <span className="flex w-full items-center justify-start px-5 sm:justify-center sm:px-3">
        <span className="relative inline-flex">
          <Portrait who={who} guide={guide} className="h-24 w-24 sm:h-28 sm:w-28" />
          <span className="absolute -bottom-2 -right-8">
            <AnimatePresence mode="wait">
              {done ? (
                <Motion.span key="yay" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} className="block h-16 w-16"><SuccessBadge className="h-full w-full" /></Motion.span>
              ) : (
                <Motion.span key="item" exit={{ scale: 0 }} className="block text-6xl drop-shadow sm:text-7xl"><ItemArt itemId={item} /></Motion.span>
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
      <span className="-ml-1 shrink-0 text-[#7A9F8E]" aria-hidden="true"><ArrowRight size={26} strokeWidth={2.5} /></span>
      <span className="mx-2 flex-1 border-b-[6px] border-dotted border-[#C9BFAE]" />
      <AnimatePresence mode="wait">
        {done ? (
          <Motion.span key="yay" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} className="block h-12 w-12 shrink-0"><SuccessBadge className="h-full w-full" /></Motion.span>
        ) : (
          <Motion.span key="item" exit={{ scale: 0 }} className="block shrink-0 text-2xl opacity-90"><ItemArt itemId={item} /></Motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// zài + place: a big place with the person standing in front of it.
function PlaceScene({ who, item, guide, done }) {
  return (
    <span className="relative inline-flex h-28 w-40 items-center justify-start sm:h-32 sm:w-44">
      <span className="text-7xl sm:text-8xl" aria-hidden="true"><ItemArt itemId={item} /></span>
      <Motion.span animate={done ? { y: [0, -12, 0] } : { y: 0 }} transition={{ duration: 0.5 }} className="absolute bottom-0 right-0">
        <Portrait who={who} guide={guide} className="h-16 w-16 sm:h-20 sm:w-20" />
      </Motion.span>
      {done ? <Motion.span initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} className="absolute -top-2 right-3 text-[#2BB673]"><MapPin size={28} fill="#E6F7EF" /></Motion.span> : null}
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
          {day === when ? <Sun size={size === "lg" ? 18 : 14} strokeWidth={2.5} className="text-[#B7791F]" /> : null}
        </span>
      ))}
    </span>
  );
}

// Time words and "le" share one yellow box, so kids see that zuótiān brings le with it.
function TimePill({ children }) {
  return <span className="whitespace-nowrap rounded-xl bg-[#FFF1C2] px-2 text-[#B7791F]">{children}</span>;
}

const CLOCK_NUMBERS = {
  1: "yī", 2: "liǎng", 3: "sān", 4: "sì", 5: "wǔ", 6: "liù",
  7: "qī", 8: "bā", 9: "jiǔ", 10: "shí", 11: "shíyī", 12: "shí'èr",
};

function clockAnswer(hour) {
  return `Xiànzài ${CLOCK_NUMBERS[hour]} diǎn.`;
}

function ClockFace({ hour, interactive = false, selectedHour = null, onPick, disabled = [], className = "" }) {
  const shownHour = selectedHour ?? (interactive ? null : hour);
  const hourHand = shownHour === null ? null : ((shownHour % 12) * 30) - 90;
  const handPoint = (angle, length) => ({
    x: 120 + Math.cos((angle * Math.PI) / 180) * length,
    y: 120 + Math.sin((angle * Math.PI) / 180) * length,
  });
  const hourTip = hourHand === null ? null : handPoint(hourHand, 47);
  const minuteTip = handPoint(-90, 67);

  return (
    <div className={`relative h-64 w-64 max-w-full shrink-0 ${className}`} aria-label={hour ? `Clock showing ${hour} o'clock` : "Clock"}>
      <svg viewBox="0 0 240 240" className="h-full w-full" role="img" aria-hidden="true">
        <circle cx="120" cy="120" r="108" fill="#FFF9EA" stroke="#E8BD67" strokeWidth="8" />
        <circle cx="120" cy="120" r="91" fill="#FFFFFF" stroke="#F3E7CC" strokeWidth="2" />
        {Array.from({ length: 12 }, (_, index) => {
          const number = index + 1;
          const point = handPoint(number * 30 - 90, 73);
          return !interactive ? <text key={number} x={point.x} y={point.y + 7} textAnchor="middle" fontSize="20" fontWeight="700" fill="#56615D">{number}</text> : null;
        })}
        <line x1="120" y1="120" x2={minuteTip.x} y2={minuteTip.y} stroke="#228C79" strokeWidth="8" strokeLinecap="round" />
        {hourTip ? <Motion.line x1="120" y1="120" animate={{ x2: hourTip.x, y2: hourTip.y }} transition={{ type: "spring", stiffness: 160, damping: 18 }} stroke="#E9775E" strokeWidth="12" strokeLinecap="round" /> : null}
        <circle cx="120" cy="120" r="10" fill="#E5AD3D" stroke="#FFFFFF" strokeWidth="3" />
      </svg>
      {interactive ? Array.from({ length: 12 }, (_, index) => {
        const number = index + 1;
        const point = handPoint(number * 30 - 90, 88);
        const isWrong = disabled.includes(String(number));
        const isSelected = selectedHour === number;
        return (
          <button
            key={number}
            type="button"
            aria-label={`${number} o'clock`}
            onClick={() => onPick(number)}
            disabled={isWrong}
            className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm font-extrabold shadow-sm ring-2 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1F2A2A]/30 ${isSelected && isWrong ? "bg-[#FCE9E2] text-[#A84F3A] ring-[#E6B5A5]" : isSelected ? "bg-[#2BB673] text-white ring-white" : isWrong ? "bg-[#EEEAE1] text-[#9AA39E] ring-white opacity-50" : "bg-white text-[#34564C] ring-[#DCECE4] hover:scale-110 hover:bg-[#EAF7F2]"}`}
            style={{ left: `${(point.x / 240) * 100}%`, top: `${(point.y / 240) * 100}%` }}
          >
            {number}
          </button>
        );
      }) : null}
    </div>
  );
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
          <Motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.06 }}><ItemArt itemId={item} /></Motion.span>
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
            <Motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-base"><ItemArt itemId={eaten[i]} /></Motion.span>
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
  const [clockSelection, setClockSelection] = useState(null);
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
    setClockSelection(null);
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
      setCheer(nextStreak >= 3 ? `${nextStreak} in a row!` : randomItem(CHEERS));
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
        setClockSelection(null);
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
    const showWhoPreview = !chapter.hideWho && !chapter.distance && !chapter.newWords?.length;

    if (chapter.id === "ch1") {
      const people = [
        { who: "wo", label: "me", tint: "#EAF7F2" },
        { who: "mama", label: "Mum", tint: "#FFF4E3" },
        { who: "baba", label: "Dad", tint: "#EAF2F7" },
      ];

      return (
        <section className="my-auto py-5 sm:py-8" style={FONT}>
          <div className="mx-auto max-w-xl rounded-[2.25rem] bg-gradient-to-b from-[#FFF8E8] to-white px-5 pb-7 pt-6 text-center shadow-sm ring-1 ring-[#F3E3C3] sm:px-10">
            <Motion.h1 initial={{ y: 10 }} animate={{ y: 0 }} className="text-4xl font-bold leading-tight text-[#1F2A2A] sm:text-6xl">{chapter.title}</Motion.h1>
            <p className="mt-1 text-xl font-semibold text-[#8B6422]">{chapter.subtitle}</p>

            <Motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.12, type: "spring", stiffness: 220, damping: 18 }}
              className="mx-auto mt-5 flex max-w-sm items-center justify-center gap-5 rounded-[1.75rem] bg-[#EAF7F2] px-6 py-3 ring-1 ring-[#D7EFE5]"
            >
              <div className="text-left">
                <p className="text-3xl font-bold text-[#0F766E]">chī</p>
                <p className="text-sm font-semibold text-[#64748B]">eat</p>
              </div>
              <span className="h-12 w-px bg-[#CDEBDD]" aria-hidden="true" />
              <Motion.span
                animate={{ y: [0, -5, 0], rotate: [0, -4, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
                className="text-7xl leading-none"
              >
                <ItemArt itemId="pingguo" />
              </Motion.span>
            </Motion.div>

            <p className="mt-6 text-lg font-semibold text-[#64748B]">Who is eating?</p>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
              {people.map(({ who, label, tint }, index) => (
                <Motion.div
                  key={who}
                  initial={{ y: 12 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2 + index * 0.08, type: "spring", stiffness: 220, damping: 18 }}
                  className="flex flex-col items-center rounded-2xl px-2 py-3 ring-1 ring-[#EEE7DC]"
                  style={{ backgroundColor: tint }}
                >
                  <Portrait who={who} guide={guide} className="h-20 w-20 sm:h-24 sm:w-24" />
                  <span className="mt-2 text-xl font-bold text-[#1F2A2A]">{PEOPLE[who].py}</span>
                  <span className="text-sm font-medium text-[#64748B]">{label}</span>
                </Motion.div>
              ))}
            </div>

            <div className="mt-6">
              <BigButton onClick={start}>Let’s go! →</BigButton>
            </div>
          </div>
        </section>
      );
    }

    const mainVerb = chapter.verb ? VERBS[chapter.verb] : null;
    const patterns = {
      11: ["pǎobù · tiào", "run · jump"],
      12: ["wǒ zài…", "I’m at…"],
      13: ["wǒ zài…", "I’m doing…"],
      14: ["wǒ hěn…", "I feel…"],
      15: ["wǒ huì…", "I can…"],
      16: ["lǎoshī, wǒ kěyǐ… ma?", "Teacher, may I…?"],
      21: ["Xiànzài jǐ diǎn?", "What time is it?"],
    };
    const pattern = patterns[chapter.number];
    const exampleTerm = pattern?.[0] ?? (chapter.time ? "zuótiān · jīntiān · míngtiān" : mainVerb?.py || chapter.title);
    const exampleMeaning = pattern?.[1] ?? (chapter.time ? "yesterday · today · tomorrow" : mainVerb?.en || chapter.subtitle);

    return (
      <section className="my-auto py-5 sm:py-8" style={FONT}>
        <div className="mx-auto max-w-xl rounded-[2.25rem] bg-gradient-to-b from-[#FFF8E8] to-white px-5 pb-7 pt-6 text-center shadow-sm ring-1 ring-[#F3E3C3] sm:px-10">
          <Motion.h1 initial={{ y: 10 }} animate={{ y: 0 }} className="text-4xl font-bold leading-tight text-[#1F2A2A] sm:text-5xl">{chapter.title}</Motion.h1>
          <p className="mt-1 text-lg font-semibold text-[#8B6422] sm:text-xl">{chapter.subtitle}</p>

          <Motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.12, type: "spring", stiffness: 220, damping: 18 }}
            className="mx-auto mt-5 flex min-h-28 max-w-sm items-center justify-between gap-4 rounded-[1.75rem] bg-[#EAF7F2] px-5 py-3 ring-1 ring-[#D7EFE5] sm:min-h-32 sm:px-6"
          >
            <span className="min-w-0 flex-1 text-left">
              {chapter.greetingPhrases ? (
                <span className="flex flex-col gap-1.5">
                  {chapter.greetingPhrases.map(([pinyin, meaning]) => (
                    <span key={pinyin} className="flex items-baseline justify-between gap-2 rounded-xl bg-white/75 px-3 py-1">
                      <span className="text-sm font-bold text-[#0F766E] sm:text-base">{pinyin}</span>
                      <span className="shrink-0 text-xs font-semibold text-[#64748B] sm:text-sm">{meaning}</span>
                    </span>
                  ))}
                </span>
              ) : chapter.clock ? (
                <span className="flex flex-col gap-2 text-left">
                  <span className="rounded-xl bg-white/75 px-3 py-1.5">
                    <span className="block text-lg font-bold text-[#0F766E] sm:text-xl">Xiànzài jǐ diǎn?</span>
                    <span className="block text-xs font-semibold text-[#64748B] sm:text-sm">What time is it?</span>
                  </span>
                  <span className="rounded-xl bg-[#FFF1C2] px-3 py-1.5">
                    <span className="block text-base font-bold text-[#9A6A12] sm:text-lg">Xiànzài sān diǎn.</span>
                    <span className="block text-xs font-semibold text-[#8B6422] sm:text-sm">It’s three o’clock.</span>
                  </span>
                </span>
              ) : chapter.distance ? (
                <span className="flex flex-col gap-2">
                  <span className="flex items-baseline justify-between gap-2 rounded-xl bg-white/70 px-3 py-1.5">
                    <span className="text-xl font-bold text-[#0F766E] sm:text-2xl">zhège</span>
                    <span className="text-sm font-semibold text-[#64748B]">close</span>
                  </span>
                  <span className="flex items-baseline justify-between gap-2 rounded-xl bg-white/70 px-3 py-1.5">
                    <span className="text-xl font-bold text-[#0F766E] sm:text-2xl">nàge</span>
                    <span className="text-sm font-semibold text-[#64748B]">far</span>
                  </span>
                </span>
              ) : chapter.counting ? (
                <span className="flex flex-col gap-2">
                  <span className="flex items-baseline justify-between gap-2 rounded-xl bg-white/70 px-3 py-1.5">
                    <span className="text-lg font-bold text-[#64748B] sm:text-xl">èr</span>
                    <span className="text-xs font-semibold text-[#64748B] sm:text-sm">counting</span>
                  </span>
                  <span className="flex items-baseline justify-between gap-2 rounded-xl bg-[#FFF1C2] px-3 py-1.5">
                    <span className="text-xl font-bold text-[#B7791F] sm:text-2xl">liǎng ge</span>
                    <span className="text-xs font-semibold text-[#8B6422] sm:text-sm">two things</span>
                  </span>
                </span>
              ) : (
                <>
                  <span className={`block font-bold leading-tight text-[#0F766E] ${chapter.number === 16 ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl"}`}>{exampleTerm}</span>
                  <span className="mt-1 block text-sm font-semibold text-[#64748B] sm:text-base">{exampleMeaning}</span>
                </>
              )}
            </span>
            <Motion.span
              animate={{ y: [0, -4, 0], rotate: [0, -2, 2, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              className="flex h-24 w-24 shrink-0 items-center justify-center sm:h-28 sm:w-28"
              aria-hidden="true"
            >
              {chapter.iconImage ? <img src={chapter.iconImage} alt="" className="h-full w-full object-contain" /> : <span className="text-6xl"><ItemArt itemId={chapter.rounds[0]?.item} /></span>}
            </Motion.span>
          </Motion.div>

          <WordTiles words={chapter.newWords} />

          {showWhoPreview ? <p className="mt-6 text-lg font-semibold text-[#64748B]">{chapter.whoQuestion}</p> : null}
          {showWhoPreview ? (
            <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
              {["wo", "mama", "baba"].map((who, index) => {
                const tint = ["#EAF7F2", "#FFF4E3", "#EAF2F7"][index];
                const label = who === "wo" ? "me" : who === "mama" ? "Mum" : "Dad";
                return (
                  <Motion.div
                    key={who}
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 + index * 0.07, type: "spring", stiffness: 220, damping: 18 }}
                    className="flex flex-col items-center rounded-2xl px-1 py-3 ring-1 ring-[#EEE7DC]"
                    style={{ backgroundColor: tint }}
                  >
                    <Portrait who={who} guide={guide} className="h-16 w-16 sm:h-20 sm:w-20" />
                    <span className="mt-2 text-lg font-bold text-[#1F2A2A] sm:text-xl">{PEOPLE[who].py}</span>
                    <span className="text-xs font-medium text-[#64748B] sm:text-sm">{label}</span>
                  </Motion.div>
                );
              })}
            </div>
          ) : null}

          <div className="mt-6">
            <BigButton onClick={start}>Play →</BigButton>
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
            ) : chapter.iconImage ? (
              <img src={chapter.iconImage} alt="" className="h-36 w-36 object-contain sm:h-44 sm:w-44" />
            ) : (
              <span className="text-8xl sm:text-9xl"><ItemArt itemId={chapter.rounds[0]?.item} /></span>
            )}
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#F4C24D] px-4 py-1 text-lg font-bold text-[#5B3B00] shadow">{chapter.sticker.label}</span>
          </Motion.div>

          <p className="mt-8 text-5xl tracking-wide" aria-label={`${starCount} of 3 stars`}>
            {[0, 1, 2].map((i) => (
              <Motion.span key={i} className="inline-block" initial={{ scale: 0 }} animate={{ scale: i < starCount ? 1 : 0.8 }} transition={{ delay: 0.6 + i * 0.25, type: "spring" }}>
                <StarShape filled={i < starCount} />
              </Motion.span>
            ))}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-1.5">
            {eaten.map((item, i) => <span key={i} className="text-2xl"><ItemArt itemId={item} /></span>)}
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

        {round.greeting ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Portrait who="friend" guide={guide} className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" />
              <Motion.div key={`hello-q-${index}`} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="rounded-[1.5rem] bg-white px-4 py-3 shadow-md ring-1 ring-[#EEE7DC] sm:px-6">
                <p className="text-2xl font-bold leading-tight sm:text-3xl">{round.prompt}</p>
              </Motion.div>
            </div>
            {round.greeting === "speak" ? (
              <div className="flex items-center justify-end gap-3">
                <Motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="rounded-[1.5rem] bg-[#F3FBF7] px-4 py-3 shadow-md ring-1 ring-[#CDEBDD] sm:px-6">
                  <p className="text-2xl font-bold leading-tight text-[#0F766E] sm:text-3xl">Wǒ jiào…</p>
                </Motion.div>
                <Portrait who="wo" guide={guide} className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" />
              </div>
            ) : null}
          </div>
        ) : round.ask ? (
          // Question and answer: shénme in the question becomes the thing in the answer (same purple).
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Portrait who="wo" guide={guide} className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" />
              <Motion.div key={`q-${index}`} initial={{ scale: 0.85 }} animate={{ scale: 1 }} className="rounded-[1.5rem] bg-white px-4 py-3 shadow-md ring-1 ring-[#EEE7DC] sm:px-6">
                <p className="text-2xl font-bold leading-tight sm:text-4xl">
                  {round.ask === "who" ? (
                    <><span className="whitespace-nowrap rounded-xl bg-[#EDE7FF] px-2 text-[#6D4AFF]">shuí</span> {VERBS[round.verb ?? ITEMS[round.item].verb].py} {ITEMS[round.item].py} ?</>
                  ) : (
                    <>{round.who === "friend" ? "nǐ" : PEOPLE[round.who].py} {VERBS[round.verb ?? ITEMS[round.item].verb].py} <span className="whitespace-nowrap rounded-xl bg-[#EDE7FF] px-2 text-[#6D4AFF]">{round.ask === "where" ? "nǎr" : "shénme"} ?</span></>
                  )}
                </p>
              </Motion.div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Motion.div key={`a-${index}`} initial={{ scale: 0.85 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} className="rounded-[1.5rem] bg-[#F3FBF7] px-4 py-3 shadow-md ring-1 ring-[#CDEBDD] sm:px-6">
                <p className="text-2xl font-bold leading-tight sm:text-4xl">
                  {round.ask === "who" ? (
                    <><span className="whitespace-nowrap rounded-xl bg-[#EDE7FF] px-2 text-[#6D4AFF]">{round.who === "friend" ? "wǒ" : PEOPLE[round.who].py}</span> {VERBS[round.verb ?? ITEMS[round.item].verb].py} {ITEMS[round.item].py}</>
                  ) : (
                    <>{round.who === "friend" ? "wǒ" : PEOPLE[round.who].py} {VERBS[round.verb ?? ITEMS[round.item].verb].py} <span className="whitespace-nowrap rounded-xl bg-[#EDE7FF] px-2 text-[#6D4AFF]">{ITEMS[round.item].py}</span></>
                  )}
                </p>
                <AnimatePresence>
                  {solved ? (
                    <Motion.p key="cheer" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-xl font-bold text-[#2BB673] sm:text-2xl">{cheer}</Motion.p>
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
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className="relative flex-1 rounded-[1.75rem] bg-white px-5 py-4 shadow-md ring-1 ring-[#EEE7DC] sm:px-7 sm:py-5"
          >
            <span className="absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 rotate-45 bg-white ring-1 ring-[#EEE7DC] [clip-path:polygon(0_0,0_100%,100%_100%)]" />
            <p className="text-[1.65rem] font-bold leading-tight text-[#1F2A2A] sm:text-5xl">
                  {round.clock ? (round.clock === "set" ? clockAnswer(round.hour) : "Xiànzài jǐ diǎn?") : round.pick ? <span className="text-2xl font-semibold text-[#64748B] sm:text-3xl">Which sentence says it?</span> : (
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
                <Motion.p key="cheer" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-xl font-bold text-[#2BB673] sm:text-2xl">{cheer}</Motion.p>
              ) : null}
            </AnimatePresence>
          </Motion.div>
        </div>
          </>
        )}

        <RoundInstruction round={round} guide={guide} stepKey={index} />

        {round.greeting ? (
          round.greeting === "speak" ? (
            <div className="mt-5 flex justify-center">
              <BigButton onClick={() => answer("said-name", true)}>I said my name! →</BigButton>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {round.options.map((choice, choiceIndex) => {
                const isRight = solved === choice;
                const isWrong = wrong.includes(choice);
                const isShaking = shake?.startsWith(`${choice}-`);
                return (
                  <Motion.button
                    key={`${index}-${choice}-${isShaking ? shake : ""}`}
                    type="button"
                    onClick={() => answer(choice, choice === round.answer)}
                    disabled={Boolean(solved) || isWrong}
                    animate={isShaking ? { x: [0, -12, 12, -8, 8, 0] } : isRight ? { scale: [1, 1.04, 1] } : undefined}
                    transition={{ duration: 0.35 }}
                    className={`relative min-h-16 rounded-[1.4rem] border-4 px-3 py-3 text-lg font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1F2A2A]/20 sm:text-xl ${
                      isRight ? "border-[#2BB673] bg-[#E6F7EF] text-[#0F766E]"
                        : isWrong ? "border-[#EEE7DC] bg-[#F6F3EE] text-[#94A3B8] line-through"
                          : solved ? "border-transparent bg-white opacity-40"
                            : `border-white ${ANSWER_TINTS[choiceIndex % ANSWER_TINTS.length]} shadow-md hover:-translate-y-0.5 hover:border-[#B8EAD9]`
                    }`}
                  >
                    {choice}
                    {isRight ? <span className="absolute right-2 top-2 text-[#2BB673]" aria-hidden="true">✓</span> : null}
                    {isWrong ? <TryAgainMark /> : null}
                    {isRight && burst?.key === choice ? <Confetti parts={burst.parts} /> : null}
                  </Motion.button>
                );
              })}
            </div>
          )
        ) : round.clock ? (
          <div className="mt-4 flex flex-col items-center gap-4">
            {round.clock === "talk" ? (
              <div className="flex w-full max-w-lg items-center justify-center gap-4 rounded-[1.75rem] bg-gradient-to-r from-[#FFF8E8] to-[#EAF7F2] p-3 sm:gap-6 sm:p-5">
                <ClockFace hour={round.hour} className="h-44 w-44 sm:h-52 sm:w-52" />
                <div className="flex min-w-0 flex-col items-center gap-2">
                  <Portrait who="friend" guide={guide} className="h-16 w-16 sm:h-20 sm:w-20" />
                  <span className="rounded-2xl bg-white px-3 py-2 text-center text-lg font-bold text-[#0F766E] shadow-sm sm:text-xl">Xiànzài ___ diǎn.</span>
                </div>
              </div>
            ) : round.clock === "set" ? (
              <div className="rounded-[1.75rem] bg-[#FFF8E8] p-2 sm:p-3">
                <ClockFace
                  interactive
                  selectedHour={clockSelection}
                  disabled={wrong}
                  onPick={(hour) => {
                    setClockSelection(hour);
                    answer(String(hour), hour === round.hour);
                  }}
                />
              </div>
            ) : (
              <ClockFace hour={round.hour} className="h-56 w-56 sm:h-64 sm:w-64" />
            )}

            {round.clock !== "set" ? (
              <div className={`grid w-full max-w-lg gap-3 ${round.clock === "talk" ? "grid-cols-1" : "grid-cols-3"}`}>
                {round.options.map((hour) => {
                  const key = String(hour);
                  const isRight = solved === key;
                  const isWrong = wrong.includes(key);
                  const isShaking = shake?.startsWith(`${key}-`);
                  const label = round.clock === "talk" ? clockAnswer(hour) : `${CLOCK_NUMBERS[hour]} diǎn`;
                  return (
                    <Motion.button
                      key={`${index}-${hour}-${isShaking ? shake : ""}`}
                      type="button"
                      onClick={() => answer(key, hour === round.hour)}
                      disabled={Boolean(solved) || isWrong}
                      animate={isShaking ? { x: [0, -12, 12, -8, 8, 0] } : isRight ? { scale: [1, 1.04, 1] } : undefined}
                      transition={{ duration: 0.35 }}
                      className={`relative min-h-16 rounded-[1.4rem] border-4 px-3 py-3 font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1F2A2A]/20 ${round.clock === "talk" ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"} ${
                        isRight ? "border-[#2BB673] bg-[#E6F7EF] text-[#0F766E]"
                          : isWrong ? "border-[#EEE7DC] bg-[#F6F3EE] text-[#94A3B8] line-through"
                            : solved ? "border-transparent bg-white opacity-40"
                              : `border-white ${ANSWER_TINTS[hour % ANSWER_TINTS.length]} shadow-md hover:-translate-y-0.5 hover:border-[#B8EAD9]`
                      }`}
                    >
                      {label}
                      {isRight ? <span className="absolute right-2 top-2 text-[#2BB673]" aria-hidden="true">✓</span> : null}
                      {isWrong ? <TryAgainMark /> : null}
                      {isRight && burst?.key === key ? <Confetti parts={burst.parts} /> : null}
                    </Motion.button>
                  );
                })}
              </div>
            ) : null}
            <AnimatePresence>
              {solved && round.clock !== "set" ? (
                <Motion.p key={`clock-answer-${index}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-lg font-bold text-[#2BB673] sm:text-xl">
                  {round.clock === "read" ? clockAnswer(round.hour) : "Great answer!"}
                </Motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        ) : round.map ? (
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
                  initial={isShaking ? false : { scale: 0.9 }}
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
                  <span className="text-6xl sm:text-7xl" aria-hidden="true"><ItemArt itemId={place} /></span>
                  {isRight ? (
                    <Motion.span initial={{ y: -90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }} className="absolute bottom-2 right-2">
                      <Portrait who={round.who} guide={guide} className="h-14 w-14 sm:h-16 sm:w-16" />
                    </Motion.span>
                  ) : null}
                  {isWrong ? <TryAgainMark /> : null}
                  {isRight && burst?.key === place ? (
                    <Confetti parts={burst.parts} />
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
              initial={{ y: 16 }}
              animate={solved ? { scale: [1, 1.05, 1], y: 0 } : { y: 0 }}
              className={`relative flex h-40 w-full max-w-md items-center justify-center rounded-[1.75rem] border-4 shadow-md sm:h-52 ${solved ? "border-[#2BB673] bg-[#E6F7EF]" : "border-white bg-white"}`}
            >
              <CountScene who={round.who} item={round.item} count={round.count} guide={guide} done={Boolean(solved)} />
              {solved && burst ? (
                <Confetti parts={burst.parts} />
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
              initial={{ y: 16 }}
              animate={solved ? { scale: [1, 1.05, 1], y: 0 } : { y: 0 }}
              className={`relative flex h-40 w-full max-w-md items-center justify-center rounded-[1.75rem] border-4 shadow-md sm:h-52 ${solved ? "border-[#2BB673] bg-[#E6F7EF]" : "border-white bg-white"}`}
            >
              {round.count ? <CountScene who={round.who} item={round.item} count={round.count} guide={guide} done={Boolean(solved)} /> : <Scene who={round.who} item={round.item} guide={guide} eaten={Boolean(solved)} verb={round.verb} />}
              {solved && burst ? (
                <Confetti parts={burst.parts} />
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
              initial={{ y: 16 }}
              animate={solved ? { scale: [1, 1.05, 1], y: 0 } : { y: 0 }}
              className={`relative flex h-40 w-full max-w-md items-center justify-center rounded-[1.75rem] border-4 shadow-md sm:h-52 ${solved ? "border-[#2BB673] bg-[#E6F7EF]" : "border-white bg-white"}`}
            >
              {round.count ? <CountScene who={round.who} item={round.item} count={round.count} guide={guide} done={Boolean(solved)} /> : <Scene who={round.who} item={round.item} guide={guide} eaten={Boolean(solved)} verb={round.verb} />}
              {solved && burst ? (
                <Confetti parts={burst.parts} />
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
              initial={{ y: 16 }}
              animate={solved ? { scale: [1, 1.05, 1], y: 0 } : { y: 0 }}
              className={`relative flex h-44 w-full max-w-md items-center justify-center rounded-[1.75rem] border-4 shadow-md sm:h-56 ${solved ? "border-[#2BB673] bg-[#E6F7EF]" : "border-white bg-white"}`}
            >
              {round.show[2] ? <CountScene who={round.show[0]} item={round.show[1]} count={round.show[2]} guide={guide} /> : chapter.place ? <PlaceScene who={round.show[0]} item={round.show[1]} guide={guide} /> : <Scene who={round.show[0]} item={round.show[1]} guide={guide} eaten={false} verb={round.verb} />}
              {solved && burst ? (
                <Confetti parts={burst.parts} />
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
          {round.options.map((option, optionIndex) => {
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
                initial={isShaking ? false : { y: 16 }}
                animate={isShaking ? { x: [0, -12, 12, -8, 8, 0] } : isRight ? { scale: [1, 1.06, 1], opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: isShaking ? 0.4 : 0.35 }}
                className={`relative flex ${round.when ? "h-44 sm:h-60" : "h-36 sm:h-52"} items-center justify-center rounded-[1.75rem] border-4 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1F2A2A]/20 ${
                  isRight
                    ? "border-[#2BB673] bg-[#E6F7EF]"
                    : isWrong
                      ? "border-[#EEE7DC] bg-[#F6F3EE] opacity-50 grayscale"
                      : solved
                        ? "border-transparent bg-white opacity-40"
                        : `border-white ${ANSWER_TINTS[optionIndex % ANSWER_TINTS.length]} shadow-md hover:-translate-y-1 hover:border-[#B8EAD9] hover:shadow-lg`
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
                {isWrong ? <TryAgainMark /> : null}
                {isRight && burst?.key === key ? (
                  <Confetti parts={burst.parts} />
                ) : null}
              </Motion.button>
            );
          })}
        </div>
        )}

        <AnimatePresence>
          {wrong.length > 0 && !solved ? (
            <Motion.p key={`try-${wrong.length}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 text-center text-xl font-bold text-[#C27C0E]">
              {round.numgap && wrong.includes("er") ? <><ItemArt itemId={round.item} /><ItemArt itemId={round.item} /> = liǎng ge!</> : "Try again. Read it once more."}
            </Motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
