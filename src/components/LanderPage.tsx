import { type FC, useEffect, useRef} from "react";
import gsap from "gsap";

type LanderPageProps = {
  onFinish: () => void;
};

export const LanderPage: FC<LanderPageProps> = ({ onFinish }) => {
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
    <div id="lander">
      <h1>Arcane Memory Card Game</h1>
      <button ref={btnRef} type="button" onClick={onFinish}>
        Press to play
      </button>
    </div>
  );
};
