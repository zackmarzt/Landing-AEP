"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
// import { Button } from "@/components/ui/button"; // Optional: if using shadcn button

export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to "top"
    const toggleVisibility = () => {
        if (window.scrollY > 300) { // Show if scrolled down 300px
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <button
            className={`fixed bottom-8 right-8 p-3 rounded-full bg-gray-800 text-white shadow-lg transition-opacity duration-300 ${
                isVisible ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
        >
            <ChevronUp className="h-6 w-6" />
        </button>
    );
}
