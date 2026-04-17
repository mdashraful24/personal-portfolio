import React, { useEffect, useRef, useState } from "react";
import { BsPersonWorkspace, BsCode, BsAward, BsCalendar, BsBriefcase } from "react-icons/bs";
import { FiExternalLink, FiMapPin } from "react-icons/fi";
import "../components/css/Experience.css";

const GlowCard = ({ children, identifier, isActive, onClick }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const CARD = cardRef.current;
        if (!CARD) return;

        const UPDATE = (event) => {
            if (!CARD) return;
            const CARD_BOUNDS = CARD.getBoundingClientRect();
            const x = event?.clientX;
            const y = event?.clientY;

            if (
                x !== undefined &&
                y !== undefined &&
                x > CARD_BOUNDS.left - 40 &&
                x < CARD_BOUNDS.left + CARD_BOUNDS.width + 40 &&
                y > CARD_BOUNDS.top - 40 &&
                y < CARD_BOUNDS.top + CARD_BOUNDS.height + 40
            ) {
                CARD.style.setProperty("--active", "1");
            } else {
                CARD.style.setProperty("--active", "0");
            }
        };

        document.body.addEventListener("pointermove", UPDATE);
        return () => document.body.removeEventListener("pointermove", UPDATE);
    }, [identifier]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                cardRef.current.style.setProperty("--mouse-x", `${x}%`);
                cardRef.current.style.setProperty("--mouse-y", `${y}%`);
            }
        };

        const card = cardRef.current;
        if (card) {
            card.addEventListener("mousemove", handleMouseMove);
            return () => card.removeEventListener("mousemove", handleMouseMove);
        }
    }, []);

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            className={`relative w-full cursor-pointer rounded-xl border transition-all duration-300
                ${isActive
                    ? "border-[#3b82f6] bg-[#1a1a2e]"
                    : "border-[#2a2e5a] bg-[#101123] hover:border-[#3b82f6]/50"
                }
                `}
            style={{
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Glow Effect - Blue */}
            <div
                className="glows"
                style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "inherit",
                    opacity: "var(--active, 0)",
                    background: `radial-gradient(
                        circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                        rgba(59, 130, 246, 0.25),
                        transparent 70%
                    )`,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "inherit",
                    padding: "2px",
                    background: `radial-gradient(
                        600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                        rgba(59, 130, 246, 0.6),
                        transparent 60%
                    )`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    opacity: "var(--active, 0)",
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                }}
            />
            {children}
        </div>
    );
};

export default GlowCard;
