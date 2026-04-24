import { useState, useEffect, useRef, type FC } from "react";
import gsap from 'gsap';
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
    const [highScore, setHighScore] = useState<number>(() => {
        const stored = localStorage.getItem("highScore");
        const parsed = stored ? parseInt(stored, 10) : 0;
        return isNaN(parsed) ? 0 : parsed;
    });
    const [cards, setCards] = useState<string[]>(() => shuffle(CHARACTERS));

    useEffect(() => {
        localStorage.setItem("highScore", highScore.toString());
    }, [highScore]);

    const boardRef = useRef<HTMLDivElement | null>(null);

    function shuffle<T>(arr: T[]) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function reshuffle() { setCards(shuffle(cards)) }

    useEffect(() => {
        if (!boardRef.current) return;

        const cards = boardRef.current.querySelectorAll(".card");

        gsap.fromTo(
            cards,
            {
            y: 100,
            opacity: 0,
            rotateY: 180,
            scale: 0.8,
            },
            {
            y: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: 0.15,
            }
        );
    }, [cards]);

    return (
        <div id="game">
            <div id="header">
                <h1>Arcane Memory Card Game</h1>
                <div id="scores">
                    <p><b>Score:</b> <span>{score}</span></p>
                    <p><b>High Score:</b> <span>{highScore}</span></p>
                </div>
            </div>
            {!(result) && <div id="gameboard" ref={boardRef}>
                {cards.map((char, index) => (
                    <Card
                        key={char}
                        name={char}
                        index={index}
                        selected={selected}
                        score={score}
                        highScore={highScore}
                        setSelected={setSelected}
                        setResult={setResult}
                        setScore={setScore}
                        setHighScore={setHighScore}
                        reshuffle={reshuffle}
                    />
                ))}
            </div>}

            {result &&
             <EndDialog
                result={result}
                setResult={setResult}
                setSelected={setSelected}
                setGame={setGame}
                setShowLander={setShowLander}
             />}
        </div>
    )
}