import { useEffect, useState, type FC } from "react";
import jinxLOADING from '../assets/jinxLOADING.gif';

type LoadingPageProps = {
  onFinish: () => void;
};

export const LoadingPage: FC<LoadingPageProps> = ({ onFinish }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);

            setTimeout(() => {
                onFinish();
            }, 600);

        }, 1500);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className={`loading ${fadeOut ? "fade-out" : ""}`}>
            <img className="loading-logo" src={jinxLOADING} alt="Loading..." />
        </div>
    );
};