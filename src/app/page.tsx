"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Shield, Swords, User, Compass, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CHARACTERS = [
  {
    name: "Moussman",
    realm: "ysondre",
    region: "eu",
    level: 80,
    class: "Moine",
    race: "Pandaren",
    faction: "Horde",
    spec: "Maître Brasseur",
    theme: "monk"
  },
  {
    name: "Mamènne",
    realm: "ysondre",
    region: "eu",
    level: 80,
    class: "Paladin", // Assumption for Alliance feel
    race: "Humain",
    faction: "Alliance",
    spec: "Vindicte",
    theme: "alliance"
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
    <div className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-between py-12 px-6 font-sans">
      {/* Background Ambience */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {selected.theme === "monk" ? (
            <div className="absolute inset-0 bg-gradient-to-tr from-green-900/40 via-transparent to-transparent" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-transparent" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Top Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-20 text-center"
      >
        <h1 className="text-xl tracking-[0.5em] text-white/50 uppercase font-light">
          Sélection du Personnage
        </h1>
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Center Character Display */}
      <div className="relative flex-1 w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.name}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.05, opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center"
          >
            <div className={`text-[120px] md:text-[180px] font-bold tracking-tighter opacity-[0.03] select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap`}>
              {selected.name.toUpperCase()}
            </div>

            <motion.div
              className="relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`mb-4 inline-block px-4 py-1 border rounded-sm text-[10px] tracking-[0.3em] uppercase ${selected.faction === "Alliance" ? "border-blue-500/30 text-blue-400 bg-blue-500/5" : "border-red-500/30 text-red-500 bg-red-500/5"}`}>
                {selected.faction}
              </div>
              <h2 className="text-7xl md:text-8xl font-black tracking-tighter text-white mb-2 italic">
                {selected.name.toUpperCase()}
              </h2>
              <div className="flex items-center justify-center gap-4 text-white/40 text-sm uppercase tracking-[0.2em] font-light">
                <span>Niveau {selected.level}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span>{selected.spec} {selected.class}</span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main UI Overlay */}
      <div className="relative z-30 w-full max-w-7xl flex flex-col md:flex-row items-end justify-between gap-12">

        {/* Statistics or Realm Info */}
        <div className="w-full md:w-64 space-y-4 hidden md:block">
          <div className="glass border border-white/5 p-4 rounded-sm">
            <p className="text-[10px] tracking-widest text-white/20 uppercase mb-2">Royaume</p>
            <p className="text-white uppercase font-bold tracking-wider">{selected.realm}</p>
          </div>
          <p className="text-[9px] text-white/10 uppercase tracking-[0.2em] leading-relaxed">
            "Que le vent caresse toujours votre dos, et que vos pas soient légers."
          </p>
        </div>

        {/* Enter World Button */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <button
            onClick={handleEnterWorld}
            className="group relative px-20 py-5 bg-[#C41E3A]/90 hover:bg-[#C41E3A] text-white transition-all duration-300 border border-white/10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 text-lg font-bold tracking-[0.3em] uppercase italic">
              Entrer dans le Hub
            </span>
          </button>
          <div className="flex gap-10 text-[10px] text-white/20 tracking-[0.3em] uppercase">
            <button className="hover:text-white transition-colors">Menu</button>
            <button className="hover:text-white transition-colors">Credits</button>
            <button className="hover:text-white transition-colors">Quitter</button>
          </div>
        </div>

        {/* Character List Area */}
        <div className="w-full md:w-72 glass border border-white/10 rounded-sm overflow-hidden flex flex-col">
          <div className="p-3 bg-white/5 border-b border-white/10 text-[10px] tracking-[0.3em] uppercase text-white/40">
            Liste des personnages
          </div>
          <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
            {CHARACTERS.map((char, idx) => (
              <button
                key={char.name}
                onClick={() => setSelectedIdx(idx)}
                className={`w-full p-4 flex items-center justify-between border-b border-white/5 transition-all group ${selectedIdx === idx ? "bg-white/10" : "hover:bg-white/5"}`}
              >
                <div className="text-left">
                  <p className={`text-sm font-bold tracking-tight ${selectedIdx === idx ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                    {char.name}
                  </p>
                  <p className="text-[9px] uppercase tracking-widest text-white/20">
                    {char.class} Niv. {char.level}
                  </p>
                </div>
                {selectedIdx === idx && (
                  <div className="w-1 h-8 bg-[#C41E3A] rounded-full" />
                )}
              </button>
            ))}
          </div>
          <button className="p-4 w-full text-[10px] tracking-widest uppercase text-white/20 hover:text-white transition-colors border-t border-white/5 bg-black/20">
            Créer un personnage
          </button>
        </div>

      </div>

      {/* Bottom Floating Info */}
      <div className="absolute bottom-6 left-6 text-[9px] text-white/5 uppercase tracking-[0.4em] pointer-events-none">
        Build v1.0.4-WoN | Antigravity Engine
      </div>
    </div>
  );
}
