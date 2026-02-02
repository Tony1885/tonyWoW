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
    color: "#00FF96",
    // Typical high-res render or similar - placeholder for Blizzard skin
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
    render: "https://render.worldofwarcraft.com/eu/character/ysondre/141/182755469-main.jpg" // Placeholder
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

      <div className="relative z-10 w-full max-w-7xl h-full flex flex-col items-center justify-between">

        {/* Top Branding */}
        <header className="text-center pt-8">
          <h1 className="text-sm tracking-[1em] text-white/30 uppercase font-bold">
            Sélection du Personnage
          </h1>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mt-4" />
        </header>

        {/* Center: Selected Character View with Skin */}
        <div className="flex-1 w-full relative flex items-center justify-center">

          {/* BIG TEXT BACKGROUND */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h2
                key={selected.name}
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={{ opacity: 0.05, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -100, scale: 1.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-[20vw] font-black uppercase italic tracking-tighter text-white whitespace-nowrap"
              >
                {selected.name}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* CHARACTER RENDER */}
          <div className="relative h-full w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 h-[60vh] md:h-[80vh] w-auto aspect-[3/4]"
              >
                <img
                  src={selected.render}
                  alt={selected.name}
                  className="h-full w-full object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://avatar.vercel.sh/${selected.name}?size=400&text=${selected.name.charAt(0)}`;
                  }}
                />

                {/* Shadow under feet */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/40 blur-2xl rounded-full" />
              </motion.div>
            </AnimatePresence>

            {/* Character Info Card Floating */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.name + "-info"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute left-4 md:left-20 bottom-1/2 translate-y-1/2 z-30 max-w-sm"
              >
                <div className="mb-4 inline-flex items-center gap-3 px-4 py-1.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
                  <span className={cn(
                    "w-2 h-2 rounded-full animate-pulse",
                    selected.faction === "Alliance" ? "bg-blue-500 shadow-[0_0_8px_#3b82f6]" : "bg-red-600 shadow-[0_0_8px_#dc2626]"
                  )} />
                  <span className="text-[10px] tracking-[0.4em] uppercase font-black text-white/60">
                    {selected.faction} • {selected.realm}
                  </span>
                </div>
                <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-4 italic uppercase leading-none drop-shadow-lg">
                  {selected.name}
                </h2>
                <div className="flex items-center gap-6 text-sm uppercase tracking-[0.3em] font-light text-white/40">
                  <span className="text-white/20 font-bold">LVL {selected.level}</span>
                  <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                  <span style={{ color: selected.color }} className="font-bold">{selected.spec} {selected.class}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Interface */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 pb-12 relative z-40">

          {/* Realm Info / Stats */}
          <div className="hidden md:block w-72">
            <div className="glass border border-white/5 p-6 rounded-sm backdrop-blur-md">
              <p className="text-[9px] tracking-[0.4em] text-white/20 uppercase mb-3 font-bold">Position</p>
              <p className="text-white uppercase font-black tracking-widest text-lg italic">VALDRAKKEN</p>
              <div className="h-[1px] w-full bg-white/5 my-4" />
              <p className="text-white/30 text-[9px] uppercase tracking-widest leading-loose">
                Connecté au Hub Azeroth via Raider.io. Toutes les statistiques sont à jour.
              </p>
            </div>
          </div>

          {/* Enter World Hero Button */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={handleEnterWorld}
              className="group relative px-20 md:px-32 py-6 bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-sm overflow-hidden"
            >
              <span className="relative z-10 text-xl font-black tracking-[0.4em] uppercase italic">
                ENTRER DANS LE HUB
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
            <div className="flex gap-10 text-[10px] text-white/20 tracking-[0.4em] uppercase font-bold">
              <button className="hover:text-white transition-colors">Paramètres</button>
              <button className="hover:text-white transition-colors">Aide</button>
              <button className="hover:text-white transition-colors">Déconnexion</button>
            </div>
          </div>

          {/* Character List */}
          <div className="w-72 glass-morphism border border-white/10 rounded-sm overflow-hidden flex flex-col shadow-2xl backdrop-blur-md">
            <div className="p-4 bg-white/5 border-b border-white/10">
              <p className="text-[9px] tracking-[0.4em] uppercase text-white/40 font-bold">Sélection</p>
            </div>
            <div className="max-h-[220px] overflow-y-scroll scrollbar-hide">
              {CHARACTERS.map((char, idx) => (
                <button
                  key={char.name}
                  onClick={() => setSelectedIdx(idx)}
                  className={cn(
                    "w-full p-4 text-left transition-all border-b border-white/5 group relative",
                    selectedIdx === idx ? "bg-white/10" : "hover:bg-white/5"
                  )}
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className={cn(
                        "text-sm font-black tracking-tight uppercase italic transition-colors",
                        selectedIdx === idx ? "text-white" : "text-white/40 group-hover:text-white/60"
                      )}>
                        {char.name}
                      </p>
                      <p className="text-[8px] uppercase tracking-widest text-white/20 font-bold">
                        NIV. {char.level} {char.class}
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
          </div>

        </div>

      </div>

      {/* Floating Info */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-5">
        <Shield className="w-16 h-16 text-white" />
      </div>

    </div>
  );
}
