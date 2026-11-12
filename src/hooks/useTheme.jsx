import { useEffect, useState } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("selectedTheme");
        if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
            return savedTheme;
        }
        return "system";
    });

    const [systemTheme, setSystemTheme] = useState(() =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    );

    const appliedTheme = theme === "system" ? systemTheme : theme;

    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute("data-theme", appliedTheme);
        localStorage.setItem("selectedTheme", theme);
    }, [appliedTheme, theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            if (theme === "system") {
                setSystemTheme(e.matches ? "dark" : "light");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            if (prevTheme === "light") return "dark";
            if (prevTheme === "dark") return "system";
            return "light";
        });
    };

    const setSpecificTheme = (newTheme) => {
        setTheme(newTheme);
    };

    return { theme, appliedTheme, toggleTheme, setSpecificTheme };
};

export default useTheme;
