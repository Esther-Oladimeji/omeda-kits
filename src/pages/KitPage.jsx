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
  const daysForKits = useSimpleCountdown("2026-02-01T00:00:00"); 

  return (
    <>
      <WaitlistModal
        open={showModal}
        onClose={() => setShowModal(false)}
        selectedKit={selectedKit}
      />
      <div className="font-[Nunito] text-[#1F2A2A] bg-white overflow-x-hidden">
       
        <HeroSection />
        <StorySection />
        <BookPreviewSection />
     
        <ProductSection
          openWaitlist={() => setShowModal(true)}
          daysRemaining={daysForKits}
        />
        <TrustFutureSection />
      
       
        <FinalCTASection openWaitlist={() => setShowModal(true)}/>
       
      </div>
    </>
  );
}


function HeroSection() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    // FIX 1: Apply flex structure and min-h-screen on mobile to constrain height.
    // Use minimal vertical padding (pt-8 pb-4) to reduce height. Revert to normal flow on medium screens.
    <section className="w-full px-6 lg:px-8 pt-8 pb-4 md:py-16 lg:py-24 bg-white relative overflow-hidden min-h-screen flex flex-col md:block">
      
      {/* Background Elements - Responsive (No change here) */}
      <div className="absolute top-10 -left-4 w-24 h-24 sm:w-40 sm:h-40 lg:w-60 lg:h-60 rounded-full bg-[#B8EAD9] opacity-3 blur-2xl sm:blur-3xl"></div>
      <div className="absolute bottom-8 -right-4 w-20 h-20 sm:w-32 sm:h-32 lg:w-48 lg:h-48 rounded-full bg-[#B8EAD9] opacity-3 blur-2xl sm:blur-3xl"></div>

      {/* REFINED CONTAINER: Standard max-w-6xl */}
      <div className="max-w-6xl mx-auto flex-1 flex flex-col justify-center"> {/* FIX 2: Added flex properties to content wrapper */}
        
        {/* RESPONSIVE GRID: Starts at md, reduced gap on md for tighter tablet flow */}
        <div className="md:grid md:grid-cols-2 md:gap-8 lg:gap-16 md:items-center">

          {/* Left Column - Content */}
          {/* FIX 3: Tighter vertical margins (mb-4 for subtitle, mb-6 for stats) */}
          <div className="text-center md:text-left md:max-w-lg lg:max-w-none mx-auto">
            
            {/* Trust Badge */}
            <div className="flex justify-center md:justify-start mb-4 sm:mb-8 lg:mb-10">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#B8EAD9]/10 backdrop-blur-sm border border-[#E8F4EF]">
                <span className="text-xs font-medium text-[#1F2A2A] tracking-wide whitespace-nowrap">
                  A Complete Storybook Learning Experience
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1F2A2A] mb-3 sm:mb-4 lg:mb-6 tracking-tight leading-tight px-4 sm:px-2 md:px-0">
              When Amala Goes to Beijing
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-[#64748B] max-w-sm sm:max-w-md lg:max-w-lg mx-auto md:mx-0 mb-4 sm:mb-12 lg:mb-16 leading-relaxed px-4 md:px-0">
              Sade and Walee take pride, food, and culture to China.
            </p>

            {/* Stats - Desktop Horizontal Layout */}
            <div className="hidden md:flex justify-start gap-12 mb-8">
              <div className="text-center md:text-left">
                <div className="text-2xl font-light text-[#1F2A2A]">150+</div>
                <div className="text-sm text-[#64748B]">Kits Sponsored</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl font-light text-[#1F2A2A]">200+</div>
                <div className="text-sm text-[#64748B]">Families Waiting</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl font-light text-[#1F2A2A]">15+</div>
                <div className="text-sm text-[#64748B]">Schools</div>
              </div>
            </div>

            {/* CTA - Desktop */}
            <div className="hidden md:block text-left">
              <button
                onClick={() => document.getElementById("story-section")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-medium text-[#1F2A2A] shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group"
                style={{ background: "#B8EAD9" }}
              >
                <span>Begin the Adventure</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-y-0.5 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md mx-auto md:max-w-none md:mx-0 mb-8 sm:mb-12 md:mb-0">
            {!isImageLoaded && (
              <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl lg:rounded-3xl animate-pulse"></div>
            )}

            <div className={`relative transition-all duration-700 ${isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <img
                src="/video/dragging-cooler-tall.png"
                alt="Sade & Walee with their legendary cooler"
                className="w-full aspect-[3/4] object-cover rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl border-none" 
                onLoad={() => setIsImageLoaded(true)}
              />
              
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 sm:px-4 py-1 shadow-sm border border-[#E8F4EF] whitespace-nowrap lg:-bottom-4">
                <span className="text-xs font-medium text-[#1F2A2A]">🇳🇬 Join 200+ Families on Waitlist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats & CTA - Hidden starting on tablet (md) */}
        <div className="md:hidden">
          {/* Mobile Stats */}
          <div className="flex justify-center gap-8 mb-6"> {/* FIX 3: Tighter margin */}
            <div className="text-center">
              <div className="text-xl font-light text-[#1F2A2A]">150+</div>
              <div className="text-xs text-[#64748B]">Sponsored</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-light text-[#1F2A2A]">200+</div>
              <div className="text-xs text-[#64748B]">Waiting</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-light text-[#1F2A2A]">15+</div>
              <div className="text-xs text-[#64748B]">Schools</div>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="text-center px-2">
            <div className="w-full flex justify-center px-4 lg:hidden">
              <button
                onClick={() =>
                  document.getElementById("story-section")?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full max-w-md py-3 rounded-full text-base font-medium text-[#1F2A2A] shadow-lg 
                          hover:scale-105 active:scale-95 transition-all duration-300 group"
                style={{ background: "#B8EAD9" }}
              >
                <span>Discover the Story</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  const milestones = [
    { chapter: "1", text: "Lagos to Beijing", hint: "Sade & Walee are selected to represent Nigeria at an international food festival.", icon: "🌍" },
    { chapter: "2", text: "A Suspicious Cooler", hint: "They carry one strange box. Nobody’s ready for what’s inside.", icon: "💪" }, 
    { chapter: "5", text: "Kids from Everywhere", hint: "From Brazil to India, every child brings their best. But only one duo brings a story.", icon: "🤝" },
    { chapter: "8", text: "Confidence in Culture", hint: "In a room full of new faces, they stand tall with their Yoruba and amala.", icon: "👩‍🏫" }
  ];

  return (
    <section id="story-section" className="w-full px-6 lg:px-8 py-20 lg:py-28 bg-white"> {/* MODIFIED: px-6 and py-20 minimum */}
      {/* REFINED CONTAINER: Standard max-w-6xl */}
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1F2A2A] mb-4 tracking-tight">
            Where Nigerian Kids Become Global Heroes
          </h2>
          <div className="w-24 h-0.5 bg-[#E8F4EF] mx-auto"></div>
        </div>

        {/* Mobile/Tablet: Vertical Timeline - Hide at LG, but constrain width for a cleaner tablet look */}
        <div className="lg:hidden relative max-w-xl mx-auto py-4 sm:py-6">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E8F4EF] via-[#B8EAD9] to-[#E8F4EF] transform translate-x-4"></div>

          <div className="space-y-12 px-1.5 sm:px-2">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative flex items-start gap-6 group">
                {/* Visual chapter marker for mobile */}
                <div className="w-16 h-8 bg-white rounded-full border-2 border-[#E8F4EF] flex items-center justify-center text-sm font-medium text-[#1F2A2A] group-hover:border-[#B8EAD9] transition-colors duration-300 z-10 flex-shrink-0">
                  {milestone.chapter}
                </div>
                {/* Text hint is the main content for mobile */}
                <div className="flex-1 pt-1 group-hover:translate-x-0.5 transition-transform duration-300">
                  <h3 className="text-lg font-medium text-[#1F2A2A] mb-1">{milestone.text}</h3> {/* Added text back as heading */}
                  <p className="text-sm text-[#475569] leading-relaxed">{milestone.hint}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Interactive Grid - Stays hidden until LG */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20 lg:items-start">

          {/* Left: Enhanced Timeline with Icons */}
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="flex items-start gap-6 p-6 rounded-2xl border-2 border-[#E8F4EF] hover:border-[#B8EAD9] hover:shadow-lg transition-all duration-300">
                  {/* Icon + Chapter */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-2xl">{milestone.icon}</div>
                    <div className="w-12 h-12 bg-white rounded-full border-2 border-[#E8F4EF] flex items-center justify-center text-sm font-medium text-[#1F2A2A]">
                      {milestone.chapter}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-[#1F2A2A] mb-2">{milestone.text}</h3>
                    <p className="text-[#64748B] leading-relaxed">{milestone.hint}</p>
                    {/* Hover Reveal - Cultural Insight */}
                    <div className="mt-3 text-sm text-[#B8EAD9] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Cultural moment in the story →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Interactive Book Preview */}
          <div className="sticky top-8">
            <div className="bg-gradient-to-br from-[#FAFBFC] to-white rounded-3xl p-8 border border-[#E8F4EF] shadow-sm">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-2xl font-light text-[#1F2A2A] mb-2">Chapter Journey</h3>
                <p className="text-[#64748B]">Follow Sade & Walee's transformation</p>
              </div>

              {/* Progress Visualization */}
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-[#64748B]">
                  <span>Local Heroes</span>
                  <span>Global Ambassadors</span>
                </div>
                <div className="w-full bg-[#E8F4EF] rounded-full h-2">
                  <div className="bg-[#B8EAD9] rounded-full h-2 w-3/4 transition-all duration-500"></div>
                </div>

                {/* Cultural Exchange Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-white rounded-xl border border-[#E8F4EF]">
                    <div className="text-lg font-medium text-[#1F2A2A]">8</div>
                    <div className="text-xs text-[#64748B]">Languages</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-[#E8F4EF]">
                    <div className="text-lg font-medium text-[#1F2A2A]">5</div>
                    <div className="text-xs text-[#64748B]">Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <button 
            onClick={() => document.getElementById("book-preview")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-[#E8F4EF] text-[#1F2A2A] font-medium hover:border-[#B8EAD9] transition-all duration-300 text-base sm:text-lg"
          >
            Preview the Book
            <span className="text-lg sm:text-xl">→</span>
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
    image: "/video/book-cover.jpg",
    theme: "The Trip Begins",
    chineseWord: "Nǐ hǎo" // Hello
  },
  {
    image: "/video/book-page.png",
    theme: "Meeting the World",
    chineseWord: "Péngyǒu" // Friend
  },
  {
    image: "/video/workbook-page.png",
    theme: "Try It Yourself",
    chineseWord: "Wénhuà" // Culture
  }
];

  return (
    <section id="book-preview" className="w-full px-6 py-20 bg-[#FAFBFC]"> {/* MODIFIED: px-6 and py-20 minimum */}
      {/* REFINED CONTAINER: Use max-w-4xl for a highly focused, centered section */}
      <div className="max-w-4xl mx-auto">

        {/* Header - Better tablet scaling */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block border-b-2 border-[#B8EAD9] pb-2 mb-4">
            <span className="text-xs font-medium text-[#64748B] uppercase tracking-widest">
              Chapter Preview
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-light text-[#1F2A2A] tracking-tight">
            Turn the Pages
          </h2>
        </div>

        {/* Book Exploration */}
        <div className="relative">
          {/* Book Spread */}
          <div className="relative group cursor-pointer" onClick={() => setActiveSpread((prev) => (prev + 1) % bookSpreads.length)}>
            {/* Book Shadow - Better tablet scaling */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl sm:rounded-2xl transform rotate-1 scale-95"></div>

            {/* Main Book - Ensures it fills the width of its container */}
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 aspect-[3/4] max-w-full mx-auto flex items-center justify-center transform group-hover:scale-101 transition-transform duration-500 shadow-lg sm:shadow-xl border border-[#E8F4EF]">
              <img 
                src={bookSpreads[activeSpread].image}
                alt={`Book spread: ${bookSpreads[activeSpread].theme}`}
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Page Corner Fold - Scale for tablet */}
              <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-transparent to-gray-100 rounded-tr-lg"></div>
            </div>

            {/* Interactive Hint - Better mobile/tablet positioning */}
            <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-[#E8F4EF] shadow-sm whitespace-nowrap">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#64748B]">
                <span>👆</span>
                <span>Tap to turn page</span>
              </div>
            </div>
          </div>

          {/* Context Bar - Simplified for better flow on all screens */}
          <div className="mt-8 sm:mt-12 bg-gradient-to-r from-[#FAFBFC] to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#E8F4EF] text-center">
            
            {/* Theme and Word Stacked for cleaner look */}
            <div className="flex justify-center items-end gap-6 mb-4">
              <div className="text-center">
                <div className="text-sm font-medium text-[#1F2A2A]">
                  {bookSpreads[activeSpread].theme}
                </div>
                <div className="text-xs text-[#64748B]">
                  Cultural Moment
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-[#1F2A2A]">
                  {bookSpreads[activeSpread].chineseWord}
                </div>
                <div className="text-xs text-[#64748B]">
                  Word they learn
                </div>
              </div>
            </div>

            {/* Progress - Better mobile spacing */}
            <div className="flex justify-center gap-2 mt-4">
              {bookSpreads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSpread(index)}
                  className={`w-6 sm:w-8 h-1 rounded-full transition-all duration-300 ${
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





function WaitlistModal({ open, onClose }) {
  const days = useSimpleCountdown("2026-02-01T00:00:00");
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission

  if (!open) return null;

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // Use the Fetch API to send data without navigating away
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
          'Accept': 'application/json'
      }
    });

    if (response.ok) {
      setIsSubmitted(true); // Show success message
    } else {
      // Handle error display here if needed (e.g., show a temporary error message)
      alert("Oops! There was an issue submitting your form. Please try again.");
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6">
      <div className="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-xl">

        <button onClick={onClose} className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition">
          ×
        </button>

        {/* --- Dynamic Content based on Submission State --- */}

        {isSubmitted ? (
          // ✅ SUCCESS STATE
          <div className="text-center py-8">
            <div className="text-5xl mb-6"></div>
            <h3 className="text-xl font-light text-[#1F2A2A] mb-3">
              You're on the Priority List!
            </h3>
            <p className="text-sm text-[#64748B] mb-6">
              Thank you for joining the Omeda community. We will message you with early access instructions for the February 2026 batch.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-full text-base font-medium text-white bg-[#1F2A2A] hover:bg-[#475569] transition-all duration-300"
            >
              Continue Browsing
            </button>
          </div>

        ) : (
          // 📝 FORM STATE
          <>
            {/* URGENCY HEADER */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-medium mb-3">
                ⚡ Next Batch: Feb 2026
              </div>
              <h3 className="text-xl font-light text-[#1F2A2A] mb-2">
                Get Priority Access
              </h3>
              <p className="text-sm text-[#64748B]">
                Join {days} families waiting for our limited next batch
              </p>
            </div>

            {/* CLEAR OPTIONS */}
            <form onSubmit={handleSubmit} action="https://formspree.io/f/myzlzowk" method="POST" className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2A2A] mb-2">
                  I'm interested in:
                </label>
                <select name="interest" required className="w-full px-4 py-3 rounded-xl border border-[#E8F4EF] focus:border-[#B8EAD9] focus:ring-2 focus:ring-[#B8EAD9] transition-all">
                  <option value="">Select an option</option>
                  <option value="parent">Getting a kit for my child</option>
                  <option value="sponsor">Sponsoring kits for a school</option>
                  <option value="both">Both - for my child & to sponsor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2A2A] mb-2">
                  WhatsApp Number (Optional)
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  className="w-full px-4 py-3 rounded-xl border border-[#E8F4EF] focus:border-[#B8EAD9] focus:ring-2 focus:ring-[#B8EAD9] transition-all"
                  placeholder="e.g. +234 801 234 5678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2A2A] mb-2">
                  Email for updates
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#E8F4EF] focus:border-[#B8EAD9] focus:ring-2 focus:ring-[#B8EAD9] transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* REMOVED: The hidden field that redirects the user */}
              <input type="hidden" name="_subject" value="Omeda Priority List Signup" />

              <button
                type="submit"
                className="w-full py-4 rounded-full text-[#1F2A2A] font-medium bg-[#B8EAD9] hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Join Priority List
              </button>
            </form>

            {/* CLEAR EXPECTATIONS */}
            <div className="text-center mt-6 pt-4 border-t border-[#E8F4EF]">
              <p className="text-xs text-[#64748B]">
                ✅ We'll email you first when booking opens<br/>
                ✅ Limited batch - priority list gets early access
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ProductSection({ openWaitlist, daysRemaining }) {
  const [selectedKit, setSelectedKit] = useState('premium');
  const [isFlipped, setIsFlipped] = useState(false);

  const kits = {
    premium: {
      name: 'Sade & Walee Storybox',
      description: 'The complete Sade & Walee experience',
      image: '/video/kit.jpg',
      contents: ['Storybook + Workbook', 'Custom Character Pen', 'Cultural Stickers', 'Chinese Flashcards', 'Completion Certificate', '... and many more!'],
    }
  };

  const currentKit = kits[selectedKit];

  return (
    <section id="products" className="w-full px-6 py-20 lg:py-20 bg-white"> {/* MODIFIED: px-6 and py-20 minimum */}
      {/* REFINED CONTAINER: Standard max-w-6xl */}
      <div className="max-w-6xl mx-auto">

        {/* CREATIVE HEADER - Flows from previous section */}
        {/* In ProductSection */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#E8F4EF] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
            <span className="text-xs font-medium text-amber-700 uppercase tracking-widest">
              The Complete Experience
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-light text-[#1F2A2A] mb-4 tracking-tight">
            From Reading to Practice
          </h2>
          <p className="text-sm text-[#64748B] max-w-md mx-auto">
            Each book kit includes a workbook, flashcards, stationery, stickers and other hands-on materials.
          </p>
        </div>

        {/* SIMPLIFIED LAYOUT - One focus kit */}
        {/* RESPONSIVE GRID: Starts at md, uses md:gap-8 for tighter tablet flow, max-w-4xl to contain the core content */}
        <div className="grid md:grid-cols-2 max-w-4xl mx-auto md:gap-8 lg:gap-12 items-start">

          {/* ENHANCED FLIP CARD - More elegant */}
          <div className="relative w-full">
            <div 
              className={`relative w-full aspect-square cursor-pointer transition-all duration-700 preserve-3d active:scale-95 ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* FRONT - Cleaner design */}
              <div className="absolute inset-0 backface-hidden">
                <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E8F4EF] overflow-hidden w-full h-full shadow-lg hover:shadow-xl transition-shadow">
                  <img 
                    src={currentKit.image}
                    alt={currentKit.name}
                    className="w-full h-full object-cover"
                  />

                  {/* ELEGANT HINT */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border border-[#E8F4EF]">
                      <div className="flex items-center gap-2 text-sm text-[#64748B]">
                       <span className="text-lg">✨</span>
                        <span>Explore the Kit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BACK - Premium contents */}
              <div className="absolute inset-0 backface-hidden rotate-y-180">
                <div className="bg-gradient-to-br from-[#FAFBFC] to-white rounded-xl sm:rounded-2xl border border-[#E8F4EF] p-6 sm:p-8 w-full h-full flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <div className="text-sm font-medium text-[#1F2A2A] mb-2">Complete Learning Kit</div>
                    <div className="w-8 h-0.5 bg-[#B8EAD9] mx-auto"></div>
                  </div>

                  <div className="space-y-3">
                    {currentKit.contents.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B8EAD9] flex-shrink-0"></div>
                        <span className="text-sm text-[#64748B]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STREAMLINED CONTENT - Strategic messaging */}
          <div className="space-y-6 sm:space-y-8 text-center md:text-left pt-6 md:pt-0">

            {/* IMPACT FOCUS */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-[#E8F4EF] text-[#1F2A2A] px-4 py-2 rounded-full text-sm">
                <span>🌟</span>
                Help more kids reach the story
              </div>
            </div>

            {/* CLEAN VALUE PROPOSITION */}
            <div className="space-y-4">
              <h3 className="text-lg font-light text-[#1F2A2A] text-center md:text-left">
                {currentKit.name}
              </h3>
              <p className="text-sm text-[#64748B] text-center md:text-left leading-relaxed">
                
              </p>
            </div>

            {/* STRATEGIC BENEFITS */}
            <div className="space-y-3">
              {[
  'Kids read, build, and explore',
  'Made for Nigerian homes & schools',
  'Easy for parents and teachers to use',
  'Teaches culture with pride'
].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 text-sm text-[#64748B]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B8EAD9] mt-1 flex-shrink-0"></div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* ELEGANT CTA */}
            <div className="text-center md:text-left space-y-3">
              <button onClick={openWaitlist} className="w-full py-3 sm:py-4 rounded-full text-base font-medium text-[#1F2A2A] bg-[#B8EAD9] hover:scale-105 transition-all duration-300 shadow-lg">
                Join the Waitlist
              </button>
              <p className="text-xs text-[#64748B]">
                Next storybox batch: February 2024
              </p>
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


function TrustFutureSection() {
  return (
    <section className="px-6 py-20 bg-[#FAFBFC]"> {/* MODIFIED: px-6 and py-20 minimum */}
      {/* REFINED CONTAINER: Use max-w-2xl for focused section, consistent with FinalCTA */}
      <div className="max-w-2xl mx-auto text-center space-y-8 sm:space-y-10">

        {/* SOCIAL PROOF */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E8F4EF]">
            <span className="text-green-500">✓</span>
            <span className="text-sm font-medium text-[#1F2A2A]">150+ Kits Already Sponsored</span>
          </div>
          <p className="text-[#64748B] text-sm">
            Reaching homes and schools in Lagos & Ogun state.
          </p>
        </div>

        {/* VISION */}
        <div className="space-y-3 px-4">
          <h3 className="text-lg sm:text-xl font-light text-[#1F2A2A]">
            Just the Beginning
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed">
            From art kits to coding games, Omeda is just getting started. 
          </p>
        </div>

        {/* TRUST SIGNALS */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 text-xs text-[#64748B] px-4">
          <span className="flex items-center justify-center gap-1">
            <span>✓</span>
            <span>Nigerian-built</span>
          </span>
          <span className="flex items-center justify-center gap-1">
            <span>✓</span>
            <span>Classroom-friendly</span>
          </span>
          <span className="flex items-center justify-center gap-1">
            <span>✓</span>
            <span>Trusted by families</span>
          </span>
        </div>

      </div>
    </section>
  );
}




function FinalCTASection({ openWaitlist }) {
  return (
    <section className="px-6 py-20 bg-white"> {/* MODIFIED: px-6 and py-20 minimum */}
      {/* REFINED CONTAINER: Standard max-w-2xl for focused CTA */}
      <div className="max-w-2xl mx-auto text-center space-y-10">

        {/* No-fluff heading */}
        <div className="space-y-4">
          <h2 className="text-2xl font-light text-[#1F2A2A] tracking-tight">
            Be Part of the First 200
          </h2>
          <p className="text-base text-[#64748B] leading-relaxed">
            Get early access and real tools in more kids' hands.
          </p>
        </div>

        {/* Call-to-action */}
        <div className="space-y-4">
          <button
            onClick={openWaitlist}
            className="w-full max-w-sm mx-auto py-4 rounded-full text-lg font-medium text-[#1F2A2A] bg-[#B8EAD9] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Join the Waitlist
          </button>
          <p className="text-sm text-[#64748B]">Available February 2026</p>
        </div>

        {/* Soft footer */}
        <div className="pt-8 border-t border-[#E8F4EF]">
          <p className="text-sm text-[#64748B]">
            Omeda • For the future of African children.
          </p>
        </div>
      </div>
    </section>
  );
}