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

        <div /> {/* Spacer */}

        {/* Center Title (Main Visual) */}
        <div className="w-full max-w-7xl flex flex-col items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.name + "-visual"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-[12rem] md:text-[18rem] font-black italic tracking-tighter leading-none text-white/10 uppercase">
                {selected.name}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Button: Name & Spec as entry link */}
        <div className="w-full flex flex-col items-center gap-12 relative z-40">
          <AnimatePresence mode="wait">
            <motion.button
              key={selected.name + "-btn"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onClick={handleEnterWorld}
              className="group relative w-full max-w-4xl py-12 bg-white text-black hover:bg-black hover:text-white transition-all duration-500 rounded-sm overflow-hidden border border-white shadow-[0_40px_120px_rgba(0,0,0,1)]"
            >
              <div className="relative z-10 flex flex-col items-center gap-2">
                <span className="text-4xl md:text-6xl font-black tracking-[0.4em] uppercase italic">
                  {selected.name}
                </span>
                <div className="flex items-center gap-4 text-xs md:text-sm font-black tracking-[1em] uppercase opacity-40 group-hover:opacity-80 transition-opacity mt-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selected.color }} />
                  <span>{selected.spec}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
          </AnimatePresence>
        </div>

      </div>

      {/* Decorations */}
      <div className="fixed left-12 top-1/2 -translate-y-1/2 hidden md:block opacity-5 pointer-events-none">
        <div className="-rotate-90 text-[10px] tracking-[2em] font-black whitespace-nowrap uppercase">CHARACTER SELECTION PROTOCOL</div>
      </div>

    </div>
  );
}
