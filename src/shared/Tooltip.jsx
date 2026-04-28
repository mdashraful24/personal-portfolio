import { useRef, useState } from "react";

const Tooltip = ({ text, delay = 500, children, position = "", disabled = false }) => {
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
        topTwo: "bottom-full mb-2 left-[30%] -translate-x-1/2",
        topThree: "!bg-gray-200 !text-black bottom-full mb-2 left-2 -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}

            {visible && !disabled && (
                <div className={`hidden md:block absolute z-10 ${position ? positionClasses[position] : ''} bg-gray-800 text-white text-xs p-2 rounded-lg shadow-lg whitespace-nowrap`}>
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
