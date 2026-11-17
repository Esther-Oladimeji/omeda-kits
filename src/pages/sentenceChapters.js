// Level 1 sentence game content. Add a chapter by adding an entry to SENTENCE_CHAPTERS.

export const VERBS = {
  chi: { py: "chī", emoji: "😋", en: "eat" },
  he: { py: "hē", emoji: "🧋", en: "drink" },
};

export const ITEMS = {
  pingguo: { py: "píngguǒ", emoji: "🍎", verb: "chi" },
  xiangjiao: { py: "xiāngjiāo", emoji: "🍌", verb: "chi" },
  juzi: { py: "júzi", emoji: "🍊", verb: "chi" },
  putao: { py: "pútáo", emoji: "🍇", verb: "chi" },
  caomei: { py: "cǎoméi", emoji: "🍓", verb: "chi" },
  xigua: { py: "xīguā", emoji: "🍉", verb: "chi" },
  shui: { py: "shuǐ", emoji: "💧", verb: "he" },
  niunai: { py: "niúnǎi", emoji: "🥛", verb: "he" },
  guozhi: { py: "guǒzhī", emoji: "🧃", verb: "he" },
  kele: { py: "kělè", emoji: "🥤", verb: "he" },
};

export const PEOPLE = {
  wo: { py: "wǒ" },
  mama: { py: "māma", image: "/games/family/mama.png", color: "#F2E4D9" },
  baba: { py: "bàba", image: "/games/family/baba.png", color: "#F1E2E4" },
};

// Each chapter: warm-up (only the last word changes) → mix (Mum and Dad join)
// → tricky (pictures look alike, so the whole sentence has to be read).
export const SENTENCE_CHAPTERS = [
  {
    id: "ch1",
    number: 1,
    title: "wǒ chī!",
    subtitle: "I eat!",
    verbs: ["chi"],
    whoQuestion: "Who is eating?",
    doneTitle: "Yum! 😋",
    doneText: "Everyone ate!",
    sticker: { image: "/games/fruit/fruit-cluster.png", label: "wǒ chī sticker" },
    rounds: [
      { who: "wo", item: "pingguo", options: [["wo", "pingguo"], ["wo", "xiangjiao"], ["wo", "xigua"]] },
      { who: "wo", item: "xiangjiao", options: [["wo", "xiangjiao"], ["wo", "putao"], ["wo", "juzi"]] },
      { who: "wo", item: "xigua", options: [["wo", "xigua"], ["wo", "caomei"], ["wo", "pingguo"]] },
      { who: "mama", item: "juzi", options: [["mama", "juzi"], ["wo", "putao"], ["baba", "xiangjiao"]] },
      { who: "baba", item: "putao", options: [["baba", "putao"], ["mama", "pingguo"], ["wo", "xigua"]] },
      { who: "mama", item: "caomei", options: [["mama", "caomei"], ["baba", "xiangjiao"], ["wo", "juzi"]] },
      { who: "baba", item: "pingguo", options: [["baba", "pingguo"], ["mama", "xigua"], ["wo", "putao"]] },
      { who: "mama", item: "xiangjiao", options: [["mama", "xiangjiao"], ["baba", "xiangjiao"], ["mama", "pingguo"]] },
      { who: "wo", item: "caomei", options: [["wo", "caomei"], ["mama", "caomei"], ["wo", "pingguo"]] },
      { who: "baba", item: "juzi", options: [["baba", "juzi"], ["wo", "juzi"], ["baba", "xiangjiao"]] },
    ],
  },
  {
    id: "ch2",
    number: 2,
    title: "wǒ hē!",
    subtitle: "I drink!",
    verbs: ["he", "chi"],
    whoQuestion: "Who is drinking?",
    doneTitle: "Glug glug! 🥛",
    doneText: "Everyone drank!",
    sticker: { emojis: ["🥛", "🧃", "💧", "🥤"], label: "wǒ hē sticker" },
    rounds: [
      { who: "wo", item: "shui", options: [["wo", "shui"], ["wo", "niunai"], ["wo", "kele"]] },
      { who: "wo", item: "niunai", options: [["wo", "niunai"], ["wo", "guozhi"], ["wo", "shui"]] },
      { who: "wo", item: "guozhi", options: [["wo", "guozhi"], ["wo", "kele"], ["wo", "niunai"]] },
      { who: "mama", item: "kele", options: [["mama", "kele"], ["baba", "shui"], ["wo", "guozhi"]] },
      { who: "baba", item: "niunai", options: [["baba", "niunai"], ["mama", "guozhi"], ["wo", "kele"]] },
      { who: "mama", item: "shui", options: [["mama", "shui"], ["baba", "niunai"], ["wo", "kele"]] },
      { who: "baba", item: "guozhi", options: [["baba", "guozhi"], ["mama", "kele"], ["wo", "shui"]] },
      { who: "baba", item: "xigua", options: [["baba", "xigua"], ["baba", "guozhi"], ["mama", "xigua"]] },
      { who: "wo", item: "niunai", options: [["wo", "niunai"], ["wo", "pingguo"], ["mama", "niunai"]] },
      { who: "mama", item: "xiangjiao", options: [["mama", "xiangjiao"], ["mama", "kele"], ["baba", "xiangjiao"]] },
    ],
  },
];

export function isChapterDone(id) {
  try {
    return window.localStorage.getItem(`omeda-chinese-sentences-${id}`) === "done";
  } catch {
    return false;
  }
}
