import { useState, type FC } from "react";
import { CHARACTERS } from "../constants";
import { Card } from "./Card";
import { EndDialog } from "./EndDialog";

type GameProps = {
    setGame: React.Dispatch<React.SetStateAction<boolean>>;
    setShowLander: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Game: FC<GameProps> = ({ setGame, setShowLander }) => {
    // == STATE ==
    const [selected, setSelected] = useState<string[]>([]);
    const [result, setResult] = useState<string>("");
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighScore] = useState<number>(0);

    function shuffle<T>(arr: T[]) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    return (
        <div id="game">
            <div id="scores">
                <p><b>Score:</b> <span>{score}</span></p>
                <p><b>High Score:</b> <span>{highScore}</span></p>
            </div>
            {!(result) && <div id="gameboard">
                {shuffle(CHARACTERS).map(char => (
                    <Card
                        key={char}
                        name={char}
                        selected={selected}
                        score={score}
                        highScore={highScore}
                        setSelected={setSelected}
                        setResult={setResult}
                        setScore={setScore}
                        setHighScore={setHighScore}
                    />
                ))}
            </div>}

            {result &&
             <EndDialog
                result={result}
                setResult={setResult}
                setGame={setGame}
                setShowLander={setShowLander}
             />}
        </div>
    )
}