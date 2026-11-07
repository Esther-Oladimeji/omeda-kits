import { useState } from "react";

const classroomRounds = [
  {
    scene: "The teacher is speaking too fast!",
    prompt: "What can you say?",
    answer: "Děng yíxià.",
    meaning: "Wait a moment.",
    options: ["Děng yíxià.", "Wǒ zhīdào.", "Nǐ hǎo!"],
  },
  {
    scene: "A new word is on the board.",
    prompt: "Ask what it means.",
    answer: "Zhè shì shénme yìsi?",
    meaning: "What does this mean?",
    options: ["Wǒ bù zhīdào.", "Zhè shì shénme yìsi?", "Děng yíxià."],
  },
  {
    scene: "You want to check if your friend knows.",
    prompt: "What do you ask?",
    answer: "Nǐ zhīdào ma?",
    meaning: "Do you know?",
    options: ["Nǐ zhīdào ma?", "Wǒ jiào…", "Zhè shì shénme yìsi?"],
  },
  {
    scene: "The teacher asks. You know the answer!",
    prompt: "Choose your reply.",
    answer: "Wǒ zhīdào!",
    meaning: "I know!",
    options: ["Wǒ bù zhīdào.", "Wǒ zhīdào!", "Děng yíxià."],
  },
  {
    scene: "You don’t know the answer yet.",
    prompt: "That’s okay. What can you say?",
    answer: "Wǒ bù zhīdào.",
    meaning: "I don’t know.",
    options: ["Wǒ bù zhīdào.", "Nǐ zhīdào ma?", "Wǒ jiào…"],
  },
];

const sections = [
  { name: "Hello!", minutes: 4, color: "#EAF7F2" },
  { name: "Classroom phrases", minutes: 8, color: "#FFF8E8" },
  { name: "Meet a friend", minutes: 10, color: "#E8F4F7" },
  { name: "Add your details", minutes: 8, color: "#F1F4E8" },
  { name: "Practise together", minutes: 10, color: "#EAF7F2" },
  { name: "Choose the reply", minutes: 7, color: "#FFF8E8" },
  { name: "Fill the gaps", minutes: 8, color: "#E8F4F7" },
  { name: "Your introduction", minutes: 5, color: "#F5F0FA" },
];
const replyRounds = [
  { question: "Nǐ hǎo!", meaning: "Hello!", answer: "Nǐ hǎo!", options: ["Nǐ hǎo!", "Wǒ zhù zài Ekon.", "Děng yíxià."] },
  { question: "Nǐ jiào shénme míngzi?", meaning: "What’s your name?", answer: "Wǒ jiào Kamsi.", options: ["Wǒ jiào Kamsi.", "Wǒ zhīdào.", "Wǒ yǒu yì zhī gǒu."] },
  { question: "Nǐ zhù zài nǎli?", meaning: "Where do you live?", answer: "Wǒ zhù zài Ekon.", options: ["Wǒ bù zhīdào.", "Wǒ zhù zài Ekon.", "Nǐ hǎo!"] },
  { question: "Nǐ yǒu gǒu ma?", meaning: "Do you have a dog?", answer: "Wǒ yǒu yì zhī gǒu.", options: ["Zhè shì shénme yìsi?", "Wǒ yǒu yì zhī gǒu.", "Wǒ jiào Kaosi."] },
];
const gapRounds = [
  { before: "Wǒ ___ zài Ekon.", answer: "zhù", after: "I live in Ekon.", options: ["zhù", "jiào", "yǒu"] },
  { before: "Nǐ ___ shénme míngzi?", answer: "jiào", after: "What’s your name?", options: ["zhīdào", "jiào", "zhù"] },
  { before: "Wǒ bù ___.", answer: "zhīdào", after: "I don’t know.", options: ["yǒu", "zhīdào", "zài"] },
  { before: "Nǐ yǒu ___ ma?", answer: "gǒu", after: "Do you have a dog?", options: ["míngzi", "zhù", "gǒu"] },
];
const classKids = [
  { id: "boy", name: "Kamsi", image: "/video/ikenna.png", color: "#E8F4F7" },
  { id: "girl", name: "Kaosi", image: "/video/ada.png", color: "#F1F4E8" },
];

function Friend({ person, color, className = "" }) {
  return <span className={`flex shrink-0 items-end justify-center overflow-hidden rounded-2xl ${className}`} style={{ backgroundColor: color }}><img src={person?.image ?? "/video/ada.png"} alt="" className="h-full w-full object-contain object-bottom" /></span>;
}

export default function ChineseClassLesson({ onBack }) {
  const [roleId, setRoleId] = useState("girl");
  const student = classKids.find((kid) => kid.id === roleId);
  const partner = classKids.find((kid) => kid.id !== roleId);
  const [started, setStarted] = useState(false);
  const [section, setSection] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizChoice, setQuizChoice] = useState(null);
  const [chatIndex, setChatIndex] = useState(0);
  const [pairIndex, setPairIndex] = useState(0);
  const [replyIndex, setReplyIndex] = useState(0);
  const [replyChoice, setReplyChoice] = useState(null);
  const [gapIndex, setGapIndex] = useState(0);
  const [gapChoice, setGapChoice] = useState(null);
  const [name, setName] = useState("Kaosi");
  const [home, setHome] = useState("Ekon");
  const [pets, setPets] = useState({ dog: true, cat: false });
  const [showSchoolLine, setShowSchoolLine] = useState(false);
  const [finished, setFinished] = useState(false);

  function nextSection() {
    setSection((current) => Math.min(current + 1, sections.length - 1));
  }

  function previousSection() {
    setSection((current) => Math.max(current - 1, 0));
  }

  const chatTurns = [
    { speaker: partner, pinyin: "Nǐ hǎo! Nǐ jiào shénme míngzi?", meaning: "Hello! What’s your name?", kind: "question" },
    { speaker: student, pinyin: `Wǒ jiào ${name.trim() || "____"}. Nǐ ne?`, meaning: "My name is ____. And you?", kind: "answer" },
    { speaker: partner, pinyin: `Wǒ jiào ${partner?.name ?? "Ada"}. Nǐ zhù zài nǎli?`, meaning: `My name is ${partner?.name ?? "Ada"}. Where do you live?`, kind: "question" },
    { speaker: student, pinyin: `Wǒ zhù zài ${home.trim() || "____"}.`, meaning: `I live in ${home.trim() || "____"}.`, kind: "answer" },
    { speaker: partner, pinyin: "Nǐ yǒu gǒu ma?", meaning: "Do you have a dog?", kind: "question" },
    { speaker: student, pinyin: pets.dog ? "Wǒ yǒu yì zhī gǒu." : "Wǒ méiyǒu gǒu.", meaning: pets.dog ? "I have one dog." : "I don’t have a dog.", kind: "answer" },
    { speaker: partner, pinyin: "Nǐ yǒu māo ma?", meaning: "Do you have a cat?", kind: "question" },
    { speaker: student, pinyin: pets.cat ? "Wǒ yǒu yì zhī māo." : "Wǒ méiyǒu māo.", meaning: pets.cat ? "I have one cat." : "I don’t have a cat.", kind: "answer" },
  ];
  const replyRound = replyIndex === 1
    ? { ...replyRounds[replyIndex], answer: `Wǒ jiào ${name.trim() || student.name}.`, options: [`Wǒ jiào ${name.trim() || student.name}.`, "Wǒ zhīdào.", "Wǒ yǒu yì zhī gǒu."] }
    : replyRounds[replyIndex];

  if (!started) {
    return (
      <section className="my-auto py-8">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-[#D9EEE5] bg-white shadow-sm">
          <div className="bg-[#EAF7F2] px-6 py-7 text-center sm:px-10 sm:py-9">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#0F766E]">TODAY’S CLASS · 60 MIN</p>
            <h1 className="mt-2 text-3xl font-light sm:text-4xl">Let’s meet and talk!</h1>
            <p className="mt-2 text-sm text-[#64748B]">Choose a role, then practise meeting a new friend.</p>
          </div>
          <div className="flex items-end justify-center gap-5 px-5 pt-6 sm:gap-8 sm:pt-8">
            <div className="flex flex-col items-center gap-2"><Friend person={student} color={student.color} className="h-32 w-28 sm:h-40 sm:w-36" /><span className="text-sm font-semibold">{student.name}</span></div>
            <div className="mb-12 rounded-2xl bg-[#FAF8F3] px-4 py-3 text-center text-lg font-semibold text-[#0F766E] shadow-sm">Nǐ hǎo!<span className="block text-xs font-normal text-[#64748B]">Hello!</span></div>
            <div className="flex flex-col items-center gap-2"><Friend person={partner} color={partner.color} className="h-32 w-28 sm:h-40 sm:w-36" /><span className="text-sm font-semibold">{partner.name}</span></div>
          </div>
          <div className="px-6 pb-7 pt-5 sm:px-10 sm:pb-9"><p className="mb-3 text-center text-sm font-medium text-[#64748B]">Who will you be?</p><div className="mx-auto grid max-w-md grid-cols-2 gap-3">{classKids.map((kid) => <button key={kid.id} type="button" aria-pressed={roleId === kid.id} onClick={() => { setRoleId(kid.id); setName(kid.name); }} className={`flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 px-3 py-2 font-semibold transition ${roleId === kid.id ? "border-[#72B99B] bg-[#EFF9F4]" : "border-[#EEE7DC] bg-white"}`}><Friend person={kid} color={kid.color} className="h-10 w-9" />{kid.name}</button>)}</div><div className="mt-5 text-center"><button type="button" onClick={() => setStarted(true)} className="min-h-12 rounded-full bg-[#B8EAD9] px-8 font-semibold shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A]">Start class →</button></div></div>
        </div>
      </section>
    );
  }

  if (finished) {
    return (
      <section className="my-auto py-8">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#D9EEE5] bg-white px-6 py-8 text-center shadow-sm sm:px-10">
          <div className="flex items-end justify-center gap-3"><Friend person={student} color={student.color} className="h-24 w-20" /><Friend person={partner} color={partner.color} className="h-24 w-20" /></div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">CLASS COMPLETE</p>
          <h1 className="mt-2 text-3xl font-light">You introduced yourself!</h1>
          <p className="mt-2 text-sm text-[#64748B]">Give it one more try from the beginning, or head back to your path.</p>
          <div className="mt-6 rounded-2xl bg-[#F5FAF7] p-5 text-left"><p className="text-lg font-semibold leading-relaxed text-[#0F766E]">Nǐ hǎo! Wǒ jiào {name.trim() || "____"}. Wǒ zhù zài {home.trim() || "____"}.</p><p className="text-sm text-[#64748B]">Hello! My name is {name.trim() || "____"}. I live in {home.trim() || "____"}.</p>{pets.dog && <><p className="mt-2 text-base text-[#0F766E]">Wǒ yǒu yì zhī gǒu.</p><p className="text-sm text-[#64748B]">I have one dog.</p></>}{!pets.dog && <><p className="mt-2 text-base text-[#0F766E]">Wǒ méiyǒu gǒu.</p><p className="text-sm text-[#64748B]">I don’t have a dog.</p></>}{pets.cat && <><p className="mt-2 text-base text-[#0F766E]">Wǒ yǒu yì zhī māo.</p><p className="text-sm text-[#64748B]">I have one cat.</p></>}{!pets.cat && <><p className="mt-2 text-base text-[#0F766E]">Wǒ méiyǒu māo.</p><p className="text-sm text-[#64748B]">I don’t have a cat.</p></>}{showSchoolLine && <p className="mt-2 border-t border-[#D9EEE5] pt-2 text-sm text-[#64748B]">Wǒ jīntiān qù xuéxiào le. · I went to school today.</p>}</div>
          <div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" onClick={() => { setFinished(false); setSection(0); setQuizIndex(0); setQuizChoice(null); setChatIndex(0); setPairIndex(0); setReplyIndex(0); setReplyChoice(null); setGapIndex(0); setGapChoice(null); setStarted(false); }} className="min-h-12 rounded-full border border-[#D9EEE5] px-6 font-medium text-[#475569]">Play class again</button><button type="button" onClick={onBack} className="min-h-12 rounded-full bg-[#B8EAD9] px-6 font-semibold">Back to my path</button></div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-auto py-6 sm:py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#64748B]">CLASS ADVENTURE · {sections[section].minutes} MIN</p><h1 className="mt-1 text-2xl font-light sm:text-3xl">{sections[section].name}</h1></div>
          <span className="shrink-0 rounded-full border border-[#E8F4EF] bg-white px-4 py-2 text-sm text-[#64748B]">{section + 1} of {sections.length}</span>
        </div>
        <div className="mb-5 flex gap-2">{sections.map((item, index) => <span key={item.name} className={`h-2 flex-1 rounded-full transition-colors ${index <= section ? "bg-[#8BD2B9]" : "bg-[#E8F4EF]"}`} />)}</div>

        {section === 0 && <div className="overflow-hidden rounded-[2rem] border border-[#D9EEE5] bg-white shadow-sm">
          <div className="flex items-center gap-4 bg-[#EAF7F2] p-5 sm:p-7"><Friend person={partner} color={partner.color} className="h-20 w-20" /><div><p className="text-xs font-semibold uppercase tracking-wide text-[#0F766E]">{partner.name} says</p><p className="mt-1 text-xl font-semibold text-[#0F766E]">Nǐ hǎo!</p><p className="text-sm text-[#64748B]">Hello!</p></div></div>
          <div className="p-5 text-center sm:p-7"><p className="text-lg font-medium">Say hello back to {partner.name}.</p><div className="mt-4 inline-flex items-center gap-3 rounded-full bg-[#FAF8F3] px-5 py-3"><span className="text-xl font-semibold text-[#0F766E]">Nǐ hǎo!</span><span className="text-sm text-[#64748B]">Hello!</span></div><p className="mt-5 text-sm text-[#64748B]">Say it together, then let a few friends try.</p></div>
        </div>}

        {section === 1 && <div className="overflow-hidden rounded-[2rem] border border-[#F0E4C7] bg-white shadow-sm">
          <div className="flex items-center gap-4 bg-[#FFF8E8] p-5 sm:p-7"><Friend person={partner} color={partner.color} className="h-20 w-20" /><div><p className="text-xs font-semibold uppercase tracking-wide text-[#A16207]">Help {partner.name}</p><p className="mt-1 text-lg font-medium">Pick the words for this moment.</p></div></div>
          <div className="p-5 sm:p-7"><div className="mb-4 flex items-center justify-between text-sm text-[#64748B]"><span>{classroomRounds[quizIndex].scene}</span><span>{quizIndex + 1} of {classroomRounds.length}</span></div><h2 className="text-xl font-semibold">{classroomRounds[quizIndex].prompt}</h2><div className="mt-4 grid gap-3 sm:grid-cols-3">{classroomRounds[quizIndex].options.map((option) => { const correct = option === classroomRounds[quizIndex].answer; const chosen = quizChoice === option; return <button key={option} type="button" disabled={Boolean(quizChoice)} onClick={() => setQuizChoice(option)} className={`min-h-24 rounded-2xl border-2 p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A2A] ${chosen && correct ? "border-[#72B99B] bg-[#EFF9F4]" : chosen ? "border-[#E6B968] bg-[#FFFAF0]" : "border-[#EEE7DC] hover:border-[#E6B968]"}`}><span className="block font-semibold text-[#0F766E]">{option}</span>{chosen && <span className="mt-1 block text-sm text-[#64748B]">{correct ? classroomRounds[quizIndex].meaning : "Try the phrase that fits."}</span>}</button>; })}</div>
            {quizChoice && <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#F5FAF7] p-4"><span className="text-sm font-medium text-[#475569]">{quizChoice === classroomRounds[quizIndex].answer ? "Great choice! Say it with your friend." : "Not that one. Look at the moment and try again."}</span><button type="button" onClick={() => { if (quizChoice === classroomRounds[quizIndex].answer) { setQuizChoice(null); if (quizIndex + 1 < classroomRounds.length) setQuizIndex(quizIndex + 1); else nextSection(); } else setQuizChoice(null); }} className="min-h-10 rounded-full bg-[#B8EAD9] px-5 text-sm font-semibold">{quizChoice === classroomRounds[quizIndex].answer ? quizIndex + 1 < classroomRounds.length ? "Next →" : "Meet a friend →" : "Try again"}</button></div>}
          </div>
        </div>}

        {section === 2 && <div className="overflow-hidden rounded-[2rem] border border-[#D8E6F3] bg-white shadow-sm">
          <div className="flex items-center gap-4 bg-[#E8F4F7] p-5 sm:p-7"><Friend person={chatTurns[chatIndex].speaker} color={chatTurns[chatIndex].speaker?.color ?? "#E8F4F7"} className="h-20 w-20" /><div><p className="text-xs font-semibold uppercase tracking-wide text-[#456F9A]">{chatTurns[chatIndex].speaker?.name ?? "Your friend"} {chatTurns[chatIndex].kind === "question" ? "asks" : "answers"}</p><p className="mt-1 text-xl font-semibold text-[#0F766E]">{chatTurns[chatIndex].pinyin}</p><p className="mt-1 text-sm text-[#64748B]">{chatTurns[chatIndex].meaning}</p></div></div>
          <div className="p-5 sm:p-7">
            {chatIndex === 1 && <label className="mb-4 block max-w-sm rounded-2xl bg-[#FAF8F3] p-4 text-sm text-[#64748B]">Your name <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Say your name" className="mt-1 min-h-11 w-full rounded-xl border border-[#E8E3D9] bg-white px-3 text-base text-[#1F2A2A] outline-none focus:border-[#72B99B]" /></label>}
            {chatIndex === 3 && <label className="mb-4 block max-w-sm rounded-2xl bg-[#FAF8F3] p-4 text-sm text-[#64748B]">Your town <input value={home} onChange={(event) => setHome(event.target.value)} placeholder="Ekon" className="mt-1 min-h-11 w-full rounded-xl border border-[#E8E3D9] bg-white px-3 text-base text-[#1F2A2A] outline-none focus:border-[#72B99B]" /></label>}
            <p className="text-sm text-[#64748B]">{["Say the question together, slowly.", "Your turn—answer with your name.", "Say the question, then ask a partner.", "Answer with your town.", "Ask your partner about a dog.", "Answer in Chinese.", "Ask about a cat.", "Answer in Chinese."][chatIndex]}</p>
            <button type="button" onClick={() => { if (chatIndex + 1 < chatTurns.length) setChatIndex(chatIndex + 1); else nextSection(); }} className="mt-4 min-h-12 rounded-full bg-[#B8EAD9] px-7 font-semibold">{chatTurns[chatIndex].kind === "question" ? "My turn →" : chatIndex + 1 < chatTurns.length ? "I said it! Next line →" : "Now practise together →"}</button>
          </div>
        </div>}

        {section === 3 && <div className="overflow-hidden rounded-[2rem] border border-[#E5EBD8] bg-white shadow-sm">
          <div className="flex items-center gap-4 bg-[#F1F4E8] p-5 sm:p-7"><Friend person={partner} color={partner.color} className="h-20 w-20" /><div><p className="text-xs font-semibold uppercase tracking-wide text-[#657B42]">A little more about you</p><p className="mt-1 text-xl font-semibold text-[#435833]">Do you have a pet?</p></div></div>
          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">{[{ id: "dog", question: "Nǐ yǒu gǒu ma?", meaning: "Do you have a dog?", yes: "Wǒ yǒu yì zhī gǒu.", yesMeaning: "I have one dog.", no: "Wǒ méiyǒu gǒu.", noMeaning: "I don’t have a dog." }, { id: "cat", question: "Nǐ yǒu māo ma?", meaning: "Do you have a cat?", yes: "Wǒ yǒu yì zhī māo.", yesMeaning: "I have one cat.", no: "Wǒ méiyǒu māo.", noMeaning: "I don’t have a cat." }].map((pet) => <div key={pet.id} className="rounded-2xl border border-[#EEE7DC] p-4"><p className="text-lg font-semibold text-[#0F766E]">{pet.question}</p><p className="text-sm text-[#64748B]">{pet.meaning}</p><div className="mt-3 grid gap-2"><button type="button" onClick={() => setPets((current) => ({ ...current, [pet.id]: true }))} className={`rounded-xl border px-3 py-3 text-left ${pets[pet.id] ? "border-[#72B99B] bg-[#EFF9F4]" : "border-[#EEE7DC]"}`}><span className="block font-semibold text-[#0F766E]">{pet.yes}</span><span className="text-xs text-[#64748B]">{pet.yesMeaning}</span></button><button type="button" onClick={() => setPets((current) => ({ ...current, [pet.id]: false }))} className={`rounded-xl border px-3 py-3 text-left ${!pets[pet.id] ? "border-[#72B99B] bg-[#EFF9F4]" : "border-[#EEE7DC]"}`}><span className="block font-semibold text-[#0F766E]">{pet.no}</span><span className="text-xs text-[#64748B]">{pet.noMeaning}</span></button></div></div>)}</div>
          <div className="px-5 pb-6 text-center sm:px-7"><p className="text-sm text-[#64748B]">Choose what’s true for you—or make up a funny pet!</p><button type="button" onClick={nextSection} className="mt-4 min-h-12 rounded-full bg-[#B8EAD9] px-7 font-semibold">Build my introduction →</button></div>
        </div>}

        {section === 4 && <div className="overflow-hidden rounded-[2rem] border border-[#D9EEE5] bg-white shadow-sm">
          <div className="flex items-center gap-4 bg-[#EAF7F2] p-5 sm:p-7"><Friend person={chatTurns[pairIndex].speaker} color={chatTurns[pairIndex].speaker?.color ?? "#EAF7F2"} className="h-20 w-20" /><div><p className="text-xs font-semibold uppercase tracking-wide text-[#0F766E]">Full conversation · {pairIndex + 1} of {chatTurns.length}</p><p className="mt-1 text-lg font-medium">Take turns being Kamsi and Kaosi.</p></div></div>
          <div className="p-5 sm:p-7"><div className="rounded-2xl bg-[#F5FAF7] p-5"><p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">{chatTurns[pairIndex].speaker?.name} {chatTurns[pairIndex].kind === "question" ? "asks" : "answers"}</p><p className="mt-2 text-xl font-semibold text-[#0F766E]">{chatTurns[pairIndex].pinyin}</p><p className="mt-1 text-sm text-[#64748B]">{chatTurns[pairIndex].meaning}</p></div><p className="mt-4 text-sm text-[#64748B]">Say the line. Swap roles when you reach the end.</p><button type="button" onClick={() => pairIndex + 1 < chatTurns.length ? setPairIndex(pairIndex + 1) : nextSection()} className="mt-4 min-h-12 rounded-full bg-[#B8EAD9] px-7 font-semibold">{pairIndex + 1 < chatTurns.length ? "Next line →" : "Start the activities →"}</button></div>
        </div>}

        {section === 5 && <div className="overflow-hidden rounded-[2rem] border border-[#F0E4C7] bg-white shadow-sm">
          <div className="flex items-center gap-4 bg-[#FFF8E8] p-5 sm:p-7"><Friend person={partner} color={partner.color} className="h-20 w-20" /><div><p className="text-xs font-semibold uppercase tracking-wide text-[#A16207]">Textbook practice · 1</p><p className="mt-1 text-lg font-medium">Choose the right reply.</p></div></div>
          <div className="p-5 sm:p-7"><div className="mb-4 flex items-center justify-between text-sm text-[#64748B]"><span>{replyIndex + 1} of {replyRounds.length}</span><span>Pick one answer</span></div><div className="rounded-2xl bg-[#FAF8F3] p-5"><p className="text-xl font-semibold text-[#0F766E]">{replyRound.question}</p><p className="mt-1 text-sm text-[#64748B]">{replyRound.meaning}</p></div><div className="mt-4 grid gap-3 sm:grid-cols-3">{replyRound.options.map((option) => { const correct = option === replyRound.answer; const selected = replyChoice === option; return <button key={option} type="button" disabled={Boolean(replyChoice)} onClick={() => setReplyChoice(option)} className={`min-h-20 rounded-2xl border-2 p-4 text-left font-semibold text-[#0F766E] ${selected && correct ? "border-[#72B99B] bg-[#EFF9F4]" : selected ? "border-[#E6B968] bg-[#FFFAF0]" : "border-[#EEE7DC] hover:border-[#E6B968]"}`}>{option}{selected && <span className="mt-1 block text-sm font-normal text-[#64748B]">{correct ? "That’s right! Say it aloud." : "Try another answer."}</span>}</button>; })}</div>
            {replyChoice && <div className="mt-5 text-right"><button type="button" onClick={() => { if (replyChoice === replyRound.answer) { setReplyChoice(null); if (replyIndex + 1 < replyRounds.length) setReplyIndex(replyIndex + 1); else nextSection(); } else setReplyChoice(null); }} className="min-h-11 rounded-full bg-[#B8EAD9] px-6 font-semibold">{replyChoice === replyRound.answer ? replyIndex + 1 < replyRounds.length ? "Next question →" : "Fill the gaps →" : "Try again"}</button></div>}
          </div>
        </div>}

        {section === 6 && <div className="overflow-hidden rounded-[2rem] border border-[#D8E6F3] bg-white shadow-sm">
          <div className="flex items-center gap-4 bg-[#E8F4F7] p-5 sm:p-7"><Friend person={student} color={student.color} className="h-20 w-20" /><div><p className="text-xs font-semibold uppercase tracking-wide text-[#456F9A]">Textbook practice · 2</p><p className="mt-1 text-lg font-medium">Fill in the missing word.</p></div></div>
          <div className="p-5 sm:p-7"><div className="mb-4 flex items-center justify-between text-sm text-[#64748B]"><span>{gapIndex + 1} of {gapRounds.length}</span><span>Choose a word</span></div><div className="rounded-2xl bg-[#F5FAF7] p-6 text-center"><p className="text-2xl font-semibold tracking-wide text-[#0F766E]">{gapRounds[gapIndex].before.replace("___", gapChoice === gapRounds[gapIndex].answer ? gapChoice : "____")}</p><p className="mt-2 text-sm text-[#64748B]">{gapRounds[gapIndex].after}</p></div><div className="mt-4 flex flex-wrap justify-center gap-3">{gapRounds[gapIndex].options.map((option) => <button key={option} type="button" disabled={Boolean(gapChoice)} onClick={() => setGapChoice(option)} className={`min-h-12 min-w-24 rounded-full border-2 px-5 font-semibold ${gapChoice === option && option === gapRounds[gapIndex].answer ? "border-[#72B99B] bg-[#EFF9F4] text-[#0F766E]" : gapChoice === option ? "border-[#E6B968] bg-[#FFFAF0] text-[#8B6422]" : "border-[#EEE7DC] text-[#0F766E] hover:border-[#9DBFDF]"}`}>{option}</button>)}</div>
            {gapChoice && <div className="mt-5 text-center"><p className={`text-sm font-medium ${gapChoice === gapRounds[gapIndex].answer ? "text-[#28724F]" : "text-[#A16207]"}`}>{gapChoice === gapRounds[gapIndex].answer ? "Yes! Read the whole line aloud." : "Not quite. Try another word."}</p><button type="button" onClick={() => { if (gapChoice === gapRounds[gapIndex].answer) { setGapChoice(null); if (gapIndex + 1 < gapRounds.length) setGapIndex(gapIndex + 1); else nextSection(); } else setGapChoice(null); }} className="mt-3 min-h-11 rounded-full bg-[#B8EAD9] px-6 font-semibold">{gapChoice === gapRounds[gapIndex].answer ? gapIndex + 1 < gapRounds.length ? "Next gap →" : "Build your introduction →" : "Try again"}</button></div>}
          </div>
        </div>}

        {section === 7 && <div className="overflow-hidden rounded-[2rem] border border-[#E5DDF0] bg-white shadow-sm">
          <div className="flex items-center gap-4 bg-[#F5F0FA] p-5 sm:p-7"><Friend person={student} color={student.color} className="h-20 w-20" /><div><p className="text-xs font-semibold uppercase tracking-wide text-[#76569A]">Your turn, {student.name}!</p><p className="mt-1 text-xl font-semibold">Tell the class about you.</p></div></div>
          <div className="space-y-3 p-5 sm:p-7"><p className="rounded-2xl bg-[#F5FAF7] p-4 text-lg font-semibold leading-relaxed text-[#0F766E]">Nǐ hǎo! Wǒ jiào {name.trim() || "____"}. Wǒ zhù zài {home.trim() || "____"}.</p>{pets.dog && <p className="rounded-2xl bg-[#F5FAF7] p-4 text-lg font-semibold text-[#0F766E]">Wǒ yǒu yì zhī gǒu.</p>}{!pets.dog && <p className="rounded-2xl bg-[#F5FAF7] p-4 text-lg font-semibold text-[#0F766E]">Wǒ méiyǒu gǒu.</p>}{pets.cat && <p className="rounded-2xl bg-[#F5FAF7] p-4 text-lg font-semibold text-[#0F766E]">Wǒ yǒu yì zhī māo.</p>}{!pets.cat && <p className="rounded-2xl bg-[#F5FAF7] p-4 text-lg font-semibold text-[#0F766E]">Wǒ méiyǒu māo.</p>}
            {showSchoolLine && <div className="rounded-2xl border border-dashed border-[#BDAAD3] bg-[#FBF8FE] p-4"><p className="text-xs font-semibold uppercase tracking-wide text-[#76569A]">Bonus</p><p className="mt-1 text-lg font-semibold text-[#76569A]">Wǒ jīntiān qù xuéxiào le.</p><p className="text-sm text-[#64748B]">I went to school today.</p></div>}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2"><button type="button" onClick={() => setShowSchoolLine((show) => !show)} className="min-h-10 rounded-full border border-[#E5DDF0] px-4 text-sm font-medium text-[#76569A]">{showSchoolLine ? "Hide bonus" : "Add school-day bonus"}</button><button type="button" onClick={() => setFinished(true)} className="min-h-12 rounded-full bg-[#B8EAD9] px-7 font-semibold">I introduced myself! →</button></div>
          </div>
        </div>}

        <div className="mt-5 flex items-center justify-between gap-3"><button type="button" onClick={previousSection} disabled={section === 0} className="min-h-11 rounded-full border border-[#E8E3D9] px-5 text-sm font-medium text-[#64748B] disabled:opacity-40">← Back</button><span className="text-xs text-[#94A3B8]">Say it out loud as you go</span>{section === 0 ? <button type="button" onClick={nextSection} className="min-h-11 rounded-full bg-[#B8EAD9] px-5 text-sm font-semibold">Next activity →</button> : <span className="w-28" />}</div>
      </div>
    </section>
  );
}
