import { Moon, Sun, Laptop, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useThemeContext } from "../providers/ThemeProvider";
import Tooltip from "./Tooltip";

export default function DarkLightTheme() {
    const { theme, setSpecificTheme } = useThemeContext();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const themes = [
        {
            id: "light",
            name: "Light",
            icon: Sun,
            activeClass: "bg-amber-500 text-white",
            hoverClass: "hover:bg-amber-100 dark:hover:bg-amber-900/20",
        },
        {
            id: "dark",
            name: "Dark",
            icon: Moon,
            activeClass: "bg-blue-600 text-white",
            hoverClass: "hover:bg-blue-100 dark:hover:bg-blue-900/20",
        },
        {
            id: "system",
            name: "System",
            icon: Laptop,
            activeClass: "bg-green-600 text-white",
            hoverClass: "hover:bg-green-100 dark:hover:bg-green-900/20",
        },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isThemeActive = (id) => {
        return (
            (id === "system" && !localStorage.getItem("selectedTheme")) ||
            theme === id
        );
    };

    const CurrentTheme =
        themes.find((t) => isThemeActive(t.id)) || themes[2];

    const CurrentIcon = CurrentTheme.icon;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* ========================= */}
            {/* Desktop & Tablet */}
            {/* ========================= */}

            <div className="hidden md:flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow p-1">
                {themes.map((item) => {
                    const Icon = item.icon;
                    const active = isThemeActive(item.id);

                    return (
                        <button
                            onClick={() => setSpecificTheme(item.id)}
                            className={`
                                    w-6 h-6
                                    rounded-xl
                                    flex
                                    items-center
                                    justify-center
                                    transition-all
                                    duration-300
                                    cursor-default
                                    ${active
                                    ? `${item.activeClass} shadow-md`
                                    : `text-slate-500 dark:text-slate-400 ${item.hoverClass}`
                                }
                                `}
                        >
                            <Icon size={17} />
                        </button>
                    );
                })}
            </div>

            {/* ========================= */}
            {/* Mobile */}
            {/* ========================= */}

            <div className="md:hidden">
                <Tooltip
                    text="Toggle Theme"
                    position="bottom"
                    disabled={isOpen}
                >
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        <CurrentIcon
                            size={20}
                            className="text-blue-500"
                        />

                        {isOpen ? (
                            <ChevronUp
                                size={18}
                                className="text-gray-500"
                            />
                        ) : (
                            <ChevronDown
                                size={18}
                                className="text-gray-500"
                            />
                        )}
                    </button>
                </Tooltip>

                <div
                    className={`
                        absolute
                        right-0
                        mt-2
                        w-40
                        rounded-xl
                        bg-white
                        dark:bg-gray-800
                        border
                        border-gray-200
                        dark:border-gray-700
                        shadow-xl
                        overflow-hidden
                        transition-all
                        duration-200
                        origin-top-right
                        ${isOpen
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 pointer-events-none"
                        }
                    `}
                >
                    <div className="p-2">
                        {themes.map((item) => {
                            const Icon = item.icon;
                            const active = isThemeActive(item.id);

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setSpecificTheme(item.id);
                                        setIsOpen(false);
                                    }}
                                    className={`
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        px-3
                                        py-2
                                        rounded-lg
                                        transition
                                        ${active
                                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }
                                    `}
                                >
                                    <Icon size={17} />

                                    <span className="flex-1 text-left text-sm">
                                        {item.name}
                                    </span>

                                    {active && <Check size={16} />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
