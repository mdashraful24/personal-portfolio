import { useRef, useState } from "react";

const Tooltip = ({ text, delay = 0, children, position = "", variant = "", disabled = false }) => {
    const [visible, setVisible] = useState(false);
    const timerRef = useRef(null);

    const handleMouseEnter = () => {
        if (disabled) return; // Don't show tooltip if disabled
        timerRef.current = setTimeout(() => {
            setVisible(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        clearTimeout(timerRef.current);
        setVisible(false);
    };

    const positionClasses = {
        right: "left-full ml-4 top-1/2 -translate-y-1/2",
        left: "right-full mr-3 top-1/2 -translate-y-1/2",
        top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
        topTwo: "bottom-full mb-2 left-[40%] -translate-x-1/2",
        topThree: "bottom-full mb-2 left-6 -translate-x-1/2",
        topFour: "bottom-full mb-2 -left-5 -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}

            <div
                aria-hidden={!(visible && !disabled)}
                className={`hidden md:block absolute z-10 pointer-events-none ${position ? positionClasses[position] : ''} ${variant === "light" || position === "topThree" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"} text-sm font-semibold p-2 rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 ease-out ${visible && !disabled
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-1 scale-95"
                    }`}
            >
                {text}
            </div>
        </div>
    );
};

export default Tooltip;
