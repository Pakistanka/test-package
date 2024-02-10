//@ts-nocheck
import { useCallback, useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { HiDocumentCheck } from "react-icons/hi2";
import Button from "../Button";

const canvasStyles = {
    position: "absolute",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
};

const Success = (props: any) => {
    const refAnimationInstance = useRef(null);

    useEffect(() => {
        fire();
        fire();
        fire();
    }, [])

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                origin: { y: 0.7 },
                particleCount: Math.floor(200 * particleRatio)
            });
    }, []);

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55
        });

        makeShot(0.2, {
            spread: 60
        });

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45
        });
    }, [makeShot]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <HiDocumentCheck className="text-[90px] text-primary dark:text-turqoise transition-all" />
            <div className="font-bold w-1/2 text-center pb-5 text-sm">{props.children}</div>
            {props.close && <Button onClick={props.close}>Close</Button>}
            {/* <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} /> */}
        </div>
    );
}
export default Success;
