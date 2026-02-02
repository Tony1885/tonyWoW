"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronRight, Shield, Swords } from "lucide-react";
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
    color: "#00FF96"
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
    color: "#F58CBA"
  }
];

export default function CharacterSelectPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const router = useRouter();
  const selected = CHARACTERS[selectedIdx];

  const handleEnterWorld = () => {
    router.push(`/${selected.region}/${selected.realm}/${selected.name.toLowerCase()}`);
  };

  return (
    <div className="relative h-screen w-full bg-[#020202] overflow-hidden flex items-center justify-center p-6 font-sans">

      {/* Dynamic Background Glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: selected.color }}
        />
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-6xl h-full max-h-[800px] flex flex-col items-center justify-between">

        {/* Top Branding */}
        <header className="text-center pt-8">
          <h1 className="text-sm tracking-[1em] text-white/30 uppercase font-bold">
            Sélection du Personnage
          </h1>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mt-4" />
        </header>

        {/* Center: Selected Character View */}
        <div className="flex-1 flex flex-col items-center justify-center -translate-y-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="mb-6 inline-flex items-center gap-3 px-4 py-1.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                <span className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  selected.faction === "Alliance" ? "bg-blue-500 shadow-[0_0_8px_#3b82f6]" : "bg-red-600 shadow-[0_0_8px_#dc2626]"
                )} />
                <span className="text-[10px] tracking-[0.4em] uppercase font-black text-white/60">
                  {selected.faction} • {selected.realm}
                </span>
              </div>

              <h2 className="text-8xl md:text-[120px] font-black tracking-tighter text-white mb-4 italic uppercase leading-[0.8]">
                {selected.name}
              </h2>

              <div className="flex items-center justify-center gap-6 text-base uppercase tracking-[0.3em] font-light text-white/40">
                <span className="text-white/20">Niveau {selected.level}</span>
                <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                <span style={{ color: selected.color }} className="font-bold">{selected.spec} {selected.class}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Interface: Centered & Balanced */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 pb-12">

          {/* Enter World Hero Button */}
          <div className="order-1 md:order-2">
            <button
              onClick={handleEnterWorld}
              className="group relative px-24 py-7 bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-sm overflow-hidden"
            >
              <span className="relative z-10 text-xl font-black tracking-[0.4em] uppercase italic">
                ENTRER DANS LE HUB
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
            <div className="flex justify-center gap-10 mt-6 text-[10px] text-white/20 tracking-[0.4em] uppercase">
              <button className="hover:text-white transition-colors">Options</button>
              <button className="hover:text-white transition-colors">Crédits</button>
              <button className="hover:text-white transition-colors">Quitter</button>
            </div>
          </div>

          {/* Character List: Now Floating or Positioned firmly */}
          <div className="order-2 md:order-3 w-64 glass-morphism border border-white/10 rounded-sm overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 bg-white/5 border-b border-white/10">
              <p className="text-[9px] tracking-[0.4em] uppercase text-white/40 font-bold">Aventuriers</p>
            </div>
            <div className="max-h-[220px] overflow-y-scroll scrollbar-hide">
              {CHARACTERS.map((char, idx) => (
                <button
                  key={char.name}
                  onClick={() => setSelectedIdx(idx)}
                  className={cn(
                    "w-full p-5 text-left transition-all border-b border-white/5 group relative",
                    selectedIdx === idx ? "bg-white/10" : "hover:bg-white/5"
                  )}
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className={cn(
                        "text-base font-black tracking-tight uppercase italic transition-colors",
                        selectedIdx === idx ? "text-white" : "text-white/40 group-hover:text-white/60"
                      )}>
                        {char.name}
                      </p>
                      <p className="text-[8px] uppercase tracking-widest text-white/20 font-bold">
                        {char.class} • NIV. {char.level}
                      </p>
                    </div>
                    {selectedIdx === idx && (
                      <ChevronRight className="w-4 h-4 text-white" />
                    )}
                  </div>
                  {selectedIdx === idx && (
                    <motion.div
                      layoutId="active-bg"
                      className="absolute inset-0 border-l-4"
                      style={{ borderColor: char.color }}
                    />
                  )}
                </button>
              ))}
            </div>
            <button className="p-4 w-full text-[9px] tracking-[0.3em] uppercase text-white/20 hover:text-white transition-colors bg-black/40 border-t border-white/5 font-bold">
              + Créer un nouveau
            </button>
          </div>

          {/* Empty space/Stat for balance */}
          <div className="hidden md:block w-64 order-1">
            <div className="glass border border-white/5 p-6 rounded-sm">
              <p className="text-[9px] tracking-[0.4em] text-white/20 uppercase mb-3 font-bold">Région</p>
              <p className="text-white uppercase font-black tracking-widest text-lg italic">EUROPE</p>
              <div className="h-[1px] w-full bg-white/5 my-4" />
              <p className="text-white/30 text-[9px] uppercase tracking-widest leading-loose">
                Sélectionnez un personnage pour accéder à ses outils de suivi.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Info */}
      <div className="absolute top-10 left-10 pointer-events-none">
        <Shield className="w-8 h-8 text-white/5" />
      </div>
      <div className="absolute bottom-10 right-10 pointer-events-none">
        <Swords className="w-8 h-8 text-white/5" />
      </div>

    </div>
  );
}
