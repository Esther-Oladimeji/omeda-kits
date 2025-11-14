export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col">

      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/hero-desktop1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Logo */}
      <div className="z-10 w-full text-center pt-6">
        <p className="text-white font-bold text-xl tracking-[0.15em] drop-shadow-md">
          O M E D A
        </p>
      </div>

      {/* Main hero content */}
      <div className="z-10 flex flex-col justify-center items-center flex-grow text-center px-6">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-xl leading-tight">
          Culture. Language. Joy.
        </h1>

        <p className="text-white/90 text-base md:text-xl mt-3 max-w-md drop-shadow-md">
          Sade & Walee are just getting started.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center w-full max-w-[420px]">
          <a
            href="/kids"
            className="flex-1 px-5 py-3 bg-white text-black rounded-md text-center font-medium shadow 
                       hover:scale-[1.03] active:scale-[0.97] transition"
          >
            For Kids
          </a>

          <a
            href="/sponsors"
            className="flex-1 px-5 py-3 bg-[#FFE5B0] text-black rounded-md text-center font-medium shadow 
                       hover:scale-[1.03] active:scale-[0.97] transition"
          >
            For Sponsors
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center text-white/70 text-xs py-4">
        © 2025 Omeda — Let kids be kids
      </footer>
    </section>
  );
}