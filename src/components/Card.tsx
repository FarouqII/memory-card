import React, { useEffect, useState, type FC } from "react";

type CardProps = {
    name: string;
    selected: string[];
    score: number;
    highScore: number;
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    setResult: React.Dispatch<React.SetStateAction<string>>;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setHighScore: React.Dispatch<React.SetStateAction<number>>;
}

export const Card: FC<CardProps> = ({ name, selected, score, highScore, setSelected, setScore, setResult, setHighScore}) => {
    // == HANDLERS ==
    const handleWin = () => {
        setResult("win");
        setHighScore(score);
        setScore(0);
    }

    const handleLoss = () => {
        setResult("lose");
        if (highScore < score) setHighScore(score);
        setScore(0);
    }

    const clickHandler = () => {
        if (selected.includes(name)) {
            handleLoss();
            return;
        }
        setSelected([...selected, name]);
        if (selected.length == 5) handleWin();
        else setScore(score + 1);
    }

    return (
        <button id={name} className="card" onClick={clickHandler}>
            <h1>{name}</h1>
        </button>
    )
}