import { useRef } from "react";
import {Link} from "react-router-dom";
import {FadeWrapper, GlowCard} from "../components/ui/";

export default function KidsPage() {
  const mapRef = useRef(null);

  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <FadeWrapper>
    <section className="w-full bg-gradient-to-b from-[#cde8ff] via-[#fff8ef] to-[#ffe8cc] text-center font-[Poppins] text-[#333] overflow-hidden">
      
      {/* ① WELCOME SECTION */}
      <div className="min-h-screen flex flex-col items-center justify-center relative px-6">
        <div className="absolute inset-0 bg-[url('/img/clouds-bg.svg')] bg-cover bg-center opacity-30 animate-[float_20s_linear_infinite]" />
        
        <div className="relative z-10 max-w-lg">
          <p className="text-2xl md:text-4xl font-bold mb-4">
            Hey Explorer! 🌍
          </p>
          <p className="text-lg mb-6">
            Ready to join Sade & Walee on their first adventure?
          </p>
          <button
            onClick={scrollToMap}
            className="px-8 py-3 bg-[#fff] text-[#333] rounded-xl shadow hover:scale-105 active:scale-95 transition"
          >
            Let’s Go !
          </button>
        </div>
      </div>

      {/* ② ADVENTURE MAP SECTION */}
      <div ref={mapRef} className="min-h-screen flex flex-col items-center justify-center px-6 py-20 space-y-10">
        <h2 className="text-3xl font-extrabold mb-8">Choose Your Adventure</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {[
            { icon: "📚", title: "Read & Learn", text: "Follow the story and unlock Chinese words!", link: "/kids/read" },
            { icon: "🎮", title: "Play & Explore", text: "Mini games to test your skills.", link: "/kids/play" },
            { icon: "🎁", title: "Get Your Kit", text: "Bring the story home or apply for sponsorship.", link: "/kids/kit" },
          ].map((card) => (
            <Link
              key={card.title}
              to={card.link}
            >
                <GlowCard>
  <div className="flex flex-col items-center justify-between min-h-[160px] md:min-h-[220px]">
  <div className="text-4xl md:text-5xl mb-3 md:mb-4">{card.icon}</div>
  <div className="text-center">
    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{card.title}</h3>
    <p className="text-xs md:text-sm text-[#555]">{card.text}</p>
  </div>
</div>
</GlowCard>
            </Link>
          ))}
        </div>
      </div>

      {/* ③ AMBASSADOR CORNER */}
      <div className="bg-[#fffaf1] py-20 px-6">
        <h3 className="text-2xl font-extrabold mb-4">🥇 Become a Cultural Ambassador!</h3>
        <p className="mb-8 text-[#555]">
          Join Sade & Walee’s adventures, competitions, and challenges.
        </p>
        <form className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <input placeholder="Name" className="p-3 rounded-lg border w-full" />
          <input placeholder="Age" className="p-3 rounded-lg border w-full md:w-24" />
          <input placeholder="Parent Email" className="p-3 rounded-lg border w-full" />
          <button type="submit" className="bg-[#ffd580] px-6 py-3 rounded-lg shadow font-semibold hover:scale-105 transition">
            Join
          </button>
        </form>
      </div>

      {/* ④ GIVE-BACK BANNER & FOOTER */}
      <div className="bg-[#fff2e0] py-12 px-6 text-sm">
        <p className="mb-4">
          💖 Want every child to join? Parents can help by sponsoring a Cultural Kit.
        </p>
        <a href="/sponsors" className="text-[#d67300] font-semibold underline">
          Go to Sponsor Page →
        </a>
      </div>

      <footer className="bg-[#ffe8cc] text-xs py-4">
        © 2025 Omeda — Learn • Create • Grow
      </footer>
    </section>
    </FadeWrapper>
  );
}