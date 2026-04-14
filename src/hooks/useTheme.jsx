import { useEffect, useState } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("selectedTheme");
        if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
            return savedTheme;
        }
        return "system";
    });

    const [appliedTheme, setAppliedTheme] = useState(() => {
        const savedTheme = localStorage.getItem("selectedTheme");
        if (savedTheme === "light") return "light";
        if (savedTheme === "dark") return "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
            root.setAttribute("data-theme", systemTheme);
            setAppliedTheme(systemTheme);
        } else {
            root.setAttribute("data-theme", theme);
            setAppliedTheme(theme);
        }

        localStorage.setItem("selectedTheme", theme);
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            if (theme === "system") {
                const newTheme = e.matches ? "dark" : "light";
                document.documentElement.setAttribute("data-theme", newTheme);
                setAppliedTheme(newTheme);
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
