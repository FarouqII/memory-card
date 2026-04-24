import { type FC, useRef } from "react";
import Tilt from "react-parallax-tilt";

// Import all images/videos from the CARDS folder
const mediaModules = import.meta.glob('../assets/CARDS/*', { eager: true });

// Build a map of card names to their media sources
const cardMediaMap: Record<string, { static?: string; active?: string }> = {};

for (const path in mediaModules) {
    const filename = path.split('/').pop()!;
    const match = filename.match(/^(.+?)CARD(-static)?\.(webp|mp4|webm)$/);

    if (match) {
        const name = match[1];
        const isStatic = !!match[2];
        const url = (mediaModules[path] as any).default;

        if (!cardMediaMap[name]) cardMediaMap[name] = {};
        cardMediaMap[name][isStatic ? 'static' : 'active'] = url;
    }
}

type CardProps = {
    name: string;
    index: number;
    selected: string[];
    score: number;
    highScore: number;
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    setResult: React.Dispatch<React.SetStateAction<string>>;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setHighScore: React.Dispatch<React.SetStateAction<number>>;
    reshuffle: () => void;
}

export const Card: FC<CardProps> = ({ name, selected, score, highScore, setSelected, setScore, setResult, setHighScore, reshuffle}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // == HANDLERS ==
    const handleWin = () => {
        setResult("win");
        setHighScore(score);
        setScore(0);
    };

    const handleLoss = () => {
        setResult("lose");
        if (highScore < score) setHighScore(score);
        setScore(0);
    };

    const clickHandler = () => {
        if (selected.includes(name)) {
            handleLoss();
            return;
        }
        setSelected([...selected, name]);
        if (selected.length == 5) handleWin();
        else {
            setScore(score + 1);
            reshuffle();
        }
    };

    const cardMedia = cardMediaMap[name] || {};

    // == HOVER CONTROL ==
    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <Tilt
            className="tilt-wrapper"
            tiltMaxAngleX={7}
            tiltMaxAngleY={7}
            scale={1.05}
            transitionSpeed={400}
            glareEnable={true}
            glareMaxOpacity={0.1}
            onEnter={handleMouseEnter}
            onLeave={handleMouseLeave}
        >
            <button
                id={name}
                className="card"
                onClick={clickHandler}
            >
                <div className="card-inner">
                    {cardMedia.static && (
                        <img
                        className="static"
                        src={cardMedia.static}
                        alt={`${name} Static Preview`}
                        />
                    )}

                    {cardMedia.active && (
                        <video
                        ref={videoRef}
                        className="active"
                        src={cardMedia.active}
                        muted
                        playsInline
                        preload="metadata"
                        />
                    )}

                    <h2>{name}</h2>
                </div>
            </button>
        </Tilt>
    );
}