import { Moon, Sun, Laptop, Check, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useThemeContext } from "../providers/ThemeProvider";
import Tooltip from "./Tooltip";

export function DarkLightTheme() {
    const { theme, setSpecificTheme } = useThemeContext();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const themes = [
        { id: "light", name: "Light", icon: Sun, iconColor: "text-amber-500" },
        { id: "dark", name: "Dark", icon: Moon, iconColor: "text-indigo-500" },
        { id: "system", name: "System", icon: Laptop, iconColor: "text-emerald-500" },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getCurrentThemeName = () => {
        if (theme === "light") return "Light";
        if (theme === "dark") return "Dark";
        return "System";
    };

    const getCurrentIcon = () => {
        if (theme === "light") return Sun;
        if (theme === "dark") return Moon;
        return Laptop;
    };

    const getCurrentIconColor = () => {
        if (theme === "light") return "text-amber-500";
        if (theme === "dark") return "text-indigo-500";
        return "text-emerald-500";
    };

    const CurrentIcon = getCurrentIcon();
    const currentIconColor = getCurrentIconColor();
    const currentThemeName = getCurrentThemeName();

    const handleThemeChange = (selectedTheme) => {
        setSpecificTheme(selectedTheme);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Dropdown Trigger Button - Tooltip only shows when dropdown is closed */}
            <Tooltip text="Toggle Theme" position="bottom" disabled={isOpen}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Theme"
                    className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                >
                    <span className="p-1 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <CurrentIcon size={18} className={currentIconColor} />
                    </span>
                    <span className="text-sm font-medium hidden sm:inline text-gray-700 dark:text-gray-200">
                        {/* {currentThemeName} */}
                    </span>
                    <ChevronDown size={18} className="text-gray-500 dark:text-gray-400" />
                </button>
            </Tooltip>

            {/* Dropdown Menu */}
            <div
                className={`absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 transform transition-all duration-200 ease-out origin-top-right
                ${isOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }
                `}
            >
                <div className="p-1.5">
                    {themes.map((themeOption) => {
                        const Icon = themeOption.icon;
                        const isActive =
                            (themeOption.id === "system" && !localStorage.getItem("selectedTheme")) ||
                            theme === themeOption.id;

                        return (
                            <button
                                key={themeOption.id}
                                onClick={() => handleThemeChange(themeOption.id)}
                                className={`w-full px-4 py-2 flex items-center gap-3 rounded-md transition-colors duration-150
                                    ${isActive
                                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                        : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"
                                    }
                                `}
                            >
                                <Icon size={16} className={themeOption.iconColor} />
                                <span className="flex-1 text-left text-sm">
                                    {themeOption.name}
                                </span>
                                {isActive && <Check size={14} />}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default DarkLightTheme;
