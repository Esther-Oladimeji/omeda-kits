import { Link } from "react-router-dom";

const offerings = [
  {
    id: "learning",
    title: "Learn Chinese with Sade & Walee",
    description: "A Nigerian storybook, games, and classroom learning.",
    link: "/storybox",
    action: "Explore the book and games",
    style: "bg-[#F2F0E7]",
  },
  {
    id: "outreach",
    title: "Our education outreach",
    description: "We bring books, learning kits, games and digital learning pads to children in communities with fewer resources.",
    link: "#outreach-gallery",
    action: "See more photos",
    style: "bg-[#E8F1EC]",
  },
];

function OfferingVisual({ id }) {
  if (id === "learning") {
    return (
      <div className="flex h-48 items-center justify-center bg-[#E8ECE3] p-5 sm:h-52">
        <img src="/video/book-cover.jpg" alt="When Amala Goes to Beijing book cover" className="h-full max-w-full object-contain drop-shadow-md" />
      </div>
    );
  }

  if (id === "outreach") {
    return <img src="/outreach/osh-oroko-learning-pack.jpg" alt="A child holding a learning pack at Omeda’s Oshoroko visit" className="h-48 w-full object-cover sm:h-52" />;
  }

  return null;
}

function OfferingCard({ item }) {
  return (
    <article id={item.id} className={`overflow-hidden rounded-[1.35rem] ${item.style}`}>
      <OfferingVisual id={item.id} />
      <div className="flex min-h-[11.5rem] flex-col items-start p-5 sm:p-6">
        <h2 className="text-xl font-semibold leading-snug tracking-tight">{item.title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#586762]">{item.description}</p>
        <a href={item.link} className="mt-auto pt-5 text-sm font-bold text-[#28755F]">{item.action} <span aria-hidden="true">→</span></a>
      </div>
    </article>
  );
}

export default function OmedaHome() {
  return (
    <main className="min-h-screen bg-[#FBFAF7] font-[Nunito] text-[#202C2A]">
      <header className="bg-[#FBFAF7]">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link to="/" aria-label="Omeda home" className="text-lg font-extrabold tracking-[0.2em]">OMEDA</Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-[#586762] sm:flex">
            <a href="#programmes" className="hover:text-[#202C2A]">What we do</a>
            <a href="#osh-oroko" className="hover:text-[#202C2A]">Outreach</a>
          </nav>
          <Link to="/storybox" className="rounded-full bg-[#B8EAD9] px-4 py-2.5 text-sm font-bold text-[#183C33]">Learn Chinese <span aria-hidden="true">→</span></Link>
        </div>
      </header>

      <section className="px-5 pb-12 pt-4 sm:px-8 sm:pb-16 sm:pt-7">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
          <div className="max-w-lg py-3 lg:py-6">
            <p className="text-sm font-semibold text-[#39745F]">Education for Nigerian children</p>
            <h1 className="mt-4 text-[2.5rem] font-medium leading-[1.08] tracking-tight sm:text-5xl">More children deserve the chance to learn.</h1>
            <p className="mt-4 max-w-md text-base leading-7 text-[#586762]">Bringing learning, play and opportunity to more communities.</p>
            <Link to="/storybox" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8EAD9] px-5 py-3 text-sm font-bold text-[#183C33]">Learn Chinese with Sade &amp; Walee <span aria-hidden="true" className="ml-2">→</span></Link>
          </div>
          <figure id="osh-oroko" className="min-w-0 scroll-mt-5">
            <img src="/outreach/osh-oroko-group.jpg" alt="Children and community members at Omeda’s Oshoroko visit" className="aspect-[1.35/1] w-full rounded-[1.35rem] object-cover" />
            <figcaption className="mt-2 text-sm font-medium text-[#394640]">With the Prince of Oshoroko, Omeda donated learning kits to the community’s top-performing students.</figcaption>
          </figure>
        </div>
      </section>

      <section id="programmes" className="px-5 pb-14 pt-5 sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-5 text-2xl font-medium tracking-tight sm:mb-6 sm:text-3xl">Learning, in more than one way.</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {offerings.map((item) => <OfferingCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      <section id="outreach-gallery" className="scroll-mt-5 bg-white px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#39745F]">Oshoroko, Lagos</p>
              <h2 className="mt-1 text-2xl font-medium tracking-tight sm:text-3xl">More from the outreach</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <img src="/outreach/osh-oroko-community.jpg" alt="Children and community members gathered during Omeda’s Oshoroko outreach" className="aspect-[4/3] w-full rounded-[1.1rem] object-cover" />
            <img src="/outreach/osh-oroko-classroom.jpg" alt="Children gathered in their classroom during Omeda’s Oshoroko outreach" className="aspect-[4/3] w-full rounded-[1.1rem] object-cover" />
            <img src="/outreach/osh-oroko-wave.jpg" alt="Children waving during Omeda’s Oshoroko outreach" className="aspect-[4/3] w-full rounded-[1.1rem] object-cover" />
            <img src="/outreach/osh-oroko-student-kit.jpg" alt="Student receiving an Omeda learning kit during the Oshoroko outreach" className="aspect-[4/3] w-full rounded-[1.1rem] object-cover" />
          </div>
        </div>
      </section>

      <section id="goal" className="scroll-mt-5 border-t border-[#E9E6DE] bg-[#F1F3EA] px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-[#394640]">We’re working to get learning tools to 1,000 children.</p>
          <p className="text-xs font-medium text-[#586762]">School kits · learning tablets · STEM kits</p>
        </div>
      </section>

      <footer className="px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs text-[#586762]"><span className="font-extrabold tracking-[0.16em] text-[#202C2A]">OMEDA</span><span>Education for Nigerian children.</span></div>
      </footer>
    </main>
  );
}

