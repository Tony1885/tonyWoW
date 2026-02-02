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
    // Corrected render path from Blizzard page JSON
    render: "https://render.worldofwarcraft.com/eu/character/ysondre/41/176557609-main.jpg"
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
    // Corrected render path from Blizzard page JSON
    render: "https://render.worldofwarcraft.com/eu/character/ysondre/251/173840891-main.jpg"
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
      // Prevent rapid scrolling
      if (isScrolling) return;

      setIsScrolling(true);
      if (e.deltaY > 0) {
        setSelectedIdx((prev) => (prev + 1) % CHARACTERS.length);
      } else if (e.deltaY < 0) {
        setSelectedIdx((prev) => (prev - 1 + CHARACTERS.length) % CHARACTERS.length);
      }

      setTimeout(() => setIsScrolling(false), 300); // 300ms throttle
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScrolling]);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center select-none cursor-default">

      {/* Background Color Glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.name + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 pointer-events-none z-0"
          style={{ backgroundColor: selected.color }}
        />
      </AnimatePresence>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 px-6">

        {/* Header Indicator */}
        <header className="text-center">
          <h1 className="text-[10px] tracking-[1.5em] text-white/30 uppercase font-black animate-pulse ml-[1.5em]">
            SCROLLEZ POUR CHOISIR
          </h1>
        </header>

        {/* Hero Content */}
        <div className="flex-1 w-full max-w-7xl relative flex items-center justify-center">

          {/* GIANT BACKGROUND NAME */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h2
                key={selected.name + "-text"}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 0.05, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.2, y: -50 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-[30vw] font-black uppercase italic tracking-tighter text-white whitespace-nowrap"
              >
                {selected.name}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* CHARACTER FULL SKIN (MAIN RENDER) */}
          <div className="relative h-full flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.name + "-skin"}
                initial={{ opacity: 0, scale: 0.9, x: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.1, x: -100 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 h-[80vh] w-full flex items-center justify-center"
              >
                <img
                  src={selected.render}
                  alt={selected.name}
                  className="h-full w-auto object-contain drop-shadow-[0_20px_100px_rgba(255,255,255,0.2)] filter saturate-[1.2] brightness-110"
                  style={{ imageRendering: 'auto' }}
                  onError={(e) => {
                    // Fallback if regular path fails, try inset or generic
                    (e.target as HTMLImageElement).src = selected.render.replace('-main.jpg', '-inset.jpg');
                  }}
                />
                {/* Shadow base */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[40%] h-12 bg-black/80 blur-3xl rounded-full opacity-60" />
              </motion.div>
            </AnimatePresence>

            {/* Info Overlay (Floating left) */}
            <div className="absolute left-0 bottom-1/4 z-30 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.name + "-overlay"}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-4 bg-white/5 backdrop-blur-3xl px-6 py-2 border border-white/10 rounded-full w-fit">
                    <span className={cn(
                      "w-3 h-3 rounded-full",
                      selected.faction === "Alliance" ? "bg-blue-600 shadow-[0_0_15px_rgba(0,100,255,0.5)]" : "bg-red-600 shadow-[0_0_15px_rgba(255,0,0,0.5)]"
                    )} />
                    <span className="text-[11px] tracking-[0.4em] font-black italic">{selected.faction.toUpperCase()} // {selected.realm.toUpperCase()}</span>
                  </div>
                  <h2 className="text-[12rem] font-black italic tracking-tighter leading-none text-white drop-shadow-[0_20px_50px_rgba(0,0,0,1)] uppercase">
                    {selected.name}
                  </h2>
                  <div className="flex items-center gap-6 text-xl font-black uppercase tracking-[0.4em]">
                    <span className="text-white/20">Pandaren {selected.class}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <span style={{ color: selected.color }} className="drop-shadow-lg">{selected.spec}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Enter Button (BOTTOM) */}
        <div className="w-full flex flex-col items-center gap-12 relative z-40">
          <button
            onClick={handleEnterWorld}
            className="group relative w-full max-w-2xl py-8 bg-white text-black hover:bg-black hover:text-white transition-all duration-500 rounded-sm overflow-hidden border border-white"
          >
            <span className="relative z-10 text-3xl font-black tracking-[0.6em] uppercase italic">
              ENTRER DANS LE HUB
            </span>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>

          <div className="flex gap-16 text-[10px] text-white/20 tracking-[0.8em] font-black uppercase">
            <span>SCROLL UP</span>
            <div className="w-1.5 h-10 border-l border-white/10" />
            <span>SCROLL DOWN</span>
          </div>
        </div>

      </div>

      {/* Decorative HUD Elements */}
      <div className="fixed right-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-24 opacity-10 pointer-events-none">
        <div className="rotate-90 text-[10px] tracking-[1.5em] font-black whitespace-nowrap uppercase">AZEROTH DATA STREAM // SYNC</div>
        <div className="h-64 w-[1px] bg-white" />
        <div className="rotate-90 text-[10px] tracking-[1.5em] font-black whitespace-nowrap uppercase">SECURE PROTOCOL</div>
      </div>

    </div>
  );
}
