import Main from "./main";
import { Route, Routes, Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl font-semibold">QuizEz</h1>
      <br />
      <p className="text-xl">Welcome! Ready to test your Computer Science knowledge?</p>
      <br />
      <br />

      <Link to="/Main">
        <button className="btn">Start Quiz</button>
      </Link>
      
    </div>
  );
}
