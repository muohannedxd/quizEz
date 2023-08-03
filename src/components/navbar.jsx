import icon from "../assets/favicon.png";

export default function Navbar() {
  return (
    <div className="bg-violet flex items-center justify-center p-4 gap-3 shadow-2xl">
      <img src={icon} alt="" className="w-8" />
      <p className="text-white font-bold text-xl">QuizEz</p>
    </div>
  );
}
