export default function GameCard({ icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl shadow-lg border border-[#ffd580] p-6 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-2 hover:shadow-2xl active:scale-95"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-[#2b3a55]">{title}</h3>
      <p className="text-sm text-[#555]">{desc}</p>
    </div>
  );
}