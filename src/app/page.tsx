"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
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
    render: "https://render.worldofwarcraft.com/eu/character/ysondre/204/182755532-main.jpg"
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
    render: "https://render.worldofwarcraft.com/eu/character/ysondre/141/182755469-main.jpg"
  }
];

export default function CharacterSelectPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const router = useRouter();
  const selected = CHARACTERS[selectedIdx];

  const handleEnterWorld = useCallback(() => {
    router.push(`/${selected.region}/${selected.realm}/${selected.name.toLowerCase()}`);
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

      setTimeout(() => setIsScrolling(false), 500); // Throttle scroll
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScrolling]);

  return (
    <div className="relative h-screen w-full bg-[#020202] overflow-hidden flex items-center justify-center p-6 font-sans select-none">

      {/* Background Video (Layout.tsx already has it, but let's add a class-based overlay) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none z-0"
          style={{ backgroundColor: selected.color }}
        />
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl h-full flex flex-col items-center justify-between">

        {/* Top Hint */}
        <header className="text-center pt-8">
          <h1 className="text-sm tracking-[1em] text-white/40 uppercase font-black animate-pulse">
            SCROLLEZ POUR CHOISIR
          </h1>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-4" />
        </header>

        {/* Center: Hero Character Selection */}
        <div className="flex-1 w-full relative flex items-center justify-center">

          {/* LARGE BACKGROUND TEXT */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h2
                key={selected.name}
                initial={{ opacity: 0, scale: 0.5, letterSpacing: "1em" }}
                animate={{ opacity: 0.08, scale: 1, letterSpacing: "0.2em" }}
                exit={{ opacity: 0, scale: 1.5, letterSpacing: "0.5em" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-[25vw] font-black uppercase italic tracking-tighter text-white whitespace-nowrap"
              >
                {selected.name}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* CHARACTER RENDER - THE SKIN */}
          <div className="relative h-full w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, y: 100, rotateY: 20 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                exit={{ opacity: 0, y: -100, rotateY: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 h-[70vh] md:h-[85vh] w-auto aspect-[3/4] flex items-center justify-center"
              >
                <img
                  src={selected.render}
                  alt={selected.name}
                  className="h-full w-full object-contain drop-shadow-[0_0_80px_rgba(255,255,255,0.15)] filter saturate-[1.2] brightness-110"
                  style={{ imageRendering: 'auto' }}
                />

                {/* Shadow under feet */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-12 bg-black/60 blur-3xl rounded-full" />
              </motion.div>
            </AnimatePresence>

            {/* Info Card Floating */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.name + "-info"}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute left-4 md:left-10 bottom-1/2 translate-y-1/2 z-30"
              >
                <div className="mb-6 inline-flex items-center gap-4 px-5 py-2 border border-white/10 rounded-full bg-black/20 backdrop-blur-xl">
                  <span className={cn(
                    "w-3 h-3 rounded-full animate-pulse shadow-lg",
                    selected.faction === "Alliance" ? "bg-blue-500 shadow-blue-500/50" : "bg-red-600 shadow-red-600/50"
                  )} />
                  <span className="text-[11px] tracking-[0.5em] uppercase font-black text-white/80">
                    {selected.faction} • {selected.realm}
                  </span>
                </div>
                <h2 className="text-8xl md:text-[10rem] font-black tracking-tighter text-white mb-6 italic uppercase leading-none drop-shadow-2xl">
                  {selected.name}
                </h2>
                <div className="flex items-center gap-8 text-lg uppercase tracking-[0.4em] font-black">
                  <span className="text-white/20">LVL {selected.level}</span>
                  <div className="w-2 h-2 bg-white/10 rounded-full" />
                  <span style={{ color: selected.color }} className="drop-shadow-sm">{selected.spec} {selected.class}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Interface */}
        <div className="w-full flex flex-col items-center justify-center pb-16 relative z-40">

          {/* Enter World Hero Button */}
          <div className="flex flex-col items-center gap-8 w-full max-w-xl">
            <button
              onClick={handleEnterWorld}
              className="group relative w-full py-8 bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_80px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 text-2xl font-black tracking-[0.5em] uppercase italic">
                ENTRER DANS LE HUB
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            <div className="flex gap-12 text-[10px] text-white/30 tracking-[0.5em] uppercase font-black">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[8px]">↑</span>
                Précédent
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[8px]">↓</span>
                Suivant
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Hero Stats (Right Side) */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
        <div className="space-y-20 opacity-20">
          <div className="text-right">
            <p className="text-[10px] tracking-[1em] uppercase font-black mb-4">Status</p>
            <p className="text-4xl font-black italic uppercase">Connecté</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-[1em] uppercase font-black mb-4">Région</p>
            <p className="text-4xl font-black italic uppercase">Europe</p>
          </div>
        </div>
      </div>

    </div>
  );
}
