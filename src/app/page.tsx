"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Compass, Sparkles, Trophy } from "lucide-react";

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
    color: "#A330C9",
    render: "https://render.worldofwarcraft.com/eu/character/ysondre/251/173840891-main-raw.png"
  }
];

export default function CharacterSelectPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const router = useRouter();
  const selected = CHARACTERS[selectedIdx];

  const handleEnterWorld = useCallback(() => {
    const encodedName = encodeURIComponent(selected.name.normalize('NFC'));
    router.push(`/${selected.region}/${selected.realm}/${encodedName}`);
  }, [router, selected]);

  const handleOpenCollectorHub = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    router.push('/collector');
  }, [router]);

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
              className="w-full h-full object-contain md:object-cover transition-transform duration-700 saturate-[1.2] brightness-90"
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

        {/* Header Links - Responsive Design */}
        <div className="absolute top-6 md:top-12 left-4 md:left-12 right-4 md:right-12 flex justify-between items-start md:items-center pointer-events-auto">
          <a
            href="https://www.wowhead.com/news"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-start gap-1 text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.4em] text-white/30 hover:text-white transition-all uppercase px-2 py-1"
          >
            <span className="flex items-center gap-1 md:gap-2">
              <Compass className="w-3 h-3 md:w-4 md:h-4 opacity-50 group-hover:rotate-45 transition-transform" />
              NEWS
            </span>
            <span className="hidden md:inline text-[8px] opacity-20 group-hover:opacity-40 tracking-[0.2em] lowercase">Azeroth Updates</span>
          </a>

          <Link
            href="/meta"
            className="group flex flex-col items-center gap-1 text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.4em] text-white/30 hover:text-white transition-all uppercase px-2 py-1"
          >
            <span className="flex items-center gap-1 md:gap-2">
              <Trophy className="w-3 h-3 md:w-4 md:h-4 opacity-50 group-hover:scale-125 transition-transform" />
              META
            </span>
            <span className="hidden md:inline text-[8px] opacity-20 group-hover:opacity-40 tracking-[0.2em] lowercase">Tierlist S1</span>
          </Link>

          <button
            onClick={handleOpenCollectorHub}
            className="group flex flex-col items-end gap-1 text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.4em] text-white/30 hover:text-white transition-all uppercase px-2 py-1"
          >
            <span className="flex items-center gap-1 md:gap-2 text-right">
              MODE COLLECTOR
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 opacity-50 group-hover:scale-125 transition-transform" />
            </span>
            <span className="hidden md:inline text-[8px] opacity-20 group-hover:opacity-40 tracking-[0.2em] lowercase text-right">Mounts • Achievs</span>
          </button>
        </div>

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
