"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const CHARACTERS = [
  {
    name: "Moussman",
    realm: "ysondre",
    region: "eu",
    level: 80,
    class: "Monk",
    race: "Pandaren",
    faction: "Horde",
    spec: "Maître Brasseur",
    color: "#00FF96", // Monk Green
    render: "https://render.worldofwarcraft.com/eu/character/ysondre/41/176557609-main-raw.png"
  },
  {
    name: "Mamènne",
    realm: "ysondre",
    region: "eu",
    level: 80,
    class: "Paladin",
    race: "Humain",
    faction: "Alliance",
    spec: "Vindicte",
    color: "#F58CBA", // Paladin Pink (The user mentioned Violet/DH, but I will keep this or adapt if they add DH)
    render: "https://render.worldofwarcraft.com/eu/character/ysondre/251/173840891-main-raw.png"
  }
];

export default function CharacterSelectPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const router = useRouter();
  const selected = CHARACTERS[selectedIdx];

  const handleEnterWorld = useCallback(() => {
    const encodedName = encodeURIComponent(selected.name.toLowerCase());
    router.push(`/${selected.region}/${selected.realm}/${encodedName}`);
  }, [router, selected]);

  // Handle Wheel Scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      setIsScrolling(true);
      if (e.deltaY > 0) {
        setSelectedIdx((prev) => (prev + 1) % CHARACTERS.length);
      } else if (e.deltaY < 0) {
        setSelectedIdx((prev) => (prev - 1 + CHARACTERS.length) % CHARACTERS.length);
      }

      setTimeout(() => setIsScrolling(false), 400);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScrolling]);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center select-none cursor-default">

      {/* Background Cinematic Render (Full Page) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.name + "-bg-img"}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
          >
            <img
              src={selected.render}
              alt=""
              className="w-full h-full object-contain md:object-cover transition-transform duration-700"
              style={{ filter: 'brightness(0.5) saturate(1.1)' }}
            />

            {/* Vignette & Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-60" />

            {/* Dynamic Color Overlay */}
            <div
              className="absolute inset-0 opacity-10 mix-blend-color transition-colors duration-1000"
              style={{ backgroundColor: selected.color }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pb-32 pt-20 px-6">

        {/* Empty Spacer (Removed Mid Screen Text as requested) */}
        <div />
        <div />

        {/* Action Button: The main menu to enter */}
        <div className="w-full flex flex-col items-center gap-12 relative z-40">
          <AnimatePresence mode="wait">
            <motion.button
              key={selected.name + "-btn"}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleEnterWorld}
              className="group relative w-full max-w-4xl py-12 transition-all duration-700 rounded-xl overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,1)] border-2"
              style={{
                backgroundColor: selected.color,
                borderColor: 'rgba(255,255,255,0.2)',
                boxShadow: `0 30px 100px -20px ${selected.color}44`
              }}
            >
              <div className="relative z-10 flex flex-col items-center gap-2">
                <span className="text-5xl md:text-8xl font-black tracking-[0.2em] uppercase italic text-black drop-shadow-sm">
                  {selected.name}
                </span>
                <div className="flex items-center gap-6 text-sm md:text-lg font-black tracking-[0.8em] uppercase text-black/60 mt-4">
                  <span>{selected.spec}</span>
                </div>
              </div>

              {/* Glossy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-50" />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.button>
          </AnimatePresence>
        </div>

      </div>

      {/* Decorative Text */}
      <div className="fixed left-12 top-1/2 -translate-y-1/2 hidden md:block opacity-5 pointer-events-none">
        <div className="-rotate-90 text-[10px] tracking-[2em] font-black whitespace-nowrap uppercase italic">TARGET ACQUIRED // SYSTEM ONLINE</div>
      </div>

    </div>
  );
}
