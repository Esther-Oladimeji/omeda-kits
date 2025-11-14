// src/pages/KitPage.jsx
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function KitPage() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    window.scrollTo(0, 0);
  }, []);

  const kits = [
    {
      title: "Premium Cultural Kit",
      price: "₦7,500",
      desc: "A full storybook + crafts + digital lessons for calm creative play.",
      img: "/img/kit-premium.jpg",
      tag: "Most Loved 💛",
    },
    {
      title: "Storybook Lite Kit",
      price: "₦4,500",
      desc: "Includes Sade & Walee storybook, flashcards, and stickers for fun reading.",
      img: "/img/kit-lite.jpg",
    },
    {
      title: "Stationery Mini Kit",
      price: "₦3,500",
      desc: "Cute starter pack with pencils, ruler, jotter, cleaner & themed pouch.",
      img: "/img/kit-mini.jpg",
    },
  ];

  return (
    <>
      {showModal && <WaitlistModal setShowModal={setShowModal} />}

      <section className="w-full font-[Poppins] text-[#1f2a2a] bg-white overflow-hidden">
        {/* 🧭 Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <a
            href="/kids"
            className="flex items-center text-[#4a5a5a] hover:text-[#0D9488] text-sm font-medium transition"
          >
            <FiArrowLeft className="mr-1" /> Back
          </a>
        </div>

        {/* 🌸 Hero */}
        <div className="relative flex flex-col items-center justify-center text-center pt-28 pb-16 px-6 bg-[#FAFDFB]">
          <img
            src="/video/sade.jpg"
            alt="Sade smiling with Omeda kit"
            className="w-[160px] sm:w-[200px] mb-5 rounded-2xl shadow-sm object-contain"
          />
          <h1
            data-aos="fade-up"
            className="text-[28px] sm:text-[34px] font-bold text-[#2B3A55] mb-3"
          >
            a soft box of wonder 🎁
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-sm text-[#4A5A5A] max-w-md mb-6 leading-relaxed"
          >
            Calm, joyful kits that help kids feel seen, creative, and connected —
            one story, one sticker, one pencil at a time.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("kits")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 bg-[#0D9488] text-white font-semibold rounded-xl shadow-sm hover:scale-[1.03] transition"
          >
            Explore Kits 💚
          </button>
          <p className="text-[12px] text-[#6C827B] mt-3">
            Last batch sold out in 48 hours — next ships soon!
          </p>
        </div>

        {/* 🎁 Kits */}
        <section id="kits" className="py-20 px-6 bg-[#fffdf9] text-center">
          <h2
            data-aos="fade-up"
            className="text-2xl sm:text-3xl font-bold text-[#2B3A55] mb-2"
          >
            Choose Your Kit
          </h2>
          <p className="text-[14px] text-[#6C827B] mb-10">
            Each kit comes with a little magic — packed gently for curious
            hearts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {kits.map((kit, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                className="relative bg-white border border-[#F0F5F4] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition p-1 flex flex-col"
              >
                {kit.tag && (
                  <div className="absolute top-3 right-3 bg-[#FFF7E8] text-[#B45309] text-[11px] px-3 py-1 rounded-full font-medium">
                    {kit.tag}
                  </div>
                )}
                <img
                  src={kit.img}
                  alt={kit.title}
                  className="w-full h-52 object-cover rounded-t-2xl"
                />
                <div className="p-5 flex flex-col flex-grow text-left">
                  <h3 className="text-lg font-semibold text-[#1F2A2A] mb-1">
                    {kit.title}
                  </h3>
                  <p className="text-sm text-[#4A5A5A] mb-3">{kit.desc}</p>
                  <p className="font-semibold text-[#0D9488] mb-4">
                    {kit.price}
                  </p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-auto w-full bg-[#0D9488] text-white font-semibold py-3 rounded-xl hover:scale-[1.03] transition"
                  >
                    Secure Your Spot 💛
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 📦 What’s Inside */}
        <section className="py-20 px-6 bg-white">
          <h2
            data-aos="fade-up"
            className="text-xl sm:text-2xl font-semibold text-center text-[#2B3A55] mb-8"
          >
            what’s inside the box ✨
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-5xl mx-auto text-center">
            {[
              "🖍️ Stationery",
              "📖 Storybook",
              "🎨 Art Pack",
              "✂️ Craft Toy",
              "✨ Stickers",
              "📱 QR Lessons",
            ].map((item, i) => (
              <div
                key={i}
                data-aos="zoom-in"
                className="p-4 bg-[#FAFEFB] border border-[#F0F5F4] rounded-xl shadow-sm hover:shadow-md transition text-sm font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* 🍜 Meet Sade & Walee */}
        <section className="py-20 px-6 bg-[#FAFDFB] text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#2B3A55] mb-3">
            meet sade & walee 🍜
          </h2>
          <p className="text-sm text-[#4A5A5A] max-w-md mx-auto mb-6 leading-relaxed">
            Two Nigerian kids who carried amala to China and found friendship,
            laughter, and calm learning. Their story inspired these very kits.
          </p>
          <img
            src="/video/sade.jpg"
            alt="Sade & Walee illustration"
            className="w-44 mx-auto rounded-xl shadow-md"
          />
        </section>

        {/* 💖 Sponsor Form */}
        <section id="sponsor" className="py-20 px-6 bg-[#fffefc]">
          <div
            data-aos="fade-up"
            className="max-w-2xl mx-auto bg-white border border-[#F1F1F1] rounded-2xl shadow-sm p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-[#1F2A2A] mb-3">
              Sponsor a child’s smile 💛
            </h2>
            <p className="text-sm text-[#4A5A5A] mb-8">
              Every sponsored kit goes to a school in need — spreading gentle
              joy to kids who deserve it most.
            </p>

            <form
              action="https://formspree.io/f/myzlzowk"
              method="POST"
              className="flex flex-col gap-4 text-left"
            >
              <input
                required
                name="sponsor_name"
                placeholder="Your Name (or Anonymous)"
                className="p-4 border border-[#E6F0ED] rounded-xl text-sm"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email for confirmation"
                className="p-4 border border-[#E6F0ED] rounded-xl text-sm"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Optional message to the child"
                className="p-4 border border-[#E6F0ED] rounded-xl text-sm"
              />
              <button
                type="submit"
                className="w-full bg-[#0D9488] text-white py-3 rounded-xl font-semibold hover:scale-[1.03] transition shadow-sm"
              >
                Send a Sponsored Kit 💚
              </button>
            </form>
          </div>
        </section>

        {/* 🌱 Final CTA */}
        <section className="bg-[#FAFDFB] py-20 px-6 text-center">
          <h2 className="text-2xl font-bold text-[#2B3A55] mb-3">
            calm learning starts here 💚
          </h2>
          <p className="text-sm text-[#4A5A5A] max-w-md mx-auto mb-6">
            Every box you buy helps another child learn softly, dream deeply,
            and smile a little brighter.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("kits")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 bg-[#0D9488] text-white font-semibold rounded-xl shadow-sm hover:scale-[1.03] transition"
          >
            Choose a Kit 💛
          </button>
        </section>

        {/* 🌿 Footer */}
        <footer className="bg-[#fff] text-xs text-center py-6 text-[#6C827B] border-t">
          © 2025 Omeda — Learn • Create • Grow
        </footer>
      </section>
    </>
  );
}

/* 💌 Waitlist Modal */
function WaitlistModal({ setShowModal }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.target);

    try {
      const res = await fetch("https://formspree.io/f/myzlzowk", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) setDone(true);
    } catch {}
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-[#555] text-lg"
        >
          ✕
        </button>
        <h3 className="text-xl font-bold text-[#0D9488] text-center mb-2">
          Join the Waitlist
        </h3>
        <p className="text-[13px] text-[#4A5A5A] text-center mb-4">
          Don’t miss the next batch — spots fill fast! We’ll email you once
          it’s ready.
        </p>

        {done ? (
          <p className="text-center text-[#059669] font-semibold">
            🎉 You’re in! We’ll message you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              required
              name="parent_name"
              placeholder="Your Name"
              className="p-3 border border-[#E6F0ED] rounded-xl text-sm"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 border border-[#E6F0ED] rounded-xl text-sm"
            />
            <input
              name="whatsapp"
              placeholder="WhatsApp (optional)"
              className="p-3 border border-[#E6F0ED] rounded-xl text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0D9488] text-white py-3 rounded-xl font-semibold hover:scale-[1.03] transition"
            >
              {loading ? "Saving your spot..." : "Save My Spot 💚"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}