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
    class: "Demon Hunter",
    race: "Elfe de la nuit",
    faction: "Alliance",
    spec: "Vengeance",
    color: "#A330C9", // DH Purple
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

      setTimeout(() => setIsScrolling(false), 500);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScrolling]);

  return (
    <div
      className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center select-none cursor-pointer"
      onClick={handleEnterWorld}
    >

      {/* Background Cinematic Render (Full Page) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.name + "-bg-img"}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
          >
            <img
              src={selected.render}
              alt=""
              className="w-full h-full object-contain md:object-cover transition-transform duration-700"
              style={{ filter: 'brightness(0.9) saturate(1.2)' }}
            />

            {/* Vignette & Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-40" />

            {/* Dynamic Color Overlay */}
            <div
              className="absolute inset-0 opacity-10 mix-blend-color transition-colors duration-1000"
              style={{ backgroundColor: selected.color }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating UI Elements */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pb-24 pt-16 px-6 pointer-events-none">

        {/* Top Hint */}
        <div className="opacity-20 flex flex-col items-center gap-2">
          <p className="text-[10px] tracking-[1.5em] font-black uppercase text-white">SCROLLEZ POUR CHOISIR</p>
          <div className="w-1 h-8 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-white"
              animate={{ y: [0, 32] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              style={{ height: '30%' }}
            />
          </div>
        </div>

        {/* Selected Character Label (Small & Class-Colored) */}
        <div className="w-full flex flex-col items-center gap-6 relative z-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.name + "-label"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="px-10 py-5 rounded-lg border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col items-center transition-all duration-500"
                style={{ backgroundColor: selected.color }}
              >
                <span className="text-3xl md:text-5xl font-black italic tracking-widest uppercase text-black">
                  {selected.name}
                </span>
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-black/60 mt-1">
                  {selected.spec}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="text-[10px] tracking-[0.5em] font-black uppercase text-white/30">CLIQUEZ POUR ENTRER</p>
        </div>

      </div>

    </div>
  );
}
