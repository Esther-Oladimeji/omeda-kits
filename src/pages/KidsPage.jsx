import React from "react";
import {useState, useEffect} from "react";

const KidsPage = () => {
  return <div>

  <KidsHero />
  <ExperienceGateway />
  <OmedaAdventureMap />
  <ExperienceJourney />
  <CulturalImpact />
  <GetStartedCTA />
  <KidsFooter />
  </div>;
};

export default KidsPage;

function KidsHero() {
  const [activeView, setActiveView] = useState('portal');

  return (
    <section className="w-full min-h-screen bg-white relative overflow-hidden">
      {/* PREMIUM BACKGROUND TEXTURE */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FAFBFC] to-white"></div>
      
      {/* SUBTLE PATTERN */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,...')]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        
        {/* MINIMAL LOGO/BADGE */}
        <div className="text-center mb-16">
          <div className="inline-block border-b border-[#1F2A2A] pb-2">
            <span className="text-sm tracking-widest text-[#1F2A2A] font-light">OMEDA</span>
          </div>
        </div>

        {/* CHARACTER PORTAL CONCEPT */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* SADE PORTAL */}
          <div 
            className="relative group cursor-pointer"
            onMouseEnter={() => setActiveView('sade')}
          >
            <div className="aspect-square bg-gradient-to-br from-white to-[#FAFBFC] border border-[#E8F4EF] rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:border-[#1F2A2A] overflow-hidden">
              <img
                src="/video/sade.png"
                alt="Sade"
                className="w-3/4 h-3/4 object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            {/* FLOATING LABEL */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-[#E8F4EF] rounded-full px-4 py-2">
              <span className="text-sm text-[#1F2A2A] font-medium">Sade</span>
            </div>
          </div>

          {/* WALEE PORTAL */}
          <div 
            className="relative group cursor-pointer"
            onMouseEnter={() => setActiveView('walee')}
          >
            <div className="aspect-square bg-gradient-to-br from-white to-[#FAFBFC] border border-[#E8F4EF] rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:border-[#1F2A2A] overflow-hidden">
              <img
                src="/video/walee.jpg"
                alt="Walee"
                className="w-3/4 h-3/4 object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-[#E8F4EF] rounded-full px-4 py-2">
              <span className="text-sm text-[#1F2A2A] font-medium">Walee</span>
            </div>
          </div>

        </div>

        {/* DYNAMIC HEADLINE */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-[#1F2A2A] mb-4 tracking-tight">
            {activeView === 'sade' && "Curiosity Meets Culture"}
            {activeView === 'walee' && "Creativity Finds Purpose"}  
            {activeView === 'portal' && "Learning Reimagined"}
          </h1>
          <p className="text-lg text-[#64748B] font-light max-w-md mx-auto leading-relaxed">
            Through Nigerian stories that travel the world
          </p>
        </div>

        {/* MINIMAL CTA */}
        <div className="text-center">
          <button className="border-b border-[#1F2A2A] text-[#1F2A2A] font-medium pb-1 hover:border-[#B8EAD9] transition-all duration-300">
            Enter their world
          </button>
        </div>

      </div>
    </section>
  );
}
function ExperienceGateway() {
  const [hoveredPath, setHoveredPath] = useState(null);

  const pathways = [
    {
      id: 'play',
      title: 'Interactive Exploration',
      action: 'Begin playing',
      gradient: 'from-white to-[#FAFBFC]'
    },
    {
      id: 'learn', 
      title: 'Structured Learning',
      action: 'Start courses',
      gradient: 'from-white to-[#FAFBFC]'
    },
    {
      id: 'create',
      title: 'Creative Building', 
      action: 'Start creating',
      gradient: 'from-white to-[#FAFBFC]'
    }
  ];

  return (
    <section className="w-full px-6 py-32 bg-white">
      <div className="max-w-4xl mx-auto">
        
        {/* MINIMAL HEADER */}
        <div className="text-center mb-20">
          <div className="text-xs text-[#64748B] tracking-widest mb-4">
            CHOOSE YOUR PATH
          </div>
          <h2 className="text-2xl font-light text-[#1F2A2A]">
            Three Entrances, One Destination
          </h2>
        </div>

        {/* PATHWAY GATEWAY */}
        <div className="grid gap-8">
          {pathways.map((path, index) => (
            <div
              key={path.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredPath(path.id)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              <div className={`bg-gradient-to-r ${path.gradient} border border-[#E8F4EF] rounded-2xl p-8 transition-all duration-500 group-hover:border-[#1F2A2A]`}>
                
                {/* PATH CONTENT */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* PATH NUMBER */}
                    <div className="w-8 h-8 rounded-full border border-[#E8F4EF] flex items-center justify-center text-sm text-[#1F2A2A] font-medium">
                      {index + 1}
                    </div>
                    
                    {/* PATH INFO */}
                    <div>
                      <h3 className="text-lg font-medium text-[#1F2A2A] mb-1">
                        {path.title}
                      </h3>
                      <div className={`text-sm text-[#64748B] transition-all duration-300 ${
                        hoveredPath === path.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        {path.action}
                      </div>
                    </div>
                  </div>

                  {/* ARROW INDICATOR */}
                  <div className="text-[#1F2A2A] text-lg transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
function OmedaAdventureMap() {
  const [activeStop, setActiveStop] = useState(0);
  
  const adventureStops = [
    {
      stage: "Begin Here",
      title: "Meet Your Guides",
      description: "Sade & Walee welcome you to their world of discovery",
      action: "Get to know them",
      position: "start"
    },
    {
      stage: "First Stop", 
      title: "Play & Explore",
      description: "Interactive games that feel like play, but teach real skills",
      action: "Start playing",
      position: "play"
    },
    {
      stage: "Next Adventure",
      title: "Learn & Grow", 
      description: "Engaging courses where Nigerian stories meet global learning",
      action: "Begin lessons",
      position: "learn"
    },
    {
      stage: "Create & Shine",
      title: "Build & Create",
      description: "Hands-on projects that turn ideas into amazing creations",
      action: "Start creating", 
      position: "create"
    }
  ];

  return (
    <section className="w-full px-6 py-20 bg-white">
      <div className="max-w-5xl mx-auto">
        
        {/* CREATIVE HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#E8F4EF] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm font-medium text-[#1F2A2A] tracking-wide">
              Your Learning Journey Awaits
            </span>
          </div>
          
          <h2 className="text-2xl font-light text-[#1F2A2A] mb-4 tracking-tight">
            The Omeda Adventure Path
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Follow Sade & Walee through experiences designed to build confidence, 
            creativity, and cultural pride—one joyful step at a time.
          </p>
        </div>

        {/* INTERACTIVE ADVENTURE MAP */}
        <div className="relative">
          
          {/* CONNECTING PATH LINE */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E8F4EF] via-[#B8EAD9] to-[#E8F4EF] transform translate-x-4 z-0"></div>
          
          {/* ADVENTURE STOPS */}
          <div className="space-y-12 relative z-10">
            {adventureStops.map((stop, index) => (
              <div 
                key={index}
                className={`relative flex items-start gap-8 group cursor-pointer transition-all duration-500 ${
                  activeStop === index ? 'scale-102' : 'hover:scale-101'
                }`}
                onClick={() => setActiveStop(index)}
              >
                
                {/* STOP MARKER */}
                <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-sm font-medium transition-all duration-500 flex-shrink-0 ${
                  activeStop === index 
                    ? 'border-[#1F2A2A] bg-white scale-110' 
                    : 'border-[#E8F4EF] bg-white group-hover:border-[#B8EAD9]'
                }`}>
                  {stop.position === 'start' && '🎯'}
                  {stop.position === 'play' && '🎮'}  
                  {stop.position === 'learn' && '📚'}
                  {stop.position === 'create' && '🎨'}
                </div>
                
                {/* CONTENT */}
                <div className="flex-1 pt-2">
                  <div className="text-xs font-medium text-[#64748B] uppercase tracking-widest mb-2">
                    {stop.stage}
                  </div>
                  <h3 className="text-xl font-medium text-[#1F2A2A] mb-3">
                    {stop.title}
                  </h3>
                  <p className="text-[#64748B] leading-relaxed mb-4">
                    {stop.description}
                  </p>
                  <div className={`inline-flex items-center gap-2 text-sm font-medium text-[#1F2A2A] transition-all duration-300 ${
                    activeStop === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    {stop.action}
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CULTURAL ANCHOR */}
        <div className="text-center mt-16 pt-8 border-t border-[#E8F4EF]">
          <p className="text-sm text-[#64748B]">
            Every adventure begins with Nigerian roots and reaches for global horizons
          </p>
        </div>

      </div>
    </section>
  );
}
    
function ExperienceJourney() {
  const [activePortal, setActivePortal] = useState(null);

  return (
    <section className="w-full px-6 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* MINIMAL HEADER */}
        <div className="text-center mb-20">
          <div className="text-sm text-[#64748B] tracking-widest mb-4">
            SELECT YOUR ENTRY POINT
          </div>
          <h2 className="text-3xl font-light text-[#1F2A2A] tracking-tight">
            Three Portals, One Mission
          </h2>
        </div>

        {/* INTERACTIVE PORTAL EXPERIENCE */}
        <div className="grid grid-cols-3 gap-1 max-w-2xl mx-auto">
          
          {/* PLAY PORTAL */}
          <div 
            className="relative group cursor-pointer"
            onMouseEnter={() => setActivePortal('play')}
          >
            <div className="aspect-square bg-gradient-to-br from-[#FAFBFC] to-white border border-[#E8F4EF] flex items-center justify-center transition-all duration-500 group-hover:border-[#1F2A2A]">
              <div className="text-center">
                <div className="text-2xl mb-2">→</div>
                <div className="text-sm font-medium text-[#1F2A2A]">Play</div>
              </div>
            </div>
            
            {/* EXPANDING OVERLAY */}
            <div className={`absolute inset-0 bg-white border-2 border-[#1F2A2A] p-6 transition-all duration-500 ${
              activePortal === 'play' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}>
              <div className="text-sm text-[#64748B] mb-2">Interactive Exploration</div>
              <div className="text-lg font-light text-[#1F2A2A] mb-4">Learn through discovery and play</div>
              <button className="text-sm text-[#1F2A2A] border-b border-[#1F2A2A]">Enter playground</button>
            </div>
          </div>

          {/* LEARN PORTAL */}
          <div 
            className="relative group cursor-pointer"
            onMouseEnter={() => setActivePortal('learn')}
          >
            <div className="aspect-square bg-gradient-to-br from-[#FAFBFC] to-white border border-[#E8F4EF] flex items-center justify-center transition-all duration-500 group-hover:border-[#1F2A2A]">
              <div className="text-center">
                <div className="text-2xl mb-2">→</div>
                <div className="text-sm font-medium text-[#1F2A2A]">Learn</div>
              </div>
            </div>
            
            <div className={`absolute inset-0 bg-white border-2 border-[#1F2A2A] p-6 transition-all duration-500 ${
              activePortal === 'learn' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}>
              <div className="text-sm text-[#64748B] mb-2">Structured Journey</div>
              <div className="text-lg font-light text-[#1F2A2A] mb-4">Master skills through stories</div>
              <button className="text-sm text-[#1F2A2A] border-b border-[#1F2A2A]">Begin course</button>
            </div>
          </div>

          {/* CREATE PORTAL */}
          <div 
            className="relative group cursor-pointer"
            onMouseEnter={() => setActivePortal('create')}
          >
            <div className="aspect-square bg-gradient-to-br from-[#FAFBFC] to-white border border-[#E8F4EF] flex items-center justify-center transition-all duration-500 group-hover:border-[#1F2A2A]">
              <div className="text-center">
                <div className="text-2xl mb-2">→</div>
                <div className="text-sm font-medium text-[#1F2A2A]">Create</div>
              </div>
            </div>
            
            <div className={`absolute inset-0 bg-white border-2 border-[#1F2A2A] p-6 transition-all duration-500 ${
              activePortal === 'create' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}>
              <div className="text-sm text-[#64748B] mb-2">Hands-on Building</div>
              <div className="text-lg font-light text-[#1F2A2A] mb-4">Bring ideas to life</div>
              <button className="text-sm text-[#1F2A2A] border-b border-[#1F2A2A]">Start project</button>
            </div>
          </div>

        </div>

        {/* MINIMAL FOOTNOTE */}
        <div className="text-center mt-12">
          <div className="text-xs text-[#64748B] tracking-widest">
            EACH PATH LEADS TO THE SAME DESTINATION: CONFIDENT, CREATIVE KIDS
          </div>
        </div>

      </div>
    </section>
  );
}

function CulturalImpact() {
  const [activePerspective, setActivePerspective] = useState('nigerian');
  
  const perspectives = [
    {
      id: 'nigerian',
      title: 'Nigerian Roots',
      viewpoint: 'Through Our Eyes',
      description: 'Learning that starts with the familiar—our stories, our food, our way of life—then expands to embrace the world.',
      examples: ['Amala as cultural ambassador', 'Yoruba proverbs in modern context', 'Lagos to Beijing journeys'],
      color: '#1F2A2A'
    },
    {
      id: 'global', 
      title: 'Global Skills',
      viewpoint: 'For Their Future',
      description: 'The confidence to navigate any culture, speak any language, and solve any problem—while staying authentically themselves.',
      examples: ['Chinese through Nigerian lens', 'Tech skills with cultural context', 'Global citizenship from day one'],
      color: '#64748B'
    }
  ];

  return (
    <section className="w-full px-6 py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        
        {/* MINIMAL HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-light text-[#1F2A2A] mb-4">
            Two Worlds, One Child
          </h2>
          <div className="w-16 h-0.5 bg-[#E8F4EF] mx-auto"></div>
        </div>

        {/* PERSPECTIVE SWITCHER */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#FAFBFC] rounded-2xl p-1 border border-[#E8F4EF]">
            {perspectives.map((perspective) => (
              <button
                key={perspective.id}
                onClick={() => setActivePerspective(perspective.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activePerspective === perspective.id
                    ? 'bg-white text-[#1F2A2A] shadow-sm'
                    : 'text-[#64748B] hover:text-[#1F2A2A]'
                }`}
              >
                {perspective.title}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT TRANSITION */}
        <div className="relative">
          {perspectives.map((perspective) => (
            <div
              key={perspective.id}
              className={`transition-all duration-500 ${
                activePerspective === perspective.id
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 absolute translate-y-4'
              }`}
            >
              <div className="text-center mb-8">
                <div className="text-sm text-[#64748B] uppercase tracking-widest mb-2">
                  {perspective.viewpoint}
                </div>
                <p className="text-lg text-[#1F2A2A] leading-relaxed max-w-2xl mx-auto">
                  {perspective.description}
                </p>
              </div>

              {/* VISUAL DIVIDER */}
              <div className="flex items-center justify-center gap-8 mb-8">
                <div className="w-12 h-0.5 bg-[#E8F4EF]"></div>
                <div className="w-2 h-2 rounded-full bg-[#B8EAD9]"></div>
                <div className="w-12 h-0.5 bg-[#E8F4EF]"></div>
              </div>

              {/* EXAMPLES */}
              <div className="grid md:grid-cols-3 gap-4 text-center">
                {perspective.examples.map((example, index) => (
                  <div key={index} className="p-4">
                    <div className="text-sm text-[#64748B] leading-relaxed">
                      {example}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* UNIFYING STATEMENT */}
        <div className="text-center mt-16 pt-8 border-t border-[#E8F4EF]">
          <p className="text-[#64748B] text-sm">
            Not choosing between cultures—but mastering the art of belonging to both
          </p>
        </div>

      </div>
    </section>
  );
}
function GetStartedCTA() {
  return (
    <section className="w-full px-6 py-20 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        
        <h2 className="text-2xl font-light text-[#1F2A2A] mb-4">
          Begin Their Journey
        </h2>
        
        <p className="text-[#64748B] mb-8">
          Choose how you'd like to start with Sade & Walee
        </p>

        <div className="space-y-4">
          <button className="w-full py-4 rounded-full bg-[#B8EAD9] text-[#1F2A2A] font-medium hover:scale-105 transition-all duration-300">
            Explore Games
          </button>
          
          <button className="w-full py-4 rounded-full border border-[#E8F4EF] text-[#1F2A2A] font-medium hover:border-[#B8EAD9] transition-all duration-300">
            Start Courses  
          </button>
          
          <button className="w-full py-4 rounded-full border border-[#E8F4EF] text-[#1F2A2A] font-medium hover:border-[#B8EAD9] transition-all duration-300">
            Browse Kits
          </button>
        </div>

      </div>
    </section>
  );
}
function KidsFooter() {
  return (
    <footer className="w-full px-6 py-12 bg-[#FAFBFC] border-t border-[#E8F4EF]">
      <div className="max-w-4xl mx-auto text-center">
        
        <div className="mb-8">
          <p className="text-sm text-[#64748B] mb-4">
            Omeda • Where Nigerian Kids Shine
          </p>
          <div className="flex justify-center gap-6 text-xs text-[#64748B]">
            <a href="/privacy" className="hover:text-[#1F2A2A] transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-[#1F2A2A] transition-colors">Terms</a>
            <a href="/contact" className="hover:text-[#1F2A2A] transition-colors">Contact</a>
          </div>
        </div>

        <p className="text-xs text-[#64748B]">
          © {new Date().getFullYear()} Omeda. All rights reserved.
        </p>

      </div>
    </footer>
  );
}