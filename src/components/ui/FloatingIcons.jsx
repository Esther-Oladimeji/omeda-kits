export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* placeholder icons — we’ll animate later */}
      <span className="absolute text-xl left-[10%] top-[30%] animate-float-slow">⭐</span>
      <span className="absolute text-2xl left-[70%] top-[60%] animate-float-slow">☁️</span>
    </div>
  );
}
