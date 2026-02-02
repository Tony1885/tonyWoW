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
    color: "#00FF96",
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
    color: "#F58CBA",
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
              style={{ filter: 'brightness(0.9) saturate(1.2)' }}
            />

            {/* Vignette & Gradients (Lightened) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-40" />

            {/* Dynamic Color Overlay */}
            <div
              className="absolute inset-0 opacity-10 mix-blend-color transition-colors duration-1000"
              style={{ backgroundColor: selected.color }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-20 px-6">

        {/* Action Button: Much smaller as requested */}
        <div className="w-full flex flex-col items-center relative z-40">
          <AnimatePresence mode="wait">
            <motion.button
              key={selected.name + "-btn"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onClick={handleEnterWorld}
              className="group relative w-full max-w-sm py-4 transition-all duration-700 rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10"
              style={{
                backgroundColor: selected.color,
                boxShadow: `0 15px 40px -10px ${selected.color}66`
              }}
            >
              <div className="relative z-10 flex flex-col items-center gap-0">
                <span className="text-3xl font-black tracking-widest uppercase italic text-black">
                  {selected.name}
                </span>
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-black/60">
                  {selected.spec}
                </span>
              </div>

              {/* Subtle Hover effect */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.button>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
