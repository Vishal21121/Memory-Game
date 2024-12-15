import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdTimer } from "react-icons/md";
import { FaRocket } from "react-icons/fa6";
import { gameMode } from "../utils/gameMode";
import { useState } from "react";
import GameBoard from "../components/GameBoard";

function HomePage() {
  const [difficulty, setDifficulty] = useState(gameMode.EASY);
  const handleClick = (modeName: gameMode) => {
    setDifficulty(modeName);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 p-8 items-">
      <p className="text-xl font-extrabold">Select Difficulty level</p>
      <div className="flex items-center justify-center w-full gap-2">
        <div
          className="flex items-center h-12 gap-2 p-8 text-center transition-transform duration-150 border-2 rounded-lg border-neutral-content hover:cursor-pointer active:scale-95"
          onClick={() => handleClick(gameMode.EASY)}
        >
          <p className="text-xl font-semibold text-primary">Easy</p>
          <BsFillEmojiSmileFill className="mt-1 text-xl text-primary" />
        </div>
        <div
          className="flex items-center h-12 gap-2 p-8 text-center transition-transform duration-150 border-2 rounded-lg border-neutral-content hover:cursor-pointer active:scale-95"
          onClick={() => handleClick(gameMode.MEDIUM)}
        >
          <p className="text-xl font-semibold text-primary">Medium</p>
          <MdTimer className="mt-1 text-xl text-primary" />
        </div>
        <div
          className="flex items-center h-12 gap-2 p-8 text-center transition-transform duration-150 border-2 rounded-lg border-neutral-content hover:cursor-pointer active:scale-95"
          onClick={() => handleClick(gameMode.HARD)}
        >
          <p className="text-xl font-semibold text-primary">Hard</p>
          <FaRocket className="mt-1 text-xl text-primary" />
        </div>
      </div>
      <GameBoard difficulty={difficulty} />
    </div>
  );
}

export default HomePage;
