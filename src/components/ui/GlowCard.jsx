
export default function GlowCard({ children }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#f6e0b5]
                    hover:shadow-[0_0_20px_#ffe5b0] hover:scale-[1.02]
                    transition-all duration-300">
      {children}
    </div>
  );
}
