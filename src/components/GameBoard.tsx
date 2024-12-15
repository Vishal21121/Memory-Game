import { useEffect, useState } from "react";
import { getBoardArray, getBoardSize } from "../utils/gameBoardUtils";
import ConfettiExplosion from "react-confetti-explosion";

type props = {
  difficulty: string;
};

type boardElement = {
  index: number;
  number: number;
};

function GameBoard({ difficulty }: props) {
  const [boardSize, setBoardSize] = useState<null | number>(null);
  const [board, setBoard] = useState<null | boardElement[]>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [solvedCards, setSolvedCards] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);

  const isVisible = (id: number) => visibleCards.includes(id);
  const isSolved = (id: number) => solvedCards.includes(id);

  const handleClick = (id: number) => {
    if (isVisible(id) || isWon) return;

    if (visibleCards.length == 0) {
      setVisibleCards([id]);
    }
    // length = 1
    if (visibleCards.length == 1) {
      // check for matching
      if (board && board[visibleCards[0]].number === board[id].number) {
        setSolvedCards([...solvedCards, visibleCards[0], id]);
        setVisibleCards([]);
        console.log(solvedCards.length, board.length);
        if (solvedCards.length + 2 === board.length) {
          setIsWon(true);
        }
      }
      setVisibleCards([...visibleCards, id]);
    }
    if (visibleCards.length >= 2) {
      setVisibleCards([]);
    }
  };

  const handleReset = () => {
    setVisibleCards([]);
    setIsWon(false);
    setSolvedCards([]);
  };

  useEffect(() => {
    setBoardSize(getBoardSize(difficulty));
    setBoard(getBoardArray(boardSize ?? 4));
  }, [boardSize, difficulty]);

  return (
    <div>
      {isWon && (
        <ConfettiExplosion force={0.8} duration={3000} particleCount={250} />
      )}
      {boardSize && (
        <div
          className={`grid gap-1`}
          style={{
            gridTemplateColumns: `repeat(${boardSize / 2},minmax(0,  1fr))`,
          }}
        >
          {board?.map((col) => (
            <div
              key={col.index}
              className={`transition-transform duration-150 active:scale-95 w-24 p-8 text-lg font-bold text-center rounded-lg text-neutral-content ${
                isSolved(col.index) ? "bg-green-500" : "bg-secondary"
              }
                  ${
                    isVisible(col.index) && !isSolved(col.index) && "bg-primary"
                  }
                `}
              onClick={() => handleClick(col.index)}
            >
              {isSolved(col.index) || isVisible(col.index) ? col.number : "?"}
            </div>
          ))}
        </div>
      )}
      <button className="mt-4 btn btn-info" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default GameBoard;
