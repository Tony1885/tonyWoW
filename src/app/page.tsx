"use client";

import { motion } from "framer-motion";
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
  const router = useRouter();

  const handleSelect = (char: typeof CHARACTERS[0]) => {
    const encodedName = encodeURIComponent(char.name.toLowerCase());
    router.push(`/${char.region}/${char.realm}/${encodedName}`);
  };

  return (
    <div className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col md:flex-row select-none">

      {/* Dynamic Background Split Glow */}
      <div className="absolute inset-0 z-0 flex pointer-events-none">
        <div className="flex-1 bg-gradient-to-r from-[#00FF96]/5 to-transparent h-full" />
        <div className="flex-1 bg-gradient-to-l from-[#F58CBA]/5 to-transparent h-full" />
      </div>

      {CHARACTERS.map((char, idx) => (
        <motion.div
          key={char.name}
          initial={{ opacity: 0, x: idx === 0 ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex-1 group cursor-pointer overflow-hidden border-x border-white/5"
          onClick={() => handleSelect(char)}
        >
          {/* Background Image with Hover Scaling */}
          <div className="absolute inset-0 z-0 transition-transform duration-1000 ease-out group-hover:scale-110">
            <img
              src={char.render}
              alt={char.name}
              className="w-full h-full object-contain md:object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-700"
              style={{ filter: 'brightness(1.1) saturate(1.2)' }}
            />

            {/* Character Color Overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
              style={{ backgroundColor: char.color }}
            />
          </div>

          {/* Vignettes for Each Side */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />

          {/* Character Info (Appears on Hover or Bottom) */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 px-6 text-center">
            <motion.div
              className="flex flex-col items-center gap-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-500"
            >
              <div className="h-1 w-20 rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-all" style={{ backgroundColor: char.color }} />
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase drop-shadow-2xl">
                {char.name}
              </h2>
              <div className="bg-black/80 backdrop-blur-3xl border border-white/10 px-8 py-3 rounded-full shadow-2xl scale-90 group-hover:scale-110 transition-transform duration-500">
                <span className="text-sm md:text-base font-black tracking-[0.5em] uppercase" style={{ color: char.color }}>
                  {char.spec}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Enter Indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 z-30 pointer-events-none">
            <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center animate-pulse">
              <span className="text-[10px] font-black tracking-widest uppercase text-white/40">ENTER</span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Vertical Separation Line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

      {/* Decorative HUD Details */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none">
        <p className="text-[10px] tracking-[1.5em] font-black uppercase text-white/20">CHOISISSEZ VOTRE CHAMPION</p>
      </div>

    </div>
  );
}
