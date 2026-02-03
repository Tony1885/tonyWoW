"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Compass, Trophy, Ghost, Target } from "lucide-react";

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

export default function MountHuntingHub() {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const router = useRouter();
    const selected = CHARACTERS[selectedIdx];

    const handleOpenSimpleArmory = useCallback(() => {
        const encodedName = encodeURIComponent(selected.name.toLowerCase());
        window.open(`https://simplearmory.com/#/${selected.region}/${selected.realm}/${encodedName}/collectable/mounts`, '_blank');
    }, [selected]);

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
            className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center select-none"
        >

            {/* Background Cinematic Render (Full Page) */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected.name + "-bg-img"}
                        initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                        animate={{ opacity: 0.6, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full relative"
                    >
                        <img
                            src={selected.render}
                            alt=""
                            className="w-full h-full object-contain md:object-cover saturate-[1.2] brightness-75"
                        />

                        {/* Vignette & Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

                        {/* Dynamic Color Overlay */}
                        <div
                            className="absolute inset-0 opacity-10 mix-blend-color transition-colors duration-1000"
                            style={{ backgroundColor: selected.color }}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* UI Elements */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pb-24 pt-16 px-6">

                {/* Top Header */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center gap-4 text-white/40 mb-2">
                        <Compass className="w-5 h-5 animate-spin-slow" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase">MOUNT HUNTING SYSTEM</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase drop-shadow-2xl">
                        CHASSE <span className="text-white/20">AUX MONTS</span>
                    </h1>
                </div>

                {/* Selected Character & Action */}
                <div className="w-full flex flex-col items-center gap-12 max-w-2xl">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selected.name + "-card"}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6 }}
                            className="w-full bg-black/60 backdrop-blur-3xl border border-white/5 p-12 rounded-[2rem] shadow-2xl flex flex-col items-center group relative overflow-hidden"
                        >
                            {/* Background Icon */}
                            <Ghost className="absolute -right-10 -bottom-10 w-64 h-64 text-white/[0.02] -rotate-12 pointer-events-none" />

                            <div
                                className="w-20 h-1 rounded-full mb-8"
                                style={{ backgroundColor: selected.color }}
                            />

                            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase mb-2">
                                {selected.name}
                            </h2>
                            <p className="text-white/40 text-[10px] uppercase font-black tracking-[1em] mb-12">
                                {selected.realm} // {selected.region}
                            </p>

                            <button
                                onClick={handleOpenSimpleArmory}
                                className="w-full py-6 rounded-full border border-white/10 flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all duration-500 group/btn overflow-hidden relative"
                            >
                                <Target className="w-5 h-5 group-hover/btn:scale-125 transition-transform" />
                                <span className="text-[11px] font-black tracking-[0.4em] uppercase">LANCER SIMPLE ARMORY</span>

                                {/* Glow effect */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity blur-xl"
                                    style={{ backgroundColor: selected.color }}
                                />
                            </button>

                            <div className="mt-8 flex items-center gap-8">
                                <div className="flex flex-col items-center capitalize">
                                    <span className="text-[9px] text-white/20 font-black tracking-widest mb-1">Race</span>
                                    <span className="text-xs text-white/60 font-black">{selected.race}</span>
                                </div>
                                <div className="w-[1px] h-6 bg-white/5" />
                                <div className="flex flex-col items-center capitalize">
                                    <span className="text-[9px] text-white/20 font-black tracking-widest mb-1">Classe</span>
                                    <span className="text-xs text-white/60 font-black">{selected.class}</span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Scroll Hint */}
                    <div className="flex flex-col items-center gap-4 opacity-20">
                        <span className="text-[9px] font-black tracking-[1em] uppercase">SCROLLEZ POUR CHANGER</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                    </div>
                </div>

                {/* Back Button */}
                <button
                    onClick={() => router.push('/')}
                    className="absolute top-12 left-12 px-8 py-3 rounded-full border border-white/5 bg-white/5 hover:bg-white hover:text-black transition-all text-[9px] font-black tracking-[0.4em] uppercase"
                >
                    RETOUR AU ROSTER
                </button>

            </div>

        </div>
    );
}
