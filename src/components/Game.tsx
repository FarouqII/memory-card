import { useState, type FC } from "react";
import { CHARACTERS } from "../constants";
import { Card } from "./Card";

type GameProps = {
    onFinish: () => void;
}

export const Game: FC<GameProps> = ({ onFinish }) => {
    const [selected, setSelected] = useState<string[]>([]);
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
            <div id="gameboard">
                {shuffle(CHARACTERS).map(char => (
                    <Card
                        key={char}
                        name={char}
                        selected={selected}
                        setSelected={setSelected}
                        onFinish={onFinish}
                    />
                ))}
            </div>
        </div>
    )
}