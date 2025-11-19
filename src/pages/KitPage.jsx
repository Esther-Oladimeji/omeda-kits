import { useState, useEffect } from "react";

function useSimpleCountdown(target) {
  const targetMs = new Date(target).getTime();
  const [days, setDays] = useState(0);

  useEffect(() => {
    function update() {
      const diff = targetMs - Date.now();
      const d = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      setDays(d);
    }

    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, [targetMs]);

  return days;
}

export default function KitPage() {
  console.log("--- KitPage starting ---");
  const [showModal, setShowModal] = useState(false);
  const [selectedKit, setSelectedKit] = useState("premium");
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);
  const daysForKits = useSimpleCountdown("2026-02-01T00:00:00"); // FIXED: Define days here

  return (
    <>
      <WaitlistModal
        open={showModal}
        onClose={() => setShowModal(false)}
        selectedKit={selectedKit}
      />
      <div className="font-[Nunito] text-[#1F2A2A] bg-white overflow-x-hidden">
        <TopTrustBanner />
        <HeroSection />
        <StorySection />
        <BookPreviewSection />
       
        <ProductSection
          openModal={(type) => {
            setSelectedKit(type);
            setShowModal(true);
          }}
          daysRemaining={daysForKits}
        />
        <JourneyBridge />
       
        <FinalCTASection />
       
      </div>
    </>
  );
}

function TopTrustBanner() {
  const mint = "#B8EAD9";

  return (
    <div className="w-full flex justify-center py-3 bg-white">
      <span
        className="px-4 py-1 rounded-full text-[11px] font-medium tracking-wide"
        style={{
          background: mint,
          color: "#1F2A2A",
        }}
      >
        every proceeds go back to the kids
      </span>
    </div>
  );
}

function HeroSection() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="w-full px-4 sm:px-6 py-12 sm:py-20 bg-white relative overflow-hidden">
      {/* KEEP your subtle background elements - they're great */}
      <div className="absolute top-10 -left-4 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[#B8EAD9] opacity-3 blur-xl sm:blur-3xl"></div>
      <div className="absolute bottom-8 -right-4 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-[#B8EAD9] opacity-3 blur-xl sm:blur-3xl"></div>

      {/* KEEP the clean back button */}
      <button
        onClick={() => window.history.back()}
        className="absolute left-4 top-6 p-2 rounded-full bg-white/70 backdrop-blur-sm border border-gray-100 hover:shadow-sm transition-all duration-500"
        aria-label="Go back"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1F2A2A" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="max-w-4xl mx-auto text-center pt-8">
        
        {/* UPDATED Trust Badge */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#E8F4EF]">
            <span className="text-xs font-medium text-[#1F2A2A] tracking-wide whitespace-nowrap">
              The First Nagerian Tailor Storybook
            </span>
          </div>
        </div>

        {/* UPDATED HEADLINE & SUBTITLE - Using your superior copy */}
        <h1 className="text-2xl sm:text-3xl font-light text-[#1F2A2A] mb-3 sm:mb-4 tracking-tight leading-tight px-2">
          The Amala to China Mission
        </h1>

        <p className="text-base sm:text-lg text-[#64748B] max-w-xs sm:max-w-md mx-auto mb-8 sm:mb-12 leading-relaxed px-2">
          Join Sade & Walee on a culinary adventure from Lagos to Beijing.
        </p>

        {/* HERO VISUAL - Keeping your existing reliable structure */}
        <div className="relative max-w-[280px] sm:max-w-xs mx-auto mb-8 sm:mb-12">
          {!isImageLoaded && (
            <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl animate-pulse"></div>
          )}

          <div className={`relative transition-all duration-700 ${isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <img
              src="/video/sade.png"
              alt="Sade & Walee with their legendary cooler"
              className="w-full aspect-[3/4] object-cover rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-white/20"
              onLoad={() => setIsImageLoaded(true)}
            />

            {/* UPDATED BADGE */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1 shadow-sm border border-[#E8F4EF] whitespace-nowrap">
              <span className="text-xs font-medium text-[#1F2A2A]">🇳🇬 A Nigerian Story for the World</span>
            </div>
          </div>
        </div>

        {/* UPDATED CTA */}
        <div className="text-center px-2">
          <button
            onClick={() => document.getElementById("story-section")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center w-full max-w-[280px] px-6 py-4 rounded-full text-base font-medium text-[#1F2A2A] shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group touch-manipulation"
            style={{ background: "#B8EAD9" }}
          >
            <span>Begin the Adventure</span>
            {/* Added subtle arrow for continuity */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-y-0.5 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  const milestones = [
  { chapter: "1", text: "From Local to Global", hint: "Lagos to Beijing" },
  { chapter: "2", text: "Cultural Confidence Born", hint: "Pride as power" }, 
  { chapter: "5", text: "Friendship Beyond Borders", hint: "Amala meets kuàizi" },
  { chapter: "8", text: "Becoming Teachers", hint: "Students to ambassadors" }
];

  return (
    <section id="story-section" className="w-full px-6 py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Minimal Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-light text-[#1F2A2A] mb-4 tracking-tight">
            The Adventure Unfolds
          </h2>
          <div className="w-24 h-0.5 bg-[#E8F4EF] mx-auto"></div>
        </div>

        {/* Cooler Journey Timeline - THIS IS THE CREATIVE PART */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E8F4EF] via-[#B8EAD9] to-[#E8F4EF] transform translate-x-4"></div>
          
          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative flex items-start gap-6 group">
                {/* Chapter Marker */}
                <div className="w-16 h-8 bg-white rounded-full border-2 border-[#E8F4EF] flex items-center justify-center text-sm font-medium text-[#1F2A2A] group-hover:border-[#B8EAD9] transition-colors duration-300 z-10 flex-shrink-0">
                  {milestone.chapter}
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-1 group-hover:translate-x-2 transition-transform duration-300">
                  <h3 className="text-lg font-medium text-[#1F2A2A] mb-1">
                    {milestone.text}
                  </h3>
                  <p className="text-sm text-[#64748B]">
                    {milestone.hint}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle CTA */}
        <div className="text-center mt-16">
          <button 
            onClick={() => document.getElementById("book-preview")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E8F4EF] text-[#1F2A2A] font-medium hover:border-[#B8EAD9] transition-all duration-300"
          >
            Turn the First Page
            <span className="text-lg">→</span>
          </button>
        </div>

      </div>
    </section>
  );
}

function BookPreviewSection() {
  const [activeSpread, setActiveSpread] = useState(0);

  const bookSpreads = [
    {
      image: "/video/sade.png",
      theme: "Arrival",
      chineseWord: "Nǐ hǎo"
    },
    {
      image: "/video/walee.png",
      theme: "Friendship", 
      chineseWord: "Péngyǒu"
    },
    {
      image: "/video/sade.png",
      theme: "Pride",
      chineseWord: "Wénhuà"
    }
  ];

  return (
    <section id="book-preview" className="w-full px-6 py-20 bg-white">
      <div className="max-w-4xl mx-auto">

        {/* Creative Header - Book Chapter Style */}
        <div className="text-center mb-16">
          <div className="inline-block border-b-2 border-[#B8EAD9] pb-2 mb-4">
            <span className="text-xs font-medium text-[#64748B] uppercase tracking-widest">
              Chapter Preview
            </span>
          </div>
          <h2 className="text-2xl font-light text-[#1F2A2A] tracking-tight">
            Turn the Pages
          </h2>
        </div>

        {/* Book Exploration Experience */}
        <div className="relative">
          {/* Book Spread with Page Curl Effect */}
          <div className="relative group cursor-pointer" onClick={() => setActiveSpread((prev) => (prev + 1) % bookSpreads.length)}>
            {/* Book Shadow */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl transform rotate-1 scale-95"></div>

            {/* Main Book */}
            <div className="relative bg-white rounded-2xl p-6 aspect-[3/4] flex items-center justify-center transform group-hover:scale-101 transition-transform duration-500 shadow-xl border border-[#E8F4EF]">
              <img 
                src={bookSpreads[activeSpread].image}
                alt="Book spread"
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Page Corner Fold */}
              <div className="absolute bottom-6 right-6 w-8 h-8 bg-gradient-to-br from-transparent to-gray-100 rounded-tr-lg"></div>
            </div>

            {/* Interactive Hint */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 border border-[#E8F4EF] shadow-sm">
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <span>👆</span>
                <span>Tap to turn page</span>
              </div>
            </div>
          </div>

          {/* Context Bar - Integrated Design */}
          <div className="mt-12 bg-gradient-to-r from-[#FAFBFC] to-white rounded-2xl p-6 border border-[#E8F4EF]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-[#1F2A2A]">
                  {bookSpreads[activeSpread].theme}
                </div>
                <div className="text-xs text-[#64748B]">
                  Cultural moment
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-medium text-[#1F2A2A]">
                  {bookSpreads[activeSpread].chineseWord}
                </div>
                <div className="text-xs text-[#64748B]">
                  Word they learn
                </div>
              </div>
            </div>

            {/* Progress Integrated */}
            <div className="flex justify-center gap-2 mt-4">
              {bookSpreads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSpread(index)}
                  className={`w-8 h-1 rounded-full transition-all duration-300 ${
                    activeSpread === index 
                      ? 'bg-[#1F2A2A]' 
                      : 'bg-[#E8F4EF] hover:bg-[#B8EAD9]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}





function WaitlistModal({ open, onClose, selectedKit }) {
  // COUNTDOWN
  const days = useSimpleCountdown("2026-02-01T00:00:00");

  if (!open) return null;

  const mint = "#B8EAD9";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6">
      {/* ——— MINT HALO BEHIND MODAL ——— */}
      <div
        className="absolute w-[250px] h-[250px] rounded-full blur-3xl opacity-40"
        style={{ background: mint }}
      ></div>

      {/* ——— MODAL BOX ——— */}
      <div className="relative bg-white w-full max-w-sm rounded-3xl p-7 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
        {/* ——— Close Button ——— */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 text-lg hover:bg-gray-200 transition"
        >
          ×
        </button>

        {/* ——— Mint Countdown Pill ——— */}
        <div className="flex justify-center mb-3">
          <span
            className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide"
            style={{ background: mint, color: "#1F2A2A" }}
          >
            ⏳ {days} days to next drop
          </span>
        </div>

        {/* ——— Heading ——— */}
        <h3 className="text-lg font-semibold text-[#1F2A2A] lowercase text-center mb-1">
          secure your spot
        </h3>

        <p className="text-sm text-gray-600 text-center mb-6">
          february 1st batch opens soon — join early to avoid missing out.
        </p>

        {/* ——— FORM ——— */}
        <form className="space-y-4">
          {/* ——— Custom Styled Dropdown ——— */}
          {/* ——— Custom Soft Mint Dropdown ——— */}
          <div>
            <label className="block text-sm mb-1 text-gray-700">kit</label>

            <div className="relative">
              <select
                defaultValue={selectedKit || "premium"}
                className="
        appearance-none w-full px-3 py-2 rounded-lg 
        text-sm outline-none 
        border border-[#D8EEE6]
        focus:ring-2 focus:ring-[#B8EAD9]
      "
                style={{
                  background: "#F7FFFC", // VERY soft mint
                  boxShadow: "0 0 0 1px rgba(184,234,217,0.35)",
                }}
              >
                <option value="premium">Premium Cultural Kit (₦7,500)</option>
                <option value="standard">Story & Practice Kit (₦4,500)</option>
                <option value="study">Study Set (₦3,000)</option>
              </select>

              {/* custom arrow */}
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* ——— Child Name ——— */}
          <div>
            <label className="block text-sm mb-1 text-gray-700">
              child's name
            </label>
            <input
              type="text"
              className="
                w-full px-3 py-2 rounded-lg border border-[#E5EDEA] 
                text-sm focus:ring-2 focus:ring-[#B8EAD9]
              "
              placeholder="e.g. toluwa adeniyi"
            />
          </div>

          {/* ——— Phone ——— */}
          <div>
            <label className="block text-sm mb-1 text-gray-700">
              parent phone number
            </label>
            <input
              type="tel"
              className="
                w-full px-3 py-2 rounded-lg border border-[#E5EDEA] 
                text-sm focus:ring-2 focus:ring-[#B8EAD9]
              "
              placeholder="080…"
            />
          </div>

          {/* ——— Reason ——— */}
          <div>
            <label className="block text-sm mb-1 text-gray-700">
              reason (optional)
            </label>
            <textarea
              className="
                w-full px-3 py-2 h-20 rounded-lg border border-[#E5EDEA] 
                text-sm focus:ring-2 focus:ring-[#B8EAD9]
              "
              placeholder="why your child needs the kit"
            ></textarea>
          </div>

          {/* ——— Submit ——— */}
          <button
            type="submit"
            className="
              w-full py-2.5 rounded-full text-sm font-semibold 
              text-[#1F2A2A] hover:opacity-90 transition
            "
            style={{ background: mint }}
          >
            join waitlist
          </button>
        </form>
      </div>
    </div>
  );
}

function ProductSection() {
  const [selectedKit, setSelectedKit] = useState('premium');
  const [isFlipped, setIsFlipped] = useState(false);

  const kits = {
    premium: {
      name: 'Cultural Storybox',
      price: '₦7,500',
      tagline: 'Complete cultural journey',
      image: '/video/sade.png',
      contents: ['Storybook + Workbook', 'Custom Character Pen', 'Cultural Stickers', 'Chinese Flashcards', 'Completion Certificate'],
      color: '#1F2A2A'
    },
    study: {
      name: 'Study Essentials', 
      price: '₦3,500',
      tagline: 'Premium learning tools', 
      image: '/video/walee.png',
      contents: ['Premium Jotter', 'Pen & Pencil Set', 'Ruler & Eraser', 'Colored Crayons', 'Page Dividers'],
      color: '#64748B'
    },
    bundle: {
      name: 'Ultimate Pack',
      price: '₦9,500',
      tagline: 'Everything + exclusive perks',
      image: '/video/sade.png',
      contents: ['Complete Storybox', 'Study Essentials Kit', 'Founding Family Certificate', 'Early Access to Future Kits', 'Priority Support'],
      color: '#B8EAD9'
    }
  };

  const currentKit = kits[selectedKit];

  return (
    <section id="products" className="w-full px-6 py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        
        {/* ELEGANT HEADER */}
        <div className="text-center mb-16">
          <div className="inline-block border-b border-[#B8EAD9] pb-2 mb-4">
            <span className="text-xs font-medium text-[#64748B] uppercase tracking-widest">
              Curated Learning Experiences
            </span>
          </div>
          <h2 className="text-2xl font-light text-[#1F2A2A] mb-4">Choose Their Journey</h2>
          <div className="w-16 h-0.5 bg-[#E8F4EF] mx-auto"></div>
        </div>

        <div className="space-y-12">
          
          {/* PREMIUM KIT SELECTOR - VERTICAL STACK */}
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            {Object.entries(kits).map(([key, kit]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedKit(key);
                  setIsFlipped(false);
                }}
                className={`text-left p-4 rounded-2xl border-2 transition-all duration-500 ${
                  selectedKit === key 
                    ? 'border-[#1F2A2A] bg-white shadow-lg scale-105' 
                    : 'border-[#E8F4EF] bg-white hover:border-[#B8EAD9] hover:scale-102'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-medium text-[#1F2A2A]">{kit.name}</div>
                    <div className="text-sm text-[#64748B] mt-1">{kit.tagline}</div>
                  </div>
                  <div className="text-lg font-light text-[#1F2A2A]">{kit.price}</div>
                </div>
              </button>
            ))}
          </div>

          {/* FLIPPING CARD EXPERIENCE */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* FLIPPING CARD CONTAINER */}
            <div className="relative">
              <div 
                className={`relative w-full aspect-square cursor-pointer transition-transform duration-700 preserve-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* FRONT SIDE - KIT IMAGE */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="bg-white rounded-2xl border border-[#E8F4EF] overflow-hidden w-full h-full">
                    <img 
                      src={currentKit.image}
                      alt={currentKit.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* FLOATING HINT */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border border-[#E8F4EF]">
                        <div className="flex items-center gap-2 text-sm text-[#64748B]">
                          <span className="text-lg">🔄</span>
                          <span>Flip to explore contents</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BACK SIDE - CONTENTS LIST */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="bg-gradient-to-br from-[#FAFBFC] to-white rounded-2xl border border-[#E8F4EF] p-8 w-full h-full flex flex-col justify-center">
                    <div className="text-center mb-6">
                      <div className="text-sm font-medium text-[#1F2A2A] mb-2">What's Inside</div>
                      <div className="w-12 h-0.5 bg-[#B8EAD9] mx-auto"></div>
                    </div>
                    
                    <div className="space-y-3">
                      {currentKit.contents.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#B8EAD9] flex-shrink-0"></div>
                          <span className="text-sm text-[#64748B]">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* CLOSE HINT */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border border-[#E8F4EF]">
                        <div className="flex items-center gap-2 text-sm text-[#64748B]">
                          <span>Flip back to see kit</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KIT DETAILS & CTA */}
            <div className="space-y-8">
              
              {/* SOCIAL IMPACT */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm mb-4">
                  <span className="text-green-500">❤️</span>
                  Your purchase sponsors educational kits
                </div>
              </div>

              {/* FOUNDING PERKS */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-[#1F2A2A] text-center">Founding Family Benefits</h4>
                <div className="space-y-2">
                  {['Early access to all future kits', 'Lifetime special pricing', 'Signed founding certificate', 'Priority support'].map((perk, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-[#64748B]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B8EAD9] flex-shrink-0"></div>
                      {perk}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center space-y-4">
                <button className="w-full py-4 rounded-full text-lg font-medium text-[#1F2A2A] bg-[#B8EAD9] hover:scale-105 transition-all duration-300 shadow-lg">
                  Join Founding Families
                </button>
                <p className="text-xs text-[#64748B]">
                  Limited spots • Delivery calculated at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
function JourneyBridge() {
  return (
    <section className="px-6 py-24 bg-gradient-to-b from-white to-[#FAFBFC]">
      <div className="max-w-md mx-auto text-center">
        
        {/* TRANSITION MOMENT */}
        <div className="space-y-8">
          
          {/* ELEGANT ICON - NEUTRAL */}
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-[#F8FAFC] flex items-center justify-center border border-[#E2E8F0]">
              <span className="text-[#64748B] text-lg">→</span>
            </div>
          </div>

          {/* STRATEGIC MESSAGE */}
          <div className="space-y-4">
            <p className="text-[#64748B] text-lg font-light">
              Ready to begin their cultural journey?
            </p>
            <div className="text-sm text-[#64748B] tracking-widest">
              FINAL STEP AHEAD
            </div>
          </div>

          {/* SUBTLE PROGRESS INDICATOR - NEUTRAL */}
          <div className="flex justify-center gap-1">
            <div className="w-1 h-1 rounded-full bg-[#E2E8F0]"></div>
            <div className="w-1 h-1 rounded-full bg-[#E2E8F0]"></div>
            <div className="w-6 h-1 rounded-full bg-[#94A3B8]"></div> {/* Darker gray instead of mint */}
          </div>

        </div>

      </div>
    </section>
  );
}



function FinalCTASection() {
  return (
    <section id="final-cta" className="px-6 py-20 bg-white">  {/* White background to stand out */}
      <div className="max-w-2xl mx-auto text-center">
        
        {/* DISTINCT HEADER */}
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-[#1F2A2A] mb-4">  {/* Bolder font */}
            Complete Their Adventure
          </h2>
          <p className="text-[#64748B]">
            Secure your Cultural Storybox today
          </p>
        </div>

        {/* PROMINENT CTA */}
        <div className="space-y-4">
          <button className="w-full max-w-xs mx-auto py-4 rounded-full text-[#1F2A2A] font-medium bg-[#B8EAD9] hover:scale-105 transition-all duration-300 shadow-lg">
            Get the Kit - ₦7,500
          </button>
          
          {/* SECONDARY OPTIONS */}
          <div className="flex justify-center gap-6 text-sm">
            <button className="text-[#64748B] hover:text-[#1F2A2A] transition-colors duration-300">
              Apply for Support
            </button>
            <a href="/sponsor" className="text-[#64748B] hover:text-[#1F2A2A] transition-colors duration-300">
              Sponsor a Child
            </a>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-12 pt-8 border-t border-[#E8F4EF]">
          <p className="text-xs text-[#64748B]">
            Sade & Walee • Powered by Omeda
          </p>
        </div>
      </div>
    </section>
  );
}
