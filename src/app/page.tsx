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
    // Official High Res Render
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
    // Official High Res Render
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
              className="w-full h-full object-contain md:object-cover scale-110 md:scale-100 transition-transform duration-700"
              style={{ filter: 'brightness(0.6) saturate(1.2)' }}
            />

            {/* Vignette & Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />

            {/* Dynamic Color Overlay */}
            <div
              className="absolute inset-0 opacity-10 mix-blend-color transition-colors duration-1000"
              style={{ backgroundColor: selected.color }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pb-24 pt-12 px-6">

        {/* Placeholder for top spacing */}
        <div />

        {/* Center Content */}
        <div className="w-full max-w-7xl flex flex-col items-center justify-center relative">

          {/* LARGE CENTER TITLE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.name + "-title"}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center relative z-20"
            >
              <h2 className="text-[10rem] md:text-[15rem] font-black italic tracking-tighter leading-none text-white drop-shadow-[0_20px_100px_rgba(0,0,0,1)] uppercase">
                {selected.name}
              </h2>

              <div className="flex items-center justify-center gap-10 mt-4 text-lg md:text-2xl font-black uppercase tracking-[0.5em]">
                <span className="text-white/30">{selected.class}</span>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selected.color }} />
                <span style={{ color: selected.color }} className="drop-shadow-lg">{selected.spec}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div className="w-full flex flex-col items-center gap-12 relative z-40">
          <button
            onClick={handleEnterWorld}
            className="group relative w-full max-w-2xl py-10 bg-white text-black hover:bg-black hover:text-white transition-all duration-500 rounded-sm overflow-hidden border border-white shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
          >
            <span className="relative z-10 text-3xl md:text-4xl font-black tracking-[0.6em] uppercase italic">
              ENTRER DANS LE HUB
            </span>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>

      </div>

      {/* Side Decorative Trace */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-20 opacity-10 pointer-events-none">
        <div className="rotate-90 text-[10px] tracking-[2em] font-black whitespace-nowrap uppercase">AZEROTH DATA STREAM // SYNC</div>
      </div>

    </div>
  );
}
