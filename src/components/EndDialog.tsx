import React, { useEffect, useRef, type FC } from 'react';
import gsap from 'gsap';

type EndDialogProps = {
    result: string;
    setResult: React.Dispatch<React.SetStateAction<string>>;
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    setGame: React.Dispatch<React.SetStateAction<boolean>>;
    setShowLander: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EndDialog: FC<EndDialogProps> = ({ result, setResult, setSelected, setGame, setShowLander }) => {
    const btnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const onEnter = () => {
        gsap.to(btn, {
            duration: 0.35,
            scale: 1.08,
            ease: "power3.out",
            filter: "drop-shadow(0 0 18px #66bbf4)"
        });

        gsap.to(btn, {
            duration: 1.2,
            backgroundPosition: "100% 0",
            ease: "power2.out"
        });
        };

        const onLeave = () => {
        gsap.to(btn, {
            duration: 0.35,
            scale: 1,
            filter: "drop-shadow(0 0 0px transparent)",
            ease: "power3.out"
        });

        gsap.to(btn, {
            duration: 1.2,
            backgroundPosition: "0% 0",
            ease: "power2.out"
        });
        };

        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);

        return () => {
        btn.removeEventListener("mouseenter", onEnter);
        btn.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <div id='dialogContainer'>
            <div id='dialog'>
                <h1>You {result}!</h1>
                <div>
                    <button ref={btnRef} onClick={() => {
                        setResult("");
                        setSelected([]);
                    }}>New Game</button>
                    <button id='homeBtn' onClick={() => {
                        setGame(false);
                        setShowLander(true);
                    }}>Home</button>
                </div>
            </div>
        </div>
    )
}