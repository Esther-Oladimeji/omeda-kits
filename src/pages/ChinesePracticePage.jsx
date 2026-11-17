import { useState } from "react";
import { Link } from "react-router-dom";
import ChineseClassLesson from "./ChineseClassLesson";
import ChineseSentenceGame from "./ChineseSentenceGame";
import { SENTENCE_CHAPTERS, isChapterDone } from "./sentenceChapters";

const guides = [
  { id: "sade", name: "Sade", image: "/video/sade.png", color: "#EAF7F2", greeting: "Hi! I’m Sade. Let’s practise together!" },
  { id: "ada", name: "Ada", image: "/video/ada.png", color: "#F1F4E8", greeting: "Hi! I’m Ada. Ready to explore together?" },
  { id: "ikenna", name: "Ikenna", image: "/video/ikenna.png", color: "#E8F4F7", greeting: "Hi! I’m Ikenna. Let’s figure it out together!" },
  { id: "walee", name: "Walee", image: "/video/walee.jpg", color: "#FFF3E9", greeting: "Hey! I’m Walee. Ready for a little challenge?" },
];

const rounds = [
  {
    line: "A new friend waves: nǐ hǎo!",
    prompt: "What should you say back?",
    pinyin: "nǐ hǎo",
    meaning: "hello",
    answers: [
      { text: "nǐ hǎo", note: "hello", correct: true },
      { text: "wǒ jiào…", note: "my name is…", correct: false },
      { text: "xièxie", note: "thank you", correct: false },
    ],
  },
  {
    line: "You want to ask your new friend’s name.",
    prompt: "What should you ask?",
    pinyin: "nǐ jiào shén me míng zi?",
    meaning: "what is your name?",
    answers: [
      { text: "nǐ jiào shén me míng zi?", note: "what is your name?", correct: true },
      { text: "nǐ hǎo", note: "hello", correct: false },
      { text: "xièxie", note: "thank you", correct: false },
    ],
  },
  {
    line: "Your friend asks: nǐ jiào shén me míng zi?",
    prompt: "How will you introduce yourself?",
    pinyin: "wǒ jiào…",
    meaning: "my name is…",
    answers: [
      { text: "wǒ jiào…", note: "my name is…", correct: true },
      { text: "nǐ hǎo", note: "hello", correct: false },
      { text: "nǐ jiào shén me míng zi?", note: "what is your name?", correct: false },
    ],
  },
  {
    line: "You and your friend reach the gate together.",
    prompt: "Your friend says xièxie! What do you say?",
    pinyin: "bú kèqi",
    meaning: "you’re welcome",
    answers: [
      { text: "bú kèqi", note: "you’re welcome", correct: true },
      { text: "xièxie", note: "thank you", correct: false },
      { text: "nǐ hǎo", note: "hello", correct: false },
    ],
  },
];

const familyRounds = [
  { id: "mama", pinyin: "māma", meaning: "mum", image: "/games/family/mama.png", color: "#F2E4D9" },
  { id: "baba", pinyin: "bàba", meaning: "dad", image: "/games/family/baba.png", color: "#F1E2E4" },
  { id: "ada", pinyin: "jiějie", meaning: "big sister", image: "/video/ada.png", color: "#F1F4E8" },
  { id: "ikenna", pinyin: "gēge", meaning: "big brother", image: "/video/ikenna.png", color: "#E8F4F7" },
];

const grandparentRounds = [
  { id: "grandma", pinyin: "nǎinai", meaning: "grandma", image: "/games/family/grandma.png", color: "#E8F0DF" },
  { id: "grandpa", pinyin: "yéye", meaning: "grandpa", image: "/games/family/grandpa.png", color: "#E9EAF2" },
];

const fruits = [
  { id: "apple", pinyin: "píngguǒ", meaning: "apple", plural: "apples", emoji: "🍎", color: "#FFF0EC" },
  { id: "banana", pinyin: "xiāngjiāo", meaning: "banana", plural: "bananas", emoji: "🍌", color: "#FFF8DC" },
  { id: "orange", pinyin: "júzi", meaning: "orange", plural: "oranges", emoji: "🍊", color: "#FFF1E2" },
  { id: "grapes", pinyin: "pútáo", meaning: "grapes", plural: "grapes", emoji: "🍇", color: "#F3ECFA" },
  { id: "strawberry", pinyin: "cǎoméi", meaning: "strawberry", plural: "strawberries", emoji: "🍓", color: "#FFF0F2" },
  { id: "watermelon", pinyin: "xīguā", meaning: "watermelon", plural: "watermelons", emoji: "🍉", color: "#EEF7E9" },
];
const fruitRecallTargets = [fruits[2], fruits[5], fruits[1], fruits[4], fruits[0], fruits[3]];
const FRUIT_TALK_ROUNDS = 3;

const colours = [
  { id: "red", pinyin: "hóngsè", meaning: "red", swatch: "#E85D55", tile: "#F8C8C2" },
  { id: "yellow", pinyin: "huángsè", meaning: "yellow", swatch: "#EABF36", tile: "#FFE18A" },
  { id: "green", pinyin: "lǜsè", meaning: "green", swatch: "#63A66D", tile: "#B9DDB2" },
  { id: "blue", pinyin: "lánsè", meaning: "blue", swatch: "#548FC7", tile: "#B7D5F1" },
  { id: "black", pinyin: "hēisè", meaning: "black", swatch: "#30343B", tile: "#C2C7CF" },
  { id: "white", pinyin: "báisè", meaning: "white", swatch: "#FFFFFF", tile: "#E8EDF2", border: "#CDD5DF" },
];
const colourHuntItems = [
  { id: "apple", label: "apple", emoji: "🍎", colourId: "red" },
  { id: "banana", label: "banana", emoji: "🍌", colourId: "yellow" },
  { id: "frog", label: "frog", emoji: "🐸", colourId: "green" },
  { id: "fish", label: "fish", emoji: "🐟", colourId: "blue" },
  { id: "strawberry", label: "strawberry", emoji: "🍓", colourId: "red" },
  { id: "star", label: "star", emoji: "⭐", colourId: "yellow" },
  { id: "watermelon", label: "watermelon", emoji: "🍉", colourId: "green" },
  { id: "butterfly", label: "butterfly", emoji: "🦋", colourId: "blue" },
  { id: "cat", label: "black cat", emoji: "🐈‍⬛", colourId: "black" },
  { id: "heart", label: "black heart", emoji: "🖤", colourId: "black" },
  { id: "cloud", label: "white cloud", emoji: "☁️", colourId: "white" },
  { id: "snowman", label: "snowman", emoji: "☃️", colourId: "white" },
];

const PROGRESS_KEY = "omeda-chinese-hello-progress-v2";
const GUIDE_KEY = "omeda-chinese-guide";
const FAMILY_PROGRESS_KEY = "omeda-chinese-family-progress-v1";
const FRUIT_PROGRESS_KEY = "omeda-chinese-fruit-progress-v2";
const COLOUR_PROGRESS_KEY = "omeda-chinese-colour-progress-v3";

function readProgress() {
  try {
    const saved = window.localStorage.getItem(PROGRESS_KEY);
    if (!saved) return null;
    const progress = JSON.parse(saved);
    const validGuide = guides.some((item) => item.id === progress.guide);
    const validRound = Number.isInteger(progress.roundIndex) && progress.roundIndex >= 0 && progress.roundIndex < rounds.length;
    const validAnswer = progress.answerIndex === null || (Number.isInteger(progress.answerIndex) && progress.answerIndex >= 0 && progress.answerIndex < rounds[progress.roundIndex]?.answers.length);
    return progress.chapterId === "hello" && validGuide && validRound && validAnswer ? progress : null;
  } catch {
    return null;
  }
}

function readSelectedGuide() {
  try {
    const selected = window.localStorage.getItem(GUIDE_KEY);
    return guides.some((item) => item.id === selected) ? selected : null;
  } catch {
    return null;
  }
}

function readFamilyProgress() {
  try {
    const saved = window.localStorage.getItem(FAMILY_PROGRESS_KEY);
    if (!saved) return null;
    const progress = JSON.parse(saved);
    if (progress.set !== "core" && progress.set !== "grandparents") return null;
    const set = progress.set === "grandparents" ? grandparentRounds : familyRounds;
    const validRound = Number.isInteger(progress.roundIndex) && progress.roundIndex >= 0 && progress.roundIndex < set.length;
    const validAnswer = progress.answerId === null || set.some((item) => item.id === progress.answerId);
    return progress.chapterId === "family" && validRound && validAnswer ? progress : null;
  } catch {
    return null;
  }
}

function readFruitProgress() {
  try {
    const saved = window.localStorage.getItem(FRUIT_PROGRESS_KEY);
    if (!saved) return null;
    const progress = JSON.parse(saved);
    const validIds = (ids) => Array.isArray(ids) && ids.every((id) => fruits.some((fruit) => fruit.id === id));
    const validStage = ["learn", "recall", "talk"].includes(progress.stage);
    const validIndexes = Number.isInteger(progress.learnIndex) && progress.learnIndex >= 0 && progress.learnIndex < fruits.length
      && Number.isInteger(progress.recallIndex) && progress.recallIndex >= 0 && progress.recallIndex < fruitRecallTargets.length
      && Number.isInteger(progress.talkIndex) && progress.talkIndex >= 0 && progress.talkIndex < FRUIT_TALK_ROUNDS;
    return progress.chapterId === "fruit" && validStage && validIds(progress.servedIds) && validIndexes ? progress : null;
  } catch {
    return null;
  }
}

function readColourProgress() {
  try {
    const saved = window.localStorage.getItem(COLOUR_PROGRESS_KEY);
    if (!saved) return null;
    const progress = JSON.parse(saved);
    const validIndexes = Number.isInteger(progress.huntIndex) && progress.huntIndex >= 0 && progress.huntIndex < colours.length;
    const validFound = Array.isArray(progress.foundIds) && progress.foundIds.every((id) => colourHuntItems.some((item) => item.id === id));
    return progress.chapterId === "colours" && progress.stage === "hunt" && validIndexes && validFound ? progress : null;
  } catch {
    return null;
  }
}

export default function ChinesePracticePage() {
  const [savedProgress, setSavedProgress] = useState(readProgress);
  const [familyProgress, setFamilyProgress] = useState(readFamilyProgress);
  const [fruitProgress, setFruitProgress] = useState(readFruitProgress);
  const [colourProgress, setColourProgress] = useState(readColourProgress);
  const [guide, setGuide] = useState(() => readSelectedGuide() ?? savedProgress?.guide ?? null);
  const [screen, setScreen] = useState(() => (readSelectedGuide() || savedProgress?.guide ? "journey" : "choose"));
  const [roundIndex, setRoundIndex] = useState(savedProgress?.roundIndex ?? 0);
  const [answerIndex, setAnswerIndex] = useState(savedProgress?.answerIndex ?? null);
  const [score, setScore] = useState(savedProgress?.score ?? 0);
  const [familySet, setFamilySet] = useState(familyProgress?.set ?? "core");
  const [familyRoundIndex, setFamilyRoundIndex] = useState(familyProgress?.roundIndex ?? 0);
  const [familyAnswerId, setFamilyAnswerId] = useState(familyProgress?.answerId ?? null);
  const [familyFeedback, setFamilyFeedback] = useState(null);
  const [fruitRecallFeedback, setFruitRecallFeedback] = useState(null);
  const [fruitTalkStep, setFruitTalkStep] = useState(0);
  const [fruitTalkAnswerId, setFruitTalkAnswerId] = useState(null);
  const [colourFoundIds, setColourFoundIds] = useState(() => readColourProgress()?.foundIds ?? []);
  const [colourFeedback, setColourFeedback] = useState(null);
  const [sentenceChapter, setSentenceChapter] = useState(0);
  const round = rounds[roundIndex];
  const currentGuide = guides.find((item) => item.id === guide);
  const conversationPartner = guides.find((item) => item.id !== guide);
  const answer = answerIndex === null ? null : round.answers[answerIndex];
  const currentFamilyRounds = familySet === "grandparents" ? grandparentRounds : familyRounds;
  const currentFamilyRound = currentFamilyRounds[familyRoundIndex];
  const fruitLearnIndex = fruitProgress?.learnIndex ?? 0;
  const fruitRecallIndex = fruitProgress?.recallIndex ?? 0;
  const fruitTalkIndex = fruitProgress?.talkIndex ?? 0;
  const currentLearnFruit = fruits[fruitLearnIndex];
  const currentRecallFruit = fruitRecallTargets[fruitRecallIndex];
  const servedFruits = fruitProgress?.servedIds ?? [];
  const colourHuntIndex = colourProgress?.huntIndex ?? 0;
  const currentHuntColour = colours[colourHuntIndex];
  const currentColourFoundCount = colourHuntItems.filter((item) => item.colourId === currentHuntColour.id && colourFoundIds.includes(item.id)).length;
  const corePhotoCount = familyProgress?.coreCompleted || familySet === "grandparents" ? familyRounds.length : familyRoundIndex + (familyAnswerId && familySet === "core" ? 1 : 0);
  const grandparentPhotoCount = familyProgress?.grandparentsCompleted ? grandparentRounds.length : familySet === "grandparents" ? familyRoundIndex + (familyAnswerId ? 1 : 0) : 0;

  function saveProgress(progress) {
    setSavedProgress(progress);
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch {
      // The game still works if browser storage is unavailable.
    }
  }

  function saveFamilyProgress(progress) {
    setFamilyProgress(progress);
    try {
      window.localStorage.setItem(FAMILY_PROGRESS_KEY, JSON.stringify(progress));
    } catch {
      // The family game still works if browser storage is unavailable.
    }
  }

  function saveFruitProgress(progress) {
    setFruitProgress(progress);
    try {
      window.localStorage.setItem(FRUIT_PROGRESS_KEY, JSON.stringify(progress));
    } catch {
      // The fruit game still works if browser storage is unavailable.
    }
  }

  function saveColourProgress(progress) {
    setColourProgress(progress);
    try {
      window.localStorage.setItem(COLOUR_PROGRESS_KEY, JSON.stringify(progress));
    } catch {
      // The colour game still works if browser storage is unavailable.
    }
  }

  function startColourChapter() {
    if (!fruitProgress?.completed) return;
    const progress = colourProgress?.completed
      ? { chapterId: "colours", stage: "hunt", huntIndex: 0, foundIds: [], completed: false }
      : colourProgress ?? { chapterId: "colours", stage: "hunt", huntIndex: 0, foundIds: [], completed: false };
    saveColourProgress(progress);
    setColourFoundIds(progress.foundIds);
    setColourFeedback(null);
    setScreen("colourHunt");
  }

  function tapColourHuntItem(item) {
    if (colourFoundIds.includes(item.id)) return;
    if (item.colourId !== currentHuntColour.id) {
      setColourFeedback("Look at the colour clue and try again!");
      return;
    }
    const foundIds = [...colourFoundIds, item.id];
    setColourFoundIds(foundIds);
    setColourFeedback(null);
    saveColourProgress({ ...colourProgress, foundIds });
  }

  function continueColourHunt() {
    if (colourHuntIndex + 1 >= colours.length) {
      saveColourProgress({ ...colourProgress, stage: "hunt", huntIndex: colours.length - 1, foundIds: [], completed: true });
      setColourFoundIds([]);
      setScreen("colourComplete");
      return;
    }
    const progress = { ...colourProgress, huntIndex: colourHuntIndex + 1, foundIds: [] };
    saveColourProgress(progress);
    setColourFoundIds([]);
    setColourFeedback(null);
  }

  function startFruitGame() {
    if (!familyProgress?.coreCompleted) return;
    const progress = fruitProgress?.completed
      ? { chapterId: "fruit", stage: "learn", learnIndex: 0, recallIndex: 0, talkIndex: 0, servedIds: [], completed: false }
      : fruitProgress ?? { chapterId: "fruit", stage: "learn", learnIndex: 0, recallIndex: 0, talkIndex: 0, servedIds: [], completed: false };
    saveFruitProgress(progress);
    setFruitRecallFeedback(null);
    setFruitTalkStep(progress.stage === "talk" && progress.talkIndex > 0 ? 2 : 0);
    setFruitTalkAnswerId(null);
    setScreen(progress.stage === "recall" ? "fruitRecall" : progress.stage === "talk" ? "fruitTalk" : "fruitLearn");
  }

  function moveToFruitRecall() {
    const progress = { ...fruitProgress, stage: "recall", learnIndex: fruits.length - 1 };
    saveFruitProgress(progress);
    setFruitRecallFeedback(null);
    setScreen("fruitRecall");
  }

  function checkFruitRecall(answerId) {
    if (answerId === currentRecallFruit.id) {
      setFruitRecallFeedback("correct");
      return;
    }
    setFruitRecallFeedback("try-again");
  }

  function advanceFruitRecall() {
    const nextIndex = fruitRecallIndex + 1;
    if (nextIndex >= fruitRecallTargets.length) {
      saveFruitProgress({ ...fruitProgress, stage: "talk", recallIndex: fruitRecallTargets.length - 1, talkIndex: 0 });
      setFruitTalkStep(0);
      setScreen("fruitTalk");
      return;
    }
    saveFruitProgress({ ...fruitProgress, recallIndex: nextIndex });
    setFruitRecallFeedback(null);
  }

  function advanceFruitTalk() {
    if (fruitTalkStep < 2) {
      setFruitTalkStep(fruitTalkStep + 1);
      return;
    }
    if (!fruitTalkAnswerId) return;
    const servedIds = [...new Set([...servedFruits, fruitTalkAnswerId])];
    const nextIndex = fruitTalkIndex + 1;
    const completed = nextIndex >= FRUIT_TALK_ROUNDS;
    const progress = { ...fruitProgress, stage: "talk", talkIndex: completed ? FRUIT_TALK_ROUNDS - 1 : nextIndex, servedIds, completed };
    saveFruitProgress(progress);
    setFruitTalkAnswerId(null);
    if (completed) {
      setScreen("fruitComplete");
    } else {
      setFruitTalkStep(2);
    }
  }

  function startFamily(setName = "core") {
    if (setName === "grandparents" && !familyProgress?.coreCompleted) return;
    const isBonus = setName === "grandparents";
    const alreadyDone = isBonus ? familyProgress?.grandparentsCompleted : familyProgress?.coreCompleted;
    const resumeSet = familyProgress?.set === setName && !alreadyDone;
    const nextIndex = resumeSet ? familyProgress.roundIndex : 0;
    const nextAnswer = resumeSet ? familyProgress.answerId : null;
    const progress = {
      chapterId: "family",
      set: setName,
      roundIndex: nextIndex,
      answerId: nextAnswer,
      coreCompleted: familyProgress?.coreCompleted ?? false,
      grandparentsCompleted: familyProgress?.grandparentsCompleted ?? false,
      completed: false,
    };
    setFamilySet(setName);
    setFamilyRoundIndex(nextIndex);
    setFamilyAnswerId(nextAnswer);
    setFamilyFeedback(nextAnswer ? "correct" : null);
    saveFamilyProgress(progress);
    setScreen("familyPlay");
  }

  function chooseFamilyMember(memberId) {
    if (familyAnswerId) return;
    if (memberId !== currentFamilyRound.id) {
      setFamilyFeedback("try-again");
      return;
    }
    const progress = {
      ...(familyProgress ?? {}),
      chapterId: "family",
      set: familySet,
      roundIndex: familyRoundIndex,
      answerId: memberId,
      coreCompleted: familyProgress?.coreCompleted ?? false,
      grandparentsCompleted: familyProgress?.grandparentsCompleted ?? false,
      completed: false,
    };
    setFamilyAnswerId(memberId);
    setFamilyFeedback("correct");
    saveFamilyProgress(progress);
  }

  function continueFamily() {
    const isLast = familyRoundIndex === currentFamilyRounds.length - 1;
    if (isLast) {
      const progress = {
        ...(familyProgress ?? {}),
        chapterId: "family",
        set: familySet,
        roundIndex: familyRoundIndex,
        answerId: null,
        coreCompleted: familySet === "core" || (familyProgress?.coreCompleted ?? false),
        grandparentsCompleted: familySet === "grandparents" || (familyProgress?.grandparentsCompleted ?? false),
        completed: true,
      };
      saveFamilyProgress(progress);
      setFamilyAnswerId(null);
      setScreen("familyComplete");
      return;
    }
    const nextIndex = familyRoundIndex + 1;
    const progress = {
      ...(familyProgress ?? {}),
      chapterId: "family",
      set: familySet,
      roundIndex: nextIndex,
      answerId: null,
      coreCompleted: familyProgress?.coreCompleted ?? false,
      grandparentsCompleted: familyProgress?.grandparentsCompleted ?? false,
      completed: false,
    };
    setFamilyRoundIndex(nextIndex);
    setFamilyAnswerId(null);
    setFamilyFeedback(null);
    saveFamilyProgress(progress);
  }

  function continueToJourney() {
    if (!guide) return;
    try {
      window.localStorage.setItem(GUIDE_KEY, guide);
    } catch {
      // The guide can still be used for this visit if storage is unavailable.
    }
    if (savedProgress && !savedProgress.completed && savedProgress.guide !== guide) {
      saveProgress({ ...savedProgress, guide });
    }
    setScreen("journey");
  }

  function beginMission(selectedGuide = guide) {
    if (!selectedGuide) return;
    try {
      window.localStorage.setItem(GUIDE_KEY, selectedGuide);
    } catch {
      // The mission still works if browser storage is unavailable.
    }
    const progress = {
      chapterId: "hello",
      guide: selectedGuide,
      roundIndex: 0,
      answerIndex: null,
      score: 0,
      completed: false,
    };
    setGuide(selectedGuide);
    setRoundIndex(0);
    setAnswerIndex(null);
    setScore(0);
    saveProgress(progress);
    setScreen("play");
  }

  function resumeMission() {
    if (!savedProgress) return;
    setGuide(savedProgress.guide);
    setRoundIndex(savedProgress.roundIndex ?? 0);
    setAnswerIndex(savedProgress.answerIndex ?? null);
    setScore(savedProgress.score ?? 0);
    setScreen(savedProgress.completed ? "complete" : "play");
  }

  function chooseAnswer(optionIndex) {
    if (answerIndex !== null) return;
    const option = round.answers[optionIndex];
    const nextScore = score + (option.correct ? 1 : 0);
    setAnswerIndex(optionIndex);
    setScore(nextScore);
    saveProgress({
      chapterId: "hello",
      guide,
      roundIndex,
      answerIndex: optionIndex,
      score: nextScore,
      completed: false,
    });
  }

  function continueMission() {
    if (roundIndex === rounds.length - 1) {
      const progress = { ...savedProgress, completed: true, answerIndex: null };
      saveProgress(progress);
      setAnswerIndex(null);
      setScreen("complete");
      return;
    }
    const nextRound = roundIndex + 1;
    setRoundIndex(nextRound);
    setAnswerIndex(null);
    saveProgress({
      chapterId: "hello",
      guide,
      roundIndex: nextRound,
      answerIndex: null,
      score,
      completed: false,
    });
  }

  return (
    <main className="min-h-screen bg-[#FDFCFB] px-4 py-5 text-[#1F2A2A] sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-5xl flex-col">
        <header className="flex items-center justify-between">
          {screen === "play" || screen === "complete" || screen === "resume" || screen === "familyPreview" || screen === "familyPlay" || screen === "familyComplete" || screen === "fruitIntro" || screen === "fruitLearn" || screen === "fruitRecall" || screen === "fruitTalk" || screen === "fruitComplete" || screen === "colourHunt" || screen === "colourComplete" || screen === "classLesson" || screen === "sentenceGame" ? (
            <button type="button" onClick={() => setScreen("journey")} className="rounded-full px-3 py-2 text-sm text-[#64748B] transition hover:bg-white hover:text-[#1F2A2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">← <span className="hidden sm:inline">My learning path</span><span className="sm:hidden">My path</span></button>
          ) : (
            <Link to="/storybox" className="rounded-full px-3 py-2 text-sm text-[#64748B] transition hover:bg-white hover:text-[#1F2A2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">← <span className="hidden sm:inline">Back to the storybook</span><span className="sm:hidden">Back</span></Link>
          )}
          <span className="text-xs font-semibold tracking-[0.18em] text-[#64748B]">OMEDA</span>
        </header>

        {screen === "journey" ? (
          <section className="my-auto py-8 sm:py-12">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 flex items-center justify-between gap-4 rounded-3xl border border-[#E8F4EF] bg-white px-4 py-3 shadow-sm sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-14 w-14 shrink-0 items-end justify-center overflow-hidden rounded-2xl" style={{ backgroundColor: currentGuide?.color ?? "#EAF7F2" }}><img src={currentGuide?.image} alt="" className="h-full w-full object-contain object-bottom mix-blend-multiply" /></span>
                  <span className="min-w-0"><span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">Your learning buddy</span><span className="block truncate font-semibold">{currentGuide?.name}</span></span>
                </div>
                <button type="button" onClick={() => setScreen("choose")} className="min-h-10 shrink-0 rounded-full px-4 text-sm font-medium text-[#64748B] transition hover:bg-[#F5FAF7] hover:text-[#1F2A2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">Change buddy</button>
              </div>

              <div className="mb-8 text-center sm:mb-10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">Your path</p>
                <h1 className="text-3xl font-light tracking-tight sm:text-5xl">Chinese adventure</h1>
              </div>

              <div className="space-y-0">
                <div className="flex gap-4 sm:gap-6">
                  <div className="flex w-10 shrink-0 flex-col items-center sm:w-12">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B8EAD9] text-sm font-bold text-[#1F2A2A] ring-4 ring-[#FDFCFB]">1</span>
                    <span className="my-2 min-h-16 w-0.5 flex-1 rounded-full bg-[#D9EEE5]" />
                  </div>
                  <article className="mb-5 min-w-0 flex-1 overflow-hidden rounded-[1.75rem] border border-[#D9EEE5] bg-white shadow-sm">
                    <div className="flex items-center justify-between gap-3 bg-[#EAF7F2] px-5 py-5 sm:px-7 sm:py-6">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0F766E]">HELLO · {savedProgress?.completed ? "DONE" : savedProgress ? "IN PROGRESS" : "UP NEXT"}</p>
                        <h2 className="mt-2 text-2xl font-light sm:text-3xl">Say hello!</h2>
                      </div>
                      <span className="flex h-24 w-24 shrink-0 items-end justify-center overflow-hidden sm:h-28 sm:w-28"><img src="/games/greetings/sade-walee-hello.png" alt="" className="h-full w-full object-contain object-bottom" /></span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-7">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#F5FAF7] px-3 py-1.5 text-xs font-medium text-[#475569]"><span aria-hidden="true">💬</span> Talk</span>
                      <button type="button" onClick={() => savedProgress ? (savedProgress.completed ? beginMission() : resumeMission()) : beginMission()} className="min-h-11 rounded-full bg-[#B8EAD9] px-5 text-sm font-semibold transition hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">{savedProgress ? (savedProgress.completed ? "Play again" : "Continue") : "Play"} →</button>
                    </div>
                  </article>
                </div>

                <div className="flex gap-4 sm:gap-6">
                  <div className="flex w-10 shrink-0 flex-col items-center sm:w-12"><span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ring-4 ring-[#FDFCFB] ${familyProgress?.coreCompleted ? "bg-[#B8EAD9] text-[#1F2A2A]" : "border-2 border-[#E8E3D9] bg-[#F8F6F1] text-[#94A3B8]"}`}>2</span><span className="my-2 min-h-16 w-0.5 flex-1 rounded-full bg-[#E8E3D9]" /></div>
                  <button type="button" onClick={() => setScreen("familyPreview")} className="group mb-5 min-w-0 flex-1 overflow-hidden rounded-[1.75rem] border border-[#EEE7DC] bg-white text-left shadow-sm transition hover:border-[#E5D7BE] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">
                    <div className="flex items-center justify-between gap-3 bg-[#FBF8F2] px-5 py-5 sm:px-7 sm:py-6">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A16207]">FAMILY · {familyProgress?.coreCompleted ? "DONE" : familyProgress && !familyProgress.completed ? "IN PROGRESS" : "UP NEXT"}</p>
                        <h2 className="mt-2 text-2xl font-light sm:text-3xl">Family photo</h2>
                      </div>
                      <span className="flex h-24 w-24 shrink-0 items-end justify-center overflow-hidden sm:h-28 sm:w-28"><img src="/games/family/family-group.png" alt="" className="h-full w-full object-contain object-bottom" /></span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-7"><span className="inline-flex items-center gap-2 rounded-full bg-[#FAF8F4] px-3 py-1.5 text-xs font-medium text-[#64748B]"><span aria-hidden="true">🧩</span> Picture game</span><span className="text-sm font-semibold text-[#64748B] transition group-hover:text-[#1F2A2A]">{familyProgress?.coreCompleted ? "Play again →" : familyProgress && !familyProgress.completed ? "Continue →" : "Start →"}</span></div>
                  </button>
                </div>

                <div className="flex gap-4 sm:gap-6">
                  <div className="flex w-10 shrink-0 flex-col items-center sm:w-12"><span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ring-4 ring-[#FDFCFB] ${fruitProgress?.completed ? "bg-[#B8EAD9] text-[#1F2A2A]" : familyProgress?.coreCompleted ? "border-2 border-[#E9B96D] bg-[#FFF8DC] text-[#8B6422]" : "border-2 border-[#E8E3D9] bg-[#F8F6F1] text-[#94A3B8]"}`}>3</span></div>
                  <button type="button" disabled={!familyProgress?.coreCompleted} onClick={() => setScreen("fruitIntro")} className={`group mb-5 min-w-0 flex-1 overflow-hidden rounded-[1.75rem] border bg-white text-left shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A] disabled:cursor-not-allowed ${familyProgress?.coreCompleted ? "border-[#F0E4C7] hover:border-[#E9B96D] hover:shadow-md" : "border-[#EEE7DC] opacity-70"}`}>
                    <div className="flex items-center justify-between gap-3 bg-[#FFF8E8] px-5 py-5 sm:px-7 sm:py-6">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A16207]">FRUIT · {fruitProgress?.completed ? "DONE" : fruitProgress ? "IN PROGRESS" : familyProgress?.coreCompleted ? "UP NEXT" : "LATER"}</p>
                        <h2 className="mt-2 text-2xl font-light sm:text-3xl">Fruit stand</h2>
                      </div>
                      <span className="flex h-20 w-24 shrink-0 items-end justify-center overflow-hidden sm:h-24 sm:w-28"><img src="/games/fruit/fruit-cluster.png" alt="" className="h-full w-full object-contain object-bottom" /></span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-7"><span className="inline-flex items-center gap-2 rounded-full bg-[#FFFAF0] px-3 py-1.5 text-xs font-medium text-[#64748B]"><span aria-hidden="true">🗣️</span> Ask & share</span><span className="text-sm font-semibold text-[#64748B]">{fruitProgress?.completed ? "Play again →" : fruitProgress ? "Continue →" : familyProgress?.coreCompleted ? "Start →" : "🔒"}</span></div>
                  </button>
                </div>

                <div className="flex gap-4 sm:gap-6">
                  <div className="flex w-10 shrink-0 flex-col items-center sm:w-12"><span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ring-4 ring-[#FDFCFB] ${colourProgress?.completed ? "bg-[#B8EAD9] text-[#1F2A2A]" : fruitProgress?.completed ? "border-2 border-[#A9C7F0] bg-[#EEF5FC] text-[#456F9A]" : "border-2 border-[#E8E3D9] bg-[#F8F6F1] text-[#94A3B8]"}`}>4</span></div>
                  <button type="button" disabled={!fruitProgress?.completed} onClick={startColourChapter} className={`group mb-5 min-w-0 flex-1 overflow-hidden rounded-[1.75rem] border bg-white text-left shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A] disabled:cursor-not-allowed ${fruitProgress?.completed ? "border-[#D8E6F3] hover:border-[#9DBFDF] hover:shadow-md" : "border-[#EEE7DC] opacity-70"}`}>
                    <div className="flex items-center justify-between gap-3 bg-[#F3F7FB] px-5 py-5 sm:px-7 sm:py-6">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#456F9A]">COLOURS · {colourProgress?.completed ? "DONE" : colourProgress ? "IN PROGRESS" : fruitProgress?.completed ? "UP NEXT" : "LATER"}</p>
                        <h2 className="mt-2 text-2xl font-light sm:text-3xl">Colour hunt</h2>
                      </div>
                      <span className="flex shrink-0 items-center justify-center gap-1 sm:gap-2">{colours.map((colour) => <span key={colour.id} className="h-5 w-5 rounded-full border-2 border-white shadow-sm sm:h-9 sm:w-9" style={{ backgroundColor: colour.swatch, borderColor: colour.border ?? "white" }} />)}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-7"><span className="inline-flex items-center gap-2 rounded-full bg-[#F3F7FB] px-3 py-1.5 text-xs font-medium text-[#64748B]"><span aria-hidden="true">🔎</span> Spot & say</span><span className="text-sm font-semibold text-[#64748B]">{colourProgress?.completed ? "Play again →" : colourProgress ? "Continue →" : fruitProgress?.completed ? "Play →" : "🔒"}</span></div>
                  </button>
                </div>
              </div>
              {SENTENCE_CHAPTERS.map((item, i) => {
                const unlocked = true; // Chapter lock is off for now so any chapter can be played.
                const finished = isChapterDone(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={!unlocked}
                    onClick={() => {
                      setSentenceChapter(i);
                      setScreen("sentenceGame");
                    }}
                    className={`group mb-5 flex w-full items-center justify-between gap-4 overflow-hidden rounded-[1.75rem] border-2 text-left shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A] disabled:cursor-not-allowed ${unlocked ? "border-[#F4C24D] bg-gradient-to-r from-[#FFF4DD] to-white hover:shadow-md" : "border-[#EEE7DC] bg-white opacity-70"}`}
                  >
                    <span className="flex min-w-0 items-center gap-4 p-5 sm:p-7">
                      <span className="relative flex shrink-0">
                        <span className="flex h-14 w-14 items-end justify-center overflow-hidden rounded-full border-2 border-white bg-[#F2E4D9] shadow-sm"><img src="/games/family/mama.png" alt="" className="h-full w-full object-cover object-top" /></span>
                        <span className="-ml-4 flex h-14 w-14 items-end justify-center overflow-hidden rounded-full border-2 border-white bg-[#F1E2E4] shadow-sm"><img src="/games/family/baba.png" alt="" className="h-full w-full object-cover object-top" /></span>
                        <span className="absolute -bottom-2 -right-3 text-3xl" aria-hidden="true">{item.id === "ch1" ? "🍎" : "🥛"}</span>
                      </span>
                      <span className="min-w-0"><span className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#C27C0E]">LEVEL 1 · CHAPTER {item.number} · {finished ? "DONE ⭐" : "PLAY ANY TIME"}</span><span className="mt-2 block text-xl font-light sm:text-2xl">{item.title} · {item.subtitle}</span><span className="mt-1 block text-sm text-[#64748B]">Read it, tap it</span></span>
                    </span>
                    <span className={`mr-5 shrink-0 rounded-full px-4 py-2 text-sm font-semibold sm:mr-7 ${unlocked ? "bg-[#2BB673] text-white" : "text-[#94A3B8]"}`}>{!unlocked ? "🔒" : finished ? "Again →" : "Play →"}</span>
                  </button>
                );
              })}
              <button type="button" onClick={() => setScreen("classLesson")} className="mb-5 flex w-full items-center justify-between gap-4 overflow-hidden rounded-[1.75rem] border border-[#D9EEE5] bg-white text-left shadow-sm transition hover:border-[#8BD2B9] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">
                <span className="flex min-w-0 items-center gap-4 p-5 sm:p-7"><span className="flex shrink-0 items-end gap-1"><span className="flex h-16 w-14 items-end justify-center overflow-hidden rounded-xl bg-[#E8F4F7]"><img src="/video/ikenna.png" alt="" className="h-full w-full object-contain object-bottom" /></span><span className="flex h-14 w-12 items-end justify-center overflow-hidden rounded-xl bg-[#F1F4E8]"><img src="/video/ada.png" alt="" className="h-full w-full object-contain object-bottom" /></span></span><span className="min-w-0"><span className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#0F766E]">CLASS · TODAY</span><span className="mt-2 block text-xl font-light sm:text-2xl">Let’s meet and talk!</span><span className="mt-1 block text-sm text-[#64748B]">60-minute class adventure</span></span></span>
                <span className="mr-5 shrink-0 rounded-full bg-[#B8EAD9] px-4 py-2 text-sm font-semibold sm:mr-7">Start →</span>
              </button>
              <p className="mt-2 text-center text-xs text-[#94A3B8]">Your chapter progress is saved on this device.</p>
            </div>
          </section>
        ) : screen === "sentenceGame" ? (
          <ChineseSentenceGame
            key={sentenceChapter}
            chapter={SENTENCE_CHAPTERS[sentenceChapter]}
            guide={currentGuide ?? guides[0]}
            onExit={() => setScreen("journey")}
            onNext={sentenceChapter + 1 < SENTENCE_CHAPTERS.length ? () => setSentenceChapter(sentenceChapter + 1) : undefined}
          />
        ) : screen === "classLesson" ? (
          <ChineseClassLesson onBack={() => setScreen("journey")} />
        ) : screen === "familyPreview" ? (
          <section className="my-auto py-10">
            <div className="mx-auto max-w-xl rounded-[2rem] border border-[#EEE7DC] bg-white px-6 py-8 text-center shadow-sm sm:px-10">
              <img src="/games/family/family-group.png" alt="" className="mx-auto h-36 w-48 object-contain" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#A16207]">Chapter 2</p>
              <h1 className="mt-2 text-3xl font-light sm:text-4xl">Family photo</h1>
              <div className="mx-auto mt-5 flex max-w-md items-center justify-center gap-3 rounded-2xl bg-[#FBF8F2] px-4 py-4 text-left">
                <span className="flex h-14 w-14 shrink-0 items-end justify-center overflow-hidden rounded-2xl bg-[#F1F4E8]"><img src="/video/ada.png" alt="" className="h-full w-full object-contain object-bottom" /></span>
                <span>
                  <span className="block text-xs font-semibold text-[#64748B]">Ada says</span>
                  <span className="mt-1 flex flex-wrap gap-1 text-lg font-semibold text-[#0F766E]"><span>Zhè shì</span><span className="rounded-md bg-[#EAF7F2] px-1">wǒ māma.</span></span>
                  <span className="mt-1 flex flex-wrap gap-1 text-sm text-[#64748B]"><span>This is</span><span className="rounded-md bg-[#EAF7F2] px-1">my mum.</span></span>
                </span>
              </div>
              <p className="mt-4 text-sm text-[#64748B]">Now say it, then find the person.</p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={() => startFamily(familyProgress?.set === "grandparents" && !familyProgress.grandparentsCompleted ? "grandparents" : "core")} className="min-h-12 rounded-full bg-[#B8EAD9] px-6 font-semibold transition hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">{familyProgress && !familyProgress.completed ? "Continue" : familyProgress?.coreCompleted ? "Play again" : "Let’s play"} →</button>
                {familyProgress?.coreCompleted && !familyProgress?.grandparentsCompleted && <button type="button" onClick={() => startFamily("grandparents")} className="min-h-12 rounded-full bg-[#FFF0D8] px-6 font-semibold transition hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">Meet Grandma & Grandpa</button>}
              </div>
              <button type="button" onClick={() => setScreen("journey")} className="mt-4 min-h-10 px-4 text-sm font-medium text-[#64748B] hover:text-[#1F2A2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">← Back</button>
            </div>
          </section>
        ) : screen === "familyPlay" ? (
          <section className="my-auto py-7">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A16207]">Family photo {familySet === "grandparents" ? "· Bonus" : ""}</p><h1 className="mt-1 text-2xl font-light sm:text-3xl">Say the whole line!</h1></div>
                <span className="shrink-0 rounded-full border border-[#EEE7DC] bg-white px-4 py-2 text-sm text-[#64748B]">{familyRoundIndex + 1} of {currentFamilyRounds.length}</span>
              </div>
              <div className="mb-5 flex gap-2" aria-label={`Family photo ${familyRoundIndex + 1} of ${currentFamilyRounds.length}`}>
                {currentFamilyRounds.map((item, index) => <span key={item.id} className={`h-1.5 flex-1 rounded-full ${index <= familyRoundIndex ? "bg-[#E9B96D]" : "bg-[#EEE7DC]"}`} />)}
              </div>
              <div className="mb-4 flex justify-center gap-1.5 rounded-2xl bg-white px-3 py-3" aria-label="Family photo fills in as you match">
                {[...familyRounds, ...grandparentRounds].map((item, index) => {
                  const filled = index < familyRounds.length ? index < corePhotoCount : index - familyRounds.length < grandparentPhotoCount;
                  return <span key={item.id} className={`flex h-12 w-10 items-end justify-center overflow-hidden rounded-xl transition-all duration-300 ${filled ? "" : "border border-dashed border-[#E8E3D9] bg-[#FAF8F4]"}`} style={filled ? { backgroundColor: item.color } : undefined}>
                    {filled && <img src={item.image} alt="" className="h-full w-full object-contain object-bottom" />}
                  </span>;
                })}
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-[#EEE7DC] bg-white shadow-sm">
                <div className="flex items-center gap-3 bg-[#FBF8F2] px-5 py-4 sm:px-7">
                  <span className="flex h-14 w-14 shrink-0 items-end justify-center overflow-hidden rounded-2xl" style={{ backgroundColor: currentGuide?.color ?? "#EAF7F2" }}><img src={currentGuide?.image} alt="" className="h-full w-full object-contain object-bottom mix-blend-multiply" /></span>
                  <p className="rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm font-medium text-[#475569] shadow-sm">Say it, then tap!</p>
                </div>
                <div className="px-4 py-5 sm:px-7 sm:py-7">
                  <div className="mx-auto mb-5 max-w-lg text-center">
                    <p className="text-2xl font-medium sm:text-3xl">Zhè shì wǒ…</p>
                    <p className="mt-2 inline-flex rounded-full bg-[#FFF6EA] px-4 py-2 text-sm font-semibold text-[#704B21]">Find: my {currentFamilyRound.meaning}</p>
                  </div>
                  <div className={`mx-auto grid max-w-2xl gap-3 ${currentFamilyRounds.length === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}>
                    {currentFamilyRounds.map((item) => {
                      const chosen = familyAnswerId === item.id;
                      return <button key={item.id} type="button" onClick={() => chooseFamilyMember(item.id)} disabled={Boolean(familyAnswerId)} className={`overflow-hidden rounded-2xl border p-2 text-center transition hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A] disabled:cursor-default ${chosen ? "border-[#73C9A6] bg-[#EFF9F4]" : "border-[#EEE7DC] bg-white hover:border-[#E9B96D]"}`}>
                        <span className="flex h-36 items-end justify-center overflow-hidden rounded-xl" style={{ backgroundColor: item.color }}><img src={item.image} alt="" className="h-full w-full object-contain object-bottom" /></span>
                        <span className="mt-2 block text-sm font-semibold">{item.pinyin}</span>
                      </button>;
                    })}
                  </div>
                  {familyFeedback === "try-again" && <p className="mx-auto mt-4 max-w-lg rounded-2xl bg-[#FFF6EA] px-4 py-3 text-center text-sm font-medium text-[#704B21]" role="status" aria-live="polite">Try again—find my {currentFamilyRound.meaning}.</p>}
                  {familyAnswerId && <div className="mx-auto mt-4 max-w-lg rounded-2xl bg-[#F5FAF7] px-4 py-4 text-center" role="status" aria-live="polite">
                    <p className="font-semibold">Great! Say the whole sentence:</p>
                    <p className="mt-1 text-lg font-medium text-[#0F766E]">Zhè shì wǒ {currentFamilyRound.pinyin}.</p>
                    <p className="mt-1 text-sm text-[#64748B]">This is my {currentFamilyRound.meaning}.</p>
                    <button type="button" onClick={continueFamily} className="mt-3 min-h-11 rounded-full bg-[#B8EAD9] px-5 text-sm font-semibold transition hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">{familyRoundIndex === currentFamilyRounds.length - 1 ? "Finish the photo" : "Next person"} →</button>
                  </div>}
                </div>
              </div>
            </div>
          </section>
        ) : screen === "familyComplete" ? (
          <section className="my-auto py-8">
            <div className="mx-auto max-w-xl rounded-[2rem] border border-[#EEE7DC] bg-white px-6 py-9 text-center shadow-sm sm:px-10">
              <img src="/games/family/family-group.png" alt="" className="mx-auto h-48 w-full max-w-sm object-contain" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#A16207]">Family photo complete</p>
              <h1 className="mt-2 text-3xl font-light">{familyProgress?.grandparentsCompleted ? "Everyone’s in the photo!" : "The photo is ready!"}</h1>
              <p className="mt-3 text-sm text-[#64748B]">You can say:</p>
              <p className="mt-1 text-lg font-medium text-[#0F766E]">Zhè shì wǒ {familySet === "grandparents" ? "yéye" : "māma"}.</p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                {!familyProgress?.grandparentsCompleted && <button type="button" onClick={() => startFamily("grandparents")} className="min-h-12 rounded-full bg-[#FFF0D8] px-6 font-semibold transition hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">Meet Grandma & Grandpa →</button>}
                <button type="button" onClick={() => setScreen("journey")} className="min-h-12 rounded-full border border-[#E8F4EF] px-6 font-medium text-[#475569] transition hover:bg-[#FAFBFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">My path</button>
              </div>
            </div>
          </section>
        ) : screen === "fruitIntro" ? (
          <section className="my-auto py-8">
            <div className="mx-auto max-w-xl rounded-[2rem] border border-[#F0E4C7] bg-white px-5 py-8 text-center shadow-sm sm:px-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A16207]">Chapter 3 · Fruit</p>
              <h1 className="mt-3 text-3xl font-light sm:text-4xl">Our plates are empty!</h1>
              <div className="mt-6 flex items-end justify-center gap-3">
                <span className="flex h-24 w-20 items-end justify-center overflow-hidden rounded-2xl bg-[#F1F4E8]"><img src="/video/ada.png" alt="Ada" className="h-full w-full object-contain object-bottom" /></span>
                <span className="pb-2 text-4xl" aria-hidden="true">🍽️</span>
                <span className="pb-2 text-4xl" aria-hidden="true">🍽️</span>
                <span className="flex h-24 w-20 items-end justify-center overflow-hidden rounded-2xl bg-[#E8F4F7]"><img src="/video/ikenna.png" alt="Ikenna" className="h-full w-full object-contain object-bottom" /></span>
              </div>
              <p className="mt-4 text-sm text-[#64748B]">Let’s fill them together.</p>
              <button type="button" onClick={startFruitGame} className="mt-6 min-h-12 rounded-full bg-[#B8EAD9] px-7 font-semibold transition hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">{fruitProgress && !fruitProgress.completed ? 'Continue' : fruitProgress?.completed ? 'Play again' : 'Play'} →</button>
            </div>
          </section>
        ) : screen === "fruitLearn" ? (
          <section className="my-auto py-8">
            <div className="mx-auto max-w-2xl">
              <div className="mb-5 flex items-center justify-end text-sm text-[#64748B]"><span>{fruitLearnIndex + 1} of {fruits.length}</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-[#F0EDE6]"><div className="h-full rounded-full bg-[#B8EAD9] transition-all" style={{ width: `${((fruitLearnIndex + 1) / fruits.length) * 100}%` }} /></div>
              <div className="mt-5 rounded-[2rem] border border-[#F0E4C7] bg-white p-6 text-center shadow-sm sm:p-9">
                <div className="mx-auto mt-5 flex h-40 w-40 items-center justify-center rounded-[2rem]" style={{ backgroundColor: currentLearnFruit.color }}><span className="text-8xl" aria-hidden="true">{currentLearnFruit.emoji}</span></div>
                <p className="mt-5 text-3xl font-semibold text-[#0F766E]">{currentLearnFruit.pinyin}</p>
                <p className="mt-1 text-lg text-[#64748B]">{currentLearnFruit.meaning}</p>
                <button type="button" onClick={() => fruitLearnIndex + 1 < fruits.length ? saveFruitProgress({ ...fruitProgress, learnIndex: fruitLearnIndex + 1 }) : moveToFruitRecall()} className="mt-7 min-h-12 rounded-full bg-[#B8EAD9] px-7 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">{fruitLearnIndex + 1 < fruits.length ? 'Next fruit →' : 'I know these! Play →'}</button>
              </div>
            </div>
          </section>
        ) : screen === "fruitRecall" ? (
          <section className="my-auto py-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-5 flex items-center justify-between text-sm text-[#64748B]"><span>Find the fruit</span><span>{fruitRecallIndex + 1} of {fruitRecallTargets.length}</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-[#F0EDE6]"><div className="h-full rounded-full bg-[#F5D28C] transition-all" style={{ width: `${((fruitRecallIndex + 1) / fruitRecallTargets.length) * 100}%` }} /></div>
              <div className="mt-5 rounded-[2rem] border border-[#F0E4C7] bg-white p-5 shadow-sm sm:p-8">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-[#A16207]">Fruit picture game</p>
                <h1 className="mt-3 text-center text-2xl font-light sm:text-3xl">Can you find the <strong className="font-semibold">{currentRecallFruit.meaning}</strong>?</h1>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {fruits.map((fruit) => <button key={fruit.id} type="button" disabled={fruitRecallFeedback === 'correct'} onClick={() => checkFruitRecall(fruit.id)} className={`flex min-h-28 flex-col items-center justify-center rounded-2xl border px-2 py-3 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A] ${fruitRecallFeedback === 'correct' && fruit.id === currentRecallFruit.id ? 'border-[#64B99D] bg-[#EFF9F4]' : 'border-[#EEE7DC] hover:border-[#E9B96D] hover:bg-[#FFFCF4]'}`}><span className="text-5xl" aria-hidden="true">{fruit.emoji}</span><span className="mt-2 text-sm font-medium">{fruit.pinyin}</span></button>)}
                </div>
                {fruitRecallFeedback === 'try-again' && <p className="mt-4 text-center text-sm font-medium text-[#A16207]" role="status">Not that one. Try again!</p>}
                {fruitRecallFeedback === 'correct' && <div className="mt-4 text-center" role="status"><p className="font-semibold text-[#0F766E]">Yes! {currentRecallFruit.pinyin} means {currentRecallFruit.meaning}.</p><button type="button" onClick={advanceFruitRecall} className="mt-3 min-h-11 rounded-full bg-[#B8EAD9] px-6 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">{fruitRecallIndex + 1 < fruitRecallTargets.length ? 'Next one →' : 'Let’s talk! →'}</button></div>}
              </div>
            </div>
          </section>
        ) : screen === "fruitTalk" ? (
          <section className="my-auto py-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-5 flex items-center justify-between text-sm text-[#64748B]"><span>Talk together</span><span>{servedFruits.length} of {FRUIT_TALK_ROUNDS} plates filled</span></div>
              <div className="mb-5 flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-[#FFF8E8] px-4 py-3" aria-label="Fruit on the plates">{servedFruits.map((id) => { const fruit = fruits.find((item) => item.id === id); return <span key={id} className="text-3xl" aria-label={fruit.meaning}>{fruit.emoji}</span>; })}{!servedFruits.length && <span className="text-sm text-[#8B7355]">Ada and Ikenna’s plates are empty.</span>}</div>
              {fruitTalkIndex === 0 && fruitTalkStep < 2 ? (
                <div className="overflow-hidden rounded-[2rem] border border-[#F0E4C7] bg-white shadow-sm">
                  <div className="flex items-center gap-4 bg-[#FFF8E8] p-5 sm:p-7"><span className="flex h-20 w-20 shrink-0 items-end justify-center overflow-hidden rounded-2xl bg-[#F1F4E8]"><img src="/video/ada.png" alt="Ada" className="h-full w-full object-contain object-bottom" /></span><div><p className="text-xs font-semibold uppercase tracking-wide text-[#8B6422]">{fruitTalkStep === 0 ? 'Ada asks Ikenna' : 'Ada asks'}</p><p className="mt-2 text-xl font-semibold text-[#704B21]">Nǐ xǐhuan píngguǒ ma?</p><p className="mt-1 text-sm text-[#64748B]">Do you like apples?</p></div></div>
                  {fruitTalkStep === 1 && <div className="flex items-center gap-4 border-t border-[#F3EEE2] bg-[#F1F8F3] p-5 sm:p-7"><span className="flex h-20 w-20 shrink-0 items-end justify-center overflow-hidden rounded-2xl bg-[#E8F4F7]"><img src="/video/ikenna.png" alt="Ikenna" className="h-full w-full object-contain object-bottom" /></span><div><p className="text-xs font-semibold uppercase tracking-wide text-[#0F766E]">Ikenna replies</p><p className="mt-2 text-xl font-semibold text-[#0F766E]">Wǒ xǐhuan píngguǒ.</p><p className="mt-1 text-sm text-[#64748B]">I like apples.</p></div></div>}
                  <div className="px-5 py-5 text-center sm:px-7"><p className="text-sm text-[#64748B]">{fruitTalkStep === 0 ? 'nǐ = you · xǐhuan = like · ma turns it into a question.' : 'wǒ = I · xǐhuan = like. Now let’s use a fruit you choose!'}</p><button type="button" onClick={advanceFruitTalk} className="mt-4 min-h-12 rounded-full bg-[#B8EAD9] px-6 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">{fruitTalkStep === 0 ? 'See Ikenna’s reply →' : 'Your turn! →'}</button></div>
                </div>
              ) : (
                <div className="rounded-[2rem] border border-[#F0E4C7] bg-white p-5 shadow-sm sm:p-8">
                  {!fruitTalkAnswerId ? <><p className="text-center text-lg font-medium">Choose a fruit for Ikenna.</p><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{fruits.filter((fruit) => !servedFruits.includes(fruit.id)).map((fruit) => <button key={fruit.id} type="button" onClick={() => setFruitTalkAnswerId(fruit.id)} className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-[#EEE7DC] p-3 transition hover:border-[#E9B96D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]"><span className="text-5xl" aria-hidden="true">{fruit.emoji}</span><span className="mt-2 text-sm font-medium">{fruit.pinyin}</span><span className="text-xs text-[#64748B]">{fruit.meaning}</span></button>)}</div></> : <><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-[#FFF8E8] p-4"><p className="text-xs font-semibold text-[#8B6422]">Ada asks</p><p className="mt-2 font-semibold text-[#704B21]">Nǐ xǐhuan {fruits.find((fruit) => fruit.id === fruitTalkAnswerId).pinyin} ma?</p><p className="mt-1 text-sm text-[#64748B]">Do you like {fruits.find((fruit) => fruit.id === fruitTalkAnswerId).plural}?</p></div><div className="rounded-2xl bg-[#F1F8F3] p-4"><p className="text-xs font-semibold text-[#0F766E]">Ikenna replies</p><p className="mt-2 font-semibold text-[#0F766E]">Wǒ xǐhuan {fruits.find((fruit) => fruit.id === fruitTalkAnswerId).pinyin}.</p><p className="mt-1 text-sm text-[#64748B]">I like {fruits.find((fruit) => fruit.id === fruitTalkAnswerId).plural}.</p></div></div><p className="mt-4 text-center text-sm text-[#64748B]">Say Ada’s question and Ikenna’s reply. Then fill a plate!</p><div className="text-center"><button type="button" onClick={advanceFruitTalk} className="mt-3 min-h-12 rounded-full bg-[#B8EAD9] px-6 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">Add {fruits.find((fruit) => fruit.id === fruitTalkAnswerId).emoji} to the plates →</button></div></>}
                </div>
              )}
            </div>
          </section>
        ) : screen === "fruitComplete" ? (
          <section className="my-auto py-8">
            <div className="mx-auto max-w-xl rounded-[2rem] border border-[#F0E4C7] bg-white px-6 py-10 text-center shadow-sm sm:px-10">
              <div className="flex justify-center gap-3 rounded-3xl bg-[#FFF8E8] py-6 text-5xl">{servedFruits.map((id) => <span key={id}>{fruits.find((fruit) => fruit.id === id)?.emoji}</span>)}</div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#A16207]">Fruit stand complete</p>
              <h1 className="mt-2 text-3xl font-light">You learned the fruit and made a conversation!</h1>
              <p className="mt-4 text-base font-semibold text-[#0F766E]">Nǐ xǐhuan… ma? · Wǒ xǐhuan…</p>
              <p className="mt-2 text-sm text-[#64748B]">You can ask what someone likes and tell them what you like.</p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={() => setScreen("journey")} className="min-h-12 rounded-full bg-[#B8EAD9] px-6 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">My path</button><button type="button" onClick={() => setScreen("fruitIntro")} className="min-h-12 rounded-full border border-[#EEE7DC] px-6 font-medium text-[#475569] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">Play again</button></div>
            </div>
          </section>
        ) : screen === "colourHunt" ? (
          <section className="my-auto py-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-5 flex items-center justify-between text-sm text-[#64748B]"><span>Colour hunt</span><span>{colourHuntIndex + 1} of {colours.length}</span></div>
              <div className="mb-5 h-2 overflow-hidden rounded-full bg-[#F0EDE6]"><div className="h-full rounded-full bg-[#A9C7F0] transition-all" style={{ width: `${((colourHuntIndex + 1) / colours.length) * 100}%` }} /></div>
              <div className="rounded-[2rem] border border-[#D8E6F3] bg-white p-5 shadow-sm sm:p-8">
                <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:text-left">
                  <img src={currentGuide.image} alt="" className="h-16 w-16 rounded-2xl bg-[#F3F7FB] object-contain object-bottom" />
                  <span className="h-12 w-12 shrink-0 rounded-full border-4 border-white shadow-md" style={{ backgroundColor: currentHuntColour.swatch, borderColor: currentHuntColour.border ?? "white" }} />
                  <div><h1 className="text-2xl font-light sm:text-3xl">Tap all the {currentHuntColour.pinyin} things!</h1><p className="mt-1 text-sm text-[#64748B]">Say {currentHuntColour.pinyin} out loud first.</p></div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {colourHuntItems.map((item) => {
                    const found = colourFoundIds.includes(item.id);
                    const itemColour = colours.find((colour) => colour.id === item.colourId);
                    return <button key={item.id} type="button" disabled={found} onClick={() => tapColourHuntItem(item)} aria-label={`${item.label}, ${item.colourId}${found ? ", found" : ""}`} className={`relative flex min-h-28 items-center justify-center rounded-2xl border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A] ${found ? "border-[#63A66D] scale-[0.98]" : "hover:-translate-y-0.5"}`} style={{ backgroundColor: itemColour.tile, borderColor: found ? "#63A66D" : itemColour.border ?? "transparent" }}>
                      <span className="text-5xl" aria-hidden="true">{item.emoji}</span>{found && <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-[#28724F]" aria-hidden="true">✓</span>}
                    </button>;
                  })}
                </div>
                <div className="mt-5 min-h-12 text-center" aria-live="polite">
                  {currentColourFoundCount === 2 ? <><p className="font-semibold text-[#28724F]">You found them all!</p><button type="button" onClick={continueColourHunt} className="mt-2 min-h-11 rounded-full bg-[#DDEAF7] px-6 font-semibold text-[#294F73] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">{colourHuntIndex + 1 < colours.length ? "Next colour →" : "Finish →"}</button></> : <><p className="text-sm text-[#64748B]">Found {currentColourFoundCount} of 2</p>{colourFeedback && <p className="mt-1 text-sm font-medium text-[#A16207]">{colourFeedback}</p>}</>}
                </div>
              </div>
            </div>
          </section>
        ) : screen === "colourComplete" ? (
          <section className="my-auto py-8">
            <div className="mx-auto max-w-xl rounded-[2rem] border border-[#D8E6F3] bg-white px-6 py-10 text-center shadow-sm sm:px-10">
              <div className="flex justify-center gap-3">{colours.map((colour) => <span key={colour.id} className="h-12 w-12 rounded-full border-4 border-white shadow-md" style={{ backgroundColor: colour.swatch }} />)}</div>
              <h1 className="mt-6 text-3xl font-light">You found every colour!</h1>
              <p className="mt-2 text-sm text-[#64748B]">Great spotting!</p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={() => setScreen("journey")} className="min-h-12 rounded-full bg-[#B8EAD9] px-6 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">My path</button><button type="button" onClick={startColourChapter} className="min-h-12 rounded-full border border-[#D8E6F3] px-6 font-medium text-[#456F9A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">Play again</button></div>
            </div>
          </section>
        ) : screen === "resume" && savedProgress ? (
          <section className="my-auto py-10">
            <div className="mx-auto max-w-xl rounded-[2rem] border border-[#E8F4EF] bg-white px-6 py-9 text-center shadow-sm sm:px-10">
              <span className="mx-auto flex h-24 w-24 items-end justify-center overflow-hidden rounded-3xl" style={{ backgroundColor: currentGuide.color }}>
                <img src={currentGuide.image} alt="" className="h-full w-full object-contain object-bottom mix-blend-multiply" />
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#64748B]">Mission 1 · Let’s say hello</p>
              <h1 className="mt-2 text-2xl font-light sm:text-3xl">{savedProgress.completed ? "Your hello adventure is complete!" : "Ready to continue?"}</h1>
              <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
                {savedProgress.completed
                  ? `You finished with ${savedProgress.score} out of ${rounds.length}. Replay whenever you like.`
                  : `Pick up with ${currentGuide.name} at question ${(savedProgress.roundIndex ?? 0) + 1} of ${rounds.length}.`}
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={resumeMission} className="min-h-12 rounded-full bg-[#B8EAD9] px-6 font-semibold transition hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">
                  {savedProgress.completed ? "See your finish" : "Continue adventure"} →
                </button>
                <button type="button" onClick={() => setScreen("journey")} className="min-h-12 rounded-full border border-[#E8F4EF] px-6 font-medium text-[#475569] transition hover:bg-[#FAFBFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">Back to your path</button>
              </div>
            </div>
          </section>
        ) : screen === "choose" ? (
          <section className="my-auto py-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7F2] text-2xl" aria-hidden="true">👋</div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">Your Chinese learning buddy</p>
              <h1 className="text-3xl font-light tracking-tight sm:text-5xl">Choose who’ll guide you</h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#64748B] sm:text-lg">Pick a friend to join you on every chapter of your learning path.</p>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {guides.map((item) => {
                  const selected = guide === item.id;
                  return (
                    <button key={item.id} type="button" aria-pressed={selected} onClick={() => setGuide(item.id)} className={`group flex min-h-36 items-center gap-5 rounded-3xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A] ${selected ? "border-[#1F2A2A] ring-2 ring-[#B8EAD9]" : "border-[#E8F4EF]"}`}>
                      <span className="flex h-28 w-28 shrink-0 items-end justify-center overflow-hidden rounded-2xl" style={{ backgroundColor: item.color }}>
                        <img src={item.image} alt="" className="h-full w-full object-contain object-bottom mix-blend-multiply" />
                      </span>
                      <span>
                        <span className="block text-xl font-semibold">{item.name}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-[#64748B]">{item.id === "sade" ? "Curious, kind, and ready to explore." : item.id === "ada" ? "Bright, thoughtful, and full of ideas." : item.id === "ikenna" ? "A clever problem-solver with a big smile." : "Playful, thoughtful, and up for a challenge."}</span>
                        <span className={`mt-3 inline-block text-sm font-semibold ${selected ? "text-[#0F766E]" : "text-[#64748B]"}`}>{selected ? "Your practice partner ✓" : "Choose " + item.name}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <button type="button" disabled={!guide} onClick={continueToJourney} className="mt-7 min-h-14 w-full max-w-sm rounded-full bg-[#B8EAD9] px-8 text-base font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A] focus-visible:ring-offset-2">Continue to my journey <span aria-hidden="true">→</span></button>
            </div>
          </section>
        ) : screen === "play" ? (
          <section className="my-auto py-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#64748B]">Mission 1</p>
                  <h1 className="mt-1 text-2xl font-light sm:text-3xl">Let’s say hello!</h1>
                </div>
                <span className="shrink-0 rounded-full border border-[#E8F4EF] bg-white px-4 py-2 text-sm text-[#64748B]">{roundIndex + 1} of {rounds.length}</span>
              </div>

              <div className="mb-6 flex gap-2" aria-label={`Conversation ${roundIndex + 1} of ${rounds.length}`}>
                {rounds.map((item, index) => <span key={item.pinyin + index} className={`h-1.5 flex-1 rounded-full ${index <= roundIndex ? "bg-[#8BD2B9]" : "bg-[#E8F4EF]"}`} />)}
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-[#E8F4EF] bg-white shadow-sm">
                {roundIndex === rounds.length - 1 ? (
                  <div className="bg-[#F5FAF7] px-5 py-6 sm:px-8 sm:py-7">
                    <p className="mb-5 text-center text-sm leading-relaxed text-[#475569]">{currentGuide.name} and {conversationPartner.name} reach the gate together.</p>
                    <div className="mx-auto flex max-w-lg items-center justify-center gap-4 sm:gap-8">
                      {[currentGuide, conversationPartner].map((item, index) => (
                        <div key={item.id} className={`flex min-w-0 flex-1 flex-col items-center ${index === 1 ? "pt-8" : ""}`}>
                          <span className="flex h-24 w-24 items-end justify-center overflow-hidden rounded-3xl sm:h-28 sm:w-28" style={{ backgroundColor: item.color }}>
                            <img src={item.image} alt={item.name} className="h-full w-full object-contain object-bottom mix-blend-multiply" />
                          </span>
                          <span className="mt-2 text-sm font-semibold">{item.name}</span>
                          {item.id === conversationPartner.id && <span className="mt-3 rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-center text-base font-semibold shadow-sm">xièxie!</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 bg-[#F5FAF7] px-5 py-5 sm:px-8">
                    <span className="flex h-20 w-20 shrink-0 items-end justify-center overflow-hidden rounded-2xl" style={{ backgroundColor: currentGuide.color }}>
                      <img src={currentGuide.image} alt="" className="h-full w-full object-contain object-bottom mix-blend-multiply" />
                    </span>
                    <div className="flex-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
                      <p className="text-xs font-semibold text-[#0F766E]">{currentGuide.name} and a new friend</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#475569]">{round.line}</p>
                    </div>
                  </div>
                )}

                <div className="px-5 py-7 sm:px-8 sm:py-9">
                  <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-xl font-medium sm:text-2xl">{round.prompt}</h2>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {round.answers.map((option, index) => {
                        const chosen = answerIndex === index;
                        let style = "border-[#E8F4EF] bg-white hover:border-[#B8EAD9] hover:bg-[#FAFDFC]";
                        if (answerIndex !== null && option.correct) style = "border-[#73C9A6] bg-[#EFF9F4]";
                        else if (chosen && !option.correct) style = "border-[#E6B8A8] bg-[#FFF6F2]";
                        return <button key={option.text} type="button" onClick={() => chooseAnswer(index)} disabled={answerIndex !== null} className={`flex min-h-20 flex-col items-center justify-center rounded-2xl border px-4 py-3 text-base font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A] disabled:cursor-default ${style}`}>
                          <span>{option.text}</span><span className="mt-1 text-xs font-normal text-[#64748B]">{option.note}</span>
                        </button>;
                      })}
                    </div>

                    {answer && <div className="mt-5 rounded-2xl bg-[#F5FAF7] px-4 py-4 text-left" role="status" aria-live="polite">
                      <p className="font-semibold">{answer.correct ? "Nice choice! ✨" : "Good try. Let’s keep the conversation going."}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#64748B]">{round.answers.find((item) => item.correct).text} means “{round.meaning}”.</p>
                      {roundIndex === rounds.length - 1 && <div className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white px-3 py-3 text-sm shadow-sm sm:gap-3">
                        <span className="font-semibold text-[#0F766E]">{currentGuide.name}: bú kèqi!</span>
                        <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                        <span className="font-semibold text-[#0F766E]">{conversationPartner.name}: zàijiàn!</span>
                        <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                        <span className="font-semibold text-[#0F766E]">{currentGuide.name}: zàijiàn!</span>
                      </div>}
                      <button type="button" onClick={continueMission} className="mt-3 min-h-11 rounded-full bg-[#B8EAD9] px-5 text-sm font-semibold transition hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">{roundIndex === rounds.length - 1 ? "Finish the conversation" : "Next line"} →</button>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="my-auto py-8">
            <div className="mx-auto max-w-xl rounded-[2rem] border border-[#E8F4EF] bg-white px-6 py-12 text-center shadow-sm sm:px-12">
              <div className="mx-auto flex h-24 w-24 items-end justify-center overflow-hidden rounded-3xl" style={{ backgroundColor: currentGuide.color }}><img src={currentGuide.image} alt="" className="h-full w-full object-contain object-bottom mix-blend-multiply" /></div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#64748B]">Mission complete</p>
              <h1 className="mt-2 text-3xl font-light">The gate is open!</h1>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-[#64748B]">You met a new friend, shared your names, and helped at the gate. You got {score} out of {rounds.length}.</p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={() => beginMission()} className="min-h-12 rounded-full bg-[#B8EAD9] px-6 font-semibold transition hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">Play this chapter again</button>
                <button type="button" onClick={() => setScreen("familyPreview")} className="min-h-12 rounded-full bg-[#FFF0D8] px-6 font-semibold transition hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">Next chapter: Family →</button>
              </div>
            </div>
          </section>
        )}

        <footer className="py-4 text-center text-xs text-[#94A3B8]">Omeda · Keep learning, one little adventure at a time.</footer>
      </div>
    </main>
  );
}
