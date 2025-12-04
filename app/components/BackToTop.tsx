"use client";
import { useEffect, useState } from "react";
import { Rocket } from "@phosphor-icons/react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      aria-label="Back to top"
      title="Back to top"
      onClick={handleClick}
      className={
        "fixed right-15 bottom-15 z-50 flex items-center justify-center w-12 h-12 rounded-full " +
        "bg-black text-white shadow-lg border-2 border-white transition-opacity duration-200 " +
        (visible ? "opacity-100" : "opacity-0 pointer-events-none")
      }
    >
      <Rocket size={20} weight="bold" />
    </button>
  );
}
