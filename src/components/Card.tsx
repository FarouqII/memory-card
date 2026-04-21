import { useEffect, type FC } from "react";

type CardProps = {
    name: string;
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    onFinish: () => void;
}

export const Card: FC<CardProps> = ({ name, selected, setSelected, onFinish }) => {
    const clickHandler = () => {
        if (selected.includes(name)) onFinish();
        else {
            setSelected([...selected, name]);
            if (selected.length == 5) onFinish();
        }
    }

    return (
        <button id={name} className="card" onClick={clickHandler}>
            <h1>{name}</h1>
        </button>
    )
}